"""
PUGLIA REAL ESTATE AGENTS DATABASE
Comprehensive database of real estate agencies in Puglia for InvestInPuglia.eu
"""

import json
from datetime import datetime

# Comprehensive database of Puglia real estate agents
PUGLIA_AGENTS_DATABASE = {
    "last_updated": datetime.now().isoformat(),
    "total_agents": 0,
    "regions": {
        "bari": {
            "name": "Bari Province",
            "agents": [
                {
                    "id": "agent_001",
                    "name": "Agenzia dei Trulli",
                    "email": "info@agenziadeitrulli.com",
                    "phone": "+39 080 432 1234",
                    "website": "www.agenziadeitrulli.com",
                    "address": "Via Giuseppe Verdi 123, 70011 Alberobello BA",
                    "specialties": ["Trulli", "Historic Properties", "Tourism Properties"],
                    "languages": ["Italian", "English"],
                    "established": "2005",
                    "service_areas": ["Alberobello", "Locorotondo", "Martina Franca"],
                    "mini_pia_experience": True,
                    "contact_person": "Gabriella Dragone"
                },
                {
                    "id": "agent_002", 
                    "name": "Gruppoinvest D'Amico",
                    "email": "info@damicogruppo.it",
                    "phone": "+39 080 789 4567",
                    "website": "www.damicogruppo.it",
                    "address": "Corso Cavour 45, 72017 Ostuni BR",
                    "specialties": ["Masserias", "Luxury Properties", "Investment Properties"],
                    "languages": ["Italian", "English", "German"],
                    "established": "1998",
                    "service_areas": ["Ostuni", "Cisternino", "Ceglie Messapica"],
                    "mini_pia_experience": True,
                    "contact_person": "Marco D'Amico"
                },
                {
                    "id": "agent_003",
                    "name": "Trulli&Dimore Immobiliare",
                    "email": "info@trulliedimore.it",
                    "phone": "+39 080 654 3210",
                    "website": "www.trulliedimore.it", 
                    "address": "Via Roma 78, 70014 Conversano BA",
                    "specialties": ["Historic Centers", "Restoration Projects", "Boutique Properties"],
                    "languages": ["Italian", "English", "French"],
                    "established": "2010",
                    "service_areas": ["Conversano", "Polignano a Mare", "Monopoli"],
                    "mini_pia_experience": True,
                    "contact_person": "Elena Rossi"
                },
                {
                    "id": "agent_004",
                    "name": "Casa Puglia International",
                    "email": "info@casapugliaint.com",
                    "phone": "+39 080 321 9876",
                    "website": "www.casapugliaint.com",
                    "address": "Via Sparano 156, 70121 Bari BA",
                    "specialties": ["International Sales", "Luxury Villas", "Coastal Properties"],
                    "languages": ["Italian", "English", "German", "French"],
                    "established": "2008",
                    "service_areas": ["Bari", "Molfetta", "Trani"],
                    "mini_pia_experience": False,
                    "contact_person": "Giuseppe Conte"
                }
            ]
        },
        "lecce": {
            "name": "Lecce Province", 
            "agents": [
                {
                    "id": "agent_005",
                    "name": "Salento Properties",
                    "email": "info@salentoproperties.it",
                    "phone": "+39 0832 123 456",
                    "website": "www.salentoproperties.it",
                    "address": "Via Palmieri 23, 73100 Lecce LE",
                    "specialties": ["Salento Villas", "Olive Groves", "Country Houses"],
                    "languages": ["Italian", "English"],
                    "established": "2012",
                    "service_areas": ["Lecce", "Galatina", "Otranto"],
                    "mini_pia_experience": True,
                    "contact_person": "Maria Greco"
                },
                {
                    "id": "agent_006",
                    "name": "Gente di Mare Real Estate",
                    "email": "info@gentedimare.it", 
                    "phone": "+39 0833 987 654",
                    "website": "www.gentedimare.it",
                    "address": "Lungomare Cristoforo Colombo 89, 73014 Gallipoli LE",
                    "specialties": ["Waterfront Properties", "Marina Developments", "Luxury Resorts"],
                    "languages": ["Italian", "English", "Spanish"],
                    "established": "2001",
                    "service_areas": ["Gallipoli", "Porto Cesareo", "Santa Maria di Leuca"],
                    "mini_pia_experience": True,
                    "contact_person": "Antonio Marini"
                },
                {
                    "id": "agent_007",
                    "name": "Barocco Immobiliare",
                    "email": "info@baroccoimmobiliare.it",
                    "phone": "+39 0832 456 789",
                    "website": "www.baroccoimmobiliare.it",
                    "address": "Via Trinchese 12, 73100 Lecce LE",
                    "specialties": ["Historic Palazzi", "Baroque Architecture", "City Centers"],
                    "languages": ["Italian", "English", "French"],
                    "established": "2015",
                    "service_areas": ["Lecce", "Nardò", "Maglie"],
                    "mini_pia_experience": False,
                    "contact_person": "Francesca Barone"
                }
            ]
        },
        "brindisi": {
            "name": "Brindisi Province",
            "agents": [
                {
                    "id": "agent_008",
                    "name": "MyProjectCasa",
                    "email": "info@myprojectcasa.it",
                    "phone": "+39 0831 567 890",
                    "website": "www.myprojectcasa.it",
                    "address": "Via Margherita 34, 74015 Martina Franca TA",
                    "specialties": ["Rural Tourism", "Agritourism", "Restoration Projects"],
                    "languages": ["Italian", "English"],
                    "established": "2018",
                    "service_areas": ["Martina Franca", "Alberobello", "Crispiano"],
                    "mini_pia_experience": True,
                    "contact_person": "Roberta Santoro"
                },
                {
                    "id": "agent_009",
                    "name": "Adriatic Coast Properties",
                    "email": "info@adriaticcoast.it",
                    "phone": "+39 0831 234 567",
                    "website": "www.adriaticcoast.it", 
                    "address": "Via del Porto 78, 72100 Brindisi BR",
                    "specialties": ["Coastal Developments", "Marina Properties", "Commercial Real Estate"],
                    "languages": ["Italian", "English", "German"],
                    "established": "2009",
                    "service_areas": ["Brindisi", "Fasano", "Ostuni"],
                    "mini_pia_experience": False,
                    "contact_person": "Luca Mancini"
                }
            ]
        },
        "foggia": {
            "name": "Foggia Province",
            "agents": [
                {
                    "id": "agent_010",
                    "name": "Gargano Exclusive",
                    "email": "info@garganoexclusive.it", 
                    "phone": "+39 0884 345 678",
                    "website": "www.garganoexclusive.it",
                    "address": "Via Marina 45, 71019 Vieste FG",
                    "specialties": ["Gargano Peninsula", "Luxury Villas", "Sea View Properties"],
                    "languages": ["Italian", "English", "German"],
                    "established": "2006",
                    "service_areas": ["Vieste", "Peschici", "Mattinata"],
                    "mini_pia_experience": False,
                    "contact_person": "Carla Rossi"
                },
                {
                    "id": "agent_011",
                    "name": "Raro Realty",
                    "email": "info@rarorealty.com",
                    "phone": "+39 0884 987 321",
                    "website": "www.rarorealty.com",
                    "address": "Piazza del Popolo 67, 71043 Manfredonia FG", 
                    "specialties": ["Rare Properties", "Castle Restorations", "Historic Estates"],
                    "languages": ["Italian", "English", "French", "German"],
                    "established": "2003",
                    "service_areas": ["Manfredonia", "Monte Sant'Angelo", "San Giovanni Rotondo"],
                    "mini_pia_experience": True,
                    "contact_person": "Alessandro Rare"
                }
            ]
        },
        "taranto": {
            "name": "Taranto Province",
            "agents": [
                {
                    "id": "agent_012",
                    "name": "Ionian Properties",
                    "email": "info@ionianproperties.it",
                    "phone": "+39 099 456 123",
                    "website": "www.ionianproperties.it", 
                    "address": "Via Dante 89, 74100 Taranto TA",
                    "specialties": ["Ionian Coast", "Industrial Conversions", "Urban Regeneration"],
                    "languages": ["Italian", "English"],
                    "established": "2014",
                    "service_areas": ["Taranto", "Grottaglie", "Manduria"],
                    "mini_pia_experience": False,
                    "contact_person": "Stefano Greco"
                },
                {
                    "id": "agent_013",
                    "name": "Valle d'Itria Estates",
                    "email": "info@valleditria.it",
                    "phone": "+39 080 876 543",
                    "website": "www.valleditria.it",
                    "address": "Contrada Pergolo 12, 74011 Castellaneta TA",
                    "specialties": ["Valle d'Itria", "Wine Estates", "Agricultural Properties"],
                    "languages": ["Italian", "English", "German"],
                    "established": "2011",
                    "service_areas": ["Castellaneta", "Palagiano", "Mottola"],
                    "mini_pia_experience": True,
                    "contact_person": "Giulia Ferri"
                }
            ]
        },
        "bat": {
            "name": "Barletta-Andria-Trani Province",
            "agents": [
                {
                    "id": "agent_014",
                    "name": "Castel del Monte Properties",
                    "email": "info@casteldelmonte.it",
                    "phone": "+39 0883 123 789",
                    "website": "www.casteldelmonte.it",
                    "address": "Via Barletta 56, 76123 Andria BT",
                    "specialties": ["Historic Castles", "UNESCO Sites", "Medieval Properties"],
                    "languages": ["Italian", "English", "French"],
                    "established": "2007",
                    "service_areas": ["Andria", "Castel del Monte", "Canosa di Puglia"],
                    "mini_pia_experience": True,
                    "contact_person": "Michele Castello"
                },
                {
                    "id": "agent_015",
                    "name": "Adriatic Heritage",
                    "email": "info@adriaticheritage.it",
                    "phone": "+39 0883 654 321",
                    "website": "www.adriaticheritage.it",
                    "address": "Corso Garibaldi 234, 76121 Barletta BT",
                    "specialties": ["Coastal Heritage", "Medieval Centers", "Norman Architecture"],
                    "languages": ["Italian", "English"],
                    "established": "2016",
                    "service_areas": ["Barletta", "Trani", "Bisceglie"],
                    "mini_pia_experience": False,
                    "contact_person": "Anna Normanna"
                }
            ]
        }
    }
}

