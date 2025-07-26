'use client'

import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

interface FormData {
  // Quadro A - Tipo Richiesta
  tipologiaRichiedente: 'D' | 'T'
  codiceFiscaleRichiedente?: string
  codiceFiscaleSottoscrittore?: string
  tipoRichiesta: string
  richiestaTesterinoCodiceFiscale: boolean
  motivazione?: string
  dataDecesso?: string
  
  // Quadro B - Dati Anagrafici
  codiceFiscale?: string
  cognome: string
  nome: string
  sesso: 'M' | 'F' | ''
  dataNascita: string
  comuneNascita: string
  provinciaNascita: string
  statoNascita: string
  
  // Quadro C - Residenza in Italia
  tipologiaVia: string
  indirizzo: string
  numeroCivico: string
  frazione: string
  comune: string
  provincia: string
  cap: string
  
  // Quadro D - Residenza Estera
  statoEstero: string
  statoFederato: string
  localitaResidenza: string
  indirizzoEstero: string
  codicePostale: string
  
  // Quadro E - Altri Codici Fiscali
  altroCodiceFiscale1: string
  altroCodiceFiscale2: string
  
  // Quadro F - Rappresentante Legale
  rappresentanteLegale: boolean
  rappresentanteNome?: string
  rappresentanteCognome?: string
  rappresentanteCodiceFiscale?: string
  rappresentanteQualifica?: string
  
  // Delega - Chi presenta la domanda
  presentataDa: 'interessato' | 'delegato' | 'erede'
  delegatoNome?: string
  delegatoCognome?: string
  delegatoCodiceFiscale?: string
  delegatoQualifica?: string
  
  // Autorizzazione InvestiScope
  autorizzaInvestiscope: boolean
  
  // Documenti Allegati
  documentoIdentita: boolean
  documentoSoggiorno?: boolean
  altriDocumenti?: string
  
  // Sottoscrizione
  sottoscrittoNome: string
  sottoscrittoEmail: string
  sottoscrittoTelefono: string
  sottoscrittoIndirizzo: string
  dataFirma: string
  firmaDigitale: string
  firmaFile?: File | null
}

