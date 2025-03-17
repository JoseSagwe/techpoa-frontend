"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, EyeOff, Eye, CheckCircle, Shield, XCircle } from "lucide-react";

// This would be a server component in a real app that
// would receive the token from the URL
export default function ResetPassword() {
  // State for form data
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isTokenChecking, setIsTokenChecking] = useState(true);

  // Validate token on mount (simulated)
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Simulate API call to validate token with 1 second delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, we'll assume the token is valid
        // In a real app, you would verify the token with your API
        setIsTokenValid(true);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsTokenValid(false);
      } finally {
        setIsTokenChecking(false);
      }
    };
    
    validateToken();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Render password strength indicator
  const renderPasswordStrength = () => {
    if (!formData.password) return null;
    
    let strength = 0;
    let message = "";
    
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    
    switch (strength) {
      case 0:
      case 1:
        message = "Weak";
        break;
      case 2:
        message = "Fair";
        break;
      case 3:
        message = "Good";
        break;
      case 4:
        message = "Strong";
        break;
      default:
        message = "";
    }
    
    return (
      <div className="mt-1">
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              strength <= 1 ? 'bg-red-500' : 
              strength === 2 ? 'bg-yellow-500' : 
              strength === 3 ? 'bg-blue-500' : 'bg-green-500'
            }`} 
            style={{ width: `${strength * 25}%` }}
          ></div>
        </div>
        <p className={`text-xs mt-1 ${
          strength <= 1 ? 'text-red-500' : 
          strength === 2 ? 'text-yellow-500' : 
          strength === 3 ? 'text-blue-400' : 'text-green-500'
        }`}>
          {message}
        </p>
      </div>
    );
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with 1.5 second delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API to update the password
      
      // Show success state
      setSubmitted(true);
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors({ submit: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking token
  if (isTokenChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg">Verifying your request...</p>
      </div>
    );
  }

  // Invalid token state
  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <h2 className="text-center text-3xl font-extrabold text-white mb-2">
            Invalid or Expired Link
          </h2>
          <p className="text-center text-gray-400 mb-8">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          
          <div className="flex justify-center">
            <Link
              href="/forgot-password"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
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
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Your new password must be different from previously used passwords
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/60 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800/50">
          {submitted ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-900/50 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Password reset successful
              </h3>
              
              <p className="text-gray-300 mb-6">
                Your password has been reset successfully. You can now use your new password to log in.
              </p>
              
              <Link
                href="/login"
                className="inline-flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Continue to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 flex items-start mb-4">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-300">Password requirements:</h4>
                  <ul className="mt-1 text-xs text-gray-400 space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-blue-300">
                  New Password
                </label>
                <div className="relative">
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
                {renderPasswordStrength()}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-blue-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 pr-10 bg-gray-800/60 text-white rounded-md border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              
              {errors.submit && (
                <div className="bg-red-900/30 border border-red-800 rounded-md p-3">
                  <p className="text-sm text-red-300">{errors.submit}</p>
                </div>
              )}
              
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
                      Updating password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}