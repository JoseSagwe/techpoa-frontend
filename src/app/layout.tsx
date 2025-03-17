// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";
import ClientLayout from "@/components/ClientLayout";
import AuthProvider from "@/contexts/AuthContext";
import AuthRouteHandler from "@/components/AuthRouteHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPoa Connect",
  description: "Your gateway to tech excellence. Empowering individuals and businesses with cutting-edge tech courses, software development services, and a thriving community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <AuthRouteHandler>
              <ClientLayout>
                {children}
              </ClientLayout>
            </AuthRouteHandler>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}