"use client";
import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Instagram, Github, Code, BookOpen, Users, PenTool, Globe, ChevronUp } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    
    try {
      // Replace with your actual API call
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubscribeStatus({ type: 'success', message: 'Successfully subscribed to our newsletter!' });
        setEmail('');
      } else {
        setSubscribeStatus({ type: 'error', message: data.message || 'Failed to subscribe. Please try again later.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubscribeStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setSubscribeStatus(null);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Column 1: Company & Logo */}
          <div>
            <div className="relative mb-6">
              <div className="relative overflow-hidden">
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
              {/* Circuit-like decorative lines */}
              <div className="absolute top-1/2 -left-4 w-3 h-0.5 bg-blue-500/50"></div>
              <div className="absolute top-1/4 -right-4 w-3 h-0.5 bg-purple-500/50"></div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Your gateway to tech excellence. Empowering individuals and businesses with 
              cutting-edge tech courses, software development services, and a thriving community.
            </p>
            
            <div className="flex space-x-3 my-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61573759510352" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="bg-blue-800/30 p-1.5 rounded-md hover:bg-blue-700/50 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://x.com/Techpoa_connect" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="bg-blue-800/30 p-1.5 rounded-md hover:bg-blue-700/50 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="www.linkedin.com/in/birisio-joseph-ba6609355" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="bg-blue-800/30 p-1.5 rounded-md hover:bg-blue-700/50 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://www.instagram.com/techpoa_connect" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="bg-blue-800/30 p-1.5 rounded-md hover:bg-blue-700/50 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://github.com/techpoa" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="bg-blue-800/30 p-1.5 rounded-md hover:bg-blue-700/50 transition-colors"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/about" className="inline-flex items-center">
                  <span>About Us</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/services" className="inline-flex items-center">
                  <span>Services</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/courses" className="inline-flex items-center">
                  <span>Courses</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/blog" className="inline-flex items-center">
                  <span>Blog</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/community" className="inline-flex items-center">
                  <span>Community</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/contact" className="inline-flex items-center">
                  <span>Contact</span>
                  <div className="w-1 h-1 rounded-full bg-blue-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-300 transition-colors flex items-start">
                <Code size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <Link href="/services/software-development">
                  Software Development
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors flex items-start">
                <PenTool size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <Link href="/services/consultancy">
                  Tech Consultancy
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors flex items-start">
                <BookOpen size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <Link href="/services/courses">
                  Tech Courses
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors flex items-start">
                <Users size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <Link href="/services/training">
                  Live Training
                </Link>
              </li>
              <li className="hover:text-blue-300 transition-colors flex items-start">
                <Globe size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <Link href="/services/community">
                  Tech Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on courses, 
              tech news, and exclusive offers.
            </p>
            
            {/* Newsletter status message */}
            {subscribeStatus && (
              <div className={`p-2 mb-3 rounded-md text-sm ${
                subscribeStatus.type === 'success' 
                  ? 'bg-green-700/50 text-green-200' 
                  : 'bg-red-700/50 text-red-200'
              }`}>
                {subscribeStatus.message}
              </div>
            )}
            
            <form onSubmit={handleNewsletterSubmit} className="mt-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-800/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <div className="mt-4">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail size={16} className="text-blue-400 mr-2" />
                <a href="mailto:info@techpoa.com" className="hover:text-blue-300 transition-colors">
                  info@techpoa.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tech Pattern Divider */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-6">
          <div className="absolute left-1/4 -top-1 w-1 h-1 rounded-full bg-blue-400"></div>
          <div className="absolute left-1/3 -top-1 w-1 h-1 rounded-full bg-purple-400"></div>
          <div className="absolute left-1/2 -top-1 w-1 h-1 rounded-full bg-blue-400"></div>
          <div className="absolute left-2/3 -top-1 w-1 h-1 rounded-full bg-purple-400"></div>
          <div className="absolute left-3/4 -top-1 w-1 h-1 rounded-full bg-blue-400"></div>
        </div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TechPoa Connect. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies-polic" className="hover:text-blue-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/faq" className="hover:text-blue-300 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
        
        {/* Scroll to Top Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={scrollToTop}
            className="bg-blue-800/30 hover:bg-blue-700/50 p-2 rounded-full transition-colors group"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} className="group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;