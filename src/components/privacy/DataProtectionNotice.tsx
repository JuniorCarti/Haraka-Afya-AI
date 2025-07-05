
import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../ui/button';

interface DataProtectionNoticeProps {
  onBack: () => void;
}

const DataProtectionNotice: React.FC<DataProtectionNoticeProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold text-gray-900">Data Protection Notice</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Controller</h3>
            <p className="text-gray-600">
              Haraka-Afya AI is the data controller responsible for your personal information. We are committed to protecting your privacy and ensuring compliance with data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Legal Basis for Processing</h3>
            <p className="text-gray-600">We process your data based on:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li><strong>Consent:</strong> When you voluntarily provide health information</li>
              <li><strong>Contract:</strong> To provide our health services to you</li>
              <li><strong>Legitimate Interest:</strong> To improve our AI assistant</li>
              <li><strong>Vital Interest:</strong> For emergency medical situations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Categories</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">Personal Data</h4>
                <p className="text-blue-700 text-sm">Name, email, phone number, date of birth</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-green-900 mb-2">Health Data</h4>
                <p className="text-green-700 text-sm">Symptoms, medications, medical history (voluntary)</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-medium text-purple-900 mb-2">Usage Data</h4>
                <p className="text-purple-700 text-sm">App interactions, preferences, location (for emergencies)</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Retention</h3>
            <p className="text-gray-600">We retain your data only as long as necessary:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>Account data: Until account deletion</li>
              <li>Health records: 7 years (medical record standards)</li>
              <li>Usage analytics: 2 years</li>
              <li>Emergency logs: 1year</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Rights</h3>
            <div className="bg-primary/5 rounded-xl p-4">
              <p className="text-gray-800 mb-3 font-medium">Under data protection law, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Erase your data ("right to be forgotten")</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Lodge a complaint with supervisory authority</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">International Transfers</h3>
            <p className="text-gray-600">
              Your data is primarily processed within Kenya. Any international transfers are protected by appropriate safeguards and comply with applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Our Data Protection Officer</h3>
            <div className="bg-primary/5 rounded-xl p-4">
              <p className="text-gray-800">For data protection inquiries:</p>
              <p className="text-gray-800">Email: dpo@harakahealthafya.org</p>
              <p className="text-gray-800">Phone: +254 113 245 740</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataProtectionNotice;
