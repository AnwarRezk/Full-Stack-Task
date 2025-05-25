import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, SignInFormData, SignUpFormData, AuthResponse } from '../types/auth';
import { authApi } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      const userData = JSON.parse(storedUser) as AuthResponse;
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (data: SignInFormData) => {
    try {
      const response = await authApi.signIn(data);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (data: SignUpFormData) => {
    try {
      const response = await authApi.signUp(data);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 