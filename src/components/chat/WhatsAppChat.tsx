
import React, { useState } from 'react';
import { MessageCircle, Send, X, User, Bot, Shuffle } from 'lucide-react';
import { Button } from '../ui/button';
import { sampleConversations } from '../../data/sampleConversations';

interface WhatsAppChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Haraka-Afya AI assistant. How can I help you today? 🏥',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showConnectOption, setShowConnectOption] = useState(false);

  const loadSampleConversation = () => {
    const randomConversation = sampleConversations[Math.floor(Math.random() * sampleConversations.length)];
    const conversationMessages = randomConversation.messages.map(msg => ({
      id: Date.now().toString() + Math.random(),
      type: msg.type,
      content: msg.content,
      timestamp: new Date()
    }));
    
    setMessages(conversationMessages);
    setShowConnectOption(true);
  };

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

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Thank you for your message. I can help with basic health questions. For more detailed consultation, would you like to connect with a real healthcare professional?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setShowConnectOption(true);
    }, 1000);
  };

  const handleConnectToWhatsApp = () => {
    const phoneNumber = '254113245740';
    const message = encodeURIComponent('Hello, I need medical assistance from Haraka-Afya');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4 md:items-center md:justify-center">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:w-96 h-[80vh] md:h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-3xl md:rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Haraka-Afya Support</h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadSampleConversation}
              className="text-white hover:bg-white/20"
              title="Load sample conversation"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-green-600 ml-2' : 'bg-gray-100 mr-2'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-3 py-2 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-green-600 text-white rounded-br-md' 
                    : 'bg-gray-100 text-gray-900 rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-green-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {showConnectOption && (
            <div className="flex justify-center">
              <Button
                onClick={handleConnectToWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Connect to WhatsApp Support
              </Button>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;
