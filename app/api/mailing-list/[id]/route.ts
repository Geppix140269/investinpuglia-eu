import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  updateInvestorWithNameReview, 
  getNameConfidence 
} from '@/lib/firebase-mailing-list';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, isReviewed } = body;

    const docRef = doc(db, 'investor_mailing_list', params.id);
    
    // Check if document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    // Prepare update data with confidence scoring
    const updateData: any = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.confidence = getNameConfidence(name);
    }
    if (isReviewed !== undefined) {
      updateData.isReviewed = isReviewed;
    }

    // Use the enhanced Firebase function
    await updateInvestorWithNameReview(params.id, updateData);

    return NextResponse.json({ 
      success: true, 
      id: params.id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, 'investor_mailing_list', params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: docSnap.id,
      ...docSnap.data()
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}