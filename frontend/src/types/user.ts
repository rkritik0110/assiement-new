export interface User {
    id: number;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }