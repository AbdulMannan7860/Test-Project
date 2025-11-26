// Check if Supabase credentials are set
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.error('Please set your Supabase URL and Anon Key in config.js');
    alert('Please set your Supabase URL and Anon Key in config.js');
}

// Initialize Supabase client
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth functions
async function login(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    return { data, error };
}

async function logout() {
    const { error } = await _supabase.auth.signOut();
    if (!error) {
        window.location.href = 'login.html';
    }
    return { error };
}

async function checkSession() {
    const { data: { session } } = await _supabase.auth.getSession();
    return session;
}

async function requireAuth() {
    const session = await checkSession();
    if (!session) {
        window.location.href = 'login.html';
    }
    return session;
}

// Database functions
async function getAccounts() {
    const { data, error } = await _supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });
    return { data, error };
}

async function addAccount(username, password) {
    const { data, error } = await _supabase
        .from('accounts')
        .insert([{ username, password }])
        .select();
    return { data, error };
}

async function deleteAccount(id) {
    const { error } = await _supabase
        .from('accounts')
        .delete()
        .eq('id', id);
    return { error };
}

async function logAttendance(username, qrCode, status, message) {
    const { error } = await _supabase
        .from('attendance_logs')
        .insert([{ username, qr_code: qrCode, status, message }]);
    return { error };
}
