// Authentication utilities for Trullo

export function isAuthenticated(): boolean {
  // Placeholder authentication check
  // In production, this would check against your auth system
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
  // Placeholder for user information
  return {
    id: 'user-' + Date.now(),
    email: 'user@example.com',
    name: 'Guest User'
  };
}
