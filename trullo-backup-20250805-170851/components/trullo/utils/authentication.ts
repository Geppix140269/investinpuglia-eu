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
  return password === "SecurePassword123!";
}

export function getWrongPasswordResponse(language?: string): string {
  return "Invalid password. Please try again.";
}

export const authPrompts = {
  en: {
    askForPassword: "Please enter your password to continue.",
    authenticated: "Welcome, Giuseppe! You now have admin access.",
    unauthorized: "You need to be authenticated to perform this action."
  },
  it: {
    askForPassword: "Inserisci la password per continuare.",
    authenticated: "Benvenuto, Giuseppe! Ora hai accesso amministratore.",
    unauthorized: "Devi essere autenticato per eseguire questa azione."
  },
  fr: {
    askForPassword: "Veuillez entrer votre mot de passe pour continuer.",
    authenticated: "Bienvenue, Giuseppe! Vous avez maintenant un accès administrateur.",
    unauthorized: "Vous devez être authentifié pour effectuer cette action."
  },
  de: {
    askForPassword: "Bitte geben Sie Ihr Passwort ein, um fortzufahren.",
    authenticated: "Willkommen, Giuseppe! Sie haben jetzt Administratorzugriff.",
    unauthorized: "Sie müssen authentifiziert sein, um diese Aktion auszuführen."
  },
  ar: {
    askForPassword: "الرجاء إدخال كلمة المرور للمتابعة.",
    authenticated: "مرحباً جوزيبي! لديك الآن صلاحيات المسؤول.",
    unauthorized: "يجب أن تكون مصادقاً لتنفيذ هذا الإجراء."
  },
  zh: {
    askForPassword: "请输入密码以继续。",
    authenticated: "欢迎，Giuseppe！您现在拥有管理员权限。",
    unauthorized: "您需要进行身份验证才能执行此操作。"
  },
  es: {
    askForPassword: "Por favor, ingrese su contraseña para continuar.",
    authenticated: "¡Bienvenido, Giuseppe! Ahora tienes acceso de administrador.",
    unauthorized: "Necesitas estar autenticado para realizar esta acción."
  }
};