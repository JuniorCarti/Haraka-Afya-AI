
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">1. Information We Collect</h3>
            <p className="text-gray-600">
              We collect information you provide directly to us, such as when you create an account, use our health services, or contact us for support. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>Personal information (name, email, phone number)</li>
              <li>Health information you voluntarily share</li>
              <li>Location data for emergency services</li>
              <li>Usage data and app interactions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h3>
            <p className="text-gray-600">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>Provide personalized health assistance</li>
              <li>Send medication reminders and health tips</li>
              <li>Connect you with healthcare facilities</li>
              <li>Improve our AI assistant capabilities</li>
              <li>Ensure emergency response services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">3. Information Sharing</h3>
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information. We may share information only:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>With your explicit consent</li>
              <li>To emergency services when necessary</li>
              <li>With healthcare providers you choose</li>
              <li>As required by law</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">4. Data Security</h3>
            <p className="text-gray-600">
              We implement robust security measures to protect your information, including encryption, secure servers, and regular security audits. Your health data is encrypted both in transit and at rest.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">5. Your Rights</h3>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Control data sharing preferences</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">6. Contact Us</h3>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-primary/5 rounded-xl p-4">
              <p className="text-gray-800">Email: support@harakahealthafya.org</p>
              <p className="text-gray-800">Phone: +254 113 245 740</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
