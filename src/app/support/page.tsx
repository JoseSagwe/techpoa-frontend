"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  LifeBuoy, 
  FileQuestion, 
  Book, 
  MessageCircle, 
  ChevronRight, 
  ArrowRight, 
  Send, 
  User, 
  Bot, 
  X, 
  Maximize2, 
  Minimize2, 
  Search,
  Mail,
  Ticket,
  FileText,
  Phone,
  Clock,
  MousePointerClick,
  ShieldCheck,
  Code,
  PenTool,
  CreditCard,
  Settings,
  HelpCircle,
  Sparkles, MapPin
} from "lucide-react";
import { useToast } from "@/components/ToastContext";

// Types for chat messages
type MessageType = 'user' | 'bot' | 'system';
type Message = {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  options?: string[];
};

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  faqs: FAQ[];
}

// AI responses for common questions
const aiResponses: Record<string, string> = {
  "hello": "Hello! How can I help you today with TechPoa Connect?",
  "hi": "Hi there! How can I assist you with TechPoa's services?",
  "hey": "Hey! Welcome to TechPoa support. How can I help you today?",
  "help": "I'm here to help! You can ask me about our courses, software development services, or any technical issues you're experiencing.",
  "courses": "TechPoa offers a variety of tech courses, including software development, cybersecurity, and AI/machine learning. You can browse all our courses at techpoa.com/courses.",
  "pricing": "Our course pricing varies depending on the specific course and its duration. Software development services are quoted based on project requirements. For specific pricing, please visit our website or contact sales@techpoa.com.",
  "refund": "We offer a 14-day money-back guarantee for most of our courses if you've completed less than 25% of the course material. For software development services, refund policies are specified in the project agreement.",
  "account": "For account-related issues, you can update your profile at techpoa.com/account. If you're having trouble accessing your account, try resetting your password or contact support@techpoa.com.",
  "certificate": "Certificates are automatically issued upon successful completion of our courses. They can be accessed and downloaded from your user dashboard under 'Achievements'.",
  "password": "You can reset your password by clicking 'Forgot Password' on the login page. We'll send you an email with instructions to create a new password.",
  "payment": "We accept various payment methods including credit/debit cards, PayPal, and mobile money (for Kenya). If you're experiencing payment issues, please email billing@techpoa.com.",
  "contact": "You can reach our support team at support@techpoa.com or call us at +254 716 687 177 during business hours (9 AM - 5 PM EAT, Monday to Friday).",
  "consultation": "We offer free initial consultations for software development projects. You can book a consultation through our website or by emailing consultations@techpoa.com.",
  "job": "For career opportunities at TechPoa, please visit our careers page at techpoa.com/careers or send your resume to careers@techpoa.com.",
  "internship": "We offer internship programs for students and recent graduates. Visit techpoa.com/internships for current opportunities or email internships@techpoa.com for more information.",
  "partnership": "For partnership or collaboration inquiries, please contact our partnerships team at partnerships@techpoa.com with details about your organization and proposed collaboration.",
  "software": "Our software development services include web development, mobile app development, custom software solutions, API integration, and more. Each project starts with a consultation to understand your specific needs.",
  "community": "The TechPoa community platform allows members to network, collaborate on projects, participate in discussions, and access exclusive resources. Join at techpoa.com/community.",
  "issue": "I'm sorry to hear you're experiencing an issue. Could you provide more details about what's happening? Alternatively, you can submit a support ticket and our team will assist you promptly.",
  "bug": "If you've found a bug in our platform, please report it by submitting a support ticket with details about the issue, steps to reproduce it, and any error messages you received.",
  "thanks": "You're welcome! Is there anything else I can help you with today?",
  "thank you": "You're welcome! Is there anything else I can help you with today?",
  "thank": "You're welcome! Is there anything else I can help you with today?",
  "bye": "Thank you for chatting with us! If you have more questions later, feel free to return to this chat or submit a support ticket. Have a great day!",
  "goodbye": "Thank you for chatting with us! If you have more questions later, feel free to return to this chat or submit a support ticket. Have a great day!"
};

