import { useState, useCallback } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

export default function VoiceInput({ onTranscript, lang = 'en' }) {
  const { lang: appLang } = useLanguage();
  const [listening, setListening] = useState(false);
  const [supported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const toggleListening = useCallback(() => {
    if (listening) { setListening(false); return; }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = appLang === 'np' ? 'ne-NP' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript?.(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    setListening(true);
  }, [listening, appLang, onTranscript]);

  if (!supported) return null;

  return (
    <button type="button" onClick={toggleListening}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
        listening
          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
      }`}
      title={listening ? 'Listening...' : 'Voice input'}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
      {listening ? 'Speak now...' : 'Voice'}
    </button>
  );
}