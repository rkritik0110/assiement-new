import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import Input from './ui/Input';
import Button from './ui/Button';
import FormError from './ui/FormError';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const { register: registerUser, isLoading, isError, data } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (formData: RegistrationFormData) => {
    registerUser(formData);
  };

  // Get error message from the API or form validation
  const errorMessage = data?.status === 'error' 
    ? data.message 
    : isError 
      ? 'An error occurred. Please try again.' 
      : '';

      return (
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl text-gray-950 font-bold text-center mb-8">Create an Account</h1>
          
          <FormError message={errorMessage} />
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className="w-full max-w-xs"> {/* Added this container with max width */}
              <Input
                name="email"
                label="Email"
                placeholder="you@example.com"
                register={register}
                error={errors.email?.message}
              />
              
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Minimum 6 characters"
                register={register}
                error={errors.password?.message}
              />
              
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                register={register}
                error={errors.confirmPassword?.message}
              />
            </div>
            
            <div className="w-full max-w-xs mt-4"> {/* Centered button container */}
              <Button type="submit" isLoading={isLoading} className="w-full">
                Sign Up
              </Button>
            </div>
      
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      );
};

export default RegistrationForm;