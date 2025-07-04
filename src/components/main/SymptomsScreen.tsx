
import React, { useState } from 'react';
import { ArrowLeft, Mic, Type, Send, Bot, User, AlertTriangle, Phone } from 'lucide-react';
import { Button } from '../ui/button';

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
      content: 'Hujambo! I\'m your AI health assistant. Please describe your symptoms in detail. I can help in English, Swahili, or Sheng.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Based on your symptoms, I recommend you monitor your condition closely. If symptoms persist or worsen, please consult a healthcare professional. Would you like me to help you find nearby hospitals?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  const quickSymptoms = [
    'Headache',
    'Fever',
    'Cough',
    'Stomach pain',
    'Fatigue',
    'Nausea'
  ];

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
            variant={isVoiceActive ? "default" : "outline"}
            size="sm"
            onClick={handleVoiceInput}
            className={isVoiceActive ? 'animate-pulse' : ''}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Describe your symptoms..."
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
          Available in English, Swahili & Sheng
        </p>
      </div>
    </div>
  );
};

export default SymptomsScreen;
