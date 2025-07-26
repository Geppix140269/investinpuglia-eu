// lib/generatePdfBlob.ts
import jsPDF from "jspdf";

export function generatePdfBlob(form: Record<string, string>) {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("CONTRATTO PRELIMINARE DI COMPRAVENDITA", 20, 20);

  doc.text(`Il/La Sig./Sig.ra ${form.sellerName}, nato a ${form.sellerBirth}`, 20, 30);
  doc.text(`Codice Fiscale: ${form.sellerCF}`, 20, 36);
  doc.text(`Residente in: ${form.sellerAddress}`, 20, 42);

  doc.text("- e -", 20, 50);

  doc.text(`${form.buyerName}, in qualità di legale rappresentante di ${form.companyName}`, 20, 56);
  doc.text(`P.IVA: ${form.vatNumber} - CF: ${form.buyerCF}`, 20, 62);
  doc.text(`Con sede in: ${form.buyerAddress}`, 20, 68);

  doc.text(`Immobile sito in ${form.propertyAddress}`, 20, 76);
  doc.text(`Dati catastali: ${form.cadastralData}`, 20, 82);

  doc.text(`Prezzo: €${form.price} - Caparra: €${form.deposit}`, 20, 90);
  doc.text(`Rogito previsto entro il ${form.deedDate}`, 20, 96);

  doc.text("Clausola sospensiva Mini PIA:", 20, 108);
  doc.text(`Il presente contratto è subordinato all'approvazione del finanziamento Mini PIA`, 20, 114);
  doc.text(`entro la data del ${form.financingDeadline}. In caso contrario, le parti si impegnano a recedere senza penali.`, 20, 120);

  doc.text(`Foro competente: ${form.court}`, 20, 130);

  doc.text("Firme:", 20, 150);
  doc.text("Venditore: ___________________", 20, 158);
  doc.text("Acquirente: __________________", 20, 164);

  return doc.output("blob");
}
