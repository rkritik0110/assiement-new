import axios from 'axios';
import { LoginCredentials, User, ApiResponse } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post<ApiResponse<User>>('/users/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<User>;
    }
    throw new Error('Network error occurred');
  }
};

export const registerUser = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
  try {
    const response = await api.post<ApiResponse<User>>('/users/register', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<User>;
    }
    throw new Error('Network error occurred');
  }
};