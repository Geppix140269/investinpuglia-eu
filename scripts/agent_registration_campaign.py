"""
EMAIL CAMPAIGN FOR AGENT REGISTRATION
Invite Puglia real estate agents to register on InvestInPuglia.eu
and upload their Mini PIA eligible properties
"""

import json
import requests
import time
from datetime import datetime

# Giuseppe's information
SENDER = {
    "name": "Giuseppe Funaro",
    "email": "g.funaro@investinpuglia.eu",
    "phone": "+39 351 400 1402"
}

# Correct Resend API Key
RESEND_API_KEY = "re_WoQwLg5D_Lsgj238sCTppCyVVKoTxTc4R"

def get_registration_email_italian(agency_name, contact_person="Team"):
    """Generate Italian registration invitation email"""
    
    subject = "Invito Esclusivo - Registrazione Piattaforma InvestInPuglia.eu"
    
    body = f"""Gentile {contact_person} di {agency_name},

Mi chiamo Giuseppe Funaro, fondatore di InvestInPuglia.eu, e Vi contatto per presentarVi un'opportunità esclusiva di partnership digitale.

LANCIO DELLA PIATTAFORMA INVESTINPUGLIA.EU
Stiamo lanciando la prima piattaforma specializzata che connette investitori internazionali con proprietà Mini PIA in Puglia. La Vostra agenzia è stata selezionata per far parte di questo progetto pionieristico.

COSA OFFRE LA PIATTAFORMA:
• Dashboard dedicata per caricare le Vostre proprietà Mini PIA
• Visibilità internazionale verso investitori qualificati (USA, UK, Germania, Svizzera)
• Analisi automatica del potenziale Mini PIA per ogni proprietà
• Traduzione professionale in 4 lingue
• Marketing digitale mirato verso clientela estera
• Sistema di gestione inquiries internazionali

REGISTRAZIONE GRATUITA:
✓ Accesso immediato alla piattaforma
✓ Upload illimitato di proprietà Mini PIA eligible
✓ Strumenti professionali di presentazione
✓ Supporto tecnico dedicato
✓ NESSUN costo di registrazione o abbonamento

PROCESSO SEMPLICE:
1. Registrazione su www.investinpuglia.eu/register
2. Verifica account tramite email
3. Accesso alla dashboard personalizzata
4. Upload proprietà con foto, video e descrizioni
5. Pubblicazione automatica per investitori internazionali

FOCUS MINI PIA:
La piattaforma è specificamente progettata per proprietà idonee al programma Mini PIA:
- Masserie storiche (€300k-€5M)
- Trulli per turismo (5+ camere)
- Palazzi nei centri storici
- Proprietà con potenziale ricettivo/turistico

VANTAGGI IMMEDIATI:
• Accesso diretto a investitori internazionali pre-qualificati
• Presentazione professionale delle proprietà
• Calcolo automatico ROI e potenziale Mini PIA
• Marketing multilingue automatizzato
• Reportistica dettagliata sulle visualizzazioni

REGISTRAZIONE PRIORITARIA:
Come agenzia selezionata, avete accesso prioritario alla registrazione.
Link esclusivo: www.investinpuglia.eu/register?agency={agency_name.replace(' ', '_').lower()}

DEMO PERSONALIZZATA:
Possiamo organizzare una demo personalizzata della piattaforma per mostrarVi tutte le funzionalità e rispondere alle Vostre domande.

La registrazione è completamente gratuita e senza impegno. Vi invitiamo a esplorare questa opportunità per espandere il Vostro mercato verso la clientela internazionale interessata agli investimenti Mini PIA in Puglia.

Per registrarvi o richiedere informazioni aggiuntive, non esitate a contattarmi.

Cordiali saluti,

Giuseppe Funaro
Founder & Managing Director
InvestInPuglia.eu
{SENDER['email']}
{SENDER['phone']}
www.investinpuglia.eu

P.S. La piattaforma sarà operativa entro 30 giorni. Registrandovi ora, sarete tra i primi ad accedere agli investitori internazionali."""

    return subject, body

