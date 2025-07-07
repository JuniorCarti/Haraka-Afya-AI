import React from 'react';

export const VisaLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 152 50" fill="none">
    <rect width="152" height="50" rx="8" fill="#1434CB"/>
    <path d="M59.5 18.5h-7.2l-4.5 13h3.9l1-2.9h5.5l.6 2.9h4.3l-3.6-13zm-5.4 7.5l1.7-5.1 1 5.1h-2.7zm18.8-7.5h-3.4l-5.4 13h3.9l1-2.5h.7c2.2 0 3.5-1.2 3.9-3.2l.8-2.8c.8-2.7.1-4.5-1.5-4.5zm-1.8 5.8c-.1.4-.5.7-1 .7h-.8l.7-2.1h.8c.4 0 .5.6.3 1.4zm16.4-5.8h-6.1l-4.5 13h3.9l.9-2.5h1.8c2.7 0 4.5-1.8 5.1-4.3.6-2.5-.2-4.5-1.1-4.5zm-2.3 6.1c-.3 1-.9 1.7-1.8 1.7h-1.2l1.1-3.2h1.2c.6 0 .9.4.7 1.5z" fill="white"/>
  </svg>
);

export const MpesaLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none">
    <rect width="120" height="40" rx="6" fill="#00B894"/>
    <text x="60" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">M-PESA</text>
  </svg>
);

export const AirtelMoneyLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none">
    <rect width="120" height="40" rx="6" fill="#ED1C24"/>
    <text x="60" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Airtel</text>
    <text x="60" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Money</text>
  </svg>
);

export const StripeLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 60 25" fill="none">
    <rect width="60" height="25" rx="4" fill="#635BFF"/>
    <path d="M15.5 10.5c0-.6-.4-1-1.2-1-.5 0-1.1.2-1.6.4v4.6c.5.2 1 .3 1.5.3.9 0 1.3-.4 1.3-1.1v-3.2zm2.8 0v3.2c0 2.1-1.2 3.3-3.7 3.3-.8 0-1.6-.2-2.4-.5V6.5h2.8v2.5c.6-.2 1.2-.3 1.8-.3 2.1 0 3.5 1.2 3.5 3.3v-.5zm7.4 0c0-.6-.4-1-1.2-1-.5 0-1.1.2-1.6.4v4.6c.5.2 1 .3 1.5.3.9 0 1.3-.4 1.3-1.1v-3.2zm2.8 0v3.2c0 2.1-1.2 3.3-3.7 3.3-.8 0-1.6-.2-2.4-.5V6.5h2.8v2.5c.6-.2 1.2-.3 1.8-.3 2.1 0 3.5 1.2 3.5 3.3v-.5z" fill="white"/>
  </svg>
);