// FAQ data
const faqCategories = [
  {
    id: "account",
    icon: <User size={20} className="text-blue-400" />,
    title: "Account & Profile",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in the required information and follow the verification steps sent to your email."
      },
      {
        question: "How do I reset my password?",
        answer: "Click on 'Log In' and then select 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password."
      },
      {
        question: "How do I update my profile information?",
        answer: "After logging in, go to your dashboard and click on 'My Profile' or 'Account Settings'. From there, you can update your personal information, change your password, and adjust notification preferences."
      },
      {
        question: "What's the difference between student, instructor, developer, and client accounts?",
        answer: "Different account types have access to different features: Students can enroll in courses, instructors can create and teach courses, developers can collaborate on projects, and clients can hire talent and request development services."
      },
      {
        question: "Can I change my account type after registration?",
        answer: "Yes, you can request to change your account type by contacting our support team. We may ask for additional information depending on the account type you're requesting."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to Account Settings, scroll to the bottom, and select 'Delete Account'. Please note that this action is permanent and will remove all your data from our platform."
      }
    ]
  },
  {
    id: "courses",
    icon: <Book size={20} className="text-blue-400" />,
    title: "Courses & Learning",
    faqs: [
      {
        question: "How do I enroll in a course?",
        answer: "Browse our course catalog and select the course you're interested in. Click on 'Enroll' or 'Buy Now', complete the payment process, and you'll immediately gain access to the course materials."
      },
      {
        question: "Do courses have an expiration date?",
        answer: "Most of our courses provide lifetime access, meaning you can learn at your own pace. Some specialized courses or bootcamps may have limited access periods, which will be clearly stated on the course page."
      },
      {
        question: "How do I get a certificate?",
        answer: "Certificates are issued automatically upon successful completion of a course. You can download your certificates from the 'Achievements' or 'Certificates' section of your dashboard."
      },
      {
        question: "Can I switch between courses after enrolling?",
        answer: "Yes, you can be enrolled in multiple courses simultaneously and switch between them at any time through your dashboard's 'My Courses' section."
      },
      {
        question: "Are there prerequisites for advanced courses?",
        answer: "Yes, some advanced courses have prerequisites to ensure you have the necessary foundation to succeed. Prerequisites are listed on the course details page before enrollment."
      },
      {
        question: "How do I track my progress in a course?",
        answer: "Your progress is automatically tracked as you complete lessons and assignments. You can view your progress on the course dashboard and in the 'My Courses' section of your account."
      },
      {
        question: "Can I download course materials for offline viewing?",
        answer: "Yes, most supplementary materials like PDFs, worksheets, and code samples can be downloaded. Video content may be available for offline viewing in our mobile app."
      }
    ]
  },
  {
    id: "payment",
    icon: <CreditCard size={20} className="text-blue-400" />,
    title: "Billing & Payments",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit and debit cards (Visa, Mastercard), PayPal, and mobile money options (M-Pesa for Kenya). For corporate training, we also offer invoice-based payments."
      },
      {
        question: "What is your refund policy?",
        answer: "We offer a 14-day money-back guarantee for most courses, provided you've completed less than 25% of the course material. For software development services, refund policies are specified in the project agreement."
      },
      {
        question: "How do I get an invoice for my purchase?",
        answer: "Invoices are automatically generated for all purchases and sent to your registered email. You can also download them from the 'Billing History' section in your account settings."
      },
      {
        question: "Do you offer any discounts or scholarships?",
        answer: "Yes, we occasionally offer promotional discounts. We also have scholarship programs for underrepresented groups in tech. Visit our 'Scholarships' page for more information or contact support@techpoa.com."
      },
      {
        question: "How do I update my payment information?",
        answer: "You can update your payment information in the 'Payment Methods' section of your account settings. For security reasons, we don't store complete card details on our servers."
      },
      {
        question: "Do you offer payment plans for expensive courses?",
        answer: "Yes, for select premium courses and bootcamps, we offer installment payment plans. Options are displayed on the course checkout page if available."
      }
    ]
  },
  {
    id: "technical",
    icon: <Settings size={20} className="text-blue-400" />,
    title: "Technical Issues",
    faqs: [
      {
        question: "Videos are not playing properly. What should I do?",
        answer: "First, check your internet connection. Try refreshing the page, clearing your browser cache, or switching to a different browser. If issues persist, please contact our support team."
      },
      {
        question: "How do I report a bug or technical issue?",
        answer: "You can report issues by contacting support@techpoa.com with details about the problem, including screenshots if possible. Please also include information about your device, browser, and steps to reproduce the issue."
      },
      {
        question: "Can I download course materials for offline viewing?",
        answer: "Yes, most course materials (PDFs, worksheets, code samples) can be downloaded for offline use. Video content may be available for offline viewing in our mobile app, subject to certain limitations."
      },
      {
        question: "What are the system requirements for using TechPoa Connect?",
        answer: "Our platform works best on up-to-date versions of Chrome, Firefox, Safari, or Edge browsers. For optimal video streaming, we recommend an internet connection of at least 5 Mbps. Some programming courses may have specific software requirements that will be outlined in the course description."
      },
      {
        question: "Why am I having trouble uploading assignments?",
        answer: "Check that your file meets our size and format requirements. Files should be under 50MB and in one of our supported formats. If you're still having issues, try using a different browser or contact support."
      },
      {
        question: "The code editor in the course isn't working properly. What can I do?",
        answer: "Try refreshing the page or clearing your browser cache. Make sure you're using a supported browser. If problems persist, try using the desktop version of the course, which may perform better with interactive coding exercises."
      }
    ]
  },
  {
    id: "services",
    icon: <Code size={20} className="text-blue-400" />,
    title: "Development Services",
    faqs: [
      {
        question: "What software development services do you offer?",
        answer: "We offer a wide range of services including web development, mobile app development, custom software solutions, e-commerce platforms, API development and integration, database design, and UI/UX design."
      },
      {
        question: "How does the development process work?",
        answer: "Our process typically includes: Initial consultation, requirements gathering, proposal and quotation, design phase, development, testing, deployment, and post-launch support. We follow agile methodologies to ensure continuous feedback and adaptation."
      },
      {
        question: "How much does a typical project cost?",
        answer: "Project costs vary widely depending on requirements, complexity, timeline, and other factors. We provide detailed quotes after understanding your specific needs during an initial consultation."
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines depend on scope and complexity. Simple websites might take 2-4 weeks, while complex web applications or mobile apps can take 3-6 months or more. We provide timeline estimates during the proposal phase."
      },
      {
        question: "Do you offer maintenance and support after project completion?",
        answer: "Yes, we offer various maintenance and support packages to ensure your software continues to function optimally after launch. Details are included in our service agreements."
      },
      {
        question: "How do I request a quote for a development project?",
        answer: "You can request a quote by filling out the form on our website, emailing sales@techpoa.com, or scheduling a consultation call with our team. We'll discuss your requirements and provide a detailed proposal."
      }
    ]
  },
  {
    id: "consultation",
    icon: <PenTool size={20} className="text-blue-400" />,
    title: "Consultancy Services",
    faqs: [
      {
        question: "What tech consultancy services do you offer?",
        answer: "We provide consultancy in digital transformation, IT strategy, technology stack selection, system architecture, cybersecurity, cloud migration, performance optimization, and technical training."
      },
      {
        question: "How do I book a consultation session?",
        answer: "You can book a consultation through our website by visiting the Consultancy page, or by emailing consultations@techpoa.com with your requirements and preferred time slots."
      },
      {
        question: "What information should I prepare for a consultation?",
        answer: "It helps to prepare a brief overview of your current situation, challenges you're facing, goals you want to achieve, and any specific questions you have. This allows us to make the most of our time together."
      },
      {
        question: "Do you offer free initial consultations?",
        answer: "Yes, we offer a complimentary 30-minute initial consultation to understand your needs and determine how we can best assist you."
      },
      {
        question: "Can consultancy services be provided remotely?",
        answer: "Yes, we provide remote consultancy services via video conferencing. We also offer on-site consultancy for clients in Nairobi and surrounding areas."
      },
      {
        question: "Do you sign NDAs for confidential consultations?",
        answer: "Yes, we're happy to sign Non-Disclosure Agreements before discussing sensitive business details or proprietary technology."
      }
    ]
  }
];

