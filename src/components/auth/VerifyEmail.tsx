"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Mail, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";

// This would be a server component in a real app that
// would receive the token from the URL
export default function VerifyEmail() {
  // State
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [resendEmailStatus, setResendEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  
  // Simulate getting the email from URL parameters
  useEffect(() => {
    // In a real app, you'd get this from the URL or server props
    setEmail("user@example.com");
  }, []);

  // Simulate verifying the token on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Simulate API call to verify token with 2 second delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll simulate success
        // In a real app, you would verify the token with your API
        setVerificationStatus("success");
      } catch (error) {
        console.error("Error verifying token:", error);
        setVerificationStatus("error");
      }
    };
    
    verifyToken();
  }, []);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (resendEmailStatus === "sending") return;
    
    setResendEmailStatus("sending");
    
    try {
      // Simulate API call with 1.5 second delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API to resend the verification email
      setResendEmailStatus("sent");
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setResendEmailStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error resending verification email:", error);
      setResendEmailStatus("error");
    }
  };

  // Render content based on verification status
  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Verifying your email
            </h3>
            <p className="text-gray-400">
              Please wait while we confirm your email address...
            </p>
          </div>
        );
      
      case "success":
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              Email Verified!
            </h3>
            
            <p className="text-gray-300 mb-2">
              Your email address has been successfully verified.
            </p>
            
            <p className="text-gray-400 mb-8">
              {email && `Thank you for confirming ${email}`}
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">What's next?</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Now that your account is fully activated, you can:
                </p>
                <ul className="text-sm text-gray-400 space-y-1 pl-5 list-disc">
                  <li>Complete your profile</li>
                  <li>Explore available courses</li>
                  <li>Join the TechPoa community</li>
                  <li>Check out our developer resources</li>
                </ul>
              </div>
              
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        );
      
      case "error":
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            
            <h3 className="text-2xl font-semibold text-red-400 mb-4">
              Verification Failed
            </h3>
            
            <p className="text-gray-300 mb-6">
              We couldn't verify your email address. The verification link may be invalid or expired.
            </p>
            
            <div className="bg-gray-800/80 rounded-lg p-5 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-200">Need a new verification link?</h4>
                  <p className="mt-1 text-sm text-gray-400">
                    Click the button below to send a new verification email to your address.
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendEmailStatus === "sending"}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                    resendEmailStatus === "sending" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {resendEmailStatus === "sending" ? (
                    <>
                      <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                      Sending...
                    </>
                  ) : resendEmailStatus === "sent" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verification Email Sent
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </button>
                
                {resendEmailStatus === "sent" && (
                  <p className="mt-2 text-sm text-green-400 text-center">
                    A new verification email has been sent to your inbox.
                  </p>
                )}
                
                {resendEmailStatus === "error" && (
                  <p className="mt-2 text-sm text-red-400 text-center">
                    Failed to send verification email. Please try again.
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                If you continue to have issues, please contact our support team.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Contact Support
                </Link>
                
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
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
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/60 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800/50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}