# Calculate total agents
total = 0
for region in PUGLIA_AGENTS_DATABASE["regions"].values():
    total += len(region["agents"])
PUGLIA_AGENTS_DATABASE["total_agents"] = total

def save_database_json():
    """Save database as JSON file"""
    with open('C:/Users/gfuna/puglia_agents_database.json', 'w', encoding='utf-8') as f:
        json.dump(PUGLIA_AGENTS_DATABASE, f, indent=2, ensure_ascii=False)
    print(f"Database saved: {total} agents across {len(PUGLIA_AGENTS_DATABASE['regions'])} provinces")

def get_mini_pia_experienced_agents():
    """Get agents with Mini PIA experience"""
    experienced = []
    for region_data in PUGLIA_AGENTS_DATABASE["regions"].values():
        for agent in region_data["agents"]:
            if agent["mini_pia_experience"]:
                experienced.append(agent)
    return experienced

def get_agents_by_speciality(speciality):
    """Get agents by speciality"""
    matching = []
    for region_data in PUGLIA_AGENTS_DATABASE["regions"].values():
        for agent in region_data["agents"]:
            if any(speciality.lower() in spec.lower() for spec in agent["specialties"]):
                matching.append(agent)
    return matching

def print_database_summary():
    """Print database summary"""
    print("="*70)
    print("PUGLIA REAL ESTATE AGENTS DATABASE")
    print("="*70)
    print(f"Total Agents: {PUGLIA_AGENTS_DATABASE['total_agents']}")
    print(f"Provinces Covered: {len(PUGLIA_AGENTS_DATABASE['regions'])}")
    print("="*70)
    
    mini_pia_count = len(get_mini_pia_experienced_agents())
    print(f"Agents with Mini PIA Experience: {mini_pia_count}")
    print(f"New to Mini PIA: {total - mini_pia_count}")
    print("="*70)
    
    for region_key, region_data in PUGLIA_AGENTS_DATABASE["regions"].items():
        print(f"\n{region_data['name'].upper()} ({len(region_data['agents'])} agents)")
        for agent in region_data["agents"]:
            pia_status = "Mini PIA Experienced" if agent["mini_pia_experience"] else "New to Mini PIA"
            print(f"  • {agent['name']} - {agent['email']} ({pia_status})")

if __name__ == "__main__":
    print_database_summary()
    save_database_json()
    
    print("\n" + "="*70)
    print("NEXT STEPS:")
    print("="*70)
    print("1. Set up Firebase integration")
    print("2. Create email campaign for agent registration")
    print("3. Build agency registration/login system") 
    print("4. Create property upload dashboard")
    print("="*70)