export default function FiscalCodeForm() {
  const [formData, setFormData] = useState<FormData>({
    // Quadro A
    tipologiaRichiedente: 'D',
    tipoRichiesta: '1',
    richiestaTesterinoCodiceFiscale: false,
    
    // Quadro B
    cognome: '',
    nome: '',
    sesso: '',
    dataNascita: '',
    comuneNascita: '',
    provinciaNascita: '',
    statoNascita: 'ESTERO',
    
    // Quadro C
    tipologiaVia: 'Via',
    indirizzo: '',
    numeroCivico: '',
    frazione: '',
    comune: '',
    provincia: '',
    cap: '',
    
    // Quadro D
    statoEstero: '',
    statoFederato: '',
    localitaResidenza: '',
    indirizzoEstero: '',
    codicePostale: '',
    
    // Quadro E
    altroCodiceFiscale1: '',
    altroCodiceFiscale2: '',
    
    // Quadro F
    rappresentanteLegale: false,
    
    // Delega
    presentataDa: 'delegato',
    
    // Autorizzazione
    autorizzaInvestiscope: true,
    
    // Documenti
    documentoIdentita: true,
    
    // Sottoscrizione
    sottoscrittoNome: '',
    sottoscrittoEmail: '',
    sottoscrittoTelefono: '',
    sottoscrittoIndirizzo: '',
    dataFirma: new Date().toISOString().split('T')[0],
    firmaDigitale: '',
    firmaFile: null
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState('')
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
  }, [])

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = error => reject(error)
    })
  }

  // Countries list
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 
    'Italy', 'Netherlands', 'Switzerland', 'Austria', 'Belgium', 'Sweden', 'Norway', 'Denmark',
    'Brazil', 'Argentina', 'Mexico', 'China', 'Japan', 'India', 'South Korea', 'Singapore',
    'UAE', 'Saudi Arabia', 'South Africa', 'Russia', 'Other'
  ]

  // Italian provinces
  const provinces = [
    'AG', 'AL', 'AN', 'AO', 'AR', 'AP', 'AT', 'AV', 'BA', 'BT', 'BL', 'BN', 'BG', 'BI', 
    'BO', 'BZ', 'BS', 'BR', 'CA', 'CL', 'CB', 'CE', 'CT', 'CZ', 'CH', 'CO', 'CS', 'CR',
    'KR', 'CN', 'EN', 'FM', 'FE', 'FI', 'FG', 'FC', 'FR', 'GE', 'GO', 'GR', 'IM', 'IS',
    'SP', 'AQ', 'LT', 'LE', 'LC', 'LI', 'LO', 'LU', 'MC', 'MN', 'MS', 'MT', 'ME', 'MI',
    'MO', 'MB', 'NA', 'NO', 'NU', 'OR', 'PD', 'PA', 'PR', 'PV', 'PG', 'PU', 'PE', 'PC',
    'PI', 'PT', 'PN', 'PZ', 'PO', 'RG', 'RA', 'RC', 'RE', 'RI', 'RN', 'RM', 'RO', 'SA',
    'SS', 'SV', 'SI', 'SR', 'SO', 'TA', 'TE', 'TR', 'TO', 'TP', 'TN', 'TV', 'TS', 'UD',
    'VA', 'VE', 'VB', 'VC', 'VR', 'VV', 'VI', 'VT'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Required fields validation
    if (!formData.cognome) newErrors.cognome = 'Surname is required'
    if (!formData.nome) newErrors.nome = 'Name is required'
    if (!formData.sesso) newErrors.sesso = 'Sex is required'
    if (!formData.dataNascita) newErrors.dataNascita = 'Date of birth is required'
    if (!formData.comuneNascita) newErrors.comuneNascita = 'Place of birth is required'
    if (!formData.statoEstero) newErrors.statoEstero = 'Country is required'
    if (!formData.indirizzoEstero) newErrors.indirizzoEstero = 'Address is required'
    if (!formData.sottoscrittoEmail) newErrors.sottoscrittoEmail = 'Email is required'
    if (!formData.sottoscrittoTelefono) newErrors.sottoscrittoTelefono = 'Phone is required'
    if (!formData.sottoscrittoIndirizzo) newErrors.sottoscrittoIndirizzo = 'Address is required'
    if (!formData.firmaDigitale && !formData.firmaFile) newErrors.firmaDigitale = 'Signature is required (draw or upload)'
    
    // Email validation
    if (formData.sottoscrittoEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.sottoscrittoEmail)) {
      newErrors.sottoscrittoEmail = 'Invalid email format'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Signature pad functionality
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x, y
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return

    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x, y
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing && signatureCanvasRef.current) {
      setIsDrawing(false)
      const dataUrl = signatureCanvasRef.current.toDataURL()
      setFormData(prev => ({ ...prev, firmaDigitale: dataUrl }))
    }
  }

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFormData(prev => ({ ...prev, firmaDigitale: '' }))
  }

  const sendEmails = async (applicationId: string) => {
    try {
      // Send user confirmation email
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_FISCAL_USER_TEMPLATE_ID!,
        {
          to_email: formData.sottoscrittoEmail,
          user_name: `${formData.nome} ${formData.cognome}`,
          application_id: applicationId,
          submission_date: new Date().toLocaleDateString()
        }
      )

      // Send agency notification email
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_FISCAL_AGENCY_TEMPLATE_ID!,
        {
          applicant_name: `${formData.nome} ${formData.cognome}`,
          applicant_email: formData.sottoscrittoEmail,
          applicant_phone: formData.sottoscrittoTelefono,
          birth_date: formData.dataNascita,
          birth_place: formData.comuneNascita,
          country: formData.statoEstero,
          application_id: applicationId,
          submission_date: new Date().toLocaleDateString(),
          // Add authorization info
          presented_by: formData.presentataDa === 'delegato' ? 'InvestiScope S.r.l. (Authorized Delegate)' : 
                       formData.presentataDa === 'erede' ? `Heir: ${formData.delegatoNome} ${formData.delegatoCognome}` : 
                       'Direct Applicant',
          request_type: formData.tipoRichiesta === '1' ? 'First Time Application' :
                       formData.tipoRichiesta === '2' ? 'Data Update' :
                       formData.tipoRichiesta === '3' ? 'Death Notification' :
                       formData.tipoRichiesta === '4' ? 'Certificate Request' :
                       formData.tipoRichiesta === '5' ? 'Duplicate Request' : 'Unknown'
        }
      )
    } catch (error) {
      console.error('Email send error:', error)
      // Don't throw - emails are secondary to database save
    }
  }

  const handleSubmit = async () => {
    setSubmitError('')
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Prepare form data
      let submitData: any = { ...formData }
      
      // Convert file to base64 if exists
      if (formData.firmaFile) {
        submitData.firmaFile = await fileToBase64(formData.firmaFile)
        submitData.firmaFileName = formData.firmaFile.name
      }

      // Submit to API
      const response = await fetch('/api/fiscal-code-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }
      
      // Save application ID
      setApplicationId(data.id)
      
      // Send emails (don't await - let it run in background)
      sendEmails(data.id)
      
      // Show success
      setShowSuccess(true)
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Application Submitted Successfully!</h1>
            <p className="text-xl text-gray-600 mb-4">
              We've received your fiscal code application and will process it within 2-3 business days.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Your application ID is: <span className="font-mono font-bold text-emerald-600">{applicationId}</span>
            </p>
            <p className="text-gray-600">
              You will receive a confirmation email at <strong>{formData.sottoscrittoEmail}</strong> shortly.
            </p>
            <div className="mt-8">
              <a 
                href="/"
                className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:shadow-lg transition-all"
              >
                Return to Home
              </a>
            </div>
          </div>

          {/* QUADRO F - Rappresentante Legale */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">F</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO F - Rappresentante Legale (Legal Representative)</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rappresentanteLegale"
                  checked={formData.rappresentanteLegale}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Richiesta presentata da rappresentante legale (Request submitted by legal representative)
                </span>
              </label>

              {formData.rappresentanteLegale && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome Rappresentante (Representative Surname)
                    </label>
                    <input
                      type="text"
                      name="rappresentanteCognome"
                      value={formData.rappresentanteCognome || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Rappresentante (Representative Name)
                    </label>
                    <input
                      type="text"
                      name="rappresentanteNome"
                      value={formData.rappresentanteNome || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Codice Fiscale Rappresentante
                    </label>
                    <input
                      type="text"
                      name="rappresentanteCodiceFiscale"
                      value={formData.rappresentanteCodiceFiscale || ''}
                      onChange={handleInputChange}
                      maxLength={16}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-mono uppercase"
                      placeholder="XXXXXXXXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualifica (Title/Role)
                    </label>
                    <input
                      type="text"
                      name="rappresentanteQualifica"
                      value={formData.rappresentanteQualifica || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="e.g., Parent, Guardian, etc."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delega Section - Who is submitting */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">📋</span>
              <h3 className="text-2xl font-bold text-gray-800">Presentazione Domanda - Application Submission</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">La domanda è presentata da:</label>
                <div className="space-y-3">
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-start gap-3 ${formData.presentataDa === 'interessato' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="presentataDa"
                      value="interessato"
                      checked={formData.presentataDa === 'interessato'}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Direttamente dall'interessato</span>
                      <p className="text-sm text-gray-600 mt-1">Directly by the applicant</p>
                    </div>
                  </label>

                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-start gap-3 ${formData.presentataDa === 'delegato' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="presentataDa"
                      value="delegato"
                      checked={formData.presentataDa === 'delegato'}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Da persona delegata</span>
                      <p className="text-sm text-gray-600 mt-1">By authorized delegate</p>
                    </div>
                  </label>

                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-start gap-3 ${formData.presentataDa === 'erede' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="presentataDa"
                      value="erede"
                      checked={formData.presentataDa === 'erede'}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Da erede</span>
                      <p className="text-sm text-gray-600 mt-1">By heir (for deceased persons)</p>
                    </div>
                  </label>
                </div>
              </div>

              {formData.presentataDa === 'delegato' && (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h4 className="font-semibold text-emerald-900 mb-4">✅ Autorizzazione InvestiScope</h4>
                  <p className="text-sm text-emerald-800 mb-4">
                    Il sottoscritto autorizza <strong>InvestiScope S.r.l.</strong> a presentare questa domanda 
                    per suo conto presso l'Agenzia delle Entrate italiana.
                  </p>
                  <p className="text-sm text-emerald-800">
                    The undersigned authorizes <strong>InvestiScope S.r.l.</strong> to submit this application 
                    on their behalf to the Italian Revenue Agency.
                  </p>
                </div>
              )}

              {(formData.presentataDa === 'delegato' || formData.presentataDa === 'erede') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome {formData.presentataDa === 'erede' ? 'Erede' : 'Delegato'} (Surname)
                    </label>
                    <input
                      type="text"
                      name="delegatoCognome"
                      value={formData.delegatoCognome || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome {formData.presentataDa === 'erede' ? 'Erede' : 'Delegato'} (Name)
                    </label>
                    <input
                      type="text"
                      name="delegatoNome"
                      value={formData.delegatoNome || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Codice Fiscale {formData.presentataDa === 'erede' ? 'Erede' : 'Delegato'}
                    </label>
                    <input
                      type="text"
                      name="delegatoCodiceFiscale"
                      value={formData.delegatoCodiceFiscale || ''}
                      onChange={handleInputChange}
                      maxLength={16}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-mono uppercase"
                      placeholder="XXXXXXXXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {formData.presentataDa === 'erede' ? 'Grado di parentela' : 'In qualità di'} (Relationship/Role)
                    </label>
                    <input
                      type="text"
                      name="delegatoQualifica"
                      value={formData.delegatoQualifica || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder={formData.presentataDa === 'erede' ? 'e.g., Son, Daughter' : 'e.g., Accountant, Lawyer'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documenti Allegati - Required Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">📎</span>
              <h3 className="text-2xl font-bold text-gray-800">Documenti Allegati - Required Documents</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  The following documents must be presented when collecting the fiscal code:
                </p>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="documentoIdentita"
                  checked={formData.documentoIdentita}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Documento di identità in corso di validità (Valid ID document) <span className="text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="documentoSoggiorno"
                  checked={formData.documentoSoggiorno || false}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Permesso di soggiorno (Residence permit - if applicable)
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altri documenti (Other documents - if any)
                </label>
                <textarea
                  name="altriDocumenti"
                  value={formData.altriDocumenti || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="List any additional documents..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              InvestiScope™
            </h1>
            <span className="text-sm text-gray-600">Official Form AA4/8</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600">Secure Application</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            DOMANDA DI ATTRIBUZIONE CODICE FISCALE
          </h2>
          <p className="text-xl opacity-90">
            Fiscal Code Application for International Citizens
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {submitError}
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* QUADRO A - Request Type */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">A</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO A - Tipo Richiesta</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sezione I - Tipologia richiedente</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.tipologiaRichiedente === 'D' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="tipologiaRichiedente"
                      value="D"
                      checked={formData.tipologiaRichiedente === 'D'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="font-medium">Direct Request (D)</span>
                    <p className="text-sm text-gray-600 mt-1">For yourself</p>
                  </label>
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.tipologiaRichiedente === 'T' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="tipologiaRichiedente"
                      value="T"
                      checked={formData.tipologiaRichiedente === 'T'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="font-medium">Third Party (T)</span>
                    <p className="text-sm text-gray-600 mt-1">On behalf of someone</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sezione II - Tipo richiesta</label>
                <select
                  name="tipoRichiesta"
                  value={formData.tipoRichiesta}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="1">1 - Attribuzione Codice Fiscale (First Time Application)</option>
                  <option value="2">2 - Variazione Dati (Data Update)</option>
                  <option value="3">3 - Comunicazione Decesso (Death Notification)</option>
                  <option value="4">4 - Richiesta Certificato (Certificate Request)</option>
                  <option value="5">5 - Richiesta Duplicato (Duplicate Request)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="richiestaTesterinoCodiceFiscale"
                    checked={formData.richiestaTesterinoCodiceFiscale}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Richiesta tesserino codice fiscale (Request fiscal code card)
                  </span>
                </label>
              </div>

              {formData.tipoRichiesta === '3' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Decesso (Date of Death)
                  </label>
                  <input
                    type="date"
                    name="dataDecesso"
                    value={formData.dataDecesso || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          {/* QUADRO B - Personal Data */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">B</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO B - Dati Anagrafici</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cognome (Surname) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.cognome ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="As shown in passport"
                />
                {errors.cognome && <p className="text-red-500 text-sm mt-1">{errors.cognome}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome (Given Names) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.nome ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="All given names"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sesso (Sex) <span className="text-red-500">*</span>
                </label>
                <select
                  name="sesso"
                  value={formData.sesso}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.sesso ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                >
                  <option value="">Select...</option>
                  <option value="M">M - Male</option>
                  <option value="F">F - Female</option>
                </select>
                {errors.sesso && <p className="text-red-500 text-sm mt-1">{errors.sesso}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data di Nascita (Date of Birth) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dataNascita"
                  value={formData.dataNascita}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.dataNascita ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                />
                {errors.dataNascita && <p className="text-red-500 text-sm mt-1">{errors.dataNascita}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comune di Nascita (Birth Municipality) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="comuneNascita"
                  value={formData.comuneNascita}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.comuneNascita ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="City or country if foreign"
                />
                {errors.comuneNascita && <p className="text-red-500 text-sm mt-1">{errors.comuneNascita}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provincia (Province - if born in Italy)
                </label>
                <select
                  name="provinciaNascita"
                  value={formData.provinciaNascita}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="">Not applicable</option>
                  {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stato di Nascita (Country of Birth) <span className="text-red-500">*</span>
                </label>
                <select
                  name="statoNascita"
                  value={formData.statoNascita}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="ITALIA">Italia</option>
                  <option value="ESTERO">Estero (Foreign)</option>
                </select>
              </div>
            </div>
          </div>

          {/* QUADRO C - Italian Residence (Optional) */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">C</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO C - Residenza in Italia (Optional)</h3>
            </div>

            <p className="text-gray-600 mb-6">Complete only if you have an Italian residence</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipologia e Indirizzo (Street Type and Name)
                </label>
                <div className="flex gap-4">
                  <select
                    name="tipologiaVia"
                    value={formData.tipologiaVia}
                    onChange={handleInputChange}
                    className="w-32 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    <option value="Via">Via</option>
                    <option value="Piazza">Piazza</option>
                    <option value="Corso">Corso</option>
                    <option value="Viale">Viale</option>
                    <option value="Largo">Largo</option>
                  </select>
                  <input
                    type="text"
                    name="indirizzo"
                    value={formData.indirizzo}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Street name"
                  />
                  <input
                    type="text"
                    name="numeroCivico"
                    value={formData.numeroCivico}
                    onChange={handleInputChange}
                    className="w-24 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="No."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comune (Municipality)
                </label>
                <input
                  type="text"
                  name="comune"
                  value={formData.comune}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provincia (Province)
                </label>
                <select
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  C.A.P. (Postal Code)
                </label>
                <input
                  type="text"
                  name="cap"
                  value={formData.cap}
                  onChange={handleInputChange}
                  maxLength={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="00000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frazione/Altro
                </label>
                <input
                  type="text"
                  name="frazione"
                  value={formData.frazione}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* QUADRO D - Foreign Residence */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">D</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO D - Residenza Estera</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stato Estero (Foreign Country) <span className="text-red-500">*</span>
                </label>
                <select
                  name="statoEstero"
                  value={formData.statoEstero}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.statoEstero ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                >
                  <option value="">Select your country...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.statoEstero && <p className="text-red-500 text-sm mt-1">{errors.statoEstero}</p>}
                
                {/* Quick select buttons */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, statoEstero: 'United States' }))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    🇺🇸 USA
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, statoEstero: 'United Kingdom' }))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    🇬🇧 UK
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, statoEstero: 'Canada' }))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    🇨🇦 Canada
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, statoEstero: 'Germany' }))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    🇩🇪 Germany
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, statoEstero: 'France' }))}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    🇫🇷 France
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stato Federato/Provincia/Contea
                </label>
                <input
                  type="text"
                  name="statoFederato"
                  value={formData.statoFederato}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="State/Province/County"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Località di Residenza (City)
                </label>
                <input
                  type="text"
                  name="localitaResidenza"
                  value={formData.localitaResidenza}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="City name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indirizzo (Street Address) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="indirizzoEstero"
                  value={formData.indirizzoEstero}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.indirizzoEstero ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="Full street address"
                />
                {errors.indirizzoEstero && <p className="text-red-500 text-sm mt-1">{errors.indirizzoEstero}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Codice Postale (Postal Code)
                </label>
                <input
                  type="text"
                  name="codicePostale"
                  value={formData.codicePostale}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="ZIP/Postal Code"
                />
              </div>
            </div>
          </div>

          {/* QUADRO E - Other Fiscal Codes */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">E</span>
              <h3 className="text-2xl font-bold text-gray-800">QUADRO E - Altri Codici Fiscali (Optional)</h3>
            </div>

            <p className="text-gray-600 mb-6">List any other fiscal codes previously assigned</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Codice Fiscale 1
                </label>
                <input
                  type="text"
                  name="altroCodiceFiscale1"
                  value={formData.altroCodiceFiscale1}
                  onChange={handleInputChange}
                  maxLength={16}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-mono uppercase"
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Codice Fiscale 2
                </label>
                <input
                  type="text"
                  name="altroCodiceFiscale2"
                  value={formData.altroCodiceFiscale2}
                  onChange={handleInputChange}
                  maxLength={16}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-mono uppercase"
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </div>
            </div>
          </div>

          {/* Sottoscrizione - Signature Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">✍️</span>
              <h3 className="text-2xl font-bold text-gray-800">Sottoscrizione - Authorization</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Il/La sottoscritto/a (Full Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sottoscrittoNome"
                  value={formData.sottoscrittoNome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Your full legal name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="sottoscrittoEmail"
                  value={formData.sottoscrittoEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.sottoscrittoEmail ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="your@email.com"
                />
                {errors.sottoscrittoEmail && <p className="text-red-500 text-sm mt-1">{errors.sottoscrittoEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono (Phone) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="sottoscrittoTelefono"
                  value={formData.sottoscrittoTelefono}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.sottoscrittoTelefono ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="+1 234 567 8900"
                />
                {errors.sottoscrittoTelefono && <p className="text-red-500 text-sm mt-1">{errors.sottoscrittoTelefono}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indirizzo (Address) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sottoscrittoIndirizzo"
                  value={formData.sottoscrittoIndirizzo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.sottoscrittoIndirizzo ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                  placeholder="Full address including city and country"
                />
                {errors.sottoscrittoIndirizzo && <p className="text-red-500 text-sm mt-1">{errors.sottoscrittoIndirizzo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data (Date)
                </label>
                <input
                  type="date"
                  name="dataFirma"
                  value={formData.dataFirma}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Digital Signature */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Firma (Signature) <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Signature Options */}
              <div className="space-y-4">
                {/* Option 1: Draw Signature */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Option 1: Draw Your Signature</h4>
                  
                  {formData.firmaDigitale && !formData.firmaFile && (
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-sm text-red-600 hover:text-red-700 mb-2"
                    >
                      Clear Signature
                    </button>
                  )}
                  
                  <div className={`border-2 rounded-lg p-2 bg-gray-50 ${errors.firmaDigitale ? 'border-red-500' : 'border-gray-300'}`}>
                    <canvas
                      ref={signatureCanvasRef}
                      width={600}
                      height={150}
                      className="w-full h-40 bg-white rounded cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      style={{ touchAction: 'none' }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Sign above using your mouse or finger</p>
                </div>

                {/* Option 2: Upload Signature */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Option 2: Upload Signature File</h4>
                  
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData(prev => ({ ...prev, firmaFile: file }))
                        // Clear drawn signature if file is uploaded
                        if (formData.firmaDigitale) {
                          clearSignature()
                        }
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  {formData.firmaFile && (
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-green-600">✓ File uploaded: {formData.firmaFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, firmaFile: null }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2">Accepted formats: JPG, PNG, PDF</p>
                </div>
              </div>

              {errors.firmaDigitale && <p className="text-red-500 text-sm mt-2">{errors.firmaDigitale}</p>}
            </div>

            {/* Legal Declaration */}
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-2">⚖️ Legal Declaration</h4>
              <p className="text-sm text-amber-800">
                By signing this form, I declare that all information provided is true and accurate. 
                I understand that false declarations are punishable under Italian law. I authorize 
                InvestiScope to submit this application on my behalf to the Italian Revenue Agency.
              </p>
            </div>
          </div>

          {/* DELEGA - Delegation Section (as per PDF) */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">👤</span>
              <h3 className="text-2xl font-bold text-gray-800">DELEGA - Delegation</h3>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700">
                _l_ sottoscritt_ (The undersigned) delegates someone to:
              </p>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>a presentare il modello per suo conto e a ritirare l'eventuale certificazione rilasciata dall'ufficio</strong>
                </p>
                <p className="text-sm text-gray-600 italic">
                  (to submit this form on their behalf and collect any certification issued by the office)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome e Cognome del Delegato (Delegate's Full Name)
                  </label>
                  <input
                    type="text"
                    placeholder="Full name of person you're delegating"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nato/a a (Born in)
                  </label>
                  <input
                    type="text"
                    placeholder="Place of birth"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    il (on date)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Codice Fiscale del Delegato
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-mono uppercase"
                    placeholder="Delegate's fiscal code (if available)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DATA (Date)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FIRMA del Delegante (Signature of Delegator)
                  </label>
                  <div className="border-2 border-gray-300 rounded-lg p-4 text-center text-gray-500">
                    Signature space - to be signed on printed form
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center py-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-full transition-all duration-200 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application - €99'}
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Secure submission • Official processing • 2-3 day delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
