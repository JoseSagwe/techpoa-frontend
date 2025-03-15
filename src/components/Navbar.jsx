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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-blue-500/20" 
          : "bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <div className="relative h-10 w-32">
                <div className="relative overflow-hidden">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
                    Tech<span className="text-blue-400 relative">
                      Poa
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-typewriter"></span>
                    </span>
                  </h1>
                </div>
                {/* Tech-inspired decorative elements */}
                <div className="absolute -top-1 -left-2 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-0 -right-2 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
                
                {/* Circuit-like decorative lines */}
                <div className="absolute top-1/2 -left-4 w-3 h-0.5 bg-blue-500/50"></div>
                <div className="absolute top-1/4 -right-4 w-3 h-0.5 bg-purple-500/50"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link 
              href="/"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors flex items-center"
                onClick={() => toggleDropdown('services')}
              >
                Services
                <ChevronDown size={16} className="ml-1 transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              <div 
                className={`absolute left-0 mt-2 w-60 bg-gray-800 border border-blue-500/30 rounded-md shadow-xl z-20 transition-all duration-200 origin-top-left ${
                  activeDropdown === 'services' 
                    ? 'transform scale-100 opacity-100' 
                    : 'transform scale-95 opacity-0 pointer-events-none'
                }`}
              >
                <div className="p-2 grid gap-1">
                  <Link 
                    href="/services/software-development"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <Code size={18} className="mr-2 text-blue-400" />
                    Software Development
                  </Link>
                  <Link 
                    href="/services/consultancy"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <PenTool size={18} className="mr-2 text-blue-400" />
                    Tech Consultancy
                  </Link>
                  <Link 
                    href="/services/courses"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <BookOpen size={18} className="mr-2 text-blue-400" />
                    Tech Courses
                  </Link>
                </div>
              </div>
            </div>

            {/* Courses Dropdown */}
            <div className="relative group">
              <button 
                className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors flex items-center"
                onClick={() => toggleDropdown('courses')}
              >
                Courses
                <ChevronDown size={16} className="ml-1 transition-transform duration-200 ease-in-out" style={{ transform: activeDropdown === 'courses' ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              <div 
                className={`absolute left-0 mt-2 w-60 bg-gray-800 border border-blue-500/30 rounded-md shadow-xl z-20 transition-all duration-200 origin-top-left ${
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
                    <LifeBuoy size={18} className="mr-2 text-blue-400" />
                    Cybersecurity
                  </Link>
                  <Link 
                    href="/courses/ai"
                    className="flex items-center px-3 py-2 text-sm text-gray-200 hover:bg-blue-800/40 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    <Zap size={18} className="mr-2 text-blue-400" />
                    AI & Machine Learning
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/community"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
            >
              Community
            </Link>

            <Link 
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
            >
              Blog
            </Link>

            <Link 
              href="/about"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
            >
              About
            </Link>

            <Link 
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-white hover:text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-white hover:text-blue-200 border border-blue-700/50 hover:border-blue-500 rounded-md transition-all"
            >
              Log In
            </Link>
            <Link 
              href="/signup"
              className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-blue-900/30 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
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
        className={`md:hidden bg-gray-900/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-900/30">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-white hover:bg-blue-800/40 rounded-md"
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
              className="block px-3 py-2 text-base font-medium text-center text-white border border-blue-700/50 hover:border-blue-500 rounded-md transition-all"
              onClick={closeMenu}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block px-3 py-2 text-base font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-md transition-colors"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;