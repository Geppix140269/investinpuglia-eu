# InvestInPuglia Trullo Bot Setup Guide

## Bot Information
- **Username**: @InvestInPugliaTrulloBot
- **Purpose**: Real-time visitor analytics, geographic tracking, and automated reporting

## Initial Setup

### 1. Configure Environment Variables
Add these to your `.env.local` file:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
GIUSEPPE_TELEGRAM_CHAT_ID=your_personal_chat_id

# Security
CRON_API_KEY=generate_a_secure_random_string

# Application URL
NEXT_PUBLIC_BASE_URL=https://investinpuglia.eu
```

### 2. Get Your Chat ID
1. Start a conversation with @InvestInPugliaTrulloBot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find your chat ID in the response

### 3. Register Webhook
After deploying, visit this URL once to register the webhook:
```
https://investinpuglia.eu/api/telegram-webhook?action=setup
```

## Available Commands

Send these commands to @InvestInPugliaTrulloBot:

- `/report` - Get instant daily analytics report
- `/weekly` - Get weekly analytics summary
- `/visitors` - Show current active visitors
- `/geo` - Get geographic distribution report
- `/status` - Check system health status
- `/help` - Show all available commands

## Automated Reports Schedule

The bot automatically sends reports at:
- **Daily Reports**: 9:00 AM and 6:00 PM (Italy time)
- **Weekly Summary**: Every Monday at 10:00 AM

## What You'll Receive

### Real-Time Notifications
- New visitor alerts with country/city information
- High-value lead notifications
- Suspicious activity warnings
- Contact form submissions

### Daily Reports Include
- Total visitors and page views
- Top 10 countries by traffic
- Device and browser breakdown
- Top 5 most visited pages
- Traffic sources analysis
- Peak activity hours
- Engagement metrics
- AI-generated insights

### Geographic Reports Show
- Visitor distribution by country
- Top cities within each country
- Regional performance metrics
- ISP and network information

## Testing the Integration

1. **Test Visitor Tracking**:
   - Open your website in an incognito window
   - Navigate through a few pages
   - You should receive a "NEW VISITOR" notification on Telegram

2. **Test Manual Reports**:
   - Send `/report` to @InvestInPugliaTrulloBot
   - You should receive the daily report immediately

3. **Test Geographic Tracking**:
   - Use a VPN to visit from different countries
   - Send `/geo` to see the geographic distribution

## Dashboard Access

View real-time analytics at:
- **Visitor Analytics**: https://investinpuglia.eu/visitor-analytics
- **Trullo Chat Analytics**: https://investinpuglia.eu/trullo-analytics

## Troubleshooting

### Bot Not Responding
1. Verify webhook is registered: `/api/telegram-webhook?action=setup`
2. Check environment variables are set correctly
3. Ensure bot token is valid

### No Visitor Notifications
1. Check if visitor tracking is loading: Check browser console for errors
2. Verify API endpoints are accessible
3. Ensure Telegram chat ID is correct

### Reports Not Sending
1. Check cron jobs in Vercel dashboard
2. Verify CRON_API_KEY is set
3. Test manual report generation with `/report`

## Security Notes

- The bot only responds to your registered chat ID
- All visitor IPs are anonymized after processing
- Geographic data is aggregated for privacy
- Use strong CRON_API_KEY to prevent unauthorized access

## Support

For issues or questions about @InvestInPugliaTrulloBot:
- Check system status: Send `/status` to the bot
- View logs in Vercel dashboard
- Contact technical support

---

Last updated: January 2025