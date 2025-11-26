// supabase/functions/mark-attendance/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Load environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

serve(async (req: Request) => {
  try {
    const { student_id } = await req.json();

    if (!student_id) {
      return new Response(JSON.stringify({ error: "Missing student_id" }), {
        status: 400,
      });
    }

    // Insert attendance record
    const { error } = await supabase
      .from("attendance_logs")
      .insert([{ student_id }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Attendance marked successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
});
