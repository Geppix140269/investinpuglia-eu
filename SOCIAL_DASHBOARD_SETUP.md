# Social Dashboard Setup Guide - InvestInPuglia

## Step 1: Initial Login

1. Go to **investinpuglia.eu/login**
2. Use your email: **g.funaro@[your-domain]**
3. Password: Use your existing InvestInPuglia admin password
   - If you don't have one, click "Forgot Password" to set it up
   - You'll receive a password reset link via email

## Step 2: Access Social Dashboard

Once logged in:
1. Navigate to **investinpuglia.eu/social-dashboard**
2. Or click "Social Media Center" from the admin panel

## Step 3: Connect Your Social Media Accounts

### LinkedIn
1. Go to Settings tab in the dashboard
2. Click "Connect" next to LinkedIn
3. Visit https://www.linkedin.com/developers/
4. Create an app for InvestInPuglia
5. Copy your credentials to the dashboard

### Facebook & Instagram
1. Visit https://developers.facebook.com/
2. Create a Business app
3. Add Facebook Login and Instagram Basic Display
4. Get your Page Access Token
5. Enter credentials in the dashboard

### Twitter/X
1. Apply for developer access at https://developer.twitter.com/
2. Create a project called "InvestInPuglia Social"
3. Generate API keys and tokens
4. Add them to the dashboard

### Other Platforms
Each platform has a "Connect" button that will guide you through the setup process.

## Step 4: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Your admin email
ADMIN_EMAIL=g.funaro@[your-domain]

# Firebase (already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=your_existing_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_existing_domain
# ... other Firebase config

# Social Media APIs (add as you connect platforms)
LINKEDIN_ACCESS_TOKEN=
FACEBOOK_ACCESS_TOKEN=
INSTAGRAM_ACCESS_TOKEN=
TWITTER_BEARER_TOKEN=
# ... etc
```

## Step 5: First Time Setup

1. **Set Posting Schedule**
   - Go to Settings tab
   - Select active days (Mon-Fri recommended)
   - Choose posting times (9:00, 14:00, 18:00 CET)

2. **Configure Content Categories**
   - Review the 10 pre-configured categories
   - Customize templates with your specific data

3. **Test Post**
   - Go to Compose tab
   - Select "Investment Opportunities" category
   - Click "Generate Content"
   - Review and edit the generated post
   - Select LinkedIn only for testing
   - Click "Publish Now"

## Step 6: Team Access (Optional)

To give team members access:

1. Have them create accounts at investinpuglia.eu/register
2. In your admin panel, go to User Management
3. Add their emails to the "Social Media Managers" role
4. They can now access the social dashboard

## Security Notes

- Dashboard is only accessible to authenticated users
- Your email domain (g.funaro@...) is required for admin access
- All API keys are stored securely in environment variables
- Posts are logged in Firebase for audit trail

## Troubleshooting

**Can't login?**
- Ensure you're using g.funaro@[your-domain]
- Check if you're registered in Firebase Authentication
- Try password reset

**Platform won't connect?**
- Verify API credentials are correct
- Check if you have the right permissions/scopes
- Some platforms require app review/approval

**Posts not publishing?**
- Check platform connection status in Settings
- Verify API rate limits haven't been exceeded
- Review error logs in the dashboard

## Support

For technical support, contact your development team or check the error logs in Firebase Console.

---

## Quick Start Checklist

- [ ] Login with g.funaro@ email
- [ ] Access /social-dashboard
- [ ] Connect at least one platform (start with LinkedIn)
- [ ] Test generate content feature
- [ ] Make a test post
- [ ] Schedule your first week of content
- [ ] Set up team access if needed