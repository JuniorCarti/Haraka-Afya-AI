
import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Button } from '../ui/button';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <Cookie className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold text-gray-900">Cookie Policy</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cookie Policy</h2>
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">What Are Cookies?</h3>
            <p className="text-gray-600">
              Cookies are small text files that are stored on your device when you visit our app. They help us provide you with a better experience by remembering your preferences and improving our services.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Types of Cookies We Use</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-green-900 mb-2">Essential Cookies</h4>
                <p className="text-green-700 text-sm">
                  Required for the app to function properly. These include authentication tokens and session management.
                </p>
                <p className="text-green-600 text-xs mt-2">Cannot be disabled</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">Functional Cookies</h4>
                <p className="text-blue-700 text-sm">
                  Remember your preferences such as language settings, medication reminders, and personalization options.
                </p>
                <p className="text-blue-600 text-xs mt-2">Can be disabled in settings</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-medium text-purple-900 mb-2">Analytics Cookies</h4>
                <p className="text-purple-700 text-sm">
                  Help us understand how you use our app to improve user experience and AI assistant performance.
                </p>
                <p className="text-purple-600 text-xs mt-2">Can be disabled in settings</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4">
                <h4 className="font-medium text-orange-900 mb-2">Performance Cookies</h4>
                <p className="text-orange-700 text-sm">
                  Collect information about app performance, loading times, and technical issues to help us optimize the service.
                </p>
                <p className="text-orange-600 text-xs mt-2">Can be disabled in settings</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Third-Party Cookies</h3>
            <p className="text-gray-600">We may use third-party services that place cookies:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li><strong>Google Analytics:</strong> For usage analytics</li>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Supabase:</strong> For authentication and data storage</li>
              <li><strong>WhatsApp:</strong> For chat integration</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Managing Cookies</h3>
            <p className="text-gray-600">You can control cookies through:</p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
              <li>App settings (Privacy & Security section)</li>
              <li>Browser settings (for web version)</li>
              <li>Device settings (for mobile app)</li>
            </ul>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Disabling certain cookies may affect app functionality, including login, preferences, and personalized health recommendations.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Cookie Consent</h3>
            <p className="text-gray-600">
              By using Haraka-Afya AI, you consent to our use of essential cookies. For non-essential cookies, we will request your specific consent, which you can withdraw at any time through the app settings.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Updates to This Policy</h3>
            <p className="text-gray-600">
              We may update this Cookie Policy from time to time. Any changes will be posted in the app and on this page with an updated date.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <div className="bg-primary/5 rounded-xl p-4">
              <p className="text-gray-800">For questions about our Cookie Policy:</p>
              <p className="text-gray-800">Email: privacy@harakahealthafya.org</p>
              <p className="text-gray-800">Phone: +254 113 245 740</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
