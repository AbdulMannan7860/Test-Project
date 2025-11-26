-- Enable pgcrypto extension to hash passwords
create extension if not exists pgcrypto;

-- ⚠️ IMPORTANT: Change these values before running!
-- Replace 'admin@example.com' with your email
-- Replace 'password123' with your secure password

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- Default instance_id
  gen_random_uuid(), -- Generate a new unique ID
  'authenticated',
  'authenticated',
  'admin@example.com', -- 📧 CHANGE THIS
  crypt('password123', gen_salt('bf')), -- 🔒 CHANGE THIS
  now(), -- Auto-confirm email
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Output the result
SELECT 'User created successfully' as status, email FROM auth.users WHERE email = 'admin@example.com';
