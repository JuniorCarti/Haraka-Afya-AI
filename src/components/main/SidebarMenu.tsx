
import React from 'react';
import { X, User, Settings, CreditCard, HelpCircle, LogOut, Shield, Globe, Bell } from 'lucide-react';
import { Button } from '../ui/button';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  userName: string;
  userEmail: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  userName, 
  userEmail 
}) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile Settings', description: 'Manage your account' },
    { id: 'subscription', icon: CreditCard, label: 'Subscription Plans', description: 'Upgrade your plan' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Manage alerts' },
    { id: 'language', icon: Globe, label: 'Language Settings', description: 'Swahili, English, Sheng' },
    { id: 'privacy', icon: Shield, label: 'Privacy & Security', description: 'Your data protection' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-600">{userEmail}</p>
                <div className="mt-1">
                  <span className="inline-block bg-gold/20 text-gold px-2 py-1 rounded-full text-xs font-medium">
                    Premium Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 mb-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-6">
            <button
              onClick={() => handleItemClick('logout')}
              className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium">Sign Out</h4>
                <p className="text-sm text-red-400">Log out of your account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
