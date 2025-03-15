"use client";

// src/components/ClientLayout.tsx
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for page loading - start with false to match server render
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading to true only on client
    setIsLoading(true);
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // Loading screen with TechPoa logo and animation
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 z-50">
          <div className="relative">
            <div className="relative overflow-hidden">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
                Tech<span className="text-blue-400 relative">
                  Poa
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-typewriter"></span>
                </span>
              </h1>
            </div>
            
            {/* Loading spinner */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          {/* Main content with spacing for navbar */}
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}