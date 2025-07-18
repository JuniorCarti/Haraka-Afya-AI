
import React from 'react';
import { ChevronRight, SkipForward, Heart, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingScreenProps {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ 
  currentStep, 
  onNext, 
  onSkip, 
  onComplete 
}) => {
  const onboardingData = [
    {
      icon: Heart,
      title: "AI-Powered Health Analysis",
      description: "Get instant health insights powered by advanced AI technology. Describe your symptoms in English, Swahili, or Sheng.",
      color: "from-pink-500 to-red-500",
      backgroundImage: "url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      icon: Zap,
      title: "Instant Healthcare Access",
      description: "Connect with healthcare providers instantly. Find nearby hospitals, clinics, and emergency services in real-time.",
      color: "from-blue-500 to-cyan-500",
      backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
    },
    {
      icon: Shield,
      title: "24/7 Health Support",
      description: "Your health companion is always available. Get medical guidance, track symptoms, and stay informed about your wellness.",
      color: "from-green-500 to-emerald-500",
      backgroundImage: "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
    }
  ];

  const currentData = onboardingData[currentStep];
  const IconComponent = currentData?.icon;

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      onNext();
    } else {
      onComplete();
    }
  };

  if (!currentData) {
    onComplete();
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{ 
        backgroundImage: currentData.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Skip Button */}
        <div className="flex justify-end p-6">
          <Button variant="ghost" onClick={onSkip} className="text-white/90 hover:text-white hover:bg-white/10">
            <SkipForward className="w-4 h-4 mr-2" />
            Skip
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-16">
          {/* Icon */}
          <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${currentData.color} flex items-center justify-center mb-8 animate-scale-in shadow-2xl`}>
            <IconComponent className="w-16 h-16 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-6 animate-fade-in-up drop-shadow-lg">
            {currentData.title}
          </h2>

          {/* Description */}
          <p className="text-white/90 text-center text-lg leading-relaxed max-w-sm animate-fade-in-up drop-shadow-md">
            {currentData.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="p-8">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-white' 
                    : index < currentStep 
                      ? 'w-2 bg-white/60' 
                      : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button 
            onClick={handleNext}
            className="w-full py-4 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            {currentStep === onboardingData.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
