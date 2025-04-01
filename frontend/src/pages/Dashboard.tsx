import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear the token from localStorage here
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-950 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-8">You have successfully logged in!</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;