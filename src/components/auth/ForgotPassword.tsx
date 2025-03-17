"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  // State for the form data
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load email from localStorage if present (passed from login page)
  useEffect(() => {
    const savedEmail = localStorage.getItem("forgotPasswordEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem("forgotPasswordEmail");
    }
  }, []);

  // Handle input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with 1.5 second delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API endpoint to send a reset email
      
      // Show success state
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          We&apos;ll send you instructions to reset your password
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/60 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800/50">
          {submitted ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                Check your email
              </h3>
              
              <p className="text-gray-400 mb-6">
                We&apos;ve sent password reset instructions to:
                <strong className="block mt-1 text-white">{email}</strong>
              </p>
              
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-left mb-6">
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Didn&apos;t receive an email?</span> Check your spam folder or make sure the email address is correct.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Link>
                
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Resend email
                </button>
              </div>
            </div>
          ) : (
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
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full p-3 pl-10 bg-gray-800/60 text-white rounded-md border ${
                      error ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="john.doe@example.com"
                    disabled={isSubmitting}
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Link>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors order-1 sm:order-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Instructions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
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