"use client";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Mail, Instagram, Github, Smartphone, Code, BookOpen, Users, PenTool, Globe, Zap } from "lucide-react";
import { 
  getLaunchDate, 
  subscribeToNewsletter, 
  submitQuoteRequest,
  type QuoteRequest , submitContactMessage, type ContactMessage
} from "../services/api";
import SuccessModal from "@/components/SuccessModal";

// Calculate time left until launch
const calculateTimeLeft = (launchDate: Date) => {
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
  // State for launch date and countdown
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  
  // State for modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);

  // Add state for contact form and success modal
const [contactFormData, setContactFormData] = useState<ContactMessage>({
  name: '',
  email: '',
  message: ''
});

const [showSuccessModal, setShowSuccessModal] = useState(false);
const [successModalContent, setSuccessModalContent] = useState({
  title: '',
  message: ''
});


// Add handler for contact form input changes
const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setContactFormData({
    ...contactFormData,
    [name]: value
  });
};

// Add handler for contact form submission
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await submitContactMessage(contactFormData);
    
    if (response.success) {
      // Show success modal
      setSuccessModalContent({
        title: "Message Sent!",
        message: "Thank you for reaching out! Our team will review your message and get back to you shortly."
      });
      setShowSuccessModal(true);
      
      // Reset form
      setContactFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      alert(`Failed to send message: ${response.message}`);
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
  }
};

  
  // State for newsletter subscription
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<{ type: string, message: string } | null>(null);
  
  // State for form steps in the quote modal
  const [quoteStep, setQuoteStep] = useState(1);
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  
  useEffect(() => {
    // Set visibility after component mounts
    setIsVisible(true);
    
    // Fetch launch date from API
    const fetchLaunchDate = async () => {
      const date = await getLaunchDate();
      if (date) {
        setLaunchDate(date);
        setTimeLeft(calculateTimeLeft(date));
      }
    };
    
    fetchLaunchDate();
    
    // Update countdown every second
    const timer = setInterval(() => {
      if (launchDate) {
        setTimeLeft(calculateTimeLeft(launchDate));
      }
    }, 1000);
    
    // Close modals with escape key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsQuoteModalOpen(false);
        setIsPartnershipModalOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [launchDate]);
  
  // Function to handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    
    try {
      const response = await subscribeToNewsletter(email);
      
      if (response.success) {
        setSubmitStatus({ type: 'success', message: 'Successfully subscribed to our newsletter!' });
        setEmail('');
      } else {
        setSubmitStatus({ type: 'error', message: response.message || 'Failed to subscribe. Please try again later.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  };
  
  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Function to handle form submission
  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await submitQuoteRequest(formData);
      
      if (response.success) {
        // Hide quote modal first
        setIsQuoteModalOpen(false);
        
        // Show success modal with custom message
        setSuccessModalContent({
          title: "Quote Request Received!",
          message: "Thanks for choosing TechPoa! Your quote request has been successfully submitted. Our expert team will carefully review your requirements and get back to you within 24-48 hours with a customized solution tailored to your needs."
        });
        setShowSuccessModal(true);
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: ''
        });
        setQuoteStep(1); // Reset step for next time
      } else {
        alert(`Failed to submit quote request: ${response.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };
  
  // Next step in multi-step form
  const nextStep = () => {
    setQuoteStep(quoteStep + 1);
  };
  
  // Previous step in multi-step form
  const prevStep = () => {
    setQuoteStep(quoteStep - 1);
  };

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
      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-gray-800 rounded-xl border border-blue-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn"
            style={{animation: "fadeInScale 0.3s ease-out forwards"}}
          >
            <style jsx>{`
              @keyframes fadeInScale {
                0% { opacity: 0; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>
            
            <div className="flex justify-between items-center p-5 border-b border-blue-900">
              <h2 className="text-xl font-bold text-blue-400">Request a Quote</h2>
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-6">
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(quoteStep / 3) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Basic Info</span>
                  <span>Project Details</span>
                  <span>Final Details</span>
                </div>
              </div>
              
              <form onSubmit={handleQuoteSubmit}>
                {/* Step 1: Basic Info */}
                {quoteStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Your Name*</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Email Address*</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Company/Organization</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 2: Project Details */}
                {quoteStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Type of Project*</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      >
                        <option value="">Select a project type</option>
                        <option value="website">Website Development</option>
                        <option value="mobile">Mobile App</option>
                        <option value="software">Custom Software</option>
                        <option value="ecommerce">E-commerce Solution</option>
                        <option value="consultation">Technical Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Estimated Budget</label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="">Select your budget range</option>
                        <option value="under1k">Under $1,000</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k+">$25,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Project Timeline</label>
                      <select 
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="">When do you need this completed?</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1month">Within 1 month</option>
                        <option value="3months">Within 3 months</option>
                        <option value="6months">Within 6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Final Details */}
                {quoteStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Project Description*</label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange} 
                        rows={5} 
                        className="w-full p-3 bg-gray-700/60 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Please describe your project requirements, goals, and any specific features you need..."
                        required
                      ></textarea>
                    </div>
                    <div className="pt-4">
                      <div className="bg-blue-900/40 rounded-lg p-4 text-sm">
                        <h4 className="font-medium mb-2 text-blue-300">What happens next?</h4>
                        <ol className="list-decimal list-inside space-y-1 text-gray-300">
                          <li>Our team will review your project requirements</li>
                          <li>We&apos;ll reach out to discuss your needs in more detail</li>
                          <li>You&apos;ll receive a detailed proposal and quote</li>
                          <li>Once approved, we&apos;ll begin working on your project</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {quoteStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div to maintain flex spacing
                  )}
                  
                  {quoteStep < 3 ? (
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                    >
                      Submit Request
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Partnership Modal */}
      {isPartnershipModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-gray-800 rounded-xl border border-blue-500/30 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{animation: "slideIn 0.4s ease-out forwards"}}
          >
            <style jsx>{`
              @keyframes slideIn {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              @keyframes pulse-glow {
                0% { box-shadow: 0 0 5px 0px rgba(59, 130, 246, 0.5); }
                50% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.7); }
                100% { box-shadow: 0 0 5px 0px rgba(59, 130, 246, 0.5); }
              }
              .tech-highlight {
                animation: pulse-glow 3s infinite;
              }
            `}</style>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-1/3 h-1/3 bg-blue-400/10 rounded-full blur-2xl"></div>
                {/* Tech pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
              </div>
              <div className="relative p-4 sm:p-6 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Partner With TechPoa</h2>
                <p className="text-blue-100 text-sm sm:text-base">Join us in shaping the future of tech in Africa</p>
              </div>
              <button 
                onClick={() => setIsPartnershipModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blue-400">We Value Partnerships</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                  Whether you&apos;re a tech company, educational institution, or industry expert, 
                  we&apos;re excited to explore collaboration opportunities with you.
                </p>
                
                <div className="bg-blue-900/30 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 tech-highlight text-sm">
                  <h4 className="font-medium mb-2 text-blue-300 text-base">Partnership Benefits</h4>
                  <ul className="space-y-1 sm:space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="text-blue-400 mr-2 mt-0.5">✓</div>
                      <span>Access to our network of tech professionals and learners</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-400 mr-2 mt-0.5">✓</div>
                      <span>Co-branded marketing opportunities and events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-400 mr-2 mt-0.5">✓</div>
                      <span>Collaborative content creation and knowledge sharing</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-400 mr-2 mt-0.5">✓</div>
                      <span>Joint development initiatives and innovation projects</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-300 mb-2 sm:mb-3 text-sm">
                    To discuss partnership opportunities, contact us:
                  </p>
                  <a 
                    href="mailto:techpoaconnect@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-base sm:text-lg inline-block relative group"
                  >
                    partnerships@techpoa.com
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setIsPartnershipModalOpen(false)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors mr-3"
                >
                  Close
                </button>
                <a 
                  href="mailto:partnerships@techpoa.com?subject=TechPoa%20Partnership%20Inquiry&body=Hello%20TechPoa%20Team,%0A%0AI'm%20interested%20in%20exploring%20partnership%20opportunities%20with%20your%20organization.%0A%0ACompany:%20%0AArea%20of%20Interest:%20%0A%0APlease%20contact%20me%20to%20discuss%20potential%20collaboration.%0A%0ABest%20regards,"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Email Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Animated Logo Header */}
      <div className={`flex justify-center pt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="relative">
          <div className="relative z-10 overflow-hidden">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
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
          {/* Tech-inspired decorative elements */}
          <div className="absolute -top-3 -left-6 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-0 -right-5 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -bottom-3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
          
          {/* Circuit-like decorative lines */}
          <div className="absolute top-1/2 -left-8 w-6 h-0.5 bg-blue-500/50"></div>
          <div className="absolute top-1/4 -right-8 w-6 h-0.5 bg-purple-500/50"></div>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600"></div>
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
          
          {/* Newsletter status message */}
          {submitStatus && (
            <div className={`p-2 mb-3 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-700/50 text-green-200' : 'bg-red-700/50 text-red-200'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-grow p-3 bg-gray-800/60 text-white rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-3 rounded-md sm:rounded-l-none font-medium"
            >
              Notify Me
            </button>
          </form>
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
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 duration-300"
            >
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
              At TechPoa Connect, we believe in the power of collaboration. We&apos;re actively seeking partnerships with tech companies, educational institutions, and industry experts to expand our ecosystem and provide more value to our users.
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
                  Don&apos;t miss out on the chance to join our platform as an instructor to share your knowledge, build your personal brand, and connect with eager learners.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setIsPartnershipModalOpen(true)}
                className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 duration-300"
              >
                Explore Partnership Opportunities
              </button>
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
                <a 
                  href="mailto:techpoaconnect@gmail.com?subject=TechPoa%20Inquiry&body=Hello%20TechPoa%20Team,%0A%0AI'd%20like%20to%20inquire%20about%20your%20services.%0A%0ABest%20regards," 
                  className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base"
                >
                  info@techpoa.com
                </a>
              </div>
              <div className="flex items-center">
                <Smartphone size={18} className="text-blue-400 mr-3" />
                <a href="tel:+2547166687177" className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base">+254 716687177</a>
              </div>
              <div className="flex items-center">
                <Globe size={18} className="text-blue-400 mr-3" />
                <a href="https://techpoa.com" className="text-gray-300 hover:text-blue-300 transition-colors text-sm sm:text-base">www.techpoa.com</a>
              </div>
            </div>
            
                <div className="mt-5 sm:mt-6">
                <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Follow Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573759510352" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href="https://x.com/Techpoa_connect" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a 
                    href="www.linkedin.com/in/techpoa-connect-ba6609355" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/techpoa_connect" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://github.com/techpoa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Check our code on GitHub"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-xl p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">Send Us a Message</h3>
              <form className="space-y-3 sm:space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    placeholder="Your Name" 
                    className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    placeholder="Your Email" 
                    className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    rows={4} 
                    className="w-full p-2 sm:p-3 bg-gray-800/60 text-white rounded-md focus:outline-none text-sm sm:text-base"
                    required
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base"
                  >
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

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={successModalContent.title}
        message={successModalContent.message}
      />
    </main>
  );
}