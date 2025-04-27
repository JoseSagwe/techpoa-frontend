// src/components/AuthRouteHandler.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLoading } from "@/contexts/LoadingContext";

// List of routes that require authentication
const protectedRoutes = [
  '/dashboard',
  // '/profile',
  // '/courses',
  // '/my-courses',
  // '/community'
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
  const [isChecking, setIsChecking] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      showLoading("Verifying authentication...");
      
      // Simulated authentication check
      const token = localStorage.getItem('authToken');
      
      // Set authentication state
      setIsAuthenticated(!!token);
      setIsChecking(false);
      hideLoading();
    };

    checkAuth();
  }, [showLoading, hideLoading]);

  useEffect(() => {
    // Don't do anything while still checking
    if (isChecking) return;

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
      showLoading("Redirecting to login...");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (isAuthRoute && isAuthenticated) {
      showLoading("Redirecting to dashboard...");
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router, isChecking, showLoading, hideLoading]);

  return children;
};

export default AuthRouteHandler;