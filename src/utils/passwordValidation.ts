export interface PasswordValidation {
  isValid: boolean;
  requirements: {
    minLength: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export const validatePassword = (password: string): PasswordValidation => {
  const requirements = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[*@#+%!&$^?~]/.test(password),
  };

  const isValid = Object.values(requirements).every(req => req);

  return {
    isValid,
    requirements,
  };
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  const { requirements } = validatePassword(password);
  const satisfiedCount = Object.values(requirements).filter(req => req).length;
  
  if (satisfiedCount <= 2) return 'weak';
  if (satisfiedCount <= 4) return 'medium';
  return 'strong';
};