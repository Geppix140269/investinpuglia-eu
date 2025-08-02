// File: components/trullo/LoginStatus.tsx
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, CheckCircle } from 'lucide-react';

export default function LoginStatus() {
  const { user, signInWithGoogle } = useAuth();
  
  if (user) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs">
        <CheckCircle className="w-3 h-3" />
        <span>Verified: {user.email}</span>
      </div>
    );
  }
  
  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
    >
      <LogIn className="w-3 h-3" />
      <span>Sign in for verified contact</span>
    </button>
  );
}
