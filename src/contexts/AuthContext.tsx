"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'instructor' | 'developer' | 'client';
  avatar?: string;
};

// Define signup data type
type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'student' | 'instructor' | 'developer' | 'client';
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a real app, verify token with your API
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Simulate fetching user data
          // In a real app, this would be an API call to get the user profile
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          
          if (userData && userData.id) {
            setUser(userData as User);
          } else {
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    
    try {
      // Simulate API request with 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call to authenticate
      // and receive a token and user data in response
      
      // For demo, we'll simulate a successful login for any valid-looking email
      // except for a specific "error" email
      if (email === 'error@example.com') {
        throw new Error('Invalid credentials');
      }
      
      // Generate a fake token
      const fakeToken = Math.random().toString(36).substring(2);
      
      // Create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2),
        firstName: email.split('@')[0].split('.')[0],
        lastName: email.split('@')[0].split('.')[1] || 'User',
        email,
        role: 'student',
      };
      
      // Save auth data
      if (rememberMe) {
        localStorage.setItem('authToken', fakeToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
      } else {
        sessionStorage.setItem('authToken', fakeToken);
        sessionStorage.setItem('userData', JSON.stringify(mockUser));
      }
      
      // Update state
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    
    try {
      // Simulate API request with 1.5 second delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd make an API call to register the user
      // and possibly receive a token and user data in response
      
      // Create a fake token
      const fakeToken = Math.random().toString(36).substring(2);
      
      // Create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role || 'student',
      };
      
      // Save auth data
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    
    // Update state
    setUser(null);
  };

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    
    try {
      // Simulate API request with 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call to update the user profile
      
      // Update user data
      const updatedUser = { ...user, ...userData };
      
      // Save updated data
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;