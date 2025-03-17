"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Users, 
  Award, 
  Target, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  BookOpen, 
  Code, 
  PenTool,
  Zap,
  Heart,
  TrendingUp,
  Compass,
  Star,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github
} from "lucide-react";

// Define types
type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

type MilestoneType = {
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ValuesType = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type StatsType = {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

type PartnerType = {
  id: number;
  name: string;
  logo: string;
  url: string;
};

type TestimonialType = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
};

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedTeamMember, setExpandedTeamMember] = useState<number | null>(null);
  
  // Refs for scroll animations
  const sectionsRef = useRef<{[key: string]: HTMLDivElement | null}>({});
  const inViewSections = useRef<{[key: string]: boolean}>({});
  
  // Stats counter animation
  const [animatedStats, setAnimatedStats] = useState<{[key: string]: string}>({});
  
  // Handle visibility and animations on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Setup intersection observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting && !inViewSections.current[id]) {
          inViewSections.current[id] = true;
          
          // Animate stats when stats section comes into view
          if (id === 'stats-section') {
            animateStats();
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });
    
    // Setup testimonial rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 10000);
    
    return () => {
      observer.disconnect();
      clearInterval(testimonialInterval);
    };
  }, []);
  
  // Animate stats with counting effect
  const animateStats = () => {
    const duration = 2000; // 2 seconds animation
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const countUp = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = (t: number) => t * (2 - t); // Easing function
      const easedProgress = easeOutQuad(progress);
      
      const newStats: {[key: string]: string} = {};
      stats.forEach(stat => {
        const numericValue = parseInt(stat.value.replace(/,/g, ''));
        const currentValue = Math.floor(easedProgress * numericValue);
        newStats[stat.label] = currentValue.toLocaleString();
      });
      
      setAnimatedStats(newStats);
      
      if (frame < totalFrames) {
        requestAnimationFrame(countUp);
      }
    };
    
    requestAnimationFrame(countUp);
  };

  // Core values data
  const values: ValuesType[] = [
    {
      id: "innovation",
      title: "Innovation",
      description: "We embrace emerging technologies and creative approaches to solve complex problems. Our team is constantly exploring new ideas to revolutionize tech education and services.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: "excellence",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our course content to our development services. Quality is never compromised, and we continuously refine our offerings.",
      icon: <Star className="h-6 w-6" />
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "We believe technology education should be accessible to everyone. We create inclusive learning environments and offer flexible options to accommodate diverse needs.",
      icon: <Users className="h-6 w-6" />
    },
    {
      id: "integrity",
      title: "Integrity",
      description: "Honesty and transparency guide all our interactions. We build trust through ethical practices, fair pricing, and clear communication with our community and clients.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      id: "community",
      title: "Community",
      description: "We foster a collaborative ecosystem where knowledge sharing and mutual support thrive. Our community connects individuals across the tech spectrum to grow together.",
      icon: <Heart className="h-6 w-6" />
    },
    {
      id: "impact",
      title: "Impact",
      description: "We measure our success by the positive impact we create. Whether empowering careers through education or helping businesses innovate, meaningful outcomes drive us.",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  // Company milestones data
  const milestones: MilestoneType[] = [
    {
      year: 2019,
      title: "Foundation",
      description: "TechPoa Connect was founded with a vision to bridge the gap between tech education and practical application in Kenya.",
      icon: <Compass className="h-5 w-5" />
    },
    {
      year: 2020,
      title: "First Course Launch",
      description: "Launched our inaugural web development course with 50 students, achieving a 92% completion rate.",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      year: 2021,
      title: "Development Services",
      description: "Expanded offerings to include software development services for businesses, completing 15 successful projects in the first year.",
      icon: <Code className="h-5 w-5" />
    },
    {
      year: 2022,
      title: "Community Platform",
      description: "Created an online community platform connecting over 1,000 tech enthusiasts across East Africa for collaboration and networking.",
      icon: <Users className="h-5 w-5" />
    },
    {
      year: 2023,
      title: "Tech Consultancy",
      description: "Added specialized tech consultancy services to help businesses navigate digital transformation challenges.",
      icon: <PenTool className="h-5 w-5" />
    },
    {
      year: 2024,
      title: "Regional Expansion",
      description: "Expanded operations beyond Kenya to serve clients and students across East Africa, with virtual presence in 5 countries.",
      icon: <Globe className="h-5 w-5" />
    },
    {
      year: 2025,
      title: "Platform Relaunch",
      description: "Revamped our entire technology platform with enhanced features for learning, community interaction, and business services.",
      icon: <Zap className="h-5 w-5" />
    }
  ];

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Joseph Birisio",
      role: "Founder & CEO",
      bio: "Joseph founded TechPoa Connect with a vision to democratize tech education in East Africa. With over 15 years of experience in software development and education, he previously led engineering teams at major tech companies and taught computer science at university level. Joseph holds a Master's in Computer Science and is passionate about using technology to solve local challenges.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/birisio-joseph-ba6609355",
        twitter: "https://twitter.com/josephbirisio",
        github: "https://github.com/josephbirisio"
      }
    },
    {
      id: 2,
      name: "Sarah Mwangi",
      role: "Chief Learning Officer",
      bio: "Sarah oversees our educational curriculum and learning methodologies. Her background in instructional design and educational technology helps ensure our courses deliver exceptional learning outcomes. Before joining TechPoa, she developed e-learning programs for international organizations and holds a PhD in Educational Technology.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/"
      }
    },
    {
      id: 3,
      name: "David Ochieng",
      role: "CTO",
      bio: "David leads our technical strategy and development services. With expertise in cloud architecture, AI, and software engineering, he ensures our technical solutions are innovative and scalable. Previously, he worked at global tech companies and startups, building systems that serve millions of users.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 4,
      name: "Amina Hassan",
      role: "Head of Community",
      bio: "Amina builds and nurtures our vibrant tech community. Her background in community management and event planning creates meaningful connections between members. She's passionate about diversity in tech and has launched several initiatives to support underrepresented groups in the industry.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/"
      }
    },
    {
      id: 5,
      name: "Samuel Mburu",
      role: "Lead Developer",
      bio: "Samuel oversees our development projects and mentors junior developers. His technical expertise spans full-stack development, mobile applications, and DevOps. He contributes to open-source projects and frequently speaks at tech conferences across East Africa.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/"
      }
    },
    {
      id: 6,
      name: "Grace Ndungu",
      role: "Product Manager",
      bio: "Grace translates user needs into product features that delight. Her background in UX research and product development ensures our platform evolves to meet user expectations. She previously worked with fintech startups and holds an MBA with a focus on technology management.",
      image: "/team/joseph.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/"
      }
    }
  ];

  // Key stats data
  const stats: StatsType[] = [
    {
      label: "Students Taught",
      value: "15,000",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      label: "Courses Created",
      value: "120",
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-green-500 to-teal-500"
    },
    {
      label: "Projects Delivered",
      value: "250",
      icon: <Code className="h-6 w-6" />,
      color: "from-amber-500 to-red-500"
    },
    {
      label: "Community Members",
      value: "8,500",
      icon: <Heart className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  // Partners data
  const partners: PartnerType[] = [
    { id: 1, name: "Safaricom", logo: "/partners/safaricom.png", url: "https://safaricom.co.ke" },
    { id: 2, name: "iHub", logo: "/partners/ihub.jpg", url: "https://ihub.co.ke" },
    { id: 3, name: "Microsoft", logo: "/partners/microsoft.jpg", url: "https://microsoft.com" },
    { id: 4, name: "Google", logo: "/partners/google.png", url: "https://google.com" },
    { id: 5, name: "AWS", logo: "/partners/aws.png", url: "https://aws.amazon.com" },
    { id: 6, name: "Andela", logo: "/partners/andela.png", url: "https://andela.com" },
  ];

  // Testimonials data
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      name: "John Kamau",
      role: "Frontend Developer",
      company: "Wasoko",
      image: "/testimonials/john.jpg",
      quote: "The courses at TechPoa transformed my career. I went from a basic understanding of HTML to building complex web applications. Now I work at one of Africa's fastest-growing tech companies.",
      rating: 5
    },
    {
      id: 2,
      name: "Esther Wanjiku",
      role: "CTO",
      company: "FinEdge",
      image: "/testimonials/john.jpg",
      quote: "We partnered with TechPoa for our digital transformation project. Their consultancy team provided incredible insights and delivered a custom solution that increased our operational efficiency by 40%.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Otieno",
      role: "Product Manager",
      company: "SkyGarden",
      image: "/testimonials/john.jpg",
      quote: "TechPoa's development team built our e-commerce platform from scratch. Their attention to detail and technical expertise were impressive. The platform now handles thousands of daily transactions flawlessly.",
      rating: 4
    }
  ];

  // Handle team member expansion
  const toggleTeamMember = (id: number) => {
    setExpandedTeamMember(expandedTeamMember === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
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
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-6">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400">
              About TechPoa Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between technology education and practical application in East Africa.
              We're building the next generation of tech leaders through quality education, community, and innovation.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/courses" 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center group"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="#mission-section"
                className="px-8 py-3 border border-blue-500 hover:bg-blue-800/30 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center group"
              >
                Our Mission
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
          
          {/* Video Feature */}
          <div 
            className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-20 sm:mb-32 shadow-xl shadow-blue-900/20" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['video-section'] = el }} 
            id="video-section"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60 z-10"></div>
            
            {/* This would normally be a video component; using a dummy image for now */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900">
              {/* Placeholder for video/image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a 
                  href="#" 
                  className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-transform hover:scale-110 z-20 group"
                  onClick={(e) => e.preventDefault()}
                >
                  <PlayCircle className="h-10 w-10 text-white group-hover:text-blue-300 transition-colors" />
                </a>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Journey in Technology</h2>
              <p className="text-gray-300 text-lg max-w-2xl">
                See how TechPoa Connect has evolved from a small tech training initiative to a comprehensive ecosystem
                serving thousands across East Africa.
              </p>
            </div>
          </div>
          
          {/* Mission, Vision, Story Tabs */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['mission-section'] = el }} 
            id="mission-section"
          >
            <div className="flex flex-wrap justify-center mb-8 border-b border-blue-800 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('mission')} 
                className={`px-6 py-3 font-medium ${activeTab === 'mission' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
              >
                Our Mission
              </button>
              <button 
                onClick={() => setActiveTab('vision')} 
                className={`px-6 py-3 font-medium ${activeTab === 'vision' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
              >
                Our Vision
              </button>
              <button 
                onClick={() => setActiveTab('story')} 
                className={`px-6 py-3 font-medium ${activeTab === 'story' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
              >
                Our Story
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Tab Content */}
              <div>
                {activeTab === 'mission' && (
                  <div className="space-y-6 transition-all duration-500 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      To democratize technology education and services across East Africa, making quality tech learning and solutions accessible to all.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We strive to build a self-sustaining tech ecosystem where individuals can learn marketable skills, businesses can access quality development services, and the community can collaborate to drive innovation.
                    </p>
                    <div className="pt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="ml-3 text-gray-300">Provide world-class tech education tailored to local needs and contexts</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="ml-3 text-gray-300">Deliver professional software development services that meet global standards</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-blue-400" />
                        </div>
                        <p className="ml-3 text-gray-300">Foster a collaborative community that accelerates growth and innovation</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'vision' && (
                  <div className="space-y-6 transition-all duration-500 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20 mb-4">
                      <Eye className="h-6 w-6 text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      To become the leading tech education and services platform in Africa, recognized for excellence, innovation, and impact.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We envision a future where Africa is a global hub for tech talent and innovation, with TechPoa Connect playing a pivotal role in nurturing the next generation of tech leaders and entrepreneurs.
                    </p>
                    <div className="pt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <p className="ml-3 text-gray-300">A thriving ecosystem of 100,000+ tech professionals trained through our platform</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <p className="ml-3 text-gray-300">Digital transformation of 1,000+ businesses through our tech services</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <p className="ml-3 text-gray-300">Recognition as the most impactful tech education platform in Africa</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'story' && (
                  <div className="space-y-6 transition-all duration-500 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-600/20 mb-4">
                      <BookOpen className="h-6 w-6 text-teal-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      TechPoa Connect began in 2019 when founder Joseph Birisio noticed a critical gap between technology education and practical skills needed in the industry.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Starting with a small cohort of 50 web development students, TechPoa quickly expanded to address multiple needs in the tech ecosystem: quality education, professional development services, and community building.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Today, we've grown into a comprehensive platform serving thousands across East Africa, continuing our mission to democratize tech education and services while fostering a vibrant community of tech enthusiasts and professionals.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Illustration/Image */}
              <div className="relative h-80 sm:h-96 lg:h-full rounded-xl overflow-hidden shadow-xl shadow-blue-900/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  {/* This will be replaced with an actual image in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-blue-500/50 text-2xl">TechPoa Connect Campus Image</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
              </div>
            </div>
          </div>
          
          {/* Core Values */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['values-section'] = el }} 
            id="values-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <Compass className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                These guiding principles shape our decisions, culture, and interactions with our community and clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <div key={value.id} className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 hover:border-blue-600/50 transition-all group hover:bg-blue-800/20">
                  <div className="bg-gradient-to-br from-blue-700/50 to-purple-700/50 p-3 rounded-lg inline-flex mb-4 group-hover:from-blue-600/50 group-hover:to-purple-600/50 transition-all">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Company Milestones Timeline */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['timeline-section'] = el }} 
            id="timeline-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Key milestones in our evolution from a small initiative to a comprehensive tech ecosystem.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-800/70"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative flex items-center md:justify-between flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 z-10"></div>
                    
                    {/* Year indicator (mobile) */}
                    <div className="md:hidden flex items-center justify-center mb-4">
                      <div className="bg-blue-900/50 border border-blue-500/30 rounded-full px-4 py-1 text-blue-300 font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    
                    {/* Content box */}
                    <div className={`bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 md:w-5/12 w-full ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <div className="hidden md:block text-blue-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <div className="flex items-start">
                        <div className="bg-blue-800/50 p-2 rounded-lg mr-3 flex-shrink-0">
                          {milestone.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{milestone.title}</h3>
                          <p className="text-gray-300">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Key Stats Section */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['stats-section'] = el }} 
            id="stats-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Numbers that tell the story of our growth and influence in the tech ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {animatedStats[stat.label] || "0"}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Team Section */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['team-section'] = el }} 
            id="team-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                The passionate professionals behind TechPoa Connect who are dedicated to our mission.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-800/50 transition-all hover:border-blue-600/50 group">
                  <div className="h-60 bg-gradient-to-br from-blue-900 to-purple-900 relative">
                    {/* This would be replaced with actual team member images */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-blue-500/30">{member.name.charAt(0)}</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-blue-400 mb-3">{member.role}</p>
                    
                    <p className={`text-gray-300 text-sm mb-4 ${expandedTeamMember === member.id ? '' : 'line-clamp-3'}`}>
                      {member.bio}
                    </p>
                    
                    {member.bio.length > 150 && (
                      <button
                        onClick={() => toggleTeamMember(member.id)}
                        className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
                      >
                        {expandedTeamMember === member.id ? 'Read Less' : 'Read More'}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedTeamMember === member.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                    
                    <div className="flex space-x-3">
                      {member.socialLinks.linkedin && (
                        <a 
                          href={member.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a 
                          href={member.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a 
                          href={member.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                href="/careers" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group"
              >
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['testimonials-section'] = el }} 
            id="testimonials-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What People Say About Us</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Hear from students, clients, and community members who've experienced our services.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div 
                  className="transition-all duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  <div className="flex">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                        <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-blue-800/50">
                          <div className="mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`inline-block h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                                fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                              />
                            ))}
                          </div>
                          
                          <blockquote className="text-xl italic text-gray-300 mb-6">"{testimonial.quote}"</blockquote>
                          
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-purple-800 flex items-center justify-center mr-4">
                              {/* This would be replaced with actual testimonial images */}
                              <span className="text-lg font-bold text-blue-300">{testimonial.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-semibold">{testimonial.name}</div>
                              <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Testimonial dots indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeTestimonial === index ? 'bg-blue-500 w-6' : 'bg-blue-800 hover:bg-blue-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Partners Section */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['partners-section'] = el }} 
            id="partners-section"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                <HandShake className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Partners</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Leading organizations that collaborate with us to drive tech innovation and education.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 flex items-center justify-center hover:border-blue-600/50 transition-all group"
                >
                  <div className="text-center">
                    <div className="bg-white/5 p-4 rounded-lg mb-3 flex items-center justify-center h-20">
                      {/* This would be replaced with actual partner logos */}
                      <div className="text-blue-500/70 font-bold group-hover:text-blue-400 transition-colors">{partner.name}</div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-blue-400 flex items-center justify-center transition-colors">
                      Visit
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Location and Contact */}
          <div 
            className="mb-20 sm:mb-32" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['contact-section'] = el }} 
            id="contact-section"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Location</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Located in the heart of Nairobi, our innovation center serves as a hub for tech education, 
                  development, and community events.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-2 rounded-lg mr-3 text-blue-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">TechPoa Innovation Center</h3>
                      <p className="text-gray-300">Ngong Road, Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-2 rounded-lg mr-3 text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@techpoa.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                        info@techpoa.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 p-2 rounded-lg mr-3 text-blue-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+254716687177" className="text-blue-400 hover:text-blue-300 transition-colors">
                        +254 716 687 177
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573759510352" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://x.com/Techpoa_connect" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/birisio-joseph-ba6609355" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/techpoa_connect" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://github.com/techpoa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-800/50 p-2 rounded-full hover:bg-blue-700/70 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="h-80 sm:h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl overflow-hidden relative">
                {/* This would be replaced with an actual map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-blue-500/50 text-2xl">Interactive Map</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div 
            className="mb-20" 
            ref={(el: HTMLDivElement | null) => { sectionsRef.current['cta-section'] = el }} 
            id="cta-section"
          >
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-2xl p-8 sm:p-12 backdrop-blur-sm text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
              <div className="absolute -top-14 -right-14 w-28 h-28 border-2 border-blue-500/20 rounded-full"></div>
              <div className="absolute -bottom-14 -left-14 w-28 h-28 border-2 border-purple-500/20 rounded-full"></div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Join the TechPoa Community?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're looking to learn new tech skills, hire developers, or join our team,
                we have opportunities for you to connect and grow with us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/courses" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Courses
                </Link>
                <Link 
                  href="/services" 
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Our Services
                </Link>
                <Link 
                  href="/contact" 
                  className="px-6 py-3 border border-blue-500 hover:bg-blue-800/30 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing icon component
function Shield({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

// Add missing icon component
function HandShake({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    </svg>
  );
}

// Add missing icon component
function Eye({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}