// Knowledge base articles for the support section
const knowledgeBaseArticles = [
  {
    id: "getting-started",
    title: "Getting Started with TechPoa Connect",
    excerpt: "Learn how to set up your account and navigate the platform",
    icon: <MousePointerClick size={20} className="text-blue-400" />,
    url: "/support/articles/getting-started"
  },
  {
    id: "course-enrollment",
    title: "How to Enroll in Courses",
    excerpt: "Step-by-step guide to finding and enrolling in courses",
    icon: <Book size={20} className="text-blue-400" />,
    url: "/support/articles/course-enrollment"
  },
  {
    id: "account-security",
    title: "Account Security Best Practices",
    excerpt: "Tips to keep your TechPoa account secure",
    icon: <ShieldCheck size={20} className="text-blue-400" />,
    url: "/support/articles/account-security"
  },
  {
    id: "payment-methods",
    title: "Payment Methods and Billing",
    excerpt: "Information about payment options and billing procedures",
    icon: <CreditCard size={20} className="text-blue-400" />,
    url: "/support/articles/payment-methods"
  },
  {
    id: "development-process",
    title: "Software Development Process",
    excerpt: "Overview of our development methodology and project lifecycle",
    icon: <Code size={20} className="text-blue-400" />,
    url: "/support/articles/development-process"
  },
  {
    id: "troubleshooting",
    title: "Common Technical Issues",
    excerpt: "Solutions to frequently encountered technical problems",
    icon: <Settings size={20} className="text-blue-400" />,
    url: "/support/articles/troubleshooting"
  }
];

