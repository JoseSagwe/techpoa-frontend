"use client";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Mail, Smartphone, Code, BookOpen, Users, PenTool, Globe, Zap, MessageSquare } from "lucide-react";

// Set a fixed launch date instead of a relative one to ensure consistent counting
const calculateTimeLeft = () => {
  // Set launch date to 90 days from now (fixed date for consistency)
  const launchDate = new Date("2025-06-05T00:00:00"); // You can change this to your actual launch date
  const now = new Date();
  const difference = launchDate.getTime() - now.getTime();
  
  return difference > 0 ? {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  } : { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export default function Home() {
  // Initialize with zeros to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  
  useEffect(() => {
    // Set initial values and visibility only on client side
    setIsVisible(true);
    
    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const services = [
    { icon: <Code size={24} />, title: "Software Development", description: "Custom applications, websites, and mobile solutions tailored to your business needs" },
    { icon: <PenTool size={24} />, title: "Tech Consultancy", description: "Expert advice on digital transformation, tech stack selection, and IT strategy" },
    { icon: <BookOpen size={24} />, title: "Tech Courses", description: "Self-paced online courses covering programming, design, and emerging technologies" },
    { icon: <Users size={24} />, title: "Live Training", description: "Interactive instructor-led sessions with real-time feedback and hands-on projects" },
    { icon: <Globe size={24} />, title: "Tech Community", description: "Join our network of developers, designers, and tech enthusiasts for collaboration" },
    { icon: <Zap size={24} />, title: "Tech News & Blog", description: "Stay updated with the latest industry trends, tutorials, and success stories" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Animated Logo Header */}
      <div className={`flex justify-center pt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="relative">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Tech<span className="text-blue-400">Poa</span>
          </h1>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
        </div>
      </div>

      {/* Hero Section with Countdown */}
      <div className={`flex flex-col items-center justify-center mt-12 px-4 sm:px-6 text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl sm:text-4xl font-bold">Launching Soon!</h2>
        <p className="text-lg sm:text-xl mt-2 text-blue-300">Your Gateway to Tech Excellence</p>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 w-full max-w-xl mx-auto">
          {/* Days Counter */}
          <div className="flex-1 min-w-[70px] sm:min-w-[80px] bg-blue-900/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3 sm:p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
              <span className="text-xs sm:text-sm text-blue-300 mt-1">Days</span>
            </div>
          </div>
          
          {/* Hours Counter */}
          <div className="flex-1 min-w-[70px] sm:min-w-[80px] bg-blue-800/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3 sm:p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs sm:text-sm text-blue-300 mt-1">Hours</span>
            </div>
          </div>
          
          {/* Minutes Counter */}
          <div className="flex-1 min-w-[70px] sm:min-w-[80px] bg-blue-700/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3 sm:p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs sm:text-sm text-blue-300 mt-1">Minutes</span>
            </div>
          </div>
          
          {/* Seconds Counter */}
          <div className="flex-1 min-w-[70px] sm:min-w-[80px] bg-blue-600/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-3 sm:p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs sm:text-sm text-blue-300 mt-1">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className={`max-w-md mx-auto mt-10 sm:mt-12 px-4 sm:px-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Get Notified at Launch</h3>
          <p className="text-blue-200 text-xs sm:text-sm mb-4">Be the first to know when we launch and receive exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input type="email" placeholder="Your email address" className="w-full sm:flex-grow p-3 bg-gray-800/60 text-white rounded-md sm:rounded-r-none focus:outline-none" />
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-3 rounded-md sm:rounded-l-none font-medium">Notify Me</button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className={`max-w-6xl mx-auto mt-16 sm:mt-20 px-4 sm:px-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-wrap justify-center mb-6 sm:mb-8 border-b border-blue-800 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('services')} 
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium ${activeTab === 'services' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          >
            Our Services
          </button>
          <button 
            onClick={() => setActiveTab('about')} 
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium ${activeTab === 'about' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          >
            About Us
          </button>
          <button 
            onClick={() => setActiveTab('partnership')} 
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium ${activeTab === 'partnership' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          >
            Partnership
          </button>
        </div>

        {/* Services Tab */}
        <div className={activeTab === 'services' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-6 hover:bg-blue-800/40 transition-all hover:scale-105 duration-300">
                <div className="text-blue-400 mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium">
              Request a Quote
            </button>
          </div>
        </div>

        {/* About Tab */}
        <div className={activeTab === 'about' ? 'block' : 'hidden'}>
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">About TechPoa Connect</h3>
            <p className="text-gray-300 mb-4">
              TechPoa Connect is a premier tech ecosystem designed to bridge the gap between technology enthusiasts, professionals, and businesses. Founded with a vision to democratize tech knowledge and services, we offer a comprehensive platform that caters to diverse tech needs.
            </p>
            <p className="text-gray-300 mb-4">
              Our mission is to empower individuals and organizations through accessible tech education, professional software services, and community engagement. We believe in the power of technology to transform lives and businesses.
            </p>
            <div className="bg-blue-800/30 p-4 rounded-lg mt-6">
              <h4 className="font-medium mb-2">Why Choose TechPoa Connect?</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-1"><Zap size={16} /></div>
                  <span>Expert-led courses and mentorship from industry professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-1"><Zap size={16} /></div>
                  <span>Customized software solutions tailored to your specific business needs</span>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-1"><Zap size={16} /></div>
                  <span>Vibrant community of tech enthusiasts for networking and collaboration</span>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-1"><Zap size={16} /></div>
                  <span>Latest tech news and trends to keep you informed and ahead of the curve</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partnership Tab */}
        <div className={activeTab === 'partnership' ? 'block' : 'hidden'}>
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Partner With Us</h3>
            <p className="text-gray-300 mb-6">
              At TechPoa Connect, we believe in the power of collaboration. We're actively seeking partnerships with tech companies, educational institutions, and industry experts to expand our ecosystem and provide more value to our users.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-800/30 p-5 rounded-lg">
                <h4 className="font-medium mb-2">For Businesses</h4>
                <p className="text-gray-300 text-sm">
                  Partner with us to access a pool of tech talent, showcase your products, and reach a wider audience of tech enthusiasts and professionals.
                </p>
              </div>
              <div className="bg-blue-800/30 p-5 rounded-lg">
                <h4 className="font-medium mb-2">For Educators</h4>
                <p className="text-gray-300 text-sm">
                  Join our platform as an instructor to share your knowledge, build your personal brand, and connect with eager learners.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="mailto:partnership@techpoa.com" className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium">
                Explore Partnership Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Social Section */}
      <div className={`max-w-6xl mx-auto mt-16 sm:mt-20 px-4 sm:px-6 pb-10 sm:pb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Mail size={18} className="text-blue-400 mr-3" />
                <a href="mailto:contact@techpoa.com" className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base">contact@techpoa.com</a>
              </div>
              <div className="flex items-center">
                <Smartphone size={18} className="text-blue-400 mr-3" />
                <a href="tel:+2547XXXXXXXX" className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base">+254 7XX XXX XXX</a>
              </div>
              <div className="flex items-center">
                <Globe size={18} className="text-blue-400 mr-3" />
                <a href="https://techpoa.com" className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base">www.techpoa.com</a>
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6">
              <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <input type="text" placeholder="Your Name" className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base" />
              </div>
              <div>
                <input type="email" placeholder="Your Email" className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base" />
              </div>
              <div>
                <textarea placeholder="Your Message" rows={4} className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6 border-t border-blue-900/50">
        <p>© {new Date().getFullYear()} TechPoa Connect. All rights reserved.</p>
      </footer>
    </main>
  );
}