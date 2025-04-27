"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  ChevronRight,
  Sparkles,
  Calendar,
  ArrowRight,
  Briefcase
} from "lucide-react";
import { useToast } from "@/components/ToastContext";

// Define the type for contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  phone?: string;
  category?: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: '',
    category: 'general'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const { showToast } = useToast();


  // Wrap contactCategories in useMemo to prevent it from being recreated on every render
  const contactCategories = useMemo(() => [
    { id: "general", label: "General Inquiry", icon: <MessageSquare size={20} className="text-blue-400" /> },
    { id: "support", label: "Technical Support", icon: <Globe size={20} className="text-blue-400" /> },
    { id: "sales", label: "Sales", icon: <Sparkles size={20} className="text-blue-400" /> },
    { id: "partnerships", label: "Partnerships", icon: <Linkedin size={20} className="text-blue-400" /> },
    { id: "careers", label: "Careers", icon: <Briefcase size={20} className="text-blue-400" /> }
  ], []); // Empty dependency array means this only runs once

  useEffect(() => {
    setIsVisible(true);

    // Add category from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && contactCategories.some(c => c.id === category)) {
      setActiveCategory(category);
      setFormData(prev => ({ ...prev, category }));
    }
  }, [contactCategories]); // Now contactCategories won't cause unnecessary re-renders

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Show submission toast
      showToast("Sending your message...", "info");
      
      // In a real app, you'd send this data to your backend
      // For demonstration, we're simulating a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormSubmitted(true);
      showToast("Your message has been sent successfully!", "success");
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: '',
        category: 'general'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
  };

  const getCategorySubtitle = () => {
    switch(activeCategory) {
      case "general":
        return "Have a question or comment? We&apos;d love to hear from you.";
      case "support":
        return "Need technical assistance? Our support team is here to help.";
      case "sales":
        return "Interested in our services? Let&apos;s discuss how we can help your business.";
      case "partnerships":
        return "Looking to collaborate? Tell us about partnership opportunities.";
      case "careers":
        return "Interested in joining our team? Tell us about yourself.";
      default:
        return "We&apos;re here to help. Send us a message and we&apos;ll get back to you soon.";
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl" style={{animationDelay: "1s"}}></div>
        
        {/* Digital pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
        
        {/* Tech-inspired decorative lines */}
        <div className="absolute top-0 left-1/2 w-px h-48 bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>
        <div className="absolute top-0 left-1/3 w-px h-64 bg-gradient-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0"></div>
        <div className="absolute top-0 left-2/3 w-px h-32 bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <MessageSquare className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Contact Us</h1>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 mb-12 backdrop-blur-sm text-center max-w-3xl mx-auto relative overflow-hidden">
            {/* Decorative tech elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0"></div>
            
            <p className="text-lg text-gray-300">
              Have questions? We&apos;re here to help. Reach out to our team for assistance with courses, 
              development services, or general inquiries.
            </p>
          </div>
          
          {/* Contact Category Selector */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {contactCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setFormData(prev => ({...prev, category: category.id}));
                  }}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors text-sm ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-blue-900/30 text-gray-300 hover:bg-blue-800/50 hover:text-white"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-300">Email Us</h3>
                      <p className="text-gray-300 mt-1">Our friendly team is here to help.</p>
                      <a 
                        href="mailto:info@techpoa.com" 
                        className="text-blue-400 hover:text-blue-300 transition-colors block mt-1"
                      >
                        info@techpoa.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-300">Call Us</h3>
                      <p className="text-gray-300 mt-1">Mon-Fri from 9am to 5pm EAT.</p>
                      <a 
                        href="tel:+254716687177" 
                        className="text-blue-400 hover:text-blue-300 transition-colors block mt-1"
                      >
                        +254 716 687 177
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-3 rounded-lg mr-4">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-blue-300">Visit Us</h3>
                      <p className="text-gray-300 mt-1">Come say hello at our office.</p>
                      <p className="text-gray-400 mt-1">
                        TechPoa Innovation Center,<br />
                        Ngong Road, Nairobi,<br />
                        Kenya
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-800/30">
                  <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61573759510352" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-2 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://x.com/Techpoa_connect" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-2 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="www.linkedin.com/in/birisio-joseph-ba6609355" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-2 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/techpoa_connect" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-2 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://github.com/techpoa" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-2 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-blue-700/30 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-3">Subscribe to Updates</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Stay updated with our latest news, courses, and special offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 p-2 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
                  >
                    Subscribe
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-400">
                  <p className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
                    We respect your privacy and will never share your email
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                  Schedule a Meeting
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Prefer to schedule a specific time to talk? Book a call with our team.
                </p>
                <a 
                  href="#" 
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Consultation
                </a>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-2">Send us a Message</h2>
                <p className="text-gray-300 mb-6">{getCategorySubtitle()}</p>
                
                {formSubmitted ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium text-green-400 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                      Thank you for reaching out! We&apos;ve received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 text-blue-300">
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-gray-800/60 text-white rounded-md border ${
                            formErrors.name ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                          placeholder="Enter your name"
                        />
                        {formErrors.name && <p className="mt-1 text-red-500 text-xs">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-300">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-gray-800/60 text-white rounded-md border ${
                            formErrors.email ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                          } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                          placeholder="Enter your email"
                        />
                        {formErrors.email && <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1 text-blue-300">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="Your company (optional)"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1 text-blue-300">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          placeholder="Your phone (optional)"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1 text-blue-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="What&apos;s this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1 text-blue-300">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales</option>
                        <option value="partnerships">Partnerships</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1 text-blue-300">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full p-3 bg-gray-800/60 text-white rounded-md border ${
                          formErrors.message ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                        placeholder="How can we help you?"
                      ></textarea>
                      {formErrors.message && <p className="mt-1 text-red-500 text-xs">{formErrors.message}</p>}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium flex items-center ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>
                      
                      <p className="text-sm text-gray-400">
                        We&apos;ll respond within <span className="text-blue-300">24 hours</span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-all group">
                  <div className="bg-blue-800/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700/60 transition-colors">
                    <Mail className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-300">Email</h3>
                  <p className="text-gray-300 mt-2 text-sm">
                    For general inquiries and support
                  </p>
                  <a 
                    href="mailto:info@techpoa.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors block mt-1 flex items-center group"
                  >
                    info@techpoa.com
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-all group">
                  <div className="bg-blue-800/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700/60 transition-colors">
                    <Phone className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-300">Phone</h3>
                  <p className="text-gray-300 mt-2 text-sm">
                    Mon-Fri from 9am to 5pm EAT
                  </p>
                  <a 
                    href="tel:+254716687177" 
                    className="text-blue-400 hover:text-blue-300 transition-colors block mt-1 flex items-center group"
                  >
                    +254 716 687 177
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-all group">
                  <div className="bg-blue-800/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700/60 transition-colors">
                    <Globe className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-300">Connect</h3>
                  <p className="text-gray-300 mt-2 text-sm">
                    Follow us on social platforms
                  </p>
                  <div className="flex mt-2 space-x-2">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61573759510352" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-1.5 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-3.5 w-3.5" />
                    </a>
                    <a 
                      href="https://x.com/Techpoa_connect" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-1.5 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/joseph-sagwe" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-blue-800/40 p-1.5 rounded-full hover:bg-blue-700/60 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
                      {/* Map Section */}
                <div className="mt-12 bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold mb-6">Visit Our Office</h2>
                  
                  <div className="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden relative">
                    {/* Interactive Google Map */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7880203581154!2d36.7803!3d-1.2980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109996536c39%3A0x4eb6d6e1f4b5fee0!2sNgong%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1713100215021!5m2!1sen!2ske" 
                      className="absolute inset-0 w-full h-full border-0" 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TechPoa Innovation Center Location"
                      aria-label="Google Maps showing TechPoa Innovation Center location"
                    ></iframe>
                    
                    {/* Gradient overlay to match the site's theme */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-10"></div>
                    
                    {/* Map Actions - Floating panel */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <a 
                        href="https://goo.gl/maps/JKRXTUw8Su9cVahX7"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white text-sm font-medium inline-flex items-center shadow-lg"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-400" />
                        Office Hours
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-300">Monday - Friday:</span>
                          <span className="text-blue-300">9:00 AM - 5:00 PM EAT</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-300">Saturday:</span>
                          <span className="text-blue-300">10:00 AM - 2:00 PM EAT</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-300">Sunday:</span>
                          <span className="text-blue-300">Closed</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                        Support Availability
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-300">Email Support:</span>
                          <span className="text-blue-300">24/7</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-300">Phone Support:</span>
                          <span className="text-blue-300">9:00 AM - 5:00 PM EAT (Weekdays)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-300">Live Chat:</span>
                          <span className="text-blue-300">8:00 AM - 8:00 PM EAT (Weekdays)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
          
          {/* FAQ Section */}
          <div className="mt-12 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
                <h3 className="font-medium text-blue-300">How quickly will I receive a response?</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our support line.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
                <h3 className="font-medium text-blue-300">Can I schedule a consultation?</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  Yes, you can schedule a consultation with our team by sending a request through our contact form or emailing consultations@techpoa.com.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
                <h3 className="font-medium text-blue-300">Do you offer remote support?</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  Yes, we provide remote support via video conferencing, screen sharing, and other collaboration tools for clients worldwide.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-5 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
                <h3 className="font-medium text-blue-300">How can I apply for a job or internship?</h3>
                <p className="mt-2 text-gray-300 text-sm">
                  Please send your resume and cover letter to careers@techpoa.com. You can also check our Careers page for current opportunities.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/support" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                View all FAQs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-lg p-8 backdrop-blur-sm text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
            <div className="absolute -top-14 -right-14 w-28 h-28 border-2 border-blue-500/20 rounded-full"></div>
            <div className="absolute -bottom-14 -left-14 w-28 h-28 border-2 border-purple-500/20 rounded-full"></div>
            
            <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is ready to help you with any questions or concerns you might have.
              Reach out to us and experience our exceptional customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254716687177" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </a>
              <Link 
                href="/support" 
                className="px-6 py-3 border border-blue-500 hover:bg-blue-800/30 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
