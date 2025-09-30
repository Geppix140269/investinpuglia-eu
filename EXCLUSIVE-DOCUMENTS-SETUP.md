# Exclusive Documents System - Setup & Usage Guide

## 🚀 System Overview

The Exclusive Documents system allows you to share confidential PDFs, Gamma presentations, and other content with OTP (SMS) verification. Users must provide their name, email, and phone number before accessing protected content.

---

## 📋 ADMIN SETUP INSTRUCTIONS

### 1. Environment Variables Required

Add these to your `.env.local` file:

```env
# Resend API Key (for sending confirmation emails)
RESEND_API_KEY=re_your_resend_api_key_here

# Twilio (or your SMS provider) for OTP
# Already configured for Palazzo Robertini OTP system
```

### 2. Access Admin Panel

Navigate to: **`https://investinpuglia.eu/admin/documents`**

### 3. Add a New Document/Presentation

#### For PDF Documents:
1. Select **Content Type**: "PDF Document"
2. Enter **Document Title** (e.g., "Investment Agreement Template")
3. Enter **Description** (optional)
4. Either:
   - **Upload PDF** directly (will upload to Cloudinary), OR
   - **Enter Cloudinary URL** manually
5. Check "Enable access" to make it live
6. Click **"Add Document"**

#### For Gamma Presentations:
1. Select **Content Type**: "Gamma Presentation"
2. Enter **Presentation Title** (e.g., "Palazzo Robertini Pitch Deck")
3. Enter **Description** (optional)
4. **Paste Gamma Share URL** (e.g., `https://gamma.app/docs/your-presentation-id`)
   - ⚠️ Make sure your Gamma presentation allows embedding!
5. Check "Enable access" to make it live
6. Click **"Add Document"**

#### For Other Iframe Content:
1. Select **Content Type**: "Generic Iframe Content"
2. Enter title, description, and URL
3. Enable and add

### 4. Manage Documents

From the admin panel you can:
- **Copy Access Link** - Share with authorized users
- **Preview** - Test the document access flow
- **Enable/Disable** - Turn access on/off without deleting
- **Delete** - Permanently remove document

### 5. Example Access Link

After adding a document with ID `palazzo-robertini-presentation`:
```
https://investinpuglia.eu/exclusive/documents/palazzo-robertini-presentation
```

---

## 👥 USER ACCESS INSTRUCTIONS

### For Users Accessing Protected Content:

#### Step 1: Receive Access Link
You'll receive a secure link from InvestInPuglia team, like:
```
https://investinpuglia.eu/exclusive/documents/[document-id]
```

#### Step 2: Enter Your Information
1. **Full Name** - Your complete name
2. **Email Address** - Where you'll receive confirmation
3. Click **"Continue to Verification"**

#### Step 3: Phone Verification
1. Enter your **phone number with country code**
   - Example: `+39 333 123 4567` (Italy)
   - Example: `+44 7700 900000` (UK)
2. Click **"Send Access Code"**

#### Step 4: Sign Confidentiality Agreement (First Time Only)
- Read the confidentiality terms
- Check the "I agree" box
- Click to proceed

#### Step 5: Enter OTP Code
1. Check your phone for SMS with 6-digit code
2. Enter the code
3. Click **"Verify Access Code"**
4. Code expires in 5 minutes

#### Step 6: Access Granted!
- You'll automatically receive a **confirmation email** with:
  - Document access confirmation
  - Confidentiality agreement terms
  - Timestamp of access
- The document/presentation will load
- You can view but **cannot download, copy, or print**

---

## 📧 Email Confirmations

### User Receives:
- **Subject**: "Confidential Document Access Confirmed - [Document Title]"
- **Contains**:
  - Access confirmation
  - Legal confidentiality agreement acknowledgment
  - Warning about unauthorized disclosure
  - Document details and timestamp

### Admin Receives:
- **To**: g.funaro@investinpuglia.eu
- **Subject**: "🔒 Document Access: [Document Title]"
- **Contains**:
  - User's full name, email, phone
  - Document title and ID
  - Access timestamp

---

## 🔒 Security Features

### For All Content Types:
✅ OTP/SMS verification required
✅ Name and email capture
✅ Legal confidentiality agreement
✅ Right-click disabled
✅ Text selection disabled
✅ Keyboard shortcuts blocked (Ctrl+C, Ctrl+P, etc.)
✅ Print dialog blocked
✅ Developer tools shortcuts disabled
✅ Watermark overlay: "CONFIDENTIAL • VIEW ONLY"
✅ 24-hour session (must re-verify after)
✅ Email confirmation sent automatically

---

## 🎨 Content Types Supported

### 1. PDF Documents (📄)
- Traditional PDF files
- Hosted on Cloudinary
- No toolbar, no download button
- Example: Investment agreements, reports

### 2. Gamma Presentations (📊)
- Interactive Gamma.app presentations
- Full slide navigation
- Animations and interactivity preserved
- Example: Pitch decks, property showcases

### 3. Generic Iframe (🌐)
- Any embeddable web content
- Custom URLs
- Example: Google Docs (view-only), embedded videos

---

## 📝 Important Notes

### For Gamma Presentations:
1. **Your Gamma presentation MUST allow embedding**
   - In Gamma: Settings → Sharing → Enable "Allow embedding"
2. **Use the share URL** from Gamma, not the edit URL
3. Test the embed before sharing with users

### For Cloudinary PDFs:
1. Upload via admin panel (automatic), OR
2. Upload manually to Cloudinary and paste URL
3. Use `raw/upload` folder for PDFs

### Session Management:
- Access granted for **24 hours**
- After 24h, user must re-verify
- Session stored in browser (cleared if browser cache cleared)

### Mobile Access:
- Fully responsive
- Works on all devices
- SMS verification works globally (with country codes)

---

## 🆘 Troubleshooting

### "Document Not Found"
- Check if document is enabled in admin panel
- Verify the document ID in the URL matches admin panel

### "Gamma Presentation Not Loading"
- Ensure presentation allows embedding in Gamma settings
- Test the Gamma URL in a regular browser first
- Check if URL is the share URL, not edit URL

### "OTP Not Received"
- Check phone number includes country code (e.g., +39)
- Wait 60 seconds before requesting resend
- Check SMS spam/blocked messages

### "Email Not Received"
- Check spam folder
- Verify RESEND_API_KEY is set correctly
- Check admin email is g.funaro@investinpuglia.eu

---

## 🔗 Quick Links

### Admin
- **Document Management**: `/admin/documents`
- **Preview Access Flow**: Click "Preview" icon on any document

### User Access Pattern
- **URL Format**: `/exclusive/documents/[document-id]`
- **Example**: `/exclusive/documents/palazzo-robertini-presentation`

---

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Verify environment variables are set
3. Test OTP system with Palazzo Robertini first
4. Contact developer if issues persist

---

## ⚖️ Legal Compliance

### Confidentiality Agreement:
Users automatically agree to:
- Not copy, reproduce, or distribute content
- Not share access credentials
- Use information for evaluation only
- Understand legal consequences of unauthorized disclosure

### Record Keeping:
- All access logged with timestamp
- User details captured (name, email, phone)
- Confirmation emails serve as legal record
- Admin notified of every access

---

**System Version**: 2.0
**Last Updated**: January 2025
**Maintained By**: InvestInPuglia Development Team