// Authentication utilities for Trullo

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userAuthenticated') === 'true';
  }
  return false;
}

export function setAuthenticated(value: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userAuthenticated', value.toString());
  }
}

export function getUserInfo() {
  return {
    id: 'user-' + Date.now(),
    email: 'user@example.com',
    name: 'Guest User'
  };
}

export function checkIfClaimsToBeGiuseppe(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes("i am giuseppe") || 
         lowerMessage.includes("i'm giuseppe") ||
         lowerMessage.includes("this is giuseppe");
}

export function isPasswordAttempt(message: string, language?: string): boolean {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes("password") || 
         lowerMessage.includes("pass") ||
         lowerMessage.includes("pwd");
}

export function verifyGiuseppePassword(password: string): boolean {
  // In production, this would check against a secure hash
  return password === "SecurePassword123!";
}

export function getWrongPasswordResponse(): string {
  return "Invalid password. Please try again.";
}

export const authPrompts = {
  requestPassword: "Please enter your password to continue.",
  welcome: "Welcome, Giuseppe! You now have admin access.",
  unauthorized: "You need to be authenticated to perform this action."
};

