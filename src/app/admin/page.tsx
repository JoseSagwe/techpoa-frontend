"use client";
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  
  // Check if user was previously logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem('techpoa_admin_auth');
    const savedCode = localStorage.getItem('techpoa_admin_code');
    
    if (savedAuth === 'true' && savedCode) {
      setIsAuthenticated(true);
      setAccessCode(savedCode);
    }
  }, []);
  
  // Handle login success
  const handleLogin = (code: string) => {
    setIsAuthenticated(true);
    setAccessCode(code);
    
    // Save auth state to localStorage
    localStorage.setItem('techpoa_admin_auth', 'true');
    localStorage.setItem('techpoa_admin_code', code);
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessCode('');
    
    // Clear auth state from localStorage
    localStorage.removeItem('techpoa_admin_auth');
    localStorage.removeItem('techpoa_admin_code');
  };

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard accessCode={accessCode} onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}