def get_registration_email_english(agency_name, contact_person="Team"):
    """Generate English registration invitation email"""
    
    subject = "Exclusive Invitation - InvestInPuglia.eu Platform Registration"
    
    body = f"""Dear {contact_person} at {agency_name},

I'm Giuseppe Funaro, founder of InvestInPuglia.eu, and I'm reaching out to present you with an exclusive digital partnership opportunity.

INVESTINPUGLIA.EU PLATFORM LAUNCH
We're launching the first specialized platform connecting international investors with Mini PIA properties in Puglia. Your agency has been selected to be part of this pioneering project.

WHAT THE PLATFORM OFFERS:
• Dedicated dashboard to upload your Mini PIA properties
• International visibility to qualified investors (USA, UK, Germany, Switzerland)
• Automatic Mini PIA potential analysis for each property
• Professional translation in 4 languages
• Targeted digital marketing to foreign clientele
• International inquiry management system

FREE REGISTRATION:
✓ Immediate platform access
✓ Unlimited Mini PIA eligible property uploads
✓ Professional presentation tools
✓ Dedicated technical support
✓ NO registration or subscription fees

SIMPLE PROCESS:
1. Register at www.investinpuglia.eu/register
2. Email account verification
3. Access to personalized dashboard
4. Upload properties with photos, videos and descriptions
5. Automatic publication to international investors

MINI PIA FOCUS:
The platform is specifically designed for Mini PIA eligible properties:
- Historic masserias (€300k-€5M)
- Trulli for tourism (5+ rooms)
- Palazzi in historic centers
- Properties with hospitality/tourism potential

IMMEDIATE BENEFITS:
• Direct access to pre-qualified international investors
• Professional property presentation
• Automatic ROI and Mini PIA potential calculation
• Automated multilingual marketing
• Detailed viewing analytics

PRIORITY REGISTRATION:
As a selected agency, you have priority access to registration.
Exclusive link: www.investinpuglia.eu/register?agency={agency_name.replace(' ', '_').lower()}

PERSONALIZED DEMO:
We can arrange a personalized platform demo to show you all features and answer your questions.

Registration is completely free with no commitment. We invite you to explore this opportunity to expand your market to international clientele interested in Mini PIA investments in Puglia.

For registration or additional information, please don't hesitate to contact me.

Best regards,

Giuseppe Funaro
Founder & Managing Director
InvestInPuglia.eu
{SENDER['email']}
{SENDER['phone']}
www.investinpuglia.eu

P.S. The platform will be operational within 30 days. By registering now, you'll be among the first to access international investors."""

    return subject, body

