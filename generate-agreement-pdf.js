const fs = require('fs');
const { jsPDF } = require('jspdf');

// Read the markdown content
const content = fs.readFileSync('CLIENT_AGREEMENT_TEMPLATE.md', 'utf8');

// Create new PDF document
const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

// Set initial position
let yPosition = 20;
const leftMargin = 15;
const rightMargin = 195;
const lineHeight = 7;
const pageHeight = 280;

// Split content into lines
const lines = content.split('\n');

// Process each line
lines.forEach((line) => {
  // Check if we need a new page
  if (yPosition > pageHeight) {
    doc.addPage();
    yPosition = 20;
  }

  // Handle different markdown elements
  if (line.startsWith('# ')) {
    // Main title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(line.substring(2), leftMargin, yPosition);
    yPosition += lineHeight * 1.5;
  } else if (line.startsWith('## ')) {
    // Section headers
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(line.substring(3), leftMargin, yPosition);
    yPosition += lineHeight * 1.3;
  } else if (line.startsWith('### ')) {
    // Subsection headers
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(line.substring(4), leftMargin, yPosition);
    yPosition += lineHeight * 1.2;
  } else if (line.startsWith('#### ')) {
    // Sub-subsection headers
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(line.substring(5), leftMargin, yPosition);
    yPosition += lineHeight;
  } else if (line.startsWith('**') && line.endsWith('**')) {
    // Bold text
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    const text = line.substring(2, line.length - 2);
    const splitText = doc.splitTextToSize(text, rightMargin - leftMargin);
    doc.text(splitText, leftMargin, yPosition);
    yPosition += lineHeight * splitText.length;
  } else if (line.startsWith('- ')) {
    // Bullet points
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const text = '• ' + line.substring(2);
    const splitText = doc.splitTextToSize(text, rightMargin - leftMargin - 5);
    doc.text(splitText, leftMargin + 5, yPosition);
    yPosition += lineHeight * splitText.length;
  } else if (line.trim() === '---') {
    // Horizontal line
    doc.line(leftMargin, yPosition, rightMargin, yPosition);
    yPosition += lineHeight;
  } else if (line.trim() === '') {
    // Empty line
    yPosition += lineHeight * 0.5;
  } else {
    // Regular text
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // Process inline bold text
    let processedLine = line;
    if (processedLine.includes('**')) {
      // For now, just remove the markdown formatting
      processedLine = processedLine.replace(/\*\*/g, '');
    }
    
    const splitText = doc.splitTextToSize(processedLine, rightMargin - leftMargin);
    doc.text(splitText, leftMargin, yPosition);
    yPosition += lineHeight * splitText.length;
  }
});

// Save the PDF
doc.save('CLIENT_AGREEMENT_1402_CELSIUS.pdf');
console.log('PDF generated successfully: CLIENT_AGREEMENT_1402_CELSIUS.pdf');