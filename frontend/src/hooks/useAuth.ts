import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { LoginFormData, RegistrationFormData } from '../utils/validation';

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.status === 'success') {
        // In a real app, you might store a token in localStorage here
        navigate('/dashboard');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.status === 'success') {
        // In a real app, you might store a token in localStorage here
        navigate('/dashboard');
      }
    },
  });

  const login = (formData: LoginFormData) => {
    return loginMutation.mutate(formData);
  };

  const register = (formData: RegistrationFormData) => {
    // Remove confirmPassword as it's not needed for the API
    const { confirmPassword, ...credentials } = formData;
    return registerMutation.mutate(credentials);
  };

  return {
    login,
    register,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    isError: loginMutation.isError || registerMutation.isError,
    error: loginMutation.error || registerMutation.error,
    data: loginMutation.data || registerMutation.data,
  };
};