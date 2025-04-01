// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-950 px-4">
      <div className="w-full max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;