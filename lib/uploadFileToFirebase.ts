// lib/uploadFileToFirebase.ts
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadFileToFirebase(file: Blob, filename: string): Promise<string> {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `contracts/${Date.now()}_${filename}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: 'application/pdf',
      customMetadata: {
        uploadedAt: new Date().toISOString()
      }
    });
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file to Firebase:', error);
    throw error;
  }
}