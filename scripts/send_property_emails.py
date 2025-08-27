"""
SEND PROPERTY-SPECIFIC EMAILS - GIUSEPPE FUNARO
Ready to send targeted emails about specific properties
Focus on Mini PIA showcase potential
"""

import requests
import json
import time
from datetime import datetime
from property_specific_outreach import generate_all_property_emails, SENDER

# Giuseppe's Resend API Key
RESEND_API_KEY = "re_WoQwLg5D_Lsgj238sCTppCyVVKoTxTc4R"

def send_via_resend(to_email, subject, body):
    """Send property-specific email using Resend API"""
    
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "from": f"{SENDER['name']} <{SENDER['email']}>",  # Using verified investinpuglia.eu domain
        "to": [to_email],
        "subject": subject,
        "text": body,
        "reply_to": SENDER['email'],
        "html": f"""
        <div style='font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;'>
            <div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;'>
                <h2 style='color: #2c3e50; margin: 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>
                    {subject}
                </h2>
            </div>
            <div style='line-height: 1.6; color: #333;'>
                {body.replace(chr(10), '<br>').replace('INTERESSE SPECIFICO', '<strong>INTERESSE SPECIFICO</strong>').replace('COSA PROPONIAMO:', '<strong>COSA PROPONIAMO:</strong>').replace('VALORE AGGIUNTO', '<strong>VALORE AGGIUNTO</strong>').replace('INVESTITORI TARGET:', '<strong>INVESTITORI TARGET:</strong>').replace('PROSSIMI PASSI:', '<strong>PROSSIMI PASSI:</strong>').replace('SPECIFIC INTEREST', '<strong>SPECIFIC INTEREST</strong>').replace('WHAT WE PROPOSE:', '<strong>WHAT WE PROPOSE:</strong>').replace('ADDED VALUE', '<strong>ADDED VALUE</strong>').replace('TARGET INVESTORS:', '<strong>TARGET INVESTORS:</strong>').replace('NEXT STEPS:', '<strong>NEXT STEPS:</strong>')}
            </div>
            <div style='margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;'>
                <p>InvestInPuglia.eu - Connecting International Investors with Mini PIA Properties</p>
            </div>
        </div>
        """
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        return response.status_code == 200, response.json() if response.status_code == 200 else response.text
    except Exception as e:
        return False, str(e)

def send_property_campaign(method="print"):
    """
    Send property-specific email campaign
    method: "print" (preview), "resend", or "test"
    """
    
    print("="*80)
    print("PROPERTY-SPECIFIC EMAIL CAMPAIGN - GIUSEPPE FUNARO")
    print("="*80)
    print(f"Method: {method.upper()}")
    print("Focus: Mini PIA showcase for specific properties")
    print("="*80)
    
    if method == "print":
        print("\nPREVIEW MODE - No emails will be sent\n")
    elif method == "test":
        print("\nTEST MODE - Will send to ceo@apulink.com only\n")
    
    emails = generate_all_property_emails()
    results = {"sent": [], "failed": []}
    
    for i, email in enumerate(emails, 1):
        print(f"\n[{i}/{len(emails)}] {email['agency']}")
        print(f"  Property: {email['property']['type']} - {email['property']['location']}")
        print(f"  Mini PIA: {email['property']['mini_pia_potential']}")
        print(f"  Email: {email['email']}")
        print(f"  Language: {email['language'].upper()}")
        
        if method == "print":
            print(f"  Subject: {email['subject']}")
            print("  Status: READY TO SEND")
            
        elif method == "test":
            # Send to CEO address for testing
            success, result = send_via_resend("ceo@apulink.com", 
                                            f"TEST for {email['agency']}: {email['subject']}", 
                                            email['body'])
            if success:
                print("  Status: TEST SENT to ceo@apulink.com")
                results["sent"].append(f"{email['agency']} (TEST)")
            else:
                print(f"  Status: FAILED - {result}")
                results["failed"].append(email['agency'])
            time.sleep(2)
            
        elif method == "resend":
            success, result = send_via_resend(email['email'], email['subject'], email['body'])
            if success:
                print(f"  Status: SENT via Resend (ID: {result.get('id', 'N/A')})")
                results["sent"].append(email['agency'])
            else:
                print(f"  Status: FAILED - {result}")
                results["failed"].append(email['agency'])
            time.sleep(3)  # Delay between emails
    
    # Summary
    print("\n" + "="*80)
    print("PROPERTY CAMPAIGN COMPLETE")
    print("="*80)
    
    if method != "print":
        print(f"Sent: {len(results['sent'])}")
        print(f"Failed: {len(results['failed'])}")
        
        if results['sent']:
            print("\nSUCCESSFULLY SENT TO:")
            for agency in results['sent']:
                print(f"  - {agency}")
        
        if results['failed']:
            print("\nFAILED TO SEND TO:")
            for agency in results['failed']:
                print(f"  - {agency}")
        
        # Save report
        report = {
            "date": datetime.now().isoformat(),
            "method": method,
            "campaign_type": "property_specific",
            "sender": SENDER,
            "results": results
        }
        
        filename = f"property_campaign_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
        with open(f"C:/Users/gfuna/{filename}", 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"\nReport saved: {filename}")
    else:
        print("\nTo send property-specific emails:")
        print("  python send_property_emails.py --test    # Send test to ceo@apulink.com")
        print("  python send_property_emails.py --resend  # Send to all agencies")
    
    print("="*80)

def main():
    import sys
    
    if "--test" in sys.argv:
        print("\nTEST MODE - Sending to ceo@apulink.com")
        print("These emails target specific properties with Mini PIA potential")
        print("Press Enter to continue or Ctrl+C to cancel...")
        input()
        send_property_campaign("test")
        
    elif "--resend" in sys.argv:
        print("\nLIVE MODE - Sending to all 6 agencies")
        print("WARNING: This will send property-specific emails to real agencies")
        print("Make sure you have verified your domain at resend.com/domains")
        print("\nPress Enter to continue or Ctrl+C to cancel...")
        input()
        send_property_campaign("resend")
        
    else:
        send_property_campaign("print")

if __name__ == "__main__":
    main()