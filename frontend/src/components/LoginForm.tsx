import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import Input from './ui/Input';
import Button from './ui/Button';
import FormError from './ui/FormError';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login, isLoading, isError, data } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (formData: LoginFormData) => {
    login(formData);
  };

  // Get error message from the API or form validation
  const errorMessage = data?.status === 'error' 
    ? data.message 
    : isError 
      ? 'An error occurred. Please try again.' 
      : '';

      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome back!</h1>
          
          <FormError message={errorMessage} />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full">
            <div className="w-full max-w-xs">
              <Input
                name="email"
                type="email"
                placeholder="UID"
                register={register}
                error={errors.email?.message}
              />
              
              <Input
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors.password?.message}
              />
            </div>
            
            <div className="w-full max-w-xs">
              <Button 
                type="submit" 
                isLoading={isLoading}
                className="w-full py-3 text-lg font-semibold bg-blue-950 hover:bg-blue-950"
              >
                Login
              </Button>
            </div>
      
            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      );
};

export default LoginForm;