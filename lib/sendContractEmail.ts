// lib/sendContractEmail.ts
import emailjs from '@emailjs/browser'

type ContractEmailPayload = {
  to: string
  subject: string
  pdfUrl: string
  formData: Record<string, any>
}

export async function sendContractEmail({ to, subject, pdfUrl, formData }: ContractEmailPayload) {
  try {
    const response = await emailjs.send(
      'service_w6tghqr', // Your EmailJS service ID
      'template_a47xzn7', // Your EmailJS template ID
      {
        to_email: to,
        subject,
        pdf_link: pdfUrl,
        ...formData,
      },
      'wKn1_xMCtZssdZzpb' // Your EmailJS public key
    )

    return response
  } catch (err: any) {
    console.error('EmailJS send failed:', err.message)
    throw err
  }
}
