// src/services/authService.ts

// Base API URL - in a real app, this would be your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.techpoa.com/api';

// Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'developer' | 'client';
  bio?: string;
  interests?: string[];
  skills?: string[];
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
    isEmailVerified: boolean;
  };
}

// Auth service functions
const authService = {
  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      // In a real app, you would make an actual API call
      // For now, we'll simulate API behavior for demonstration

      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate error for specific email
      if (data.email === 'error@example.com') {
        throw new Error('Invalid credentials');
      }

      // Mock successful response
      const response: AuthResponse = {
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
        user: {
          id: 'user-' + Math.random().toString(36).substring(2),
          firstName: data.email.split('@')[0].split('.')[0] || 'John',
          lastName: data.email.split('@')[0].split('.')[1] || 'Doe',
          email: data.email,
          role: 'student',
          isEmailVerified: true,
        },
      };

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register new user
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate error for specific email (already exists)
      if (data.email === 'exists@example.com') {
        throw new Error('Email already registered');
      }

      // Mock successful response
      const response: AuthResponse = {
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
        user: {
          id: 'user-' + Math.random().toString(36).substring(2),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          isEmailVerified: false, // New users start with unverified email
        },
      };

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Always succeed for demo
      return {
        success: true,
        message: 'Password reset instructions sent to your email',
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate invalid token
      if (data.token === 'invalid-token') {
        throw new Error('Invalid or expired token');
      }

      // Always succeed for valid tokens
      return {
        success: true,
        message: 'Password reset successful',
      };
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailRequest): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate invalid token
      if (data.token === 'invalid-token') {
        throw new Error('Invalid or expired token');
      }

      // Always succeed for valid tokens
      return {
        success: true,
        message: 'Email verified successfully',
      };
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },

  // Resend verification email
  resendVerificationEmail: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Always succeed for demo
      return {
        success: true,
        message: 'Verification email sent successfully',
      };
    } catch (error) {
      console.error('Resend verification email error:', error);
      throw error;
    }
  },

  // Logout (client-side only, no API call needed for JWT authentication)
  logout: (): void => {
    // Clear token and user data from storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },
};

export default authService;