// Predefined chat quick start options
const quickStartOptions = [
  "How do I reset my password?",
  "Tell me about your courses",
  "What payment methods do you accept?",
  "How do I get a certificate?",
  "I need help with my account"
];

export default function Support() {
  const [activeCategory, setActiveCategory] = useState("account");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<FAQCategory[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "👋 Hello! I'm TechPoa's AI assistant. How can I help you today?",
      timestamp: new Date(),
      options: quickStartOptions
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [activeSupportTab, setActiveSupportTab] = useState("faqs");
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [suggestedArticles, setSuggestedArticles] = useState<typeof knowledgeBaseArticles>([]);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Chatbot typing animation state
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-scroll chat to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Filter FAQs based on search term
    if (searchTerm.trim() === '') {
      setFilteredFaqs([]);
      setSuggestedArticles([]);
      return;
    }
    
    const results: FAQCategory[] = [];
    
    faqCategories.forEach(category => {
      const matchingFaqs = category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingFaqs.length > 0) {
        results.push({
          ...category,
          faqs: matchingFaqs
        });
      }
    });
    
    setFilteredFaqs(results);
    
    // Find matching knowledge base articles
    const matchingArticles = knowledgeBaseArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestedArticles(matchingArticles);
  }, [searchTerm]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText("");
    setIsAiThinking(true);
    setIsTyping(true);
    
    // Generate suggested articles based on user query
    const relevantArticles = knowledgeBaseArticles.filter(article => 
      article.title.toLowerCase().includes(inputText.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(inputText.toLowerCase())
    ).slice(0, 2);
    
    // Simulate bot response after a small delay
    setTimeout(() => {
      let botResponse = "I'm not sure about that. For more assistance, please contact our support team at support@techpoa.com.";
      
      // Check if there's a matching response in our aiResponses dictionary
      const lowercaseInput = inputText.toLowerCase();
      
      // Find matching keywords in the aiResponses dictionary
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      // Handle greetings and common phrases
      if (/^(hi|hello|hey)(\s|$)/i.test(lowercaseInput)) {
        botResponse = aiResponses["hello"];
      }
      
      // Add bot response
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, newBotMessage]);
      
      // If we found relevant articles, suggest them
      if (relevantArticles.length > 0) {
        setTimeout(() => {
          const articleSuggestionMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'system',
            text: "I found some articles that might help:",
            timestamp: new Date(),
            options: relevantArticles.map(article => article.title)
          };
          
          setMessages(prev => [...prev, articleSuggestionMessage]);
        }, 1000);
      }
      
      setIsAiThinking(false);
    }, 1500); // Slightly longer delay to simulate thinking
  };

  const handleQuickReplyClick = (option: string) => {
    // Add user message with the selected quick reply
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: option,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsAiThinking(true);
    setIsTyping(true);
    
    // Simulate bot response after a small delay
    setTimeout(() => {
      let botResponse = "I'm not sure about that. For more assistance, please contact our support team at support@techpoa.com.";
      
      // Check if there's a matching response in our aiResponses dictionary
      const lowercaseOption = option.toLowerCase();
      
      // Try to find responses based on keywords in the option
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowercaseOption.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      // Special handling for specific quick replies
      if (option === "How do I reset my password?") {
        botResponse = aiResponses["password"];
      } else if (option === "Tell me about your courses") {
        botResponse = aiResponses["courses"];
      } else if (option === "What payment methods do you accept?") {
        botResponse = aiResponses["payment"];
      } else if (option === "How do I get a certificate?") {
        botResponse = aiResponses["certificate"];
      } else if (option === "I need help with my account") {
        botResponse = aiResponses["account"];
      }
      
      // Add bot response
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, newBotMessage]);
      setIsAiThinking(false);
    }, 1500);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check form validation
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject || !ticketForm.message) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(ticketForm.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    
    // Show initial submission toast
    showToast("Submitting your ticket...", "info");
    
    // In a real app, you would send the ticket data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setTicketSubmitted(true);
      
      // Show success toast
      showToast("Your support ticket has been submitted successfully!", "success");
      
      // Reset form
      setTicketForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium',
        category: 'general'
      });
    }, 1500);
  };

  const resetTicketForm = () => {
    setTicketSubmitted(false);
  };

  const toggleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
    setIsMinimized(false);
    
    // Focus input when chat is opened
    if (!isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getFaqContent = () => {
    if (searchTerm.trim() !== '') {
      if (filteredFaqs.length === 0 && suggestedArticles.length === 0) {
        return (
          <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-6 text-center">
            <p className="text-center py-8">No results found for &quot;{searchTerm}&quot;</p>
            <p className="mt-2 text-sm text-gray-400">
              Try different keywords or <Link href="#support-ticket" onClick={(e) => {
                e.preventDefault();
                setActiveSupportTab("ticket");
                const element = document.getElementById('support-ticket');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="text-blue-400 hover:text-blue-300 underline">submit a support ticket</Link> for assistance.
            </p>
          </div>
        );
      }
      
      return (
        <div className="space-y-8">
          {suggestedArticles.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Knowledge Base Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={article.url}
                    className="bg-blue-900/20 border border-blue-800/30 hover:border-blue-600/50 rounded-lg p-4 transition-all hover:bg-blue-800/20 flex"
                  >
                    <div className="mr-3 mt-1">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-300">{article.title}</h3>
                      <p className="mt-1 text-gray-300 text-sm">{article.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {filteredFaqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">FAQ Results for &quot;{searchTerm}&quot;</h2>
              {filteredFaqs.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {category.icon}
                    <h3 className="text-lg font-medium">{category.title}</h3>
                  </div>
                  <div className="space-y-4 pl-7">
                  {category.faqs.map((faq: FAQ, index: number) => (
                  <div key={index} className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-300">{faq.question}</h4>
                    <p className="mt-2 text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    const currentCategory = faqCategories.find(cat => cat.id === activeCategory);
    
    if (!currentCategory) return null;
    
    return (
      <div className="space-y-6">
        {currentCategory.faqs.map((faq, index) => (
          <div key={index} className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 hover:border-blue-700/50 transition-colors">
            <h4 className="font-medium text-blue-300">{faq.question}</h4>
            <p className="mt-2 text-gray-300 text-sm">{faq.answer}</p>
          </div>
        ))}
        
        {!showAllFaqs && (
          <button 
            onClick={() => setShowAllFaqs(true)}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium mt-2"
          >
            View all FAQs <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>
    );
  };

  const getSupportContent = () => {
    switch (activeSupportTab) {
      case "faqs":
        return (
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm mb-8">
            {getFaqContent()}
          </div>
        );
      
      case "articles":
        return (
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm mb-8">
            <h2 className="text-xl font-semibold mb-6">Knowledge Base Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {knowledgeBaseArticles.map((article) => (
                <Link 
                  key={article.id} 
                  href={article.url}
                  className="bg-blue-900/20 border border-blue-800/30 hover:border-blue-600/50 rounded-lg p-4 transition-all hover:bg-blue-800/20 flex items-start"
                >
                  <div className="mr-3 p-2 bg-blue-900/40 rounded-lg">
                    {article.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-300">{article.title}</h3>
                    <p className="mt-1 text-gray-300 text-sm">{article.excerpt}</p>
                    <div className="mt-2 text-blue-400 text-xs flex items-center">
                      Read article <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      
      case "ticket":
        return (
          <div id="support-ticket" className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Ticket className="h-6 w-6 mr-2 text-blue-400" />
              Submit a Support Ticket
            </h2>
            
            {ticketSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                  <svg 
                    className="h-8 w-8 text-green-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-green-400 mb-2">Ticket Submitted Successfully!</h4>
                <p className="text-gray-300 mb-6">
                  Your support ticket has been received. Our team will review it and get back to you as soon as possible.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Ticket reference: <span className="font-mono text-blue-300">TPC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </p>
                <button
                  onClick={resetTicketForm}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-blue-300">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                      className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-300">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                      className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1 text-blue-300">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                      className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="account">Account Issues</option>
                      <option value="billing">Billing and Payments</option>
                      <option value="course">Course Content</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback / Suggestions</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1 text-blue-300">
                      Priority <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need help with something</option>
                      <option value="high">High - Having issues with a service</option>
                      <option value="urgent">Urgent - Critical issue affecting my work</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 text-blue-300">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-blue-300">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                    className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                    placeholder="Please include any relevant details that will help us resolve your issue more quickly."
                  ></textarea>
                </div>
                
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium flex items-center justify-center"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </button>
                  
                  <p className="text-sm text-gray-400">
                    Our average response time is <span className="text-blue-300">2-4 business hours</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        );
      
      case "contact":
        return (
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-400" />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-blue-300 flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> Email Support
                  </h3>
                  <p className="mt-2 text-gray-300 text-sm">
                    For general inquiries and support:
                  </p>
                  <a 
                    href="mailto:support@techpoa.com" 
                    className="mt-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@techpoa.com
                  </a>
                  
                  <p className="mt-3 text-gray-300 text-sm">
                    For sales and business inquiries:
                  </p>
                  <a 
                    href="mailto:sales@techpoa.com" 
                    className="mt-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    sales@techpoa.com
                  </a>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-blue-300 flex items-center">
                    <Phone className="h-4 w-4 mr-2" /> Phone Support
                  </h3>
                  <p className="mt-2 text-gray-300 text-sm">
                    Customer Service:
                  </p>
                  <a 
                    href="tel:+254716687177" 
                    className="mt-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +254 716 687 177
                  </a>
                  
                  <p className="mt-3 text-gray-300 text-sm">
                    Sales Team:
                  </p>
                  <a 
                    href="tel:+254716687178" 
                    className="mt-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +254 716 687 178
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-blue-300 flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Office Hours
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Monday - Friday:</span>
                      <span className="text-gray-400">9:00 AM - 5:00 PM EAT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Saturday:</span>
                      <span className="text-gray-400">10:00 AM - 2:00 PM EAT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Sunday:</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                  <h3 className="font-medium text-blue-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" /> Location
                  </h3>
                  <p className="mt-2 text-gray-300 text-sm">
                    TechPoa Innovation Center
                  </p>
                  <p className="text-gray-400 text-sm">
                    Ngong Road, Nairobi,<br />
                    Kenya
                  </p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center"
                  >
                    View on Google Maps
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
        
        {/* Digital pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <LifeBuoy className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Support Center</h1>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 mb-8 backdrop-blur-sm text-center max-w-3xl mx-auto relative overflow-hidden">
            {/* Decorative tech elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0"></div>
            
            <h2 className="text-xl font-semibold mb-2">How can we help you today?</h2>
            <p className="text-gray-300">
              Find answers to common questions or get in touch with our support team.
            </p>
            
            <div className="mt-6 max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSearchTerm("reset password");
                }}
                className="px-3 py-1 bg-blue-800/40 hover:bg-blue-700/50 rounded-full text-sm transition-colors"
              >
                Reset Password
              </button>
              <button
                onClick={() => {
                  setSearchTerm("course certificate");
                }}
                className="px-3 py-1 bg-blue-800/40 hover:bg-blue-700/50 rounded-full text-sm transition-colors"
              >
                Course Certificates
              </button>
              <button
                onClick={() => {
                  setSearchTerm("payment methods");
                }}
                className="px-3 py-1 bg-blue-800/40 hover:bg-blue-700/50 rounded-full text-sm transition-colors"
              >
                Payment Methods
              </button>
              <button
                onClick={() => {
                  setSearchTerm("refund policy");
                }}
                className="px-3 py-1 bg-blue-800/40 hover:bg-blue-700/50 rounded-full text-sm transition-colors"
              >
                Refund Policy
              </button>
            </div>
          </div>
          
          {/* Support Content Tabs */}
          <div className="flex border-b border-blue-800/50 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveSupportTab("faqs")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSupportTab === "faqs"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                <FileQuestion className="mr-2 h-4 w-4" />
                Frequently Asked Questions
              </span>
            </button>
            <button
              onClick={() => setActiveSupportTab("articles")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSupportTab === "articles"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Knowledge Base
              </span>
            </button>
            <button
              onClick={() => setActiveSupportTab("ticket")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSupportTab === "ticket"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                <Ticket className="mr-2 h-4 w-4" />
                Submit a Ticket
              </span>
            </button>
            <button
              onClick={() => setActiveSupportTab("contact")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeSupportTab === "contact"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Contact Information
              </span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar - Categories */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileQuestion className="h-5 w-5 mr-2 text-blue-400" />
                  FAQ Categories
                </h3>
                <nav className="space-y-1">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setActiveSupportTab("faqs");
                        setSearchTerm("");
                      }}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeCategory === category.id && activeSupportTab === "faqs"
                          ? "bg-blue-800/60 text-white"
                          : "text-gray-300 hover:bg-blue-800/40 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.title}
                    </button>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t border-blue-800/30">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
                    Need More Help?
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    If you can&apos;t find what you&apos;re looking for, our support team is ready to assist you.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="flex items-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat with AI Assistant
                    </button>
                    <button
                      onClick={() => {
                        setActiveSupportTab("ticket");
                        const element = document.getElementById('support-ticket');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center w-full px-4 py-2 border border-blue-600 text-blue-400 hover:bg-blue-800/50 hover:text-blue-300 rounded-md transition-colors text-sm font-medium"
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      Submit a Ticket
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800/30 to-purple-800/30 border border-blue-700/30 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-400" />
                  Email Support
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Email our support team directly for assistance with complex issues.
                </p>
                <a 
                  href="mailto:support@techpoa.com"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  support@techpoa.com
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Right content - Dynamic based on active tab */}
            <div className="lg:col-span-2">
              {getSupportContent()}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-20 transition-all duration-300 ${isChatOpen ? 'w-80 sm:w-96' : 'w-auto'}`}>
        {isChatOpen ? (
          <div className={`bg-gray-900 border border-blue-800/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 flex flex-col ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Bot className="h-5 w-5 text-blue-300 mr-2" />
                  <span className="absolute bottom-0 right-1 w-2 h-2 bg-green-400 rounded-full"></span>
                </div>
                <h3 className="font-medium text-white">TechPoa AI Assistant</h3>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1 text-gray-300 hover:text-white transition-colors rounded"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleChatOpen}
                  className="p-1 text-gray-300 hover:text-white transition-colors rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className={`flex-1 p-4 overflow-y-auto ${isMinimized ? 'hidden' : 'block'} bg-gradient-to-b from-gray-900 to-blue-900/80`}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.type === 'user' 
                        ? 'flex justify-end' 
                        : message.type === 'system'
                          ? 'flex justify-center'
                          : 'flex justify-start'
                    }`}
                  >
                    {message.type === 'system' ? (
                      <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 max-w-[85%]">
                        <p className="text-sm text-blue-200">{message.text}</p>
                        {message.options && (
                          <div className="mt-2 space-y-1">
                            {message.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReplyClick(option)}
                                className="text-left text-xs text-blue-400 hover:text-blue-300 transition-colors block w-full"
                              >
                                • {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-2 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-200'
                        }`}
                      >
                        {message.type === 'bot' && (
                          <div className="flex items-center mb-1">
                            <Bot className="h-3 w-3 text-blue-400 mr-1" />
                            <span className="text-xs font-medium text-blue-400">TechPoa Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        
                        {/* Quick reply options for bot messages */}
                        {message.type === 'bot' && message.options && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReplyClick(option)}
                                className="text-xs bg-blue-700/50 hover:bg-blue-700 transition-colors px-2 py-1 rounded-md"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 rounded-lg px-4 py-2 max-w-[85%]">
                      <div className="flex items-center mb-1">
                        <Bot className="h-3 w-3 text-blue-400 mr-1" />
                        <span className="text-xs font-medium text-blue-400">TechPoa Assistant</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Chat Input */}
            <form
              onSubmit={handleChatSubmit}
              className={`p-3 border-t border-gray-800 bg-gray-850 ${isMinimized ? 'hidden' : 'block'}`}
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isAiThinking}
                  ref={inputRef}
                />
                <button
                  type="submit"
                  className={`p-2 ${isAiThinking ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors rounded-md text-white`}
                  disabled={isAiThinking}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              
              {/* Quick reply options below the input */}
              {messages.length <= 2 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickStartOptions.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickReplyClick(option)}
                      className="text-xs bg-blue-900/50 hover:bg-blue-800 border border-blue-700/50 transition-colors px-2 py-1 rounded-full text-gray-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                Powered by <span className="text-blue-400 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 mr-1" />TechPoa AI
                </span>
              </p>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={toggleChatOpen}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-3 rounded-full text-white shadow-lg group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400/30 to-blue-600/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <MessageCircle className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Chat with AI</span>
          </button>
        )}
      </div>
    </div>
  );
}