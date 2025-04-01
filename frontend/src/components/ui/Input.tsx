import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  name, 
  label, 
  register, 
  error, 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm text-black font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        {...register(name)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;