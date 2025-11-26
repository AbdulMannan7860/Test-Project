# Getting API Endpoints Using Android Emulator

## ✅ This is EASIER than using iPhone!

Android emulators work perfectly with HTTP Toolkit and don't have the certificate trust issues that iOS has.

---

## Method 1: BlueStacks + HTTP Toolkit (EASIEST)

### Step 1: Install BlueStacks
1. Download **BlueStacks**: https://www.bluestacks.com/
2. Install it (it's free)
3. Open BlueStacks and complete the setup
4. Sign in with a Google account (you can create a new one just for this)

### Step 2: Install Your University App
1. Open **Play Store** in BlueStacks
2. Search for your university's attendance app
3. Install it
4. Login with your credentials

### Step 3: Connect HTTP Toolkit to BlueStacks
1. Open **HTTP Toolkit** on your computer
2. Click **"Android Device via ADB"**
3. HTTP Toolkit will automatically detect BlueStacks
4. Click "Connect" when prompted

### Step 4: Capture the API Calls
1. Keep HTTP Toolkit open
2. Go to BlueStacks
3. Open your university app
4. **Mark attendance** (scan QR code or whatever the process is)
5. Go back to HTTP Toolkit
6. You'll see ALL the API requests! 🎉

---

## Method 2: Android Studio Emulator (More Control)

### Step 1: Install Android Studio
1. Download: https://developer.android.com/studio
2. Install Android Studio
3. During setup, make sure to install:
   - Android SDK
   - Android Virtual Device (AVD)

### Step 2: Create an Emulator
1. Open Android Studio
2. Click **"More Actions" → "Virtual Device Manager"**
3. Click **"Create Device"**
4. Choose a device (e.g., Pixel 5)
5. Choose a system image (e.g., Android 13)
6. Click "Finish"

### Step 3: Start the Emulator
1. Click the **Play** button next to your virtual device
2. Wait for it to boot up (first time takes a few minutes)

### Step 4: Install Your University App
**Option A - From Play Store:**
1. Open Play Store in the emulator
2. Sign in with Google account
3. Search and install your university app

**Option B - If you have the APK file:**
1. Download the APK from a trusted source (like APKMirror)
2. Drag and drop the APK file onto the emulator
3. It will install automatically

### Step 5: Connect HTTP Toolkit
1. Open **HTTP Toolkit**
2. Click **"Android Device via ADB"**
3. It will detect the emulator
4. Click "Connect"

### Step 6: Capture APIs
1. Open your university app in the emulator
2. Login
3. Mark attendance
4. Check HTTP Toolkit for the API calls!

---

## Method 3: LDPlayer (Alternative to BlueStacks)

If BlueStacks is slow on your PC:

1. Download **LDPlayer**: https://www.ldplayer.net/
2. Install and set up
3. Install your university app from Play Store
4. Connect with HTTP Toolkit (same as BlueStacks method)

---

## 🎯 What to Look For in HTTP Toolkit

Once you capture the traffic, look for these patterns:

### Login Request (Example):
```
POST https://api.university.com/v1/auth/login
Content-Type: application/json

Request Body:
{
  "username": "student@university.edu.in",
  "password": "yourpassword",
  "device_id": "android_123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "12345",
    "name": "Student Name"
  }
}
```

### Attendance Request (Example):
```
POST https://api.university.com/v1/attendance/mark
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

Request Body:
{
  "qr_code": "ABC123XYZ",
  "timestamp": "2024-01-01T10:00:00Z",
  "location": {
    "lat": 12.345,
    "lng": 67.890
  }
}

Response:
{
  "success": true,
  "message": "Attendance marked successfully",
  "attendance_id": "att_789"
}
```

---

## 📋 Information to Copy

For each important request, note down:

1. **URL** (e.g., `https://api.university.com/v1/auth/login`)
2. **Method** (POST, GET, PUT, etc.)
3. **Headers** (especially `Authorization`, `Content-Type`)
4. **Request Body** (the JSON data being sent)
5. **Response Format** (what comes back from the server)

---

## ✅ After You Get the APIs

1. **Take screenshots** or copy the request details
2. **Share them with me** or update `scanner.html` yourself
3. I'll help you integrate them into your scanner

---

## 🔧 Troubleshooting

**"ADB not found"**
- HTTP Toolkit will prompt you to download ADB
- Just click "Download" and it will set it up automatically

**"Can't see HTTPS requests"**
- HTTP Toolkit should automatically install the certificate
- If not, in the emulator: Settings → Security → Install from SD card
- Choose the HTTP Toolkit certificate

**"App won't install on emulator"**
- Make sure you're using a recent Android version (Android 10+)
- Some apps require Google Play Services - use an emulator image "with Google APIs"

**"Emulator is too slow"**
- Enable Hardware Acceleration (HAXM for Intel, Hyper-V for AMD)
- Use BlueStacks or LDPlayer instead (they're optimized for gaming/apps)

---

## 💡 Pro Tip

If the app uses **certificate pinning** (blocks HTTP Toolkit):

1. Use an older version of the app (download from APKMirror)
2. Or use **Frida** to bypass certificate pinning (advanced)
3. Or decompile the APK to find hardcoded API endpoints

---

## 🆘 Need Help?

Once you have the emulator running and HTTP Toolkit connected:
1. Take a screenshot of the captured requests
2. Share it with me
3. I'll help you identify the exact endpoints and format needed!
