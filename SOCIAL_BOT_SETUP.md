# InvestInPuglia Social Media Bot Setup Guide

## Quick Start

1. **Install Python dependencies:**
```bash
pip install requests schedule tweepy
```

2. **Run the bot:**
```bash
python social-media-bot.py
```

3. **Choose option 3 to configure, then add your API credentials to `social_config.json`**

## Getting API Credentials

### LinkedIn
1. Go to https://www.linkedin.com/developers/
2. Create an app for your company
3. Get your Client ID and Client Secret
4. Generate an Access Token
5. Find your Organization ID in your company page URL

### Twitter/X
1. Go to https://developer.twitter.com/
2. Apply for developer access
3. Create a project and app
4. Get your API Key, API Secret, Access Token, and Access Token Secret

### Facebook
1. Go to https://developers.facebook.com/
2. Create an app
3. Add Facebook Login and Pages API
4. Get a Page Access Token for your business page
5. Find your Page ID in your page settings

## Features

✅ **Automated Posting** - Posts at scheduled times (9 AM, 2 PM, 6 PM)
✅ **Multi-Platform** - LinkedIn, Twitter, and Facebook simultaneously  
✅ **Content Rotation** - 10+ pre-written templates about Puglia investments
✅ **Hashtag Management** - Automatic relevant hashtags
✅ **Posting Log** - Tracks all posted content in JSON file
✅ **Manual Override** - Post custom content immediately

## Usage Modes

### 1. Continuous Bot (Scheduled)
Runs 24/7 and posts at configured times automatically.

### 2. Single Post
Post once immediately with custom or auto-generated content.

### 3. Configure
Set up your API credentials.

## Content Templates

The bot includes 10+ professional templates focusing on:
- 30 years of excellence in Puglia development
- €100M+ completed projects
- Baglioni Hotel Masseria Muzza showcase
- EU grant expertise
- Authentic vs. artificial investment messaging

## Customization

Edit the `generate_content()` function in the script to add your own content templates.

## Support

For InvestInPuglia.eu social media strategy questions, contact your marketing team.