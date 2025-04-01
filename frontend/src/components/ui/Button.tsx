import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading = false, 
  disabled,
  className,
  ...props 
}) => {
  return (
    <button
      className={`w-full bg-[#2E3A59] text-white font-medium py-3 rounded-md hover:bg-[#3a4868] transition-colors ${
        isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      } ${className || ''}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;