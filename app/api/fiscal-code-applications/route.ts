// app/api/fiscal-code-applications/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'tipoRichiesta',
      'cognome',
      'nome',
      'sesso',
      'dataNascita',
      'comuneNascita',
      'statoEstero',
      'indirizzoEstero',
      'sottoscrittoEmail',
      'sottoscrittoTelefono'
    ]
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Map ALL form fields to database columns - EVERYTHING from the PDF
    const dbData = {
      // QUADRO A - Tipo Richiesta
      tipologia_richiedente: data.tipologiaRichiedente || 'D',
      codice_fiscale_richiedente: data.codiceFiscaleRichiedente || null,
      codice_fiscale_sottoscrittore: data.codiceFiscaleSottoscrittore || null,
      tipo_richiesta: data.tipoRichiesta,
      richiesta_tesserino: data.richiestaTesterinoCodiceFiscale || false,
      motivazione: data.motivazione || null,
      data_decesso: data.dataDecesso || null,
      
      // QUADRO B - Dati Anagrafici
      codice_fiscale: data.codiceFiscale || null,
      cognome: data.cognome,
      nome: data.nome,
      sesso: data.sesso,
      data_nascita: data.dataNascita,
      comune_nascita: data.comuneNascita,
      provincia_nascita: data.provinciaNascita || null,
      stato_nascita: data.statoNascita || 'ESTERO',
      
      // QUADRO C - Residenza in Italia
      tipologia_via: data.tipologiaVia || null,
      indirizzo: data.indirizzo || null,
      numero_civico: data.numeroCivico || null,
      frazione: data.frazione || null,
      comune: data.comune || null,
      provincia: data.provincia || null,
      cap: data.cap || null,
      
      // QUADRO D - Residenza Estera
      stato_estero: data.statoEstero,
      stato_federato: data.statoFederato || null,
      localita_residenza: data.localitaResidenza || null,
      indirizzo_estero: data.indirizzoEstero,
      codice_postale: data.codicePostale || null,
      
      // QUADRO E - Altri Codici Fiscali
      altro_codice_fiscale_1: data.altroCodiceFiscale1 || null,
      altro_codice_fiscale_2: data.altroCodiceFiscale2 || null,
      
      // QUADRO F - Rappresentante Legale
      rappresentante_legale: data.rappresentanteLegale || false,
      rappresentante_nome: data.rappresentanteNome || null,
      rappresentante_cognome: data.rappresentanteCognome || null,
      rappresentante_codice_fiscale: data.rappresentanteCodiceFiscale || null,
      rappresentante_qualifica: data.rappresentanteQualifica || null,
      
      // DELEGA - Chi presenta la domanda
      presentata_da: data.presentataDa || 'delegato',
      delegato_nome: data.delegatoNome || null,
      delegato_cognome: data.delegatoCognome || null,
      delegato_codice_fiscale: data.delegatoCodiceFiscale || null,
      delegato_qualifica: data.delegatoQualifica || null,
      
      // Autorizzazione InvestiScope
      autorizza_investiscope: data.autorizzaInvestiscope || true,
      
      // Documenti Allegati
      documento_identita: data.documentoIdentita || true,
      documento_soggiorno: data.documentoSoggiorno || false,
      altri_documenti: data.altriDocumenti || null,
      
      // SOTTOSCRIZIONE
      sottoscritto_nome: data.sottoscrittoNome,
      sottoscritto_email: data.sottoscrittoEmail,
      sottoscritto_telefono: data.sottoscrittoTelefono,
      sottoscritto_indirizzo: data.sottoscrittoIndirizzo,
      data_firma: data.dataFirma,
      
      // Firma
      firma_digitale: data.firmaDigitale || null,
      firma_file: data.firmaFile || null,
      firma_file_name: data.firmaFileName || null,
      
      // Meta
      status: 'pending',
      submitted_at: new Date().toISOString()
    }
    
    // Save to database
    const { data: application, error } = await supabase
      .from('fiscal_code_applications')
      .insert([dbData])
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      console.error('Data being sent:', dbData)
      return NextResponse.json(
        { error: `Failed to save application: ${error.message}` },
        { status: 500 }
      )
    }
    
    // TODO: Generate PDF with all the data filled in
    // This is where you'll use a PDF library to fill the official AA4/8 form
    // with all the data from dbData
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        id: application.id
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
