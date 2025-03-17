"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Code,
  Users,
  Globe,
  Zap,
  Server,
  Shield,
  LucideDollarSign,
  Briefcase,
  GraduationCap,
  Clock,
  PenTool,
  Sparkles,
  Database,
  Layers
} from "lucide-react";

// Define types to fix TypeScript errors
type FAQItem = {
  question: string;
  answer: string;
  icon: React.ReactNode;
  categories: string[];
};

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First FAQ open by default
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([]);
  const [expandedAnswers, setExpandedAnswers] = useState<{[key: string]: boolean}>({});

    // Wrap categories in useMemo
  const categories = useMemo<Category[]>(() => [
    { id: "popular", name: "Popular Questions", icon: <Sparkles className="h-4 w-4" /> },
    { id: "courses", name: "Courses & Learning", icon: <BookOpen className="h-4 w-4" /> },
    { id: "services", name: "Development Services", icon: <Code className="h-4 w-4" /> },
    { id: "community", name: "Community", icon: <Users className="h-4 w-4" /> },
    { id: "account", name: "Account & Billing", icon: <LucideDollarSign className="h-4 w-4" /> },
    { id: "technical", name: "Technical Support", icon: <Server className="h-4 w-4" /> }
  ], []);

  // Comprehensive FAQ data with categories
  const allFaqs = useMemo<FAQItem[]>(() => [
    {
      question: "What services does TechPoa Connect offer?",
      answer: "TechPoa Connect is a comprehensive technology ecosystem offering multiple services under one platform:\n\n• **Online Courses & Certifications** - Self-paced and instructor-led courses in software development, cybersecurity, AI/ML, and more with hands-on projects and industry-recognized certificates.\n\n• **Software Development Services** - Custom web and mobile application development, enterprise solutions, UI/UX design, and API integrations tailored to your specific business needs.\n\n• **Tech Consultancy** - IT strategy planning, cloud solutions, security audits, and business automation guidance from industry experts.\n\n• **Community & Networking** - A vibrant platform for tech enthusiasts to connect, collaborate on projects, participate in forums, and attend virtual events.\n\n• **Tech News & Resources** - Latest updates on technology trends, tutorials, how-to guides, and insights from industry leaders.",
      icon: <Globe className="h-5 w-5" />,
      categories: ["popular", "services"]
    },
    {
      question: "How do I enroll in TechPoa Connect courses?",
      answer: "Enrolling in TechPoa Connect courses is simple:\n\n1. **Create an account** or log in to your existing account\n2. **Browse our course catalog** and select a course that interests you\n3. **Click \"Enroll Now\"** on the course page\n4. **Complete the payment process** using your preferred payment method\n5. **Start learning immediately** with instant access to course materials\n\nFor most courses, you'll have lifetime access to the materials and can learn at your own pace. Some specialized courses may have specific start dates, especially if they include live sessions or cohort-based learning experiences.",
      icon: <BookOpen className="h-5 w-5" />,
      categories: ["popular", "courses"]
    },
    {
      question: "Can I hire developers through TechPoa Connect?",
      answer: "Yes, you can hire skilled developers through our platform. TechPoa Connect maintains a network of vetted software developers, designers, and tech consultants available for your projects.\n\nTo hire talent:\n\n1. **Submit a project request** through our Development Services section\n2. **Specify your requirements**, timeline, and budget\n3. **Receive a customized quote** from our team\n4. **Get matched with appropriate talent** based on your specific technical needs\n5. **Track project progress** through our project management system\n\nWe offer flexible engagement models including project-based work, dedicated teams, and technical consulting. All developers undergo a rigorous vetting process to ensure quality and professionalism.",
      icon: <Code className="h-5 w-5" />,
      categories: ["popular", "services"]
    },
    {
      question: "Is there a community I can join to network with other tech professionals?",
      answer: "Absolutely! The TechPoa Connect community is one of our core offerings. Our community platform enables you to:\n\n• **Connect with fellow tech enthusiasts** across various specializations\n• **Participate in discussion forums** on trending tech topics\n• **Collaborate on open-source projects** with like-minded individuals\n• **Attend virtual events, webinars, and workshops**\n• **Find mentors or mentees** for professional growth\n• **Stay updated on industry trends and job opportunities**\n\nJust create an account and navigate to the Community section. You can create a detailed profile highlighting your skills and interests to better connect with peers who share similar professional goals.",
      icon: <Users className="h-5 w-5" />,
      categories: ["popular", "community"]
    },
    {
      question: "How can I get technical support for any issues I encounter?",
      answer: "We offer multiple support channels to ensure you can always reach us when needed:\n\n• **Support Portal** - Access comprehensive documentation and troubleshooting guides\n• **Email Support** - Contact support@techpoa.com for personalized assistance\n• **Live Chat** - Available on our website during business hours\n• **Community Forums** - Get help from both our team and community members\n\nOur technical support team is available Monday to Friday, 9AM to 5PM EAT, with limited support on weekends. Premium support with faster response times is available for enterprise clients and certain membership tiers.",
      icon: <MessageSquare className="h-5 w-5" />,
      categories: ["popular", "technical"]
    },
    {
      question: "What programming languages and technologies do your courses cover?",
      answer: "Our curriculum is comprehensive and regularly updated to reflect industry demands. We currently offer courses in:\n\n• **Programming Languages** - JavaScript, Python, Java, C#, Go, Ruby, PHP\n• **Web Development** - HTML/CSS, React, Angular, Vue, Node.js, Next.js\n• **Mobile Development** - React Native, Flutter, iOS (Swift), Android (Kotlin)\n• **Data Science & AI** - Python, R, TensorFlow, PyTorch, data visualization\n• **Cybersecurity** - Ethical hacking, network security, secure coding practices\n• **DevOps & Cloud** - AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD\n• **Blockchain** - Smart contracts, DApps, cryptocurrency fundamentals\n\nWe continuously expand our course catalog based on emerging technologies and industry trends.",
      icon: <Code className="h-5 w-5" />,
      categories: ["courses"]
    },
    {
      question: "Are TechPoa Connect courses self-paced or scheduled?",
      answer: "We offer both learning formats to accommodate different preferences:\n\n• **Self-paced courses** - Learn at your convenience with no deadlines; ideal for busy professionals or those with inconsistent schedules\n• **Cohort-based courses** - Follow a structured schedule with peers, deadlines, and more interaction; great for those who thrive with accountability\n• **Hybrid courses** - Combine self-paced content with scheduled live sessions for the best of both worlds\n\nEach course clearly indicates its format on the course description page. Some advanced certification programs may only be available in the cohort format to ensure proper support and guidance.",
      icon: <Clock className="h-5 w-5" />,
      categories: ["courses"]
    },
    {
      question: "What types of certificates do you offer upon course completion?",
      answer: "We offer several types of certifications depending on the course:\n\n• **Course Completion Certificates** - Awarded for successfully finishing any course on our platform\n• **Skill Certification** - Verify specific technical competencies through practical assessments\n• **Professional Certifications** - Comprehensive programs aligned with industry standards\n• **Specialization Certificates** - Earned by completing a series of related courses\n\nAll certificates are digitally verifiable and can be shared directly to LinkedIn or downloaded as PDF. For professional certifications, we partner with industry leaders to ensure recognition and validity in the job market.",
      icon: <GraduationCap className="h-5 w-5" />,
      categories: ["courses"]
    },
    {
      question: "What makes TechPoa Connect courses different from free tutorials?",
      answer: "While free tutorials are valuable resources, TechPoa Connect courses offer comprehensive value beyond basic instruction:\n\n• **Structured Learning Paths** - Carefully sequenced curriculum designed by industry experts\n• **Practical Projects** - Real-world assignments that build portfolio-worthy work\n• **Personal Feedback** - Code reviews and assignment evaluations from instructors\n• **Community Support** - Interaction with fellow learners and mentors\n• **Comprehensive Resources** - Downloadable materials, cheat sheets, and references\n• **Career Support** - Job preparation, interview practice, and networking opportunities\n• **Recognized Certification** - Verifiable credentials that demonstrate your skills\n\nOur courses focus on building practical skills rather than just theoretical knowledge, preparing you for actual technology careers.",
      icon: <Zap className="h-5 w-5" />,
      categories: ["courses"]
    },
    {
      question: "What's your development process for custom software projects?",
      answer: "Our software development process follows industry best practices with a focus on collaboration and transparency:\n\n1. **Discovery & Requirements** - We thoroughly understand your business needs and project goals\n2. **Planning & Design** - Creating detailed specifications, wireframes, and technical architecture\n3. **Agile Development** - Iterative implementation with regular client check-ins and demos\n4. **Quality Assurance** - Rigorous testing for functionality, security, and performance\n5. **Deployment** - Smooth transition to production environments\n6. **Maintenance & Support** - Ongoing technical support and feature enhancements\n\nWe use project management tools that give you visibility into progress and allow for continuous feedback. Our approach prioritizes creating scalable, maintainable solutions aligned with your business objectives.",
      icon: <Layers className="h-5 w-5" />,
      categories: ["services"]
    },
    {
      question: "What technologies do you use for development projects?",
      answer: "We leverage a wide range of modern technologies to deliver optimal solutions for each unique project:\n\n• **Frontend** - React, Next.js, Angular, Vue.js, Tailwind CSS\n• **Backend** - Node.js, Python (Django/Flask), Java (Spring), .NET, PHP (Laravel)\n• **Mobile** - React Native, Flutter, Native iOS/Android\n• **Databases** - MySQL, PostgreSQL, MongoDB, Firebase, Redis\n• **Cloud Services** - AWS, Azure, Google Cloud Platform\n• **DevOps** - Docker, Kubernetes, CI/CD pipelines, Terraform\n• **AI/ML** - TensorFlow, PyTorch, scikit-learn\n\nOur technology recommendations are based on your specific requirements, scalability needs, and long-term maintenance considerations rather than one-size-fits-all solutions.",
      icon: <Code className="h-5 w-5" />,
      categories: ["services"]
    },
    {
      question: "How do you handle project pricing and payment schedules?",
      answer: "Our pricing and payment structure is designed to be transparent and flexible:\n\n• **Project-Based Pricing** - Fixed cost for clearly defined scope and deliverables\n• **Time & Materials** - Hourly or daily rates for projects with evolving requirements\n• **Retainer Model** - Ongoing development and support with predictable monthly costs\n\nTypical payment schedules include:\n\n• **Initial deposit** (25-30%) to commence work\n• **Milestone payments** tied to specific deliverables\n• **Final payment** upon project completion\n\nWe provide detailed proposals with clear breakdown of costs and timelines before any project begins. For long-term projects, we can set up flexible payment arrangements to accommodate your budget cycles.",
      icon: <LucideDollarSign className="h-5 w-5" />,
      categories: ["services", "account"]
    },
    {
      question: "What kind of consultancy services do you offer?",
      answer: "Our technology consultancy services span various domains to help businesses leverage technology effectively:\n\n• **Digital Transformation Strategy** - Roadmaps for modernizing legacy systems and processes\n• **Technology Stack Assessment** - Evaluating and recommending optimal tech solutions\n• **Cloud Migration Planning** - Strategies for shifting to cloud infrastructure\n• **Security & Compliance Auditing** - Identifying vulnerabilities and ensuring regulatory compliance\n• **Software Architecture Design** - Creating scalable, maintainable system designs\n• **Performance Optimization** - Improving speed and efficiency of existing systems\n• **Technology Training** - Custom workshops to upskill your team\n\nOur consultants bring domain expertise across industries including fintech, healthcare, e-commerce, and education, providing insights specifically relevant to your business context.",
      icon: <PenTool className="h-5 w-5" />,
      categories: ["services"]
    },
    {
      question: "How can I contribute to the TechPoa community?",
      answer: "There are many ways to contribute to our vibrant community:\n\n• **Share Knowledge** - Answer questions, write guides, or create tutorials\n• **Host Workshops** - Present on topics you're knowledgeable about\n• **Mentor Others** - Guide beginners through their learning journey\n• **Open Source Contributions** - Join community coding projects\n• **Attend Events** - Participate in hackathons, webinars, and meetups\n• **Provide Feedback** - Help improve our platform and courses\n\nActive community members gain recognition through our contribution badges and may be invited to become community moderators or featured content creators. Your professional visibility grows as you establish yourself as a helpful resource within the community.",
      icon: <Users className="h-5 w-5" />,
      categories: ["community"]
    },
    {
      question: "How do I find and join community events?",
      answer: "Stay connected with community events through multiple channels:\n\n• **Events Calendar** - Browse upcoming workshops, webinars, and meetups on our Community portal\n• **Email Notifications** - Set your preferences to receive alerts about events matching your interests\n• **Community Forums** - Check the announcements section for special events\n• **Social Media** - Follow us on Twitter, LinkedIn, and Facebook for event announcements\n\nMost events are free for community members, while some premium workshops or masterclasses may have a fee. You can host your own events too - simply submit an event proposal through the Community portal for review by our team.",
      icon: <Users className="h-5 w-5" />,
      categories: ["community"]
    },
    {
      question: "How secure is my data on TechPoa Connect?",
      answer: "We take data security extremely seriously and implement multiple measures to protect your information:\n\n• **Encryption** - All data is encrypted in transit and at rest\n• **Secure Authentication** - Two-factor authentication option for all accounts\n• **Regular Security Audits** - Conducted by independent cybersecurity firms\n• **Compliance** - Adherence to international data protection standards\n• **Limited Data Collection** - We only collect information necessary for service delivery\n• **Transparent Privacy Policy** - Clear explanation of how we use your data\n\nWe never sell your personal information to third parties. Our security practices are regularly updated to address emerging threats and comply with evolving regulations.",
      icon: <Shield className="h-5 w-5" />,
      categories: ["account", "technical"]
    },
    {
      question: "What payment methods do you accept?",
      answer: "We offer multiple payment options to accommodate global users:\n\n• **Credit/Debit Cards** - Visa, Mastercard, American Express\n• **Mobile Money** - M-Pesa, Airtel Money\n• **Digital Wallets** - PayPal, Apple Pay, Google Pay\n• **Bank Transfers** - For corporate accounts and larger purchases\n• **Cryptocurrency** - Bitcoin, Ethereum (for select services)\n\nPayments are processed securely through industry-standard payment gateways. For corporate clients, we offer invoicing options with net-30 payment terms. If you need an alternative payment method not listed, please contact our support team.",
      icon: <LucideDollarSign className="h-5 w-5" />,
      categories: ["account"]
    },
    {
      question: "What is your refund policy?",
      answer: "Our refund policy varies by service type:\n\n• **Courses** - 14-day money-back guarantee if you've completed less than 25% of the course\n• **Development Services** - Governed by the terms in your specific project agreement\n• **Consultancy** - Pro-rated refunds for unused consulting hours\n• **Membership** - Cancellations processed at the end of current billing period\n\nRefund requests should be submitted through our Support portal with your order/invoice number and reason for the refund. Most approved refunds are processed within 7-10 business days, depending on your payment method. For special circumstances not covered by these policies, please contact our support team directly.",
      icon: <LucideDollarSign className="h-5 w-5" />,
      categories: ["account"]
    },
    {
      question: "Can I upgrade or downgrade my membership plan?",
      answer: "Yes, you can change your membership plan at any time:\n\n• **Upgrades** - Take effect immediately, with prorated charges for the remainder of your billing cycle\n• **Downgrades** - Applied at the end of your current billing period\n\nTo change your plan:\n1. Log in to your account\n2. Navigate to 'Subscription & Billing'\n3. Select 'Change Plan'\n4. Choose your new plan and confirm\n\nYour access level will adjust automatically based on your new plan. If you need assistance with special requirements or enterprise plans, contact our membership team directly.",
      icon: <Briefcase className="h-5 w-5" />,
      categories: ["account"]
    },
    {
      question: "How do I reset my password or recover my account?",
      answer: "If you're having trouble accessing your account, here's how to recover it:\n\n• **Password Reset**:\n  1. Click 'Forgot Password' on the login page\n  2. Enter your registered email address\n  3. Check your email for reset instructions (including spam/promotions folders)\n  4. Follow the link to create a new password\n\n• **Account Recovery**:\n  If you can't access your email or receive the reset link:\n  1. Contact support@techpoa.com\n  2. Provide verification information (name, alternate email, last 4 digits of payment method)\n  3. Our team will verify your identity and help restore access\n\nFor security reasons, we may require additional verification for accounts with advanced permissions or sensitive data.",
      icon: <Shield className="h-5 w-5" />,
      categories: ["account", "technical"]
    },
    {
      question: "What system requirements do I need to access TechPoa Connect?",
      answer: "Our platform is designed to be accessible across various devices with modest requirements:\n\n• **Web Browser** - Latest versions of Chrome, Firefox, Safari, or Edge\n• **Internet Connection** - Minimum 1Mbps for basic browsing, 5Mbps+ recommended for video content\n• **Operating System** - Windows 10+, macOS 10.13+, Chrome OS, or Linux\n• **Mobile Devices** - iOS 13+ or Android 8.0+\n• **Storage** - Courses with downloadable materials may require free disk space\n\nFor development courses, additional requirements may apply based on the specific technologies taught (e.g., minimum RAM, processor specifications). These requirements are listed on individual course pages.",
      icon: <Server className="h-5 w-5" />,
      categories: ["technical"]
    },
    {
      question: "Can I download course materials for offline use?",
      answer: "Yes, many of our learning resources are available for offline use:\n\n• **Video Lessons** - Available for download in select courses via our mobile app\n• **Course Notes** - PDF downloads available for all courses\n• **Code Examples** - Downloadable as ZIP files\n• **Cheat Sheets** - Printable reference materials\n• **E-books** - Available in PDF/EPUB formats where provided\n\nDownloaded materials are for personal use only and subject to our Terms of Service regarding intellectual property. Some advanced courses or premium content may have restrictions on offline availability due to licensing agreements with content partners.",
      icon: <Database className="h-5 w-5" />,
      categories: ["courses", "technical"]
    }
  ], []);
  
  // Reference for scroll into view functionality
  const faqRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  useEffect(() => {
    setIsVisible(true);

    // Initialize with filtered faqs based on the default category
    setFilteredFaqs(
      searchQuery 
        ? allFaqs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allFaqs.filter(faq => faq.categories.includes(activeCategory))
    );
  }, [activeCategory, allFaqs, searchQuery]);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(0); // Reset active index
    
    // Filter FAQs based on category
    setFilteredFaqs(
      searchQuery 
        ? allFaqs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allFaqs.filter(faq => faq.categories.includes(category))
    );
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query) {
      const filtered = allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFaqs(filtered);
      // Reset category when searching
      setActiveCategory("");
    } else {
      // If search is cleared, go back to selected category
      const category = activeCategory || "popular";
      setActiveCategory(category);
      setFilteredFaqs(allFaqs.filter(faq => faq.categories.includes(category)));
    }
  };

  // Toggle "Read More" for long answers
  const toggleExpandAnswer = (index: number) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
        
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <div className="bg-blue-500/20 p-3 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <HelpCircle className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl">
              Find quick answers to common questions about TechPoa Connect services, 
              courses, and platform features.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-4 pl-5 pr-12 bg-gray-800/60 text-white rounded-xl border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-sm"
                />
                <div className="absolute right-4 top-4 text-gray-400">
                  {searchQuery ? (
                    <button onClick={() => setSearchQuery("")} className="hover:text-white transition-colors">
                      ✕
                    </button>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                    : "bg-blue-900/30 text-gray-300 hover:bg-blue-700/40 hover:text-white border border-blue-800/50"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={index}
                  ref={(el: HTMLDivElement | null) => { faqRefs.current[index] = el }}
                  className="border border-blue-800/30 rounded-xl overflow-hidden bg-blue-900/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-700/50 hover:bg-blue-900/30"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={activeIndex === index}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-800/50 p-2.5 rounded-lg text-blue-400 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                    </div>
                    <div className={`p-1.5 rounded-full bg-blue-800/50 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-blue-800/30 p-5 text-gray-300">
                      <div className={`prose prose-invert max-w-none ${faq.answer.length > 500 && !expandedAnswers[index] ? 'line-clamp-6' : ''}`}>
                        {faq.answer.split('\n\n').map((paragraph: string, i: number) => (
                          <p key={i} className="mb-4" dangerouslySetInnerHTML={{ 
                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                          }} />
                        ))}
                      </div>
                      {faq.answer.length > 500 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandAnswer(index);
                          }}
                          className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors"
                        >
                          {expandedAnswers[index] ? (
                            <>Read Less <ChevronUp className="ml-1 h-4 w-4" /></>
                          ) : (
                            <>Read More <ChevronDown className="ml-1 h-4 w-4" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 mb-4">
                  <HelpCircle className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    We couldn&apos;t find any FAQs matching your search. Try different keywords or browse by category.
                  </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    handleCategoryChange("popular");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white"
                >
                  View all FAQs
                </button>
              </div>
            )}
          </div>
          
          {/* Quick Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6 hover:border-blue-600/50 transition-all hover:bg-blue-800/20 group">
              <div className="bg-gradient-to-br from-blue-700/50 to-purple-700/50 p-3 rounded-lg inline-flex mb-4 group-hover:from-blue-600/50 group-hover:to-purple-600/50 transition-all">
                <BookOpen className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Course Documentation</h3>
              <p className="text-gray-400 mb-4">
                Detailed guides, tutorials, and references for all our courses and learning materials.
              </p>
              <Link 
                href="/documentation/courses" 
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center group-hover:translate-x-1 transition-all"
              >
                Browse Documentation
                <ChevronDown className="ml-1 h-4 w-4 rotate-270" />
              </Link>
            </div>
            
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6 hover:border-blue-600/50 transition-all hover:bg-blue-800/20 group">
              <div className="bg-gradient-to-br from-purple-700/50 to-pink-700/50 p-3 rounded-lg inline-flex mb-4 group-hover:from-purple-600/50 group-hover:to-pink-600/50 transition-all">
                <Users className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Community Forum</h3>
              <p className="text-gray-400 mb-4">
                Get answers from our community of tech enthusiasts and experts with similar experiences.
              </p>
              <Link 
                href="/community/forum" 
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center group-hover:translate-x-1 transition-all"
              >
                Visit Forum
                <ChevronDown className="ml-1 h-4 w-4 rotate-270" />
              </Link>
            </div>
            
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6 hover:border-blue-600/50 transition-all hover:bg-blue-800/20 group">
              <div className="bg-gradient-to-br from-teal-700/50 to-blue-700/50 p-3 rounded-lg inline-flex mb-4 group-hover:from-teal-600/50 group-hover:to-blue-600/50 transition-all">
                <MessageSquare className="h-6 w-6 text-teal-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Contact Support</h3>
              <p className="text-gray-400 mb-4">
                Still need help? Our support team is ready to assist with personalized attention.
              </p>
              <Link 
                href="/contact" 
                className="text-teal-400 hover:text-teal-300 font-medium flex items-center group-hover:translate-x-1 transition-all"
              >
                Get Support
                <ChevronDown className="ml-1 h-4 w-4 rotate-270" />
              </Link>
            </div>
          </div>
          
          {/* Contact Support CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-xl p-8 backdrop-blur-sm text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
            <div className="absolute -top-14 -right-14 w-28 h-28 border-2 border-blue-500/20 rounded-full"></div>
            <div className="absolute -bottom-14 -left-14 w-28 h-28 border-2 border-purple-500/20 rounded-full"></div>
            
            <h2 className="text-2xl font-bold mb-4 text-white">Couldn&apos;t find what you were looking for?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our team is ready to assist you with any specific questions or concerns you might have.
              Get in touch with us for personalized support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
              <Link 
                href="/live-chat" 
                className="px-6 py-3 border border-blue-500 hover:bg-blue-800/30 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Live Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}