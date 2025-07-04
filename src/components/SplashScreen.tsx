
import React, { useEffect } from 'react';
import { Heart, Stethoscope, Shield } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex flex-col items-center justify-center px-6">
      {/* Animated Health Icons */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-slow relative">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-12 h-12 text-green-500 animate-pulse" fill="currentColor" />
          </div>
          {/* Floating icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <Stethoscope className="w-4 h-4 text-green-600" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Shield className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </div>

      {/* App Name with Health Theme */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
          Haraka-Afya
        </h1>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <p className="text-2xl text-white font-medium">AI Health Companion</p>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        <p className="text-white/90 text-lg font-light">Your wellness, our priority</p>
      </div>

      {/* Health Stats Animation */}
      <div className="flex space-x-4 mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 animate-fade-in">
          <p className="text-white/90 text-sm">24/7 Support</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-white/90 text-sm">AI Powered</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-white/90 text-sm">Multi-Language</p>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex space-x-2 mb-8">
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Enhanced Tagline */}
      <div className="text-center animate-fade-in max-w-sm">
        <p className="text-white/90 text-center text-base leading-relaxed mb-2">
          Revolutionizing healthcare access across Kenya
        </p>
        <p className="text-white/80 text-sm">
          Available in English, Swahili, Sheng & Local Languages
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
