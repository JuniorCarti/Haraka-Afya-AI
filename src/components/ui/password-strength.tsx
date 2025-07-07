import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordValidation } from '@/utils/passwordValidation';

interface PasswordStrengthProps {
  validation: PasswordValidation;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ validation }) => {
  const requirements = [
    { key: 'minLength', label: 'At least 8 characters', met: validation.requirements.minLength },
    { key: 'hasLowercase', label: 'One lowercase letter', met: validation.requirements.hasLowercase },
    { key: 'hasUppercase', label: 'One uppercase letter', met: validation.requirements.hasUppercase },
    { key: 'hasNumber', label: 'One number', met: validation.requirements.hasNumber },
    { key: 'hasSpecialChar', label: 'One special character (* @ # + % ! & $ ^ ? ~)', met: validation.requirements.hasSpecialChar },
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Password requirements:</h4>
      <div className="space-y-1">
        {requirements.map((req) => (
          <div key={req.key} className="flex items-center space-x-2 text-xs">
            {req.met ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <X className="w-3 h-3 text-muted-foreground" />
            )}
            <span className={req.met ? 'text-success' : 'text-muted-foreground'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};