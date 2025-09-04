// lib/firebase-admin.ts
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "invest-in-puglia-eu",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    // If we have a private key, use service account authentication
    if (firebaseAdminConfig.privateKey && firebaseAdminConfig.clientEmail) {
      initializeApp({
        credential: cert(firebaseAdminConfig as any),
      });
    } else {
      // For local development or when service account is not available,
      // we'll use the client SDK with limited functionality
      console.warn('Firebase Admin SDK running without service account credentials');
      initializeApp({
        projectId: firebaseAdminConfig.projectId,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();

// Export db as alias for adminDb for compatibility
export const db = adminDb;