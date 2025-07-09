import React, { useState, useEffect } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
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
import EmergencyServices from './emergency/EmergencyServices';
import WhatsAppChat from './chat/WhatsAppChat';
import WhatsAppFloat from './chat/WhatsAppFloat';
import MedicalDictionary from './medical/MedicalDictionary';
import MedicationReminders from './medication/MedicationReminders';
import HealthCommunity from './community/HealthCommunity';
import PrivacyScreen from './privacy/PrivacyScreen';
import HelpScreen from './support/HelpScreen';
import SecuritySettingsScreen from './security/SecuritySettingsScreen';

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
  | 'sidebar'
  | 'medical-dictionary'
  | 'medication-reminders'
  | 'health-community'
  | 'privacy'
  | 'help'
  | 'security-settings';

interface SelectedPlan {
  id: string;
  name: string;
  price: number;
}

interface User {
  id: string;
  firstName: string;
  email: string;
  isFirstTime: boolean;
}

const HarakaAfyaApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | undefined>();

  // Auth state management
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          setCurrentScreen('home');
        } else if (currentScreen === 'home') {
          setCurrentScreen('signup');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        // Skip splash and go to home for authenticated users
        setTimeout(() => {
          setCurrentScreen('home');
          setLoading(false);
        }, 2000);
      } else {
        // New user - show splash then onboarding
        setTimeout(() => {
          setCurrentScreen('onboarding');
          setLoading(false);
        }, 3000);
      }
    });

    return () => subscription.unsubscribe();
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
    // Auth state change will handle navigation automatically
    setActiveTab('home');
  };

  const handleLoginComplete = (userData: any) => {
    // Auth state change will handle navigation automatically
    setActiveTab('home');
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'home':
      case 'learn':
      case 'symptoms':
      case 'hospitals':
      case 'profile':
      case 'medical-dictionary':
      case 'medication-reminders':
      case 'health-community':
      case 'privacy':
      case 'help':
      case 'security-settings':
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
      case 'emergency':
        setShowEmergencyServices(true);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        console.log('Navigation to:', screen);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsSidebarOpen(false);
      setCurrentScreen('login');
      setActiveTab('home');
      // Show success toast
      const { toast } = await import('@/hooks/use-toast');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      const { toast } = await import('@/hooks/use-toast');
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
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
    // Store selected plan data
    const plans = {
      'free': { id: 'free', name: 'Free', price: 0 },
      'premium': { id: 'premium', name: 'Premium', price: 799 },
      'family': { id: 'family', name: 'Family', price: 1299 }
    };
    setSelectedPlan(plans[planId as keyof typeof plans]);
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
            userName={user?.user_metadata?.first_name || 'User'}
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
            userName={user?.user_metadata?.first_name || 'User'}
            userEmail={user?.email || ''}
            onNavigate={handleNavigation}
          />
        );

      case 'medical-dictionary':
        return <MedicalDictionary onBack={handleBackToHome} />;

      case 'medication-reminders':
        return <MedicationReminders onBack={handleBackToHome} />;

      case 'health-community':
        return <HealthCommunity onBack={handleBackToHome} />;
      
      case 'payment':
        return (
          <PaymentScreen 
            onBack={handleBackToHome} 
            selectedPlan={selectedPlan}
          />
        );
      
      case 'subscription':
        return (
          <SubscriptionPlansScreen
            onBack={handleBackToHome}
            onSelectPlan={handleSelectPlan}
          />
        );
      
      case 'privacy':
        return <PrivacyScreen onBack={handleBackToHome} />;
      
      case 'help':
        return <HelpScreen onBack={handleBackToHome} />;
      
      case 'security-settings':
        return <SecuritySettingsScreen onBack={handleBackToHome} />;
      
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  const shouldShowBottomNav = isAuthenticated && [
    'home', 'learn', 'symptoms', 'hospitals', 'profile'
  ].includes(currentScreen);

  const shouldShowWhatsAppFloat = isAuthenticated;

  return (
    <div className="relative min-h-screen bg-white">
      {renderCurrentScreen()}
      
      {shouldShowBottomNav && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleNavigation}
        />
      )}
      
      {shouldShowWhatsAppFloat && (
        <WhatsAppFloat onClick={() => setShowWhatsAppChat(true)} />
      )}
      
      {isAuthenticated && (
        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={handleNavigation}
          userName={user?.user_metadata?.first_name || 'User'}
          userEmail={user?.email || ''}
        />
      )}

      {showEmergencyServices && (
        <EmergencyServices onClose={() => setShowEmergencyServices(false)} />
      )}

      {showWhatsAppChat && (
        <WhatsAppChat 
          isOpen={showWhatsAppChat} 
          onClose={() => setShowWhatsAppChat(false)} 
        />
      )}
    </div>
  );
};

export default HarakaAfyaApp;
