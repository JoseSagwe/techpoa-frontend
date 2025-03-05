"use client";

import { useEffect, useState } from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const calculateTimeLeft = () => {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);
  const difference = launchDate.getTime() - new Date().getTime();

  return difference > 0
    ? {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    : { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 text-center">
      {/* Logo */}
      {/* <Image src="/logo.png" width={200} height={200} alt="TechPoa Logo" /> */}
      
      {/* Countdown */}
      <h1 className="text-4xl font-bold mt-6">TechPoa is Launching Soon!</h1>
      <p className="text-lg mt-2 text-gray-400">The Future of Tech Learning & Services</p>

      <div className="flex space-x-6 mt-6 text-3xl font-bold">
        <div className="p-4 bg-blue-600 rounded-lg">{timeLeft.days} <span className="text-sm block">Days</span></div>
        <div className="p-4 bg-blue-500 rounded-lg">{timeLeft.hours} <span className="text-sm block">Hours</span></div>
        <div className="p-4 bg-blue-400 rounded-lg">{timeLeft.minutes} <span className="text-sm block">Minutes</span></div>
        <div className="p-4 bg-blue-300 rounded-lg">{timeLeft.seconds} <span className="text-sm block">Seconds</span></div>
      </div>

      {/* About TechPoa */}
      <div className="mt-8 max-w-2xl">
        <h2 className="text-2xl font-semibold">What is TechPoa?</h2>
        <p className="text-gray-400 mt-2">
          TechPoa is your go-to platform for software development, tech consultancy, online courses, and a thriving tech community. Join us to gain valuable tech skills, network, and grow.
        </p>
      </div>

      {/* Contact & Socials */}
      <div className="mt-6 flex space-x-4">
        <a href="#" className="text-blue-500 text-2xl"><Facebook /></a>
        <a href="#" className="text-blue-400 text-2xl"><Twitter /></a>
        <a href="#" className="text-blue-600 text-2xl"><Linkedin /></a>
        <a href="mailto:contact@techpoa.com" className="text-red-500 text-2xl"><Mail /></a>
      </div>

      {/* Partnership Call */}
      <div className="mt-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Want to Partner with Us?</h2>
        <p className="text-gray-400">Reach out to us for business opportunities, collaborations, and investment inquiries.</p>
        <a href="mailto:partnership@techpoa.com" className="text-blue-500 font-bold">Email Us</a>
      </div>
    </main>
  );
}
