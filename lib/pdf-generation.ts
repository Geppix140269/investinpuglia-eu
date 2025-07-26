// Add this to your fiscal code form component or as a separate utility

import jsPDF from 'jspdf'

interface AA4FormData {
  // All the form fields from your component
  tipologiaRichiedente: 'D' | 'T'
  codiceFiscaleRichiedente?: string
  codiceFiscaleSottoscrittore?: string
  tipoRichiesta: string
  richiestaTesterinoCodiceFiscale?: boolean
  motivazione?: string
  dataDecesso?: string
  codiceFiscale?: string
  cognome: string
  nome: string
  sesso: 'M' | 'F' | ''
  dataNascita: string
  comuneNascita: string
  provinciaNascita: string
  tipologiaVia: string
  indirizzo: string
  numeroCivico: string
  frazione: string
  comune: string
  provincia: string
  cap: string
  statoEstero: string
  statoFederato: string
  localitaResidenza: string
  indirizzoEstero: string
  codicePostale: string
  altroCodiceFiscale1: string
  altroCodiceFiscale2: string
  delegaNome?: string
  delegaLuogoNascita?: string
  delegaDataNascita?: string
  delegaCodiceFiscale?: string
  sottoscrittoNome: string
  sottoscrittoEmail: string
  sottoscrittoTelefono: string
  dataFirma: string
  firmaDigitale: string
}

