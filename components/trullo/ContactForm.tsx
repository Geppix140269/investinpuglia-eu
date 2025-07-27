// PATH: components/trullo/ContactForm.tsx
import React, { useState } from 'react';
import { MessageForm, Language } from './types';
import { translations } from './constants/translations';
import { sendEmailMessage, saveContactRequest } from './utils/api';

interface ContactFormProps {
  language: Language;
  conversationId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ContactForm({ language, conversationId, onSuccess, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState<MessageForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const t = translations[language].messageForm;

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSending(true);

    try {
      // Save to Supabase
      if (conversationId) {
        await saveContactRequest(conversationId, formData, language);
      }

      // Send email
      await sendEmailMessage(formData, language);

      onSuccess();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(t.error + ': ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {t.title}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={t.name}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          required
        />
        <input
          type="email"
          placeholder={t.email}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          required
        />
        <input
          type="tel"
          placeholder={t.phone}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
        />
        <textarea
          placeholder={t.message}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 h-32 resize-none"
          required
        />
        <div className="flex space-x-3">
          <button
            onClick={handleSubmit}
            disabled={isSending || !formData.name || !formData.email || !formData.message}
            className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSending ? t.sending : t.send}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
