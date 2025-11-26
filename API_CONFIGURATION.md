# API Configuration Guide

## Important: Update the API Endpoints

The scanner is now configured to call **REAL** university APIs, but you need to update the endpoints with the correct ones.

### Current Placeholder URLs (CHANGE THESE):

1. **Login API**: `https://portal.mahindrauniversity.edu.in/api/login`
2. **Attendance API**: `https://portal.mahindrauniversity.edu.in/api/mark-attendance`

### Steps to Configure:

1. **Find the Real API Documentation**:
   - Contact your university IT department
   - Or inspect the network requests when manually marking attendance on the portal

2. **Update scanner.html** (lines 922-956):
   - Replace the API URLs with the actual endpoints
   - Adjust the request body fields based on what the API expects
   - Update the authentication header format if needed

3. **Common API Patterns**:
   
   **Login Response Examples:**
   ```json
   // Pattern 1: Token in "token" field
   { "token": "abc123..." }
   
   // Pattern 2: Token in "access_token" field
   { "access_token": "abc123..." }
   
   // Pattern 3: Session-based (no token)
   { "session_id": "xyz789..." }
   ```

   **Attendance Request Examples:**
   ```json
   // Pattern 1: Just QR code
   { "qr_code": "..." }
   
   // Pattern 2: QR + timestamp
   { "qr_code": "...", "timestamp": "2024-01-01T10:00:00Z" }
   
   // Pattern 3: QR + class info
   { "qr_code": "...", "class_id": "CS101", "session": "morning" }
   ```

### Testing:

1. Add a single test account
2. Scan a QR code
3. Check the browser console (F12) for any errors
4. Check the `attendance_logs` table in Supabase to see the results

### Troubleshooting:

- **CORS Errors**: The university API might block requests from your domain. You may need to create a backend proxy.
- **Authentication**: Some portals use cookies instead of tokens. You might need to adjust the approach.
- **Rate Limiting**: Be careful not to spam the API with too many requests at once.

### Need Help?

If you can provide:
1. The university portal URL
2. Screenshots of the network tab when marking attendance manually
3. Any API documentation

I can help you configure the exact API calls needed.
