
import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';
import SignUpScreen from './auth/SignUpScreen';
import LoginScreen from './auth/LoginScreen';
import ResetPasswordScreen from './auth/ResetPasswordScreen';
import HomePage from './main/HomePage';
import LearnScreen from './main/LearnScreen';
import SymptomsScreen from './main/SymptomsScreen';
import HospitalsScreen from './main/HospitalsScreen';
import ProfileScreen from './main/ProfileScreen';
import PaymentScreen from './payment/PaymentScreen';
import SubscriptionPlansScreen from './payment/SubscriptionPlansScreen';
import SidebarMenu from './main/SidebarMenu';
import BottomNavigation from './main/BottomNavigation';

type AppScreen = 
  | 'splash' 
  | 'onboarding' 
  | 'signup' 
  | 'login' 
  | 'reset-password'
  | 'home' 
  | 'learn' 
  | 'symptoms' 
  | 'hospitals' 
  | 'profile'
  | 'payment'
  | 'subscription'
  | 'sidebar';

interface User {
  id: string;
  firstName: string;
  email: string;
  isFirstTime: boolean;
}

const HarakaAfyaApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Simulate app initialization
  useEffect(() => {
    // Check if user is returning (simulate localStorage check)
    const returningUser = localStorage.getItem('haraka-user');
    
    if (returningUser) {
      const userData = JSON.parse(returningUser);
      setUser(userData);
      setIsAuthenticated(true);
      // Skip splash and go to home for returning users
      setTimeout(() => {
        setCurrentScreen('home');
      }, 2000);
    } else {
      // New user - show splash then onboarding
      setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 3000);
    }
  }, []);

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('signup');
  };

  const handleOnboardingSkip = () => {
    setCurrentScreen('signup');
  };

  const handleSignUpComplete = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName || 'User',
      email: userData.email,
      isFirstTime: true
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Save user to localStorage
    localStorage.setItem('haraka-user', JSON.stringify(newUser));
    
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleLoginComplete = (userData: any) => {
    const existingUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName || 'User',
      email: userData.email,
      isFirstTime: false
    };
    
    setUser(existingUser);
    setIsAuthenticated(true);
    
    // Save user to localStorage
    localStorage.setItem('haraka-user', JSON.stringify(existingUser));
    
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'home':
      case 'learn':
      case 'symptoms':
      case 'hospitals':
      case 'profile':
        setCurrentScreen(screen as AppScreen);
        setActiveTab(screen);
        break;
      case 'subscription':
        setCurrentScreen('subscription');
        break;
      case 'payment':
        setCurrentScreen('payment');
        break;
      case 'sidebar':
        setIsSidebarOpen(true);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        console.log('Navigation to:', screen);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('haraka-user');
    setCurrentScreen('signup');
    setIsSidebarOpen(false);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handlePaymentSuccess = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleSelectPlan = (planId: string) => {
    setCurrentScreen('payment');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'onboarding':
        return (
          <OnboardingScreen
            currentStep={onboardingStep}
            onNext={() => setOnboardingStep(prev => prev + 1)}
            onSkip={handleOnboardingSkip}
            onComplete={handleOnboardingComplete}
          />
        );
      
      case 'signup':
        return (
          <SignUpScreen
            onSignUpComplete={handleSignUpComplete}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      
      case 'login':
        return (
          <LoginScreen
            onLoginComplete={handleLoginComplete}
            onNavigateToSignUp={() => setCurrentScreen('signup')}
            onNavigateToReset={() => setCurrentScreen('reset-password')}
          />
        );
      
      case 'reset-password':
        return (
          <ResetPasswordScreen
            onBack={() => setCurrentScreen('login')}
            onResetComplete={() => setCurrentScreen('login')}
          />
        );
      
      case 'home':
        return (
          <HomePage
            userName={user?.firstName || 'User'}
            greeting={getGreeting()}
            onNavigate={handleNavigation}
          />
        );
      
      case 'learn':
        return <LearnScreen onNavigate={handleNavigation} />;
      
      case 'symptoms':
        return <SymptomsScreen onNavigate={handleNavigation} />;
      
      case 'hospitals':
        return <HospitalsScreen onNavigate={handleNavigation} />;
      
      case 'profile':
        return (
          <ProfileScreen
            userName={user?.firstName || 'User'}
            userEmail={user?.email || ''}
            onNavigate={handleNavigation}
          />
        );
      
      case 'payment':
        return <PaymentScreen onBack={handleBackToHome} />;
      
      case 'subscription':
        return (
          <SubscriptionPlansScreen
            onBack={handleBackToHome}
            onSelectPlan={handleSelectPlan}
          />
        );
      
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  const shouldShowBottomNav = isAuthenticated && [
    'home', 'learn', 'symptoms', 'hospitals', 'profile'
  ].includes(currentScreen);

  return (
    <div className="relative min-h-screen bg-white">
      {renderCurrentScreen()}
      
      {shouldShowBottomNav && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleNavigation}
        />
      )}
      
      {isAuthenticated && (
        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={handleNavigation}
          userName={user?.firstName || 'User'}
          userEmail={user?.email || ''}
        />
      )}
    </div>
  );
};

export default HarakaAfyaApp;
