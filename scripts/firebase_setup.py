"""
FIREBASE INTEGRATION FOR INVESTINPUGLIA.EU
Setup Firebase for storing agents database and property uploads
"""

import json
import requests
from datetime import datetime

# Firebase configuration for InvestInPuglia.eu
FIREBASE_CONFIG = {
    "project_id": "investinpuglia-eu",
    "database_url": "https://investinpuglia-eu-default-rtdb.firebaseio.com/",
    "api_key": "YOUR_FIREBASE_API_KEY_HERE",  # To be configured
    "auth_domain": "investinpuglia-eu.firebaseapp.com",
    "storage_bucket": "investinpuglia-eu.appspot.com"
}

class FirebaseManager:
    """Manage Firebase operations for InvestInPuglia.eu"""
    
    def __init__(self):
        self.base_url = FIREBASE_CONFIG["database_url"]
        self.project_id = FIREBASE_CONFIG["project_id"]
    
    def upload_agents_database(self, agents_data):
        """Upload agents database to Firebase"""
        url = f"{self.base_url}agents.json"
        
        try:
            response = requests.put(url, json=agents_data)
            if response.status_code == 200:
                print("Agents database uploaded successfully to Firebase")
                return True
            else:
                print(f"Failed to upload: {response.status_code}")
                return False
        except Exception as e:
            print(f"Error uploading to Firebase: {e}")
            return False
    
    def create_agency_account(self, agency_data):
        """Create new agency account in Firebase"""
        url = f"{self.base_url}registered_agencies/{agency_data['id']}.json"
        
        account_info = {
            "id": agency_data["id"],
            "name": agency_data["name"],
            "email": agency_data["email"],
            "phone": agency_data["phone"],
            "website": agency_data.get("website", ""),
            "registration_date": datetime.now().isoformat(),
            "status": "pending_verification",
            "properties_uploaded": 0,
            "mini_pia_properties": []
        }
        
        try:
            response = requests.put(url, json=account_info)
            return response.status_code == 200
        except:
            return False
    
    def upload_property(self, agency_id, property_data):
        """Upload Mini PIA property to Firebase"""
        property_id = f"prop_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        url = f"{self.base_url}properties/{agency_id}/{property_id}.json"
        
        property_record = {
            "id": property_id,
            "agency_id": agency_id,
            "upload_date": datetime.now().isoformat(),
            "status": "pending_review",
            **property_data
        }
        
        try:
            response = requests.put(url, json=property_record)
            return response.status_code == 200, property_id
        except:
            return False, None

def setup_firebase_structure():
    """Setup Firebase database structure for InvestInPuglia.eu"""
    
    firebase_structure = {
        "agents": {},  # All Puglia agents database
        "registered_agencies": {},  # Agencies that signed up
        "properties": {},  # Mini PIA properties by agency
        "inquiries": {},  # International investor inquiries
        "analytics": {
            "total_agencies": 0,
            "total_properties": 0,
            "last_updated": datetime.now().isoformat()
        }
    }
    
    print("="*60)
    print("FIREBASE STRUCTURE FOR INVESTINPUGLIA.EU")
    print("="*60)
    print("Database Collections:")
    print("- agents: Complete Puglia agents database")
    print("- registered_agencies: Signed up agencies")
    print("- properties: Mini PIA properties by agency")
    print("- inquiries: International investor inquiries")
    print("- analytics: Platform statistics")
    print("="*60)
    
    return firebase_structure

def load_and_upload_agents():
    """Load agents database and upload to Firebase"""
    
    # Load the agents database we created
    try:
        with open('C:/Users/gfuna/puglia_agents_database.json', 'r', encoding='utf-8') as f:
            agents_data = json.load(f)
    except FileNotFoundError:
        print("Run puglia_agents_database.py first to generate the database")
        return False
    
    # Upload to Firebase
    firebase = FirebaseManager()
    success = firebase.upload_agents_database(agents_data)
    
    if success:
        print("="*60)
        print("FIREBASE UPLOAD COMPLETE")
        print("="*60)
        print(f"Uploaded {agents_data['total_agents']} agents to Firebase")
        print("Database URL: https://investinpuglia-eu-default-rtdb.firebaseio.com/")
        print("="*60)
    
    return success

def create_firebase_config_file():
    """Create Firebase configuration file for web app"""
    
    config_js = '''
// Firebase configuration for InvestInPuglia.eu
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "investinpuglia-eu.firebaseapp.com",
    databaseURL: "https://investinpuglia-eu-default-rtdb.firebaseio.com",
    projectId: "investinpuglia-eu",
    storageBucket: "investinpuglia-eu.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
'''
    
    with open('C:/Users/gfuna/firebase-config.js', 'w', encoding='utf-8') as f:
        f.write(config_js)
    
    print("Firebase configuration file created: firebase-config.js")

if __name__ == "__main__":
    print("Setting up Firebase for InvestInPuglia.eu...")
    
    # Setup structure
    setup_firebase_structure()
    
    # Create config file
    create_firebase_config_file()
    
    # Upload agents database
    print("\nAttempting to upload agents database...")
    print("Note: You need to configure your actual Firebase API key first")
    
    # Show next steps
    print("\n" + "="*60)
    print("FIREBASE SETUP - NEXT STEPS")
    print("="*60)
    print("1. Create Firebase project at https://console.firebase.google.com")
    print("2. Enable Realtime Database and Authentication")
    print("3. Enable Storage for property photos/videos")
    print("4. Get your API key and update firebase-config.js")
    print("5. Run this script again to upload agents database")
    print("="*60)