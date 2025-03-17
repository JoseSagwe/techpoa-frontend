// src/components/ClientLayout.tsx
"use client";
import { useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // Show initial loading state
    showLoading("Preparing your experience...");
    
    // Hide loading after a short delay
    const timer = setTimeout(() => {
      hideLoading();
    }, 800);

    return () => clearTimeout(timer);
  }, [showLoading, hideLoading]);

  return (
    <>
      <Navbar />
      {/* Main content with spacing for navbar */}
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}