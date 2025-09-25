// lib/firebase-admin.ts
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import { join } from 'path';

let firebaseAdminConfig: any = null;

// Try to load credentials from multiple sources
function loadFirebaseCredentials() {
  // Method 1: Try environment variables (for production with smaller keys)
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID || "invest-in-puglia-eu",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  // Method 2: Try to load from credentials file (for local development)
  try {
    const credentialsPath = join(process.cwd(), 'lib', 'firebase-credentials.json');
    const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
    return {
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    };
  } catch (error) {
    console.warn('Could not load Firebase credentials file');
  }

  // Method 3: Fallback to basic config
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || "invest-in-puglia-eu",
    clientEmail: null,
    privateKey: null,
  };
}

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    firebaseAdminConfig = loadFirebaseCredentials();

    // If we have a private key, use service account authentication
    if (firebaseAdminConfig.privateKey && firebaseAdminConfig.clientEmail) {
      initializeApp({
        credential: cert(firebaseAdminConfig as any),
      });
      console.log('✅ Firebase Admin SDK initialized with service account');
    } else {
      // For local development or when service account is not available,
      // we'll use the client SDK with limited functionality
      console.warn('⚠️ Firebase Admin SDK running without service account credentials');
      initializeApp({
        projectId: firebaseAdminConfig.projectId,
      });
    }
  } catch (error) {
    console.error('❌ Firebase admin initialization error:', error);
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();

// Export db as alias for adminDb for compatibility
export const db = adminDb;