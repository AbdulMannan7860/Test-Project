# Step-by-Step Guide: Get API Endpoints from Mobile App

## 🎯 EASIEST METHOD - HTTP Toolkit (Recommended)

### Step 1: Download HTTP Toolkit
1. Go to: **https://httptoolkit.com/android/**
2. Click **"Download for Windows"**
3. Install it on your computer

### Step 2: Set Up Your Phone

**For Android:**
1. Open **HTTP Toolkit** on your computer
2. Click the big **"Android Device via ADB"** button
3. Connect your phone to computer with USB cable
4. Enable **USB Debugging** on your phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times (enables Developer Mode)
   - Go back to Settings → Developer Options
   - Turn on **"USB Debugging"**
5. Allow the connection when prompted on your phone
6. HTTP Toolkit will automatically set up the proxy

**For iPhone:**
1. Open **HTTP Toolkit** on your computer
2. Click **"iOS Device"**
3. Follow the instructions to:
   - Connect to the same WiFi as your computer
   - Install the certificate
   - Configure the proxy settings

### Step 3: Capture the API Calls
1. **Keep HTTP Toolkit open** on your computer
2. **Open your university app** on your phone
3. **Login** with your credentials
4. **Mark attendance** (scan QR code or whatever the process is)
5. **Watch HTTP Toolkit** - you'll see all the requests!

### Step 4: Find the Important Requests

Look for requests that contain:
- **"login"** or **"auth"** in the URL
- **"attendance"** or **"mark"** in the URL

Click on each request to see:
- **URL** (e.g., `https://api.university.com/v1/login`)
- **Method** (POST, GET, etc.)
- **Headers** (Authorization, Content-Type, etc.)
- **Request Body** (the data being sent)
- **Response** (what the server sends back)

### Step 5: Copy the Information

Take screenshots or copy:
1. **Login API**:
   - URL
   - Request body format
   - Response (especially the token/session)

2. **Attendance API**:
   - URL
   - Headers (especially Authorization)
   - Request body format

---

## 🔧 ALTERNATIVE METHOD - Charles Proxy

If HTTP Toolkit doesn't work:

1. Download **Charles Proxy**: https://www.charlesproxy.com/download/
2. Install on your computer
3. Go to **Proxy → Proxy Settings** → Note the port (usually 8888)
4. On your phone:
   - Connect to same WiFi as computer
   - Go to WiFi settings → Modify Network → Manual Proxy
   - Enter your computer's IP address and port 8888
5. Install Charles certificate on phone (for HTTPS)
6. Open university app and mark attendance
7. Check Charles - you'll see all requests

---

## 📱 ANDROID ONLY - Quick Method

If you have an Android phone and the app is not using certificate pinning:

1. Install **Packet Capture** app from Play Store
2. Open Packet Capture
3. Tap the play button to start capturing
4. Open your university app
5. Mark attendance
6. Go back to Packet Capture and stop
7. Look through the captured requests

---

## 🔍 What You're Looking For

### Example Login Request:
```
POST https://portal.mahindrauniversity.edu.in/api/v1/auth/login
Content-Type: application/json

{
  "email": "student@university.edu.in",
  "password": "yourpassword"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Example Attendance Request:
```
POST https://portal.mahindrauniversity.edu.in/api/v1/attendance/mark
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "qr_code": "ABC123XYZ",
  "class_id": "CS101",
  "timestamp": "2024-01-01T10:00:00Z"
}

Response:
{
  "success": true,
  "message": "Attendance marked successfully"
}
```

---

## ✅ After You Get the APIs

1. **Send me** or **note down**:
   - Login URL
   - Login request format
   - Attendance URL
   - Attendance request format
   - Any special headers

2. I'll help you update `scanner.html` with the exact code

3. Test with one account first!

---

## ⚠️ Troubleshooting

**"Can't see HTTPS requests"**
- You need to install the SSL certificate from HTTP Toolkit/Charles on your phone

**"App says 'Network Error'"**
- The app might be using certificate pinning (security feature)
- Try using an older version of the app
- Or use the decompile method (more advanced)

**"Too many requests, can't find the right one"**
- Use the filter in HTTP Toolkit
- Search for keywords like "login", "auth", "attendance", "mark"

---

## 🆘 Need More Help?

If you get stuck:
1. Take a screenshot of HTTP Toolkit showing the requests
2. Share it with me
3. I'll help you identify the right endpoints!
