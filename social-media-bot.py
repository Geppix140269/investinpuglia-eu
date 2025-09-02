"""
InvestInPuglia Social Media Automation Bot
Automates posting to LinkedIn, Twitter, and Facebook
"""

import os
import json
import time
import schedule
from datetime import datetime, timedelta
import random
import requests
from typing import Dict, List, Optional

# Install required packages:
# pip install python-linkedin-v2 tweepy facebook-sdk schedule requests

class SocialMediaBot:
    def __init__(self, config_file='social_config.json'):
        """Initialize the social media bot with API credentials"""
        self.config = self.load_config(config_file)
        self.content_queue = []
        self.posted_content = []
        
    def load_config(self, config_file):
        """Load API credentials from config file"""
        if os.path.exists(config_file):
            with open(config_file, 'r') as f:
                return json.load(f)
        else:
            # Create default config template
            default_config = {
                "linkedin": {
                    "client_id": "YOUR_LINKEDIN_CLIENT_ID",
                    "client_secret": "YOUR_LINKEDIN_CLIENT_SECRET",
                    "access_token": "YOUR_LINKEDIN_ACCESS_TOKEN",
                    "organization_id": "YOUR_ORGANIZATION_ID"
                },
                "twitter": {
                    "api_key": "YOUR_TWITTER_API_KEY",
                    "api_secret": "YOUR_TWITTER_API_SECRET",
                    "access_token": "YOUR_TWITTER_ACCESS_TOKEN",
                    "access_token_secret": "YOUR_TWITTER_ACCESS_TOKEN_SECRET"
                },
                "facebook": {
                    "page_id": "YOUR_FACEBOOK_PAGE_ID",
                    "access_token": "YOUR_FACEBOOK_ACCESS_TOKEN"
                },
                "schedule": {
                    "times": ["09:00", "14:00", "18:00"],
                    "days": ["monday", "tuesday", "wednesday", "thursday", "friday"]
                }
            }
            with open(config_file, 'w') as f:
                json.dump(default_config, f, indent=4)
            print(f"Created config template at {config_file}. Please add your API credentials.")
            return default_config

    def generate_content(self):
        """Generate content variations for InvestInPuglia"""
        templates = [
            {
                "text": "🏛️ Transforming Puglia's heritage into profitable investments since 1995.\n\n€100M+ in completed projects | €25M in EU grants secured | 50+ successful developments\n\nDiscover authentic Italian real estate opportunities: investinpuglia.eu",
                "hashtags": ["RealEstate", "ItalianInvestment", "Puglia", "HospitalityInvestment"]
            },
            {
                "text": "While algorithms generate virtual content, we create enduring physical legacy.\n\nFrom abandoned masserias to luxury resorts - 30 years of excellence in Puglia development.\n\n🔗 investinpuglia.eu",
                "hashtags": ["RealEstateInvestment", "Italy", "PropertyDevelopment", "AuthenticInvestment"]
            },
            {
                "text": "Featured Project: Baglioni Hotel Masseria Muzza 🌟\n\nHistoric masseria transformed into ultra-luxury 5-star resort.\n\nThis is what €1.8M investment in authentic Italian heritage looks like.\n\nExplore opportunities: investinpuglia.eu",
                "hashtags": ["LuxuryHotels", "ItalianRealEstate", "InvestmentOpportunity", "Puglia"]
            },
            {
                "text": "In a world of digital speculation, invest in something you can actually touch.\n\n✅ Tangible assets\n✅ EU funding available\n✅ Proven ROI\n✅ 30+ years track record\n\nYour Italian investment journey starts here: investinpuglia.eu",
                "hashtags": ["Investment", "RealEstate", "Italy", "PropertyInvestment"]
            },
            {
                "text": "Puglia 2025: Where smart money meets Mediterranean opportunity.\n\n• Growing tourism sector (+15% YoY)\n• EU development grants available\n• Undervalued coastal properties\n• Expert local partnerships\n\nSchedule your consultation: investinpuglia.eu",
                "hashtags": ["InvestmentOpportunity", "Puglia", "RealEstateTrends", "ItalianProperty"]
            },
            {
                "text": "Why Puglia? 🇮🇹\n\n• 800km of pristine coastline\n• UNESCO World Heritage sites\n• 40% below Northern Italy prices\n• Direct flights from major EU cities\n• Year-round tourism potential\n\nDiscover your opportunity: investinpuglia.eu",
                "hashtags": ["PugliaInvestment", "ItalianRealEstate", "TourismInvestment", "PropertyOpportunity"]
            },
            {
                "text": "From PIA Turismo grants to Titolo II funding - we navigate Italian bureaucracy so you don't have to.\n\n€25M+ in grants secured for our clients.\n\nLet our expertise work for you: investinpuglia.eu",
                "hashtags": ["EUGrants", "InvestmentSupport", "ItalianBusiness", "RealEstateFunding"]
            },
            {
                "text": "Success Story: Masseria Montelauro 🏛️\n\nAbandoned 17th-century farm → Thriving agritourism destination\n\nROI: 180% in 3 years\nEU Grants: €500K secured\nOccupancy: 85% year-round\n\nYour success story starts here: investinpuglia.eu",
                "hashtags": ["SuccessStory", "Agritourism", "ROI", "ItalianInvestment"]
            },
            {
                "text": "The Mediterranean's best-kept investment secret.\n\nPuglia offers what Tuscany did 20 years ago - authentic Italian opportunity before the boom.\n\nDon't wait for the wave. Ride it.\n\ninvestinpuglia.eu",
                "hashtags": ["EmergingMarkets", "ItalianRealEstate", "InvestmentTiming", "Puglia"]
            },
            {
                "text": "Our team:\n👷 Licensed Engineer-Architect Cataldo Russo (30+ years)\n📊 EU Grant Specialists\n🏛️ Heritage Restoration Experts\n🤝 International Investment Advisors\n\nExpertise you can trust: investinpuglia.eu",
                "hashtags": ["ExpertTeam", "RealEstateProfessionals", "ItalianExperts", "PropertyDevelopment"]
            }
        ]
        
        return templates

    def post_to_linkedin(self, content: Dict):
        """Post content to LinkedIn using the API"""
        if self.config['linkedin']['access_token'] == "YOUR_LINKEDIN_ACCESS_TOKEN":
            print("❌ LinkedIn credentials not configured")
            return False
            
        url = "https://api.linkedin.com/v2/ugcPosts"
        
        headers = {
            'Authorization': f"Bearer {self.config['linkedin']['access_token']}",
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
        }
        
        post_data = {
            "author": f"urn:li:organization:{self.config['linkedin']['organization_id']}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": f"{content['text']}\n\n#{' #'.join(content['hashtags'])}"
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        
        try:
            response = requests.post(url, headers=headers, json=post_data)
            if response.status_code == 201:
                print(f"✅ Posted to LinkedIn: {content['text'][:50]}...")
                return True
            else:
                print(f"❌ LinkedIn error: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"❌ LinkedIn posting failed: {e}")
            return False

    def post_to_twitter(self, content: Dict):
        """Post content to Twitter/X using the API"""
        if self.config['twitter']['api_key'] == "YOUR_TWITTER_API_KEY":
            print("❌ Twitter credentials not configured")
            return False
            
        try:
            import tweepy
            
            auth = tweepy.OAuthHandler(
                self.config['twitter']['api_key'],
                self.config['twitter']['api_secret']
            )
            auth.set_access_token(
                self.config['twitter']['access_token'],
                self.config['twitter']['access_token_secret']
            )
            
            api = tweepy.API(auth)
            
            # Twitter has character limit, so we might need to shorten
            tweet_text = content['text']
            hashtags = ' '.join([f"#{tag}" for tag in content['hashtags'][:3]])  # Limit hashtags
            
            full_tweet = f"{tweet_text}\n\n{hashtags}"
            if len(full_tweet) > 280:
                # Truncate text to fit
                max_text_length = 280 - len(hashtags) - 10  # Leave room for "..." and hashtags
                tweet_text = tweet_text[:max_text_length] + "..."
                full_tweet = f"{tweet_text}\n\n{hashtags}"
            
            api.update_status(full_tweet)
            print(f"✅ Posted to Twitter: {tweet_text[:50]}...")
            return True
            
        except ImportError:
            print("❌ Please install tweepy: pip install tweepy")
            return False
        except Exception as e:
            print(f"❌ Twitter posting failed: {e}")
            return False

    def post_to_facebook(self, content: Dict):
        """Post content to Facebook using the Graph API"""
        if self.config['facebook']['access_token'] == "YOUR_FACEBOOK_ACCESS_TOKEN":
            print("❌ Facebook credentials not configured")
            return False
            
        url = f"https://graph.facebook.com/{self.config['facebook']['page_id']}/feed"
        
        params = {
            'message': f"{content['text']}\n\n#{' #'.join(content['hashtags'])}",
            'access_token': self.config['facebook']['access_token']
        }
        
        try:
            response = requests.post(url, data=params)
            if response.status_code == 200:
                print(f"✅ Posted to Facebook: {content['text'][:50]}...")
                return True
            else:
                print(f"❌ Facebook error: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"❌ Facebook posting failed: {e}")
            return False

    def post_to_all_platforms(self, content: Dict):
        """Post content to all configured platforms"""
        print(f"\n📱 Posting to all platforms at {datetime.now().strftime('%Y-%m-%d %H:%M')}...")
        
        results = {
            'linkedin': self.post_to_linkedin(content),
            'twitter': self.post_to_twitter(content),
            'facebook': self.post_to_facebook(content)
        }
        
        # Log the posted content
        self.posted_content.append({
            'timestamp': datetime.now().isoformat(),
            'content': content,
            'results': results
        })
        
        # Save log
        with open('posted_content_log.json', 'w') as f:
            json.dump(self.posted_content, f, indent=4)
        
        return results

    def schedule_posts(self):
        """Schedule posts according to configured times"""
        print("📅 Setting up posting schedule...")
        
        # Load content templates
        templates = self.generate_content()
        
        # Schedule posts for configured times
        for time_str in self.config['schedule']['times']:
            schedule.every().day.at(time_str).do(
                lambda: self.post_to_all_platforms(random.choice(templates))
            )
        
        print(f"✅ Scheduled posts for: {', '.join(self.config['schedule']['times'])}")
        
    def run_bot(self):
        """Run the bot continuously"""
        print("""
╔══════════════════════════════════════════════════════╗
║     InvestInPuglia Social Media Automation Bot      ║
║           Real Estate. Real Results. 🏛️            ║
╚══════════════════════════════════════════════════════╝
        """)
        
        # Check if credentials are configured
        if (self.config['linkedin']['access_token'] == "YOUR_LINKEDIN_ACCESS_TOKEN" and
            self.config['twitter']['api_key'] == "YOUR_TWITTER_API_KEY" and
            self.config['facebook']['access_token'] == "YOUR_FACEBOOK_ACCESS_TOKEN"):
            print("⚠️  Please configure your API credentials in social_config.json")
            print("\nTo get API credentials:")
            print("• LinkedIn: https://www.linkedin.com/developers/")
            print("• Twitter: https://developer.twitter.com/")
            print("• Facebook: https://developers.facebook.com/")
            return
        
        # Schedule posts
        self.schedule_posts()
        
        # Post immediately for testing
        templates = self.generate_content()
        self.post_to_all_platforms(templates[0])
        
        print("\n🤖 Bot is running. Press Ctrl+C to stop.")
        print("📊 Check posted_content_log.json for posting history.\n")
        
        # Run scheduled posts
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

    def post_single(self, custom_text: Optional[str] = None):
        """Post a single update immediately"""
        if custom_text:
            content = {
                "text": custom_text,
                "hashtags": ["RealEstate", "Puglia", "Investment", "Italy"]
            }
        else:
            templates = self.generate_content()
            content = random.choice(templates)
        
        return self.post_to_all_platforms(content)


if __name__ == "__main__":
    # Initialize and run the bot
    bot = SocialMediaBot()
    
    # Choose mode
    print("Select mode:")
    print("1. Run continuous bot (scheduled posting)")
    print("2. Post single update now")
    print("3. Configure API credentials")
    
    choice = input("\nEnter choice (1-3): ").strip()
    
    if choice == "1":
        bot.run_bot()
    elif choice == "2":
        custom = input("Enter custom text (or press Enter for auto-generated): ").strip()
        bot.post_single(custom if custom else None)
    elif choice == "3":
        print("\nEdit social_config.json to add your API credentials.")
        print("Configuration file location: social_config.json")
    else:
        print("Invalid choice. Please run the script again.")