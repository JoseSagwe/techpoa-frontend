"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Code, BookOpen, PenTool, Zap, LifeBuoy } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-gray-900/95 via-blue-900/30 to-gray-900/95 backdrop-blur-md shadow-[0_5px_25px_rgba(30,64,175,0.3)] border-b border-blue-500/30" 
          : "bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-blue-900/80 backdrop-blur-sm"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-teal-500/0 via-teal-500/30 to-teal-500/0 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-32 h-16 border-b border-r border-teal-500/10 rounded-br-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-16 border-t border-l border-purple-500/10 rounded-tl-3xl"></div>
        
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 opacity-30"></div>
        
        {/* Glowing dots */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-teal-400 rounded-full opacity-70 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-indigo-400 rounded-full opacity-70 animate-ping" style={{animationDuration: '3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group" onClick={closeMenu}>
              <div className="relative h-10 w-36">
                {/* Logo container with glass effect */}
                <div className="relative group-hover:scale-105 transition-transform duration-300 ease-out">
                  {/* Logo background glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-lg blur-sm group-hover:blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo content */}
                  <div className="relative px-3 py-1 bg-indigo-900/80 backdrop-blur-sm rounded-lg border border-purple-500/40 group-hover:border-teal-400/50 transition-colors duration-300">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-500 animate-gradient-x">
                      Tech<span className="text-teal-400 relative">
                        Poa
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 animate-typewriter"></span>
                      </span>
                    </h1>
                  </div>
                </div>
                
                {/* Tech-inspired decorative elements */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-teal-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-1/4 -right-1 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1.2s'}}></div>
                
                {/* Circuit-like decorative lines */}
                <div className="absolute top-1/2 -left-4 w-3 h-0.5 bg-gradient-to-r from-teal-500 to-teal-500/10"></div>
                <div className="absolute top-3/4 -right-4 w-3 h-0.5 bg-gradient-to-l from-purple-500 to-purple-500/10"></div>
                <div className="absolute top-1/3 left-1/4 w-0.5 h-2 bg-gradient-to-b from-indigo-500/50 to-indigo-500/10"></div>
                
                {/* Modern geometric accent */}
                <div className="absolute -bottom-1 -right-2 w-3 h-3 border-l border-t border-teal-500/40 opacity-80"></div>
                
                {/* Binary code dots in background */}
                <div className="absolute -right-6 top-0 h-full w-4 flex flex-col justify-between opacity-40">
                  <div className="flex justify-between">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-0.5 h-0.5 rounded-full bg-purple-400"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                    <div className="w-0.5 h-0.5 rounded-full bg-purple-400"></div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link 
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-100 hover:text-teal-300 hover:bg-indigo-900/40 rounded-md transition-colors relative group"
            >
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-400 to-teal-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="px-3 py-2 text-sm font-medium text-gray-100 hover:text-teal-300 hover:bg-indigo-900/40 rounded-md transition-colors flex items-center relative group"
                onClick={() => toggleDropdown('services')}
              >
                Services
                <ChevronDown size={16} className="ml-1 transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)' }} />
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-400 to-teal-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </button>

              <div 
                className={`absolute left-0 mt-2 w-60 bg-indigo-900/90 backdrop-blur-md border border-teal-500/30 rounded-md shadow-xl z-20 transition-all duration-200 origin-top-left ${
                  activeDropdown === 'services' 
                    ? 'transform scale-100 opacity-100' 
                    : 'transform scale-95 opacity-0 pointer-events-none'
                }`}
              >
                <div className="p-2 grid gap-1">
                  <Link 
                    href="/services/software-development"
                    className="flex items-center px-3 py-2 text-sm text-gray-100 hover:bg-purple-900/50 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <Code size={18} className="mr-2 text-teal-400" />
                    Software Development
                  </Link>
                  <Link 
                    href="/services/consultancy"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <PenTool size={18} className="mr-2 text-teal-400" />
                    Tech Consultancy
                  </Link>
                  <Link 
                    href="/services/courses"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <BookOpen size={18} className="mr-2 text-teal-400" />
                    Tech Courses
                  </Link>
                </div>
              </div>
            </div>

            {/* Courses Dropdown */}
            <div className="relative group">
              <button 
                className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors flex items-center relative group"
                onClick={() => toggleDropdown('courses')}
              >
                Courses
                <ChevronDown size={16} className="ml-1 transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'courses' ? 'rotate(180deg)' : 'rotate(0)' }} />
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </button>

              <div 
                className={`absolute left-0 mt-2 w-60 bg-gray-800/95 backdrop-blur-md border border-blue-500/30 rounded-md shadow-xl z-20 transition-all duration-200 origin-top-left ${
                  activeDropdown === 'courses' 
                    ? 'transform scale-100 opacity-100' 
                    : 'transform scale-95 opacity-0 pointer-events-none'
                }`}
              >
                <div className="p-2 grid gap-1">
                  <Link 
                    href="/courses/software-development"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <Code size={18} className="mr-2 text-blue-400" />
                    Software Development
                  </Link>
                  <Link 
                    href="/courses/cybersecurity"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <LifeBuoy size={18} className="mr-2 text-teal-400" />
                    Cybersecurity
                  </Link>
                  <Link 
                    href="/courses/ai"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <Zap size={18} className="mr-2 text-teal-400" />
                    AI & Machine Learning
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/community"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors relative group"
            >
              Community
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link 
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors relative group"
            >
              Blog
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link 
              href="/about"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors relative group"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link 
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors relative group"
            >
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/login"
              className="px-4 py-1.5 text-sm font-medium text-gray-100 hover:text-teal-200 border border-purple-700/50 hover:border-teal-500 rounded-md transition-all relative group overflow-hidden"
            >
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-teal-600/0 via-teal-600/40 to-teal-600/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
            <Link 
              href="/signup"
              className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-indigo-700 hover:from-teal-500 hover:to-indigo-600 rounded-md transition-colors relative group overflow-hidden"
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-purple-400/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-teal-300 hover:bg-indigo-900/40 focus:outline-none relative group"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <span className="absolute inset-0 rounded-md bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-b from-indigo-900/95 to-purple-900/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-teal-700/30">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-gray-100 hover:bg-purple-800/40 rounded-md"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {/* Mobile Services Dropdown */}
          <div>
            <button
              className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
              onClick={() => toggleDropdown('mobileServices')}
            >
              Services
              <ChevronDown size={18} className="transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'mobileServices' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            
            <div className={`mt-1 ml-3 pl-3 border-l border-blue-800 ${activeDropdown === 'mobileServices' ? 'block' : 'hidden'}`}>
              <Link
                href="/services/software-development"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <Code size={18} className="mr-2 text-blue-400" />
                Software Development
              </Link>
              <Link
                href="/services/consultancy"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <PenTool size={18} className="mr-2 text-blue-400" />
                Tech Consultancy
              </Link>
              <Link
                href="/services/courses"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <BookOpen size={18} className="mr-2 text-blue-400" />
                Tech Courses
              </Link>
            </div>
          </div>
          
          {/* Mobile Courses Dropdown */}
          <div>
            <button
              className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
              onClick={() => toggleDropdown('mobileCourses')}
            >
              Courses
              <ChevronDown size={18} className="transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'mobileCourses' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            
            <div className={`mt-1 ml-3 pl-3 border-l border-blue-800 ${activeDropdown === 'mobileCourses' ? 'block' : 'hidden'}`}>
              <Link
                href="/courses/software-development"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <Code size={18} className="mr-2 text-blue-400" />
                Software Development
              </Link>
              <Link
                href="/courses/cybersecurity"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <LifeBuoy size={18} className="mr-2 text-blue-400" />
                Cybersecurity
              </Link>
              <Link
                href="/courses/ai"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:bg-blue-800/40 rounded-md"
                onClick={closeMenu}
              >
                <Zap size={18} className="mr-2 text-blue-400" />
                AI & Machine Learning
              </Link>
            </div>
          </div>
          
          <Link
            href="/community"
            className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
            onClick={closeMenu}
          >
            Community
          </Link>
          
          <Link
            href="/blog"
            className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
            onClick={closeMenu}
          >
            Blog
          </Link>
          
          <Link
            href="/about"
            className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
            onClick={closeMenu}
          >
            About
          </Link>
          
          <Link
            href="/contact"
            className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
            onClick={closeMenu}
          >
            Contact
          </Link>
          
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              href="/login"
              className="block px-3 py-2 text-base font-medium text-center text-white border border-blue-700/50 hover:border-blue-500 rounded-md transition-all relative overflow-hidden group"
              onClick={closeMenu}
            >
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-blue-600/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
            <Link
              href="/signup"
              className="block px-3 py-2 text-base font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-md transition-colors relative overflow-hidden group"
              onClick={closeMenu}
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;