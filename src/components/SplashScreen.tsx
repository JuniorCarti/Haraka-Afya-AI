
import React, { useEffect } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-gold flex flex-col items-center justify-center px-6">
      {/* Logo Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm animate-pulse-slow">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* App Name */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Haraka-Afya
        </h1>
        <p className="text-xl text-white/90 font-medium mb-1">AI</p>
        <p className="text-white/70 text-lg">Your Health Companion</p>
      </div>

      {/* Loading Animation */}
      <div className="flex space-x-2 mb-8">
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Tagline */}
      <p className="text-white/80 text-center text-sm max-w-xs leading-relaxed animate-fade-in">
        Revolutionizing healthcare access across Kenya with AI-powered medical assistance
      </p>
    </div>
  );
};

export default SplashScreen;
