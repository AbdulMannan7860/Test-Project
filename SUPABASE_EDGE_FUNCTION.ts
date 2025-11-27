import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { username, password, qr_code } = await req.json();

        if (!username || !password || !qr_code) {
            return new Response(
                JSON.stringify({ error: 'Missing username, password, or qr_code' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log(`Processing attendance for ${username}`);

        // Parse QR Code
        let at, ld;
        try {
            const url = new URL(qr_code);
            at = url.searchParams.get('at');
            ld = url.searchParams.get('ld');
        } catch (e) {
            const params = new URLSearchParams(qr_code);
            at = params.get('at');
            ld = params.get('ld');
        }

        if (!at || !ld) {
            return new Response(
                JSON.stringify({ error: 'Invalid QR Code format. Could not extract at/ld parameters.' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // 1. Login
        const loginParams = new URLSearchParams();
        loginParams.append('j_username', username);
        loginParams.append('j_password', password);
        loginParams.append('version', '6.0.65');
        loginParams.append('app', 'student-android');
        loginParams.append('isStudent', 'false');

        const loginResponse = await fetch('https://muerp.mahindrauniversity.edu.in/api/mobileLogin.htm', {
            method: 'POST',
            headers: {
                'User-Agent': 'Dart/3.10 (dart:io)',
                'Accept-Encoding': 'gzip',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: loginParams
        });

        if (!loginResponse.ok) {
            return new Response(
                JSON.stringify({ error: `Login failed with status ${loginResponse.status}` }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Extract JSESSIONID from Set-Cookie header
        const setCookieHeader = loginResponse.headers.get('set-cookie');
        console.log('Set-Cookie:', setCookieHeader);

        let jsessionid = '';
        if (setCookieHeader) {
            const match = setCookieHeader.match(/JSESSIONID=([^;]+)/);
            if (match) {
                jsessionid = match[1];
            }
        }

        // If we couldn't find it in headers, maybe the response body has it?
        // But usually it's in the header.
        // Note: In Deno, we CAN read Set-Cookie from fetch response.

        if (!jsessionid) {
            // Fallback: Check if the user provided it in the request? No, we are logging in here.
            // Maybe the login response body has it?
            // Let's try to parse body just in case
            const text = await loginResponse.text();
            // console.log('Login Body:', text); 
            // If we can't find session ID, we can't proceed.
            // But let's try to proceed if we have a cookie string from header even if regex failed
            if (setCookieHeader && setCookieHeader.includes('JSESSIONID')) {
                // Just use the whole header or try to extract again
            } else {
                return new Response(
                    JSON.stringify({ error: 'Could not retrieve JSESSIONID from login response' }),
                    { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }
        }

        // 2. Mark Attendance
        const attendanceUrl = new URL('https://muerp.mahindrauniversity.edu.in/markAtt.json');
        attendanceUrl.searchParams.append('at', at);
        attendanceUrl.searchParams.append('ld', ld);
        attendanceUrl.searchParams.append('choe', 'UTF-8');

        const attendanceResponse = await fetch(attendanceUrl.toString(), {
            method: 'GET',
            headers: {
                'User-Agent': 'Dart/3.10 (dart:io)',
                'Accept-Encoding': 'gzip',
                'Cookie': `JSESSIONID=${jsessionid}`
            }
        });

        const attendanceData = await attendanceResponse.json();

        return new Response(
            JSON.stringify(attendanceData),
            { status: attendanceResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
