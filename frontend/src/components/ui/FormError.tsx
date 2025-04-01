import React from 'react';

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
      {message}
    </div>
  );
};

export default FormError;