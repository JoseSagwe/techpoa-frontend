// src/components/LoadingScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";

// Animation variations
const animations = {
  dots: (
    <div className="flex space-x-2 justify-center items-center">
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  ),
  spinner: (
    <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
  ),
  pulse: (
    <div className="relative">
      <div className="w-12 h-12 bg-blue-600/20 rounded-full mx-auto"></div>
      <div className="absolute inset-0 w-12 h-12 bg-blue-600/40 rounded-full animate-ping opacity-75 mx-auto"></div>
    </div>
  )
};

export default function LoadingScreen() {
  const { isLoading, loadingMessage } = useLoading();
  const [showDelayed, setShowDelayed] = useState(false);
  const [animationType, setAnimationType] = useState("spinner");
  
  // Choose a random animation on mount
  useEffect(() => {
    const types = Object.keys(animations);
    const randomType = types[Math.floor(Math.random() * types.length)];
    setAnimationType(randomType);
  }, []);
  
  // Only show loading screen if loading persists for more than 300ms
  // This prevents flashing for very quick loads
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      timer = setTimeout(() => {
        setShowDelayed(true);
      }, 300);
    } else {
      setShowDelayed(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);
  
  if (!isLoading || !showDelayed) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 z-50 transition-opacity duration-300">
      <div className="relative">
        <div className="relative overflow-hidden">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
            Tech<span className="text-blue-400 relative">
              Poa
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-typewriter"></span>
            </span>
          </h1>
        </div>
        
        <div className="mt-8 text-center">
          {animations[animationType as keyof typeof animations]}
          <p className="text-blue-300 animate-pulse mt-4">{loadingMessage}</p>
        </div>
      </div>
    </div>
  );
}