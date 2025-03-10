"use client";
import React, { useState } from 'react';
import { verifyAccessCode } from '@/services/admin-api';

interface AdminLoginProps {
  onLogin: (accessCode: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await verifyAccessCode(accessCode);
      
      if (response.success) {
        onLogin(accessCode);
      } else {
        setError(response.message || 'Invalid access code');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block relative mb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
              Tech<span className="text-blue-400">Poa</span>
            </h1>
            <div className="absolute -top-2 -right-3 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-xl text-gray-300 font-medium">Admin Dashboard</h2>
        </div>
      
        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg border border-blue-800/30 overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Admin Access</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="accessCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <input
                  id="accessCode"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter your access code"
                  className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isLoading
                    ? 'bg-blue-700/50 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
          
          <div className="py-3 px-6 bg-gray-900/30 border-t border-blue-900/20 text-center">
            <p className="text-sm text-gray-400">
              Authorized personnel only
            </p>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This area is protected. Unauthorized access attempts will be logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;