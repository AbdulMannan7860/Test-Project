# Juno Attendance - Supabase Setup

This project has been updated to use Supabase for authentication and data storage.

## Setup Instructions

1.  **Create a Supabase Project**: Go to [Supabase](https://supabase.com/) and create a new project.

2.  **Get Credentials**:
    *   Go to Project Settings -> API.
    *   Copy the `Project URL` and `anon` public key.
    *   Open `config.js` in this folder and paste them there.

3.  **Database Setup**:
    *   Go to the SQL Editor in your Supabase dashboard.
    *   Open the `setup.sql` file provided in this folder.
    *   Copy the contents and run it in the SQL Editor. This will create the necessary tables (`accounts`, `attendance_logs`) and security policies.

4.  **Authentication (Create Admin User)**:
    *   **Option A (Easier)**: Go to Authentication -> Users in your Supabase Dashboard and click "Add User".
    *   **Option B (SQL)**: Open `create_admin_user.sql`, change the email/password, and run it in the SQL Editor.
    *   Use this email and password to log in to `login.html`.

5.  **Run the App**:
    *   You can open `index.html` (or `login.html`) directly in your browser, or use a local server (e.g., Live Server in VS Code).
    *   Note: For the camera scanner to work, you usually need to be on `localhost` or `https`. Opening the file directly (`file://`) might block camera access in some browsers.

## 6. Setup Attendance API (Edge Function)

To make the attendance marking work securely, you need to deploy the Supabase Edge Function.

1.  **Install Supabase CLI**:
    *   Follow instructions at: https://supabase.com/docs/guides/cli

2.  **Initialize Project**:
    *   Run `supabase init` in this folder.

3.  **Create Function**:
    *   Run `supabase functions new mark-attendance`.
    *   Copy the content of `mark_attendance_function.ts` into `supabase/functions/mark-attendance/index.ts`.

4.  **Deploy**:
    *   Run `supabase functions deploy mark-attendance`.
    *   This will give you a URL, but the client code automatically finds it if you linked your project.

5.  **Set Environment Variables**:
    *   Run `supabase secrets set SUPABASE_URL=your_project_url SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
    *   (You can find the Service Role Key in Project Settings -> API -> Service Role Key. **Keep this secret!**)

## Features

*   **Admin Login**: Secure login using Supabase Auth.
*   **Account Management**: Add and delete student accounts. Data is stored in Supabase.
*   **QR Scanner**: Scans QR codes and calls the secure Edge Function to mark attendance.
    *   *Note*: The `mark_attendance_function.ts` file contains a placeholder for the actual university API call. You need to edit it with the real endpoint.
