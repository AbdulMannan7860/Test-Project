# Finding API Endpoints from Mobile Apps

Since your university uses a mobile app instead of a website, you need to intercept the API calls the app makes.

## Method 1: Using HTTP Toolkit (Easiest)

1. **Download HTTP Toolkit**: https://httptoolkit.com/
2. **Install on your computer**
3. **Connect your phone**:
   - Open HTTP Toolkit
   - Click "Android Device" or "iOS Device"
   - Follow the instructions to set up the proxy
4. **Open the university app** on your phone
5. **Mark attendance manually** in the app
6. **Check HTTP Toolkit** - it will show you:
   - The exact API URL being called
   - The request headers
   - The request body (username, password, QR code, etc.)
   - The response format

## Method 2: Using Charles Proxy

1. **Download Charles**: https://www.charlesproxy.com/
2. **Set up proxy** on your phone (similar to HTTP Toolkit)
3. **Capture the traffic** while using the app
4. **Find the attendance marking requests**

## Method 3: Android Only - Using ADB Logcat

If you have an Android phone:
```bash
adb logcat | grep -i "http"
```
This might show API calls in the logs.

## Method 4: Decompile the App (Advanced)

For Android (.apk):
1. Use **JADX** or **APKTool** to decompile the app
2. Search for API endpoints in the code
3. Look for strings like "https://", "api/", "login", "attendance"

For iOS (.ipa):
- More difficult, requires jailbreak or special tools

## What to Look For:

Once you capture the traffic, find these requests:

### 1. Login Request
```
POST https://some-university-api.com/api/v1/auth/login
Body: {
  "username": "student@university.edu.in",
  "password": "yourpassword"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Attendance Request
```
POST https://some-university-api.com/api/v1/attendance/mark
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Body: {
  "qr_code": "ABC123XYZ",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

## After You Find the APIs:

1. **Copy the exact URLs**
2. **Note the request format** (headers, body fields)
3. **Update scanner.html** with the real endpoints
4. **Test with one account first**

## Alternative Solution:

If you can't intercept the API, you could:
1. **Use Android Automation** (like Appium or ADB commands) to control the app
2. **Create a backend service** that automates the app interactions
3. But this is much more complex than using the API directly

## Need Help?

If you can:
1. Install HTTP Toolkit
2. Capture the API calls
3. Send me screenshots of the requests

I can help you configure the exact API calls needed for your scanner!
