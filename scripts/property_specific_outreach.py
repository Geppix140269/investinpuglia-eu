"""
PROPERTY-SPECIFIC EMAIL OUTREACH FOR GIUSEPPE FUNARO
Targeting specific properties from each agency's portfolio
Focus on Mini PIA showcase potential
"""

# Giuseppe's information
SENDER = {
    "name": "Giuseppe Funaro",
    "email": "g.funaro@investinpuglia.eu",
    "phone": "+39 351 400 1402"
}

# Agencies with specific properties of interest
AGENCIES_WITH_PROPERTIES = [
    {
        "name": "Agenzia dei Trulli",
        "email": "info@agenziadeitrulli.com",
        "language": "italian",
        "properties": [
            {
                "type": "Trullo Complex",
                "location": "Alberobello",
                "price_range": "€400-600k",
                "rooms": "6+ rooms",
                "mini_pia_potential": "Historic restoration + tourism conversion"
            }
        ]
    },
    {
        "name": "Gruppoinvest D'Amico", 
        "email": "info@damicogruppo.it",
        "language": "italian",
        "properties": [
            {
                "type": "Masseria Storica",
                "location": "Ostuni area",
                "price_range": "€800k-1.2M", 
                "rooms": "8+ rooms",
                "mini_pia_potential": "Agricultural heritage preservation + luxury hospitality"
            }
        ]
    },
    {
        "name": "Trulli&Dimore",
        "email": "info@trulliedimore.it", 
        "language": "italian",
        "properties": [
            {
                "type": "Palazzo Storico",
                "location": "Centro storico",
                "price_range": "€500-900k",
                "rooms": "10+ rooms",
                "mini_pia_potential": "Urban heritage restoration + boutique accommodation"
            }
        ]
    },
    {
        "name": "MyProjectCasa",
        "email": "info@myprojectcasa.it",
        "language": "italian", 
        "properties": [
            {
                "type": "Trulli with Land",
                "location": "Martina Franca",
                "price_range": "€300-500k",
                "rooms": "5+ rooms",
                "mini_pia_potential": "Rural tourism development + agritourism potential"
            }
        ]
    },
    {
        "name": "Raro Realty",
        "email": "info@rarorealty.com",
        "language": "english",
        "properties": [
            {
                "type": "Coastal Masseria",
                "location": "Near Polignano",
                "price_range": "€1.5-2.5M",
                "rooms": "12+ rooms", 
                "mini_pia_potential": "Seaside heritage preservation + luxury resort conversion"
            }
        ]
    },
    {
        "name": "Gente di Mare",
        "email": "info@gentedimare.it",
        "language": "italian",
        "properties": [
            {
                "type": "Waterfront Property",
                "location": "Coastal Puglia",
                "price_range": "€2-3M",
                "rooms": "15+ rooms",
                "mini_pia_potential": "Marine heritage + exclusive hospitality development"
            }
        ]
    }
]

def get_italian_property_email(agency_name, property_info):
    """Generate Italian property-specific email"""
    
    subject = f"Richiesta Collaborazione - Proprietà {property_info['type']} per Progetto Mini PIA"
    
    body = f"""Gentile Team di {agency_name},

Mi chiamo Giuseppe Funaro e rappresento InvestInPuglia.eu, piattaforma specializzata nella valorizzazione di proprietà storiche pugliesi attraverso il programma Mini PIA.

INTERESSE SPECIFICO PER VOSTRA PROPRIETÀ:
Abbiamo identificato nel vostro portfolio una {property_info['type']} in zona {property_info['location']} (fascia {property_info['price_range']}) che presenta caratteristiche ideali per il nostro progetto di showcasing internazionale.

COSA PROPONIAMO:
• Presentazione professionale della proprietà su InvestInPuglia.eu
• Analisi dettagliata del potenziale Mini PIA: {property_info['mini_pia_potential']}
• Documentazione fotografica e video professionale
• Traduzione e marketing in inglese, tedesco, francese
• Targeting specifico verso investitori internazionali qualificati

VALORE AGGIUNTO PER LA PROPRIETÀ:
- Visibilità internazionale su mercati esteri
- Analisi professionale dell'eligibilità Mini PIA
- Presentazione del progetto di restauro/conversione
- Calcolo del potenziale ROI per investitori
- Documentazione tecnica per facilitare la vendita

INVESTITORI TARGET:
Abbiamo una rete di investitori internazionali specificamente interessati a:
- Proprietà storiche con {property_info['rooms']} per progetti ricettivi
- Budget allineato alla fascia {property_info['price_range']}
- Progetti con potenziale Mini PIA nel settore hospitality/turistico

PROSSIMI PASSI:
Potremmo organizzare un sopralluogo per:
1. Valutare le caratteristiche Mini PIA della proprietà
2. Pianificare il servizio fotografico professionale  
3. Definire la strategia di presentazione internazionale
4. Identificare gli investitori più adatti al progetto

Sarebbe possibile organizzare una breve chiamata questa settimana per discutere questa opportunità?

Cordiali saluti,

Giuseppe Funaro
International Investment Director
InvestInPuglia.eu
{SENDER['email']}
{SENDER['phone']}
www.investinpuglia.eu"""

    return subject, body

