// lib/sendContractWithEmailJS.ts
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_w6tghqr";
const EMAILJS_TEMPLATE_ID = "template_a47xzn7";
const EMAILJS_PUBLIC_KEY = "wKn1_xMCtZssdZzpb";

export async function sendContractWithEmailJS({
  to,
  subject,
  pdfUrl,
  formData,
}: {
  to: string;
  subject: string;
  pdfUrl: string;
  formData: Record<string, string>;
}) {
  const templateParams = {
    to_email: to,
    subject,
    pdf_url: pdfUrl,
    ...formData,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}
