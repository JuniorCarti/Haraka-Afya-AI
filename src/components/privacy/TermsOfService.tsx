
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Terms of Service</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Terms of Service</h2>
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h3>
            <p className="text-gray-600">
              By accessing and using Haraka-Afya AI, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">2. Medical Disclaimer</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 font-medium">Important:</p>
              <p className="text-yellow-700">
                Haraka-Afya AI is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">3. Service Description</h3>
            <p className="text-gray-600">
              Haraka-Afya AI provides health-related information, medication reminders, emergency services connection, and community support features. Our AI assistant offers general health guidance but cannot replace professional medical consultation.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">4. User Responsibilities</h3>
            <p className="text-gray-600">You agree to:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Use the service for lawful purposes only</li>
              <li>Respect other community members</li>
              <li>Not share misleading health information</li>
              <li>Maintain the confidentiality of your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">5. Emergency Services</h3>
            <p className="text-gray-600">
              While we provide emergency contact information and ambulance tracking, in case of medical emergencies, always call local emergency services directly (911, 999, or your local emergency number).
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">6. Limitation of Liability</h3>
            <p className="text-gray-600">
              Haraka-Afya AI shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">7. Changes to Terms</h3>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes through the app or email.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">8. Contact Information</h3>
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

export default TermsOfService;
