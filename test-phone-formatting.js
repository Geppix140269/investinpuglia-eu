// Test script for phone number formatting
// Run with: node test-phone-formatting.js

const { formatWhatsAppNumber } = require('./lib/twilio/client.ts');

// Test cases for UK and Italian numbers
const testNumbers = [
  // UK numbers - various formats
  '07123456789',    // Standard UK mobile with 0
  '7123456789',     // UK mobile without 0
  '+447123456789',  // Already formatted UK
  '0044123456789',  // UK with 00 prefix
  '447123456789',   // UK without + prefix

  // Italian numbers
  '3123456789',     // Italian mobile
  '+393123456789',  // Already formatted Italian
  '0393123456789',  // Italian with 0 prefix
  '393123456789',   // Italian without + prefix

  // Edge cases
  '+12345678901',   // US number (should pass through)
  '1234567890',     // Ambiguous number
];

console.log('🧪 Testing Phone Number Formatting\n');

testNumbers.forEach((number, index) => {
  try {
    const formatted = formatWhatsAppNumber(number);
    console.log(`${index + 1}. Input: "${number}" → Output: "${formatted}"`);
  } catch (error) {
    console.log(`${index + 1}. Input: "${number}" → ERROR: ${error.message}`);
  }
});

console.log('\n✨ Test completed!');