export async function generateAA4PDF(formData: AA4FormData): Promise<Blob> {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  // Set font
  doc.setFont('helvetica')
  
  // Page 1 - Main form
  // Header with logos
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, 210, 297, 'F')
  
  // Title section
  doc.setFontSize(10)
  doc.setTextColor(0, 173, 239) // Light blue for title
  doc.text('DOMANDA DI ATTRIBUZIONE CODICE FISCALE, COMUNICAZIONE VARIAZIONE DATI', 105, 20, { align: 'center' })
  doc.text('E RICHIESTA TESSERINO/DUPLICATO TESSERA SANITARIA', 105, 26, { align: 'center' })
  doc.setFontSize(9)
  doc.text('(PERSONE FISICHE)', 105, 32, { align: 'center' })
  
  // Form number
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(8)
  doc.text('AA4/8', 190, 10)
  
  // QUADRO A
  let y = 45
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('QUADRO A', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 10
  doc.setFontSize(8)
  doc.text('Sezione I - Tipologia richiedente', 12, y)
  y += 5
  
  // Checkboxes for tipologia
  doc.rect(12, y, 3, 3)
  if (formData.tipologiaRichiedente === 'D') {
    doc.text('X', 12.5, y + 2.5)
  }
  doc.text('D RICHIESTA DIRETTA PER SE STESSO', 17, y + 2.5)
  
  doc.rect(90, y, 3, 3)
  if (formData.tipologiaRichiedente === 'T') {
    doc.text('X', 90.5, y + 2.5)
  }
  doc.text('T RICHIESTA PER SOGGETTO TERZO', 95, y + 2.5)
  
  y += 8
  doc.text('Sezione II - Tipo richiesta', 12, y)
  y += 5
  
  // Request type checkboxes
  const requestTypes = [
    { code: '1', text: 'ATTRIBUZIONE CODICE FISCALE' },
    { code: '2', text: 'VARIAZIONE DATI' },
    { code: '3', text: 'COMUNICAZIONE DECESSO' },
    { code: '4', text: 'RICHIESTA CERTIFICATO DI CODICE FISCALE' },
    { code: '5', text: 'RICHIESTA DUPLICATO TESSERINO/TESSERA SANITARIA' }
  ]
  
  requestTypes.forEach((type, index) => {
    doc.rect(12, y + (index * 6), 3, 3)
    if (formData.tipoRichiesta === type.code) {
      doc.text('X', 12.5, y + (index * 6) + 2.5)
    }
    doc.text(`${type.code} ${type.text}`, 17, y + (index * 6) + 2.5)
  })
  
  // QUADRO B - Personal Data
  y += 35
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('QUADRO B - Dati anagrafici', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 10
  // Existing fiscal code (if updating)
  if (formData.codiceFiscale) {
    doc.text('CODICE FISCALE', 12, y)
    drawBoxedText(doc, formData.codiceFiscale.toUpperCase(), 60, y - 3, 2.5, 16)
  }
  
  y += 8
  doc.text('COGNOME', 12, y)
  doc.rect(40, y - 3, 60, 5)
  doc.text(formData.cognome.toUpperCase(), 42, y)
  
  doc.text('NOME', 110, y)
  doc.rect(125, y - 3, 60, 5)
  doc.text(formData.nome.toUpperCase(), 127, y)
  
  y += 10
  doc.text('SESSO', 12, y)
  doc.rect(25, y - 3, 5, 5)
  doc.text(formData.sesso, 26.5, y)
  
  doc.text('DATA DI NASCITA', 40, y)
  const birthDate = formData.dataNascita.split('-')
  doc.rect(70, y - 3, 30, 5)
  doc.text(`${birthDate[2]}/${birthDate[1]}/${birthDate[0]}`, 72, y)
  
  y += 10
  doc.text('COMUNE (o Stato estero) DI NASCITA', 12, y)
  doc.rect(70, y - 3, 80, 5)
  doc.text(formData.comuneNascita.toUpperCase(), 72, y)
  
  doc.text('PROVINCIA', 155, y)
  doc.rect(175, y - 3, 15, 5)
  doc.text(formData.provinciaNascita, 177, y)
  
  // QUADRO C - Italian Residence
  y += 15
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('QUADRO C - Residenza anagrafica/domicilio fiscale', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 10
  if (formData.indirizzo || formData.comune) {
    doc.text('TIPOLOGIA (via, piazza, ecc.)', 12, y)
    doc.rect(55, y - 3, 20, 5)
    doc.text(formData.tipologiaVia, 57, y)
    
    doc.text('INDIRIZZO', 80, y)
    doc.rect(100, y - 3, 60, 5)
    doc.text(formData.indirizzo, 102, y)
    
    doc.text('NUMERO CIVICO', 165, y)
    doc.rect(190, y - 3, 10, 5)
    doc.text(formData.numeroCivico, 192, y)
    
    y += 10
    doc.text('FRAZIONE/ALTRO', 12, y)
    doc.rect(40, y - 3, 50, 5)
    doc.text(formData.frazione, 42, y)
    
    doc.text('COMUNE', 95, y)
    doc.rect(110, y - 3, 50, 5)
    doc.text(formData.comune, 112, y)
    
    doc.text('PROVINCIA', 165, y)
    doc.rect(185, y - 3, 15, 5)
    doc.text(formData.provincia, 187, y)
    
    y += 10
    doc.text('C.A.P.', 12, y)
    doc.rect(25, y - 3, 20, 5)
    doc.text(formData.cap, 27, y)
  }
  
  // QUADRO D - Foreign Residence
  y += 15
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('QUADRO D - Residenza estera', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 10
  doc.text('STATO ESTERO', 12, y)
  doc.rect(40, y - 3, 80, 5)
  doc.text(formData.statoEstero.toUpperCase(), 42, y)
  
  doc.text('STATO FEDERATO, PROVINCIA, CONTEA', 125, y)
  doc.rect(185, y - 3, 15, 5)
  doc.text(formData.statoFederato || '', 187, y)
  
  y += 10
  doc.text('LOCALITÀ DI RESIDENZA', 12, y)
  doc.rect(55, y - 3, 80, 5)
  doc.text(formData.localitaResidenza || '', 57, y)
  
  doc.text('CODICE POSTALE', 140, y)
  doc.rect(170, y - 3, 30, 5)
  doc.text(formData.codicePostale || '', 172, y)
  
  y += 10
  doc.text('INDIRIZZO', 12, y)
  doc.rect(30, y - 3, 170, 5)
  doc.text(formData.indirizzoEstero, 32, y)
  
  // QUADRO E - Other fiscal codes
  y += 15
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('QUADRO E - Eventuali altri codici fiscali attribuiti', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 10
  if (formData.altroCodiceFiscale1) {
    doc.text('CODICE FISCALE', 12, y)
    drawBoxedText(doc, formData.altroCodiceFiscale1.toUpperCase(), 45, y - 3, 2.5, 16)
  }
  
  y += 8
  if (formData.altroCodiceFiscale2) {
    doc.text('CODICE FISCALE', 12, y)
    drawBoxedText(doc, formData.altroCodiceFiscale2.toUpperCase(), 45, y - 3, 2.5, 16)
  }
  
  // Signature section
  y = 250
  doc.setFillColor(230, 230, 230)
  doc.rect(10, y, 190, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('SOTTOSCRIZIONE', 12, y + 5.5)
  doc.setFont('helvetica', 'normal')
  
  y += 12
  doc.text('DATA', 12, y)
  doc.rect(25, y - 3, 30, 5)
  const signDate = formData.dataFirma.split('-')
  doc.text(`${signDate[2]}/${signDate[1]}/${signDate[0]}`, 27, y)
  
  doc.text('FIRMA', 65, y)
  doc.rect(80, y - 3, 80, 20)
  
  // Add digital signature if present
  if (formData.firmaDigitale) {
    try {
      doc.addImage(formData.firmaDigitale, 'PNG', 85, y - 2, 70, 18)
    } catch (error) {
      console.error('Error adding signature image:', error)
    }
  }
  
  // Page 2 - Privacy Information (required by Italian law)
  doc.addPage()
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Informativa sul trattamento dei dati personali', 105, 20, { align: 'center' })
  doc.text('ai sensi dell\'art. 13 del D.Lgs. n. 196 del 2003', 105, 26, { align: 'center' })
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  
  let privacyY = 40
  const privacyText = [
    'Il d.lgs. 30 giugno 2003, n. 196, "Codice in materia di protezione dei dati personali", prevede un sistema di',
    'garanzie a tutela dei trattamenti che vengono effettuati sui dati personali.',
    '',
    'Il Ministero dell\'Economia e delle Finanze e l\'Agenzia delle Entrate desiderano informarla che nel modello',
    'sono presenti diversi dati personali che verranno trattati al fine di attribuire il codice fiscale.',
    '',
    'I dati in possesso del Ministero dell\'Economia e delle Finanze e dell\'Agenzia delle Entrate possono essere',
    'comunicati ad altri soggetti pubblici in presenza di una norma di legge o di regolamento.',
    '',
    'I dati richiesti nel modello devono essere indicati obbligatoriamente per non incorrere in sanzioni.',
    '',
    'I dati verranno trattati con modalità prevalentemente informatizzate e con logiche pienamente rispondenti',
    'alle finalità da perseguire.'
  ]
  
  privacyText.forEach(line => {
    doc.text(line, 15, privacyY)
    privacyY += 6
  })
  
  // Add submission information
  privacyY += 10
  doc.setFont('helvetica', 'bold')
  doc.text('Application submitted through:', 15, privacyY)
  doc.setFont('helvetica', 'normal')
  privacyY += 6
  doc.text('InvestiScope - Professional Fiscal Code Service', 15, privacyY)
  privacyY += 6
  doc.text(`Email: ${formData.sottoscrittoEmail}`, 15, privacyY)
  privacyY += 6
  doc.text(`Phone: ${formData.sottoscrittoTelefono}`, 15, privacyY)
  
  // Return as blob
  return doc.output('blob')
}

// Helper function to draw text in boxes (for fiscal codes)
function drawBoxedText(doc: jsPDF, text: string, x: number, y: number, boxSize: number, maxBoxes: number) {
  for (let i = 0; i < maxBoxes; i++) {
    doc.rect(x + (i * (boxSize + 0.5)), y, boxSize, boxSize)
    if (i < text.length) {
      doc.text(text[i], x + (i * (boxSize + 0.5)) + 0.8, y + 2)
    }
  }
}

// Function to submit form with PDF
export async function submitFiscalCodeApplication(formData: AA4FormData) {
  try {
    // Generate PDF
    const pdfBlob = await generateAA4PDF(formData)
    
    // Create form data for submission
    const submitData = new FormData()
    submitData.append('pdf', pdfBlob, `fiscal-code-application-${Date.now()}.pdf`)
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        submitData.append(key, value.toString())
      }
    })
    
    // Submit to your API
    const response = await fetch('/api/fiscal-code-applications', {
      method: 'POST',
      body: submitData
    })
    
    if (!response.ok) {
      throw new Error('Failed to submit application')
    }
    
    const result = await response.json()
    
    // If you're using Supabase Storage
    if (result.id) {
      const pdfUrl = await uploadPDFToSupabase(pdfBlob, result.id)
      
      // Send confirmation email with PDF link
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        await (window as any).emailjs.send(
          'service_w6tghqr',
          'template_j0xsdcl',
          {
            to_email: formData.sottoscrittoEmail,
            user_name: formData.sottoscrittoNome,
            application_type: 'Fiscal Code Application',
            application_id: result.id,
            pdf_download_link: pdfUrl,
            status: 'submitted'
          }
        )
      }
    }
    
    return result
    
  } catch (error) {
    console.error('Error submitting application:', error)
    throw error
  }
}

// Upload PDF to Supabase Storage
async function uploadPDFToSupabase(pdfBlob: Blob, applicationId: string): Promise<string> {
  // This assumes you have Supabase client configured
  const { createClient } = await import('@supabase/supabase-js')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const fileName = `fiscal-code-applications/${applicationId}/form-aa4-8.pdf`
  
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, pdfBlob, {
      contentType: 'application/pdf',
      upsert: true
    })
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName)
  
  return publicUrl
}

// Integration with your form component
// Add this to your form's handleSubmit function:
/*
const handleSubmit = async () => {
  if (!validateForm()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  try {
    setIsSubmitting(true)
    
    // Submit with PDF generation
    const result = await submitFiscalCodeApplication(formData)
    
    console.log('Application submitted:', result)
    setShowSuccess(true)
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit application. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
*/
