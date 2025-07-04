
import React, { useState } from 'react';
import { ArrowLeft, Mic, Type, Send, Bot, User, AlertTriangle, Phone, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';

interface SymptomsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const SymptomsScreen: React.FC<SymptomsScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hujambo! I\'m your AI health assistant. Please describe your symptoms in detail. I can help in English, Swahili, Sheng, Luo, Kikuyu, and Luhya.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const { isListening, transcript, isSupported, startListening, stopListening } = useVoiceRecognition({
    language: selectedLanguage,
    continuous: false,
    interimResults: true
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'sheng', name: 'Sheng', flag: '🇰🇪' },
    { code: 'luo', name: 'Luo', flag: '🇰🇪' },
    { code: 'kikuyu', name: 'Kikuyu', flag: '🇰🇪' },
    { code: 'luhya', name: 'Luhya', flag: '🇰🇪' }
  ];

  // Update input text when speech recognition produces results
  React.useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Enhanced AI response based on language and symptoms
    setTimeout(() => {
      let botResponse = '';
      const symptoms = inputText.toLowerCase();
      
      // Check for severe symptoms that require immediate attention
      const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious', 'stroke'];
      const hasEmergencySymptom = emergencySymptoms.some(symptom => symptoms.includes(symptom));
      
      if (hasEmergencySymptom) {
        botResponse = 'I detect you may be experiencing serious symptoms. Please call emergency services immediately or go to the nearest hospital. Do not delay seeking medical attention.';
      } else if (symptoms.includes('fever') && symptoms.includes('cough')) {
        botResponse = 'Based on your symptoms of fever and cough, this could indicate a respiratory infection. I recommend monitoring your temperature, staying hydrated, and consulting a healthcare provider if symptoms worsen or persist beyond 3 days.';
      } else if (symptoms.includes('headache')) {
        botResponse = 'Headaches can have various causes including stress, dehydration, or tension. Try drinking water, resting in a quiet dark room, and gentle neck stretches. If severe or persistent, please consult a doctor.';
      } else {
        botResponse = 'Thank you for describing your symptoms. Based on what you\'ve shared, I recommend monitoring your condition closely. If symptoms persist or worsen, please consult a healthcare professional. Would you like me to help you find nearby hospitals?';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      if (!isSupported) {
        alert('Voice recognition is not supported in your browser. Please use the text input instead.');
        return;
      }
      startListening();
    }
  };

  const handleLanguageChange = (langCode: string) => {
    if (['en', 'sw', 'luo', 'kikuyu', 'luhya'].includes(langCode)) {
      setSelectedLanguage(langCode);
    } else {
      alert('Coming soon! We are working on adding more languages.');
    }
    setShowLanguageOptions(false);
  };

  const quickSymptoms = [
    'Headache', 'Fever', 'Cough', 'Stomach pain', 'Fatigue', 'Nausea',
    'Dizziness', 'Sore throat', 'Back pain', 'Joint pain'
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">AI Health Assistant</h1>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('emergency')}>
              <Phone className="w-6 h-6 text-red-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4 rounded-r-xl">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-red-800">
              <strong>Emergency:</strong> If you're experiencing chest pain, difficulty breathing, 
              or other severe symptoms, call 911 immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="px-6 py-4">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            className="flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>{currentLanguage.flag} {currentLanguage.name}</span>
          </Button>
          
          {showLanguageOptions && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-40 min-w-48">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {!['en', 'sw', 'luo', 'kikuyu', 'luhya'].includes(lang.code) && (
                    <span className="text-xs text-gray-500">(Coming Soon)</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-primary ml-2' : 'bg-gray-100 mr-2'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-primary text-white rounded-br-md' 
                    : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Symptoms */}
      {messages.length === 1 && (
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 mb-3">Quick symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((symptom, index) => (
              <button
                key={index}
                onClick={() => setInputText(symptom)}
                className="px-3 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={handleVoiceInput}
            className={`${isListening ? 'animate-pulse bg-red-600 hover:bg-red-700' : ''} ${!isSupported ? 'opacity-50' : ''}`}
            disabled={!isSupported}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={`Describe your symptoms in ${currentLanguage.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-12"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Available in English, Swahili, Sheng, Luo, Kikuyu & Luhya
        </p>
      </div>
    </div>
  );
};

export default SymptomsScreen;
