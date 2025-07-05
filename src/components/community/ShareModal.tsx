
import React from 'react';
import { X, MessageCircle, Send, Instagram, Facebook, Twitter, Copy } from 'lucide-react';
import { Button } from '../ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    author: string;
  };
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen) return null;

  const shareText = `Join the Haraka-Afya community. Read health stories, learn, and share.\n👉 Download the App\n\n"${post.title}" - ${post.author}`;
  const appStoreLink = "https://play.google.com/store/apps/details?id=com.harakaafya.app"; // Replace with actual link

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + appStoreLink)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(appStoreLink)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      action: () => {
        navigator.clipboard.writeText(shareText + '\n' + appStoreLink);
        alert('Text copied! You can now paste it in your Instagram story or post.');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appStoreLink)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appStoreLink)}`
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'bg-gray-500',
      action: () => {
        navigator.clipboard.writeText(shareText + '\n' + appStoreLink);
        alert('Share text copied to clipboard!');
      }
    }
  ];

  const handleShare = (option: any) => {
    if (option.url) {
      window.open(option.url, '_blank');
    } else if (option.action) {
      option.action();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Share Story</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">Share this health story and help others learn</p>
          
          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option)}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 ${option.color}`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Preview:</strong> {shareText.substring(0, 100)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
