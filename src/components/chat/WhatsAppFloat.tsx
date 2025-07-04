
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
  onClick: () => void;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="whatsapp-float flex items-center justify-center"
      title="Chat with Haraka-Afya Support"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
};

export default WhatsAppFloat;