def get_english_property_email(agency_name, property_info):
    """Generate English property-specific email"""
    
    subject = f"Collaboration Request - {property_info['type']} for Mini PIA Showcase Project"
    
    body = f"""Dear {agency_name} Team,

I'm Giuseppe Funaro from InvestInPuglia.eu, a platform specializing in showcasing historic Puglian properties through the Mini PIA program.

SPECIFIC INTEREST IN YOUR PROPERTY:
We have identified a {property_info['type']} in {property_info['location']} area (range {property_info['price_range']}) in your portfolio that presents ideal characteristics for our international showcase project.

WHAT WE PROPOSE:
• Professional presentation of the property on InvestInPuglia.eu
• Detailed Mini PIA potential analysis: {property_info['mini_pia_potential']}
• Professional photography and video documentation
• Translation and marketing in English, German, French
• Targeted outreach to qualified international investors

ADDED VALUE FOR THE PROPERTY:
- International visibility in foreign markets
- Professional Mini PIA eligibility analysis
- Restoration/conversion project presentation
- ROI potential calculation for investors
- Technical documentation to facilitate sales

TARGET INVESTORS:
We have a network of international investors specifically interested in:
- Historic properties with {property_info['rooms']} for hospitality projects
- Budget aligned with {property_info['price_range']} range
- Mini PIA potential projects in hospitality/tourism sector

NEXT STEPS:
We could arrange a site visit to:
1. Evaluate the property's Mini PIA characteristics
2. Plan professional photography services
3. Define international presentation strategy
4. Identify the most suitable investors for the project

Would it be possible to schedule a brief call this week to discuss this opportunity?

Best regards,

Giuseppe Funaro
International Investment Director
InvestInPuglia.eu
{SENDER['email']}
{SENDER['phone']}
www.investinpuglia.eu"""

    return subject, body

def generate_all_property_emails():
    """Generate personalized emails for all agencies"""
    
    print("="*70)
    print("PROPERTY-SPECIFIC EMAIL CAMPAIGN - GIUSEPPE FUNARO")
    print("="*70)
    print("Focus: Mini PIA showcase potential for specific properties")
    print("="*70)
    
    emails = []
    
    for agency in AGENCIES_WITH_PROPERTIES:
        print(f"\n[{len(emails)+1}] {agency['name']}")
        print(f"    Email: {agency['email']}")
        print(f"    Language: {agency['language'].upper()}")
        
        for prop in agency['properties']:
            print(f"    Property: {prop['type']} - {prop['location']}")
            print(f"    Mini PIA Potential: {prop['mini_pia_potential']}")
            
            if agency['language'] == 'italian':
                subject, body = get_italian_property_email(agency['name'], prop)
            else:
                subject, body = get_english_property_email(agency['name'], prop)
            
            emails.append({
                'agency': agency['name'],
                'email': agency['email'],
                'language': agency['language'],
                'property': prop,
                'subject': subject,
                'body': body
            })
    
    return emails

def save_email_preview():
    """Save HTML preview of all emails"""
    
    emails = generate_all_property_emails()
    
    html_content = """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Property-Specific Email Campaign - Giuseppe Funaro</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1000px; margin: 20px auto; padding: 20px; }
        .email-box { background: white; border: 2px solid #ddd; border-radius: 10px; padding: 25px; margin: 20px 0; }
        .subject { background: #e8f4f8; padding: 12px; border-radius: 5px; margin-bottom: 15px; font-weight: bold; }
        .from-to { background: #f8f9fa; padding: 12px; border-radius: 5px; margin-bottom: 15px; }
        .email-body { line-height: 1.6; white-space: pre-wrap; font-family: 'Courier New', monospace; background: #fafafa; padding: 15px; border-radius: 5px; }
        .property-info { background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 15px; }
        h1 { color: #2c3e50; text-align: center; border-bottom: 3px solid #3498db; padding-bottom: 15px; }
        h2 { color: #2c3e50; }
    </style>
</head>
<body>
    <h1>PROPERTY-SPECIFIC EMAIL CAMPAIGN - GIUSEPPE FUNARO</h1>
    <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 20px 0;">
        <h3>CAMPAIGN FOCUS:</h3>
        <ul>
            <li>Target specific properties from each agency's portfolio</li>
            <li>Explain Mini PIA showcase potential</li>
            <li>Offer professional presentation services</li>
            <li>No success fee mentioned (as requested)</li>
            <li>Focus on property valorization and international exposure</li>
        </ul>
    </div>
"""
    
    for i, email in enumerate(emails, 1):
        html_content += f"""
    <div class="email-box">
        <h2>[{i}] {email['agency']} - {email['language'].upper()}</h2>
        
        <div class="property-info">
            <strong>Target Property:</strong> {email['property']['type']} - {email['property']['location']}<br>
            <strong>Price Range:</strong> {email['property']['price_range']}<br>
            <strong>Mini PIA Potential:</strong> {email['property']['mini_pia_potential']}
        </div>
        
        <div class="from-to">
            <strong>FROM:</strong> Giuseppe Funaro &lt;{SENDER['email']}&gt;<br>
            <strong>TO:</strong> {email['email']}<br>
            <strong>REPLY-TO:</strong> {SENDER['email']}
        </div>
        
        <div class="subject">
            <strong>SUBJECT:</strong> {email['subject']}
        </div>
        
        <div class="email-body">{email['body']}</div>
    </div>
"""
    
    html_content += """
    <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin-top: 30px; text-align: center;">
        <h2>READY TO SEND PROPERTY-SPECIFIC EMAILS?</h2>
        <p style="font-size: 16px;">
            These emails target specific properties with Mini PIA showcase potential.<br>
            To send: <code>python send_property_emails.py --resend</code>
        </p>
    </div>
</body>
</html>"""
    
    with open('C:/Users/gfuna/property_specific_campaign.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\nPreview saved: property_specific_campaign.html")
    print(f"Total emails: {len(emails)}")

if __name__ == "__main__":
    save_email_preview()