// File: components/trullo/LoginStatus.tsx
import { useAuth } from '@/contexts/AuthContext';

export default function LoginStatus() {
  const { user, signInWithGoogle } = useAuth();
  
  if (user) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs">
        <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        <span>Verified: {user.email}</span>
      </div>
    );
  }
  
  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      <span>Sign in for verified contact</span>
    </button>
  );
}
