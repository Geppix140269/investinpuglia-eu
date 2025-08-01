export async function POST(request: Request) {
  const { name, email, profession, city, sessionId } = await request.json();
  
  // Create pre-registration
  const { data, error } = await supabase
    .from('professional_registrations')
    .insert({
      name,
      email,
      profession,
      city,
      chat_session_id: sessionId
    })
    .select()
    .single();
    
  if (data) {
    // Send confirmation email
    await sendConfirmationEmail(email, name, data.confirmation_token);
  }
  
  return NextResponse.json({ success: true });
}
