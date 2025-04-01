import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-950 px-4">
      <div className="w-full max-w-md">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;