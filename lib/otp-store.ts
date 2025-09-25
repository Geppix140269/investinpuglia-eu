// Shared OTP storage for Palazzo Robertini
// Works across serverless function instances

interface OTPData {
  otp: string
  expiresAt: number
  attempts: number
}

// Global store declaration
declare global {
  var palazzoRobertiniOTPStore: Map<string, OTPData> | undefined
}

// Create or reuse the global OTP store
const getOTPStore = (): Map<string, OTPData> => {
  if (!globalThis.palazzoRobertiniOTPStore) {
    globalThis.palazzoRobertiniOTPStore = new Map<string, OTPData>()
  }
  return globalThis.palazzoRobertiniOTPStore
}

export const otpStore = getOTPStore()

// Clean up expired OTPs
export const cleanupExpiredOTPs = () => {
  const now = Date.now()
  const store = getOTPStore()

  for (const [phone, data] of store.entries()) {
    if (data.expiresAt < now) {
      store.delete(phone)
    }
  }
}

// Auto cleanup every 10 minutes (only set once)
if (!globalThis.palazzoRobertiniOTPStore) {
  setInterval(cleanupExpiredOTPs, 10 * 60 * 1000)
}

export default otpStore