def send_registration_email(agent_data):
    """Send registration email to an agent"""
    
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Determine language and get email content
    if agent_data.get("languages") and "English" in agent_data["languages"]:
        # Send English if they speak English
        subject, body = get_registration_email_english(
            agent_data["name"], 
            agent_data.get("contact_person", "Team")
        )
    else:
        # Default to Italian
        subject, body = get_registration_email_italian(
            agent_data["name"], 
            agent_data.get("contact_person", "Team")
        )
    
    payload = {
        "from": f"{SENDER['name']} <{SENDER['email']}>",
        "to": [agent_data["email"]],
        "subject": subject,
        "text": body,
        "reply_to": SENDER['email'],
        "html": f"""
        <div style='font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;'>
            <div style='background: linear-gradient(135deg, #3498db, #2ecc71); padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;'>
                <h1 style='color: white; margin: 0; font-size: 28px;'>InvestInPuglia.eu</h1>
                <p style='color: white; margin: 10px 0 0 0; font-size: 16px;'>Platform Launch - Exclusive Invitation</p>
            </div>
            
            <div style='background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);'>
                <h2 style='color: #2c3e50; margin-top: 0;'>{subject}</h2>
                <div style='line-height: 1.8; color: #333;'>
                    {body.replace(chr(10), '<br>').replace('LANCIO DELLA PIATTAFORMA', '<strong>LANCIO DELLA PIATTAFORMA</strong>').replace('COSA OFFRE LA PIATTAFORMA:', '<strong>COSA OFFRE LA PIATTAFORMA:</strong>').replace('REGISTRAZIONE GRATUITA:', '<strong>REGISTRAZIONE GRATUITA:</strong>').replace('PROCESSO SEMPLICE:', '<strong>PROCESSO SEMPLICE:</strong>').replace('FOCUS MINI PIA:', '<strong>FOCUS MINI PIA:</strong>').replace('VANTAGGI IMMEDIATI:', '<strong>VANTAGGI IMMEDIATI:</strong>').replace('PLATFORM LAUNCH', '<strong>PLATFORM LAUNCH</strong>').replace('WHAT THE PLATFORM OFFERS:', '<strong>WHAT THE PLATFORM OFFERS:</strong>').replace('FREE REGISTRATION:', '<strong>FREE REGISTRATION:</strong>').replace('SIMPLE PROCESS:', '<strong>SIMPLE PROCESS:</strong>').replace('MINI PIA FOCUS:', '<strong>MINI PIA FOCUS:</strong>').replace('IMMEDIATE BENEFITS:', '<strong>IMMEDIATE BENEFITS:</strong>')}
                </div>
            </div>
            
            <div style='text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;'>
                <a href='https://investinpuglia.eu/register?agency={agent_data["name"].replace(" ", "_").lower()}' 
                   style='display: inline-block; background: #3498db; color: white; padding: 15px 30px; 
                          text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;'>
                    REGISTER NOW - FREE
                </a>
            </div>
        </div>
        """
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        return response.status_code == 200, response.json() if response.status_code == 200 else response.text
    except Exception as e:
        return False, str(e)

def send_registration_campaign():
    """Send registration campaign to all Puglia agents"""
    
    print("="*70)
    print("AGENT REGISTRATION CAMPAIGN - INVESTINPUGLIA.EU")
    print("="*70)
    print("Inviting Puglia real estate agents to register on the platform")
    print("="*70)
    
    # Load agents database
    try:
        with open('C:/Users/gfuna/puglia_agents_database.json', 'r', encoding='utf-8') as f:
            database = json.load(f)
    except FileNotFoundError:
        print("ERROR: Run puglia_agents_database.py first")
        return
    
    results = {"sent": [], "failed": []}
    total_sent = 0
    
    # Send to all agents
    for region_data in database["regions"].values():
        for agent in region_data["agents"]:
            print(f"\n[{total_sent + 1}] {agent['name']}")
            print(f"  Email: {agent['email']}")
            print(f"  Contact: {agent.get('contact_person', 'Team')}")
            print(f"  Mini PIA Experience: {'Yes' if agent.get('mini_pia_experience') else 'New'}")
            
            success, result = send_registration_email(agent)
            
            if success:
                email_id = result.get('id', 'N/A') if isinstance(result, dict) else 'N/A'
                print(f"  Status: SENT (ID: {email_id})")
                results["sent"].append(agent["name"])
                total_sent += 1
            else:
                print(f"  Status: FAILED - {result}")
                results["failed"].append(agent["name"])
            
            time.sleep(3)  # Delay between emails
    
    # Summary
    print("\n" + "="*70)
    print("REGISTRATION CAMPAIGN COMPLETE")
    print("="*70)
    print(f"Total Sent: {len(results['sent'])}")
    print(f"Failed: {len(results['failed'])}")
    
    if results['sent']:
        print(f"\nInvitations sent to {len(results['sent'])} agencies")
        print("Agents will receive:")
        print("- Platform introduction and benefits")
        print("- Free registration link")
        print("- Dashboard preview information")
        print("- Mini PIA upload instructions")
    
    # Save campaign report
    report = {
        "date": datetime.now().isoformat(),
        "campaign_type": "agent_registration",
        "total_sent": len(results['sent']),
        "total_failed": len(results['failed']),
        "results": results
    }
    
    filename = f"registration_campaign_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(f"C:/Users/gfuna/{filename}", 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\nCampaign report saved: {filename}")
    print("="*70)

if __name__ == "__main__":
    print("Ready to send registration invitations to all Puglia agents")
    print("This will invite them to:")
    print("1. Register on InvestInPuglia.eu")
    print("2. Upload their Mini PIA eligible properties")
    print("3. Access international investor network")
    print("\nPress Enter to send campaign or Ctrl+C to cancel...")
    
    try:
        input()
        send_registration_campaign()
    except KeyboardInterrupt:
        print("\nCampaign cancelled")