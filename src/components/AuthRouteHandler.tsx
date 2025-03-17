"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// List of routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/courses',
  '/my-courses',
  '/community'
];

// List of auth routes (don't show if already logged in)
const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password'
];

const AuthRouteHandler = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    // In a real app, this would verify the user's token or session
    const checkAuth = () => {
      // Simulated authentication check
      // In a real app, you would check localStorage, cookies, or an API
      const token = localStorage.getItem('authToken');
      
      // Set authentication state
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Don't do anything while still loading
    if (isLoading) return;

    // Check if current route requires authentication
    const isProtectedRoute = protectedRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Check if current route is an auth route (login, signup, etc.)
    const isAuthRoute = authRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Redirect logic
    if (isProtectedRoute && !isAuthenticated) {
      // Redirect to login if trying to access protected route while not authenticated
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (isAuthRoute && isAuthenticated) {
      // Redirect to dashboard if trying to access auth routes while authenticated
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthRouteHandler;