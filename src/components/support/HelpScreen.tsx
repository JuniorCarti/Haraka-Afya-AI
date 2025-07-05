
import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, Book, Video, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface HelpScreenProps {
  onBack: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: "How do I set up medication reminders?",
      answer: "Go to the Medication Reminders section from the home screen. Tap 'Add Medication', enter the medication name, dosage, and schedule. You can set multiple daily reminders and sync with your calendar."
    },
    {
      question: "What languages does the AI assistant support?",
      answer: "Our AI assistant currently supports English, Swahili, Sheng, Luo, Kikuyu, and Luhya. We're working on adding more Kenyan languages soon."
    },
    {
      question: "How do I find the nearest hospital in an emergency?",
      answer: "Tap the Emergency button on the home screen or use the red emergency banner. This will show you nearby hospitals with real-time ambulance availability and contact numbers."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, all your health data is encrypted and stored securely. You can control data sharing preferences in Privacy & Security settings. We never share personal information without your consent."
    },
    {
      question: "How do I join the health community?",
      answer: "Access the Community section from the home screen. You can read posts, share your story, and join scheduled support meetings and prayer sessions."
    },
    {
      question: "Can I use the app offline?",
      answer: "Basic features like medication reminders work offline. However, AI assistant, community features, and real-time hospital information require an internet connection."
    }
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      action: () => alert("Live chat feature will be available soon!")
    },
    {
      title: "Email Support",
      description: "support@harakahealthafya.org",
      icon: Mail,
      action: () => window.location.href = 'mailto:support@harakahealthafya.org'
    },
    {
      title: "Phone Support",
      description: "+254 113 245 740",
      icon: Phone,
      action: () => window.location.href = 'tel:+254113245740'
    },
    {
      title: "User Guide",
      description: "Step-by-step tutorials",
      icon: Book,
      action: () => alert("User guide will be available in the next update!")
    },
    {
      title: "Video Tutorials",
      description: "Learn through videos",
      icon: Video,
      action: () => alert("Video tutorials coming soon!")
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Help & Support</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Contact Options */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h2>
          <div className="grid grid-cols-1 gap-3">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-4"
                  onClick={option.action}
                >
                  <IconComponent className="w-5 h-5 mr-3 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{option.title}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search FAQ */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search FAQ</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Emergency Support</h2>
          <p className="text-red-600 mb-4">
            If you're experiencing a medical emergency, please call emergency services immediately.
          </p>
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => window.location.href = 'tel:911'}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Emergency Services
          </Button>
        </div>

        {/* App Information */}
        <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Haraka-Afya AI</h2>
          <p className="text-gray-600 mb-4">
            Your AI-powered health companion for Kenya
          </p>
          <p className="text-sm text-gray-500">
            Version 1.0.0 • Built with ❤️ for better healthcare access
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;
