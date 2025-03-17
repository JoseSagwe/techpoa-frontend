"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, EyeOff, Eye, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function Login() {
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear login error
    if (loginError) {
      setLoginError(null);
    }
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setLoginError(null);
    
    try {
      // Simulate API call with 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate authentication failure for demo purposes
      // In a real app, you would call your auth API
      if (formData.email === "error@example.com") {
        setLoginError("Invalid email or password. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Successful login, redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    // Store the current email in localStorage for forgotPassword page
    if (formData.email) {
      localStorage.setItem("forgotPasswordEmail", formData.email);
    }
    
    // Navigate to forgot password page
    window.location.href = "/forgot-password";
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    // Here you would typically redirect to your OAuth provider
    setTimeout(() => {
      window.location.href = "/api/auth/google";
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Tech-inspired decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 relative z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-36">
              {/* Logo background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-lg blur-sm group-hover:blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Logo content */}
              <div className="relative px-3 py-1 bg-indigo-900/80 backdrop-blur-sm rounded-lg border border-purple-500/40 group-hover:border-blue-400/50 transition-colors duration-300">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
                  Tech<span className="text-blue-400 relative">
                    Poa
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-typewriter"></span>
                  </span>
                </h1>
                <style jsx>{`
                  @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .animate-gradient-x {
                    background-size: 200% auto;
                    animation: gradient-shift 3s ease infinite;
                  }
                  @keyframes typewriter {
                    0% { width: 0; }
                    50% { width: 100%; }
                    90% { opacity: 1; }
                    95% { opacity: 0; }
                    100% { opacity: 1; width: 100%; }
                  }
                  .animate-typewriter {
                    animation: typewriter 3.5s ease-in-out infinite;
                  }
                `}</style>
              </div>
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-gray-900/60 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800/50">
          {/* Login error message */}
          {loginError && (
            <div className="mb-6 bg-red-900/30 border border-red-800 rounded-md p-3 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-300">{loginError}</p>
            </div>
          )}
          
          {/* Google Sign In Button - Placed on top for visibility */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Image 
                src="/google.svg" 
                alt="Google logo" 
                width={20}
                height={20}
                className="mr-2" 
              />
              Sign in with Google
            </button>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/60 text-gray-400">
                Or sign in with email
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 pl-10 bg-gray-800/60 text-white rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                  placeholder="john.doe@example.com"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-blue-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-blue-400 hover:text-blue-300 focus:outline-none transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3 pl-10 pr-10 bg-gray-800/60 text-white rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in with Email"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Help and Support */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p className="mb-2">
            Having trouble signing in?
            <Link href="/support" className="ml-1 text-blue-400 hover:text-blue-300 transition-colors">
              Contact our support team
            </Link>
          </p>
          <p>
            By signing in, you agree to our 
            <Link href="/terms" className="mx-1 text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>
            and
            <Link href="/privacy" className="ml-1 text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}