"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Globe,
  ArrowRight, 
  Search,
  Filter,
  ChevronRight,
  Github,
  ExternalLink,
  Twitter,
  Code,
  BookOpen,
  UserPlus,
  CheckCircle2,
  Star // Added missing Star import
} from "lucide-react";

export default function Community() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample featured communities
  const featuredCommunities = [
    {
      id: 1,
      name: "TechPoa Developers",
      members: "7,800+",
      description: "Connect with developers across East Africa to discuss best practices, share code, and collaborate on projects.",
      icon: <Code size={24} className="text-white" />, // Added className
      color: "from-blue-500 to-indigo-600",
      link: "/community/developers"
    },
    {
      id: 2,
      name: "Design Collective",
      members: "3,200+",
      description: "A space for UI/UX designers, graphic artists, and creative professionals to share work and exchange ideas.",
      icon: <PenTool size={24} className="text-white" />, // Added className
      color: "from-purple-500 to-pink-600",
      link: "/community/design"
    },
    {
      id: 3,
      name: "Data Science Hub",
      members: "2,450+",
      description: "Explore the world of data analytics, machine learning, and AI with fellow data enthusiasts.",
      icon: <BarChart size={24} className="text-white" />, // Added className
      color: "from-teal-500 to-green-600",
      link: "/community/data-science"
    }
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Frontend Development Workshop",
      date: "August 25, 2025",
      time: "2:00 PM - 5:00 PM EAT",
      type: "In-person",
      location: "TechPoa Hub, Nairobi",
      image: "/events/frontend-workshop.jpg"
    },
    {
      id: 2,
      title: "AI & Machine Learning Meetup",
      date: "July 2, 2025",
      time: "6:00 PM - 8:00 PM EAT",
      type: "Online",
      location: "Zoom Webinar",
      image: "/events/ai-meetup.jpg"
    },
  ];

  // Sample trending discussions
  const trendingDiscussions = [
    {
      id: 1,
      title: "How to get started with React in 2025",
      category: "Frontend",
      replies: 78,
      author: "Joseph Birisio",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for securing Node.js applications",
      category: "Backend",
      replies: 45,
      author: "David Ochieng",
      timeAgo: "Yesterday"
    },
    {
      id: 3,
      title: "Setting up CI/CD pipelines for small projects",
      category: "DevOps",
      replies: 34,
      author: "Sarah Mwangi",
      timeAgo: "2 days ago"
    },
    {
      id: 4,
      title: "Tips for landing your first tech job in East Africa",
      category: "Career",
      replies: 92,
      author: "TechPoa Team",
      timeAgo: "3 days ago"
    }
  ];

  // Sample open source projects
  const openSourceProjects = [
    {
      id: 1,
      name: "TechPoa Learn",
      description: "Interactive learning platform with coding challenges and mentorship tracking",
      stars: 324,
      language: "TypeScript",
      contributors: 28
    },
    {
      id: 2,
      name: "AfriPay",
      description: "Payment integration library for East African payment gateways",
      stars: 186,
      language: "JavaScript",
      contributors: 15
    },
    {
      id: 3,
      name: "DataViz-Africa",
      description: "Data visualization components tailored for African datasets and use cases",
      stars: 237,
      language: "Python",
      contributors: 22
    }
  ];

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Fixed type for event parameter
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
        {/* Hero Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-6">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with developers, designers, and tech enthusiasts across East Africa to learn, collaborate, and grow together.
            </p>
            
            {/* Search bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for topics, events, or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-12 pr-4 bg-gray-800/60 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/50"
                />
                <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-5 text-center hover:border-blue-600/50 transition-colors">
              <div className="text-3xl font-bold mb-1">15,000+</div>
              <div className="text-gray-300">Community Members</div>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-5 text-center hover:border-blue-600/50 transition-colors">
              <div className="text-3xl font-bold mb-1">120+</div>
              <div className="text-gray-300">Events Per Year</div>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-5 text-center hover:border-blue-600/50 transition-colors">
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-gray-300">Open Source Projects</div>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-5 text-center hover:border-blue-600/50 transition-colors">
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-gray-300">Tech Chapters</div>
            </div>
          </div>

          {/* How to Join Section */}
          <div className="mb-24">
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-bold mb-6">How to Join</h2>
                  <p className="text-gray-300 mb-6">
                    Becoming part of the TechPoa community is simple and free. Join us today to connect with like-minded tech enthusiasts, access resources, and accelerate your growth.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-300 font-semibold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Create an Account</h3>
                        <p className="text-gray-300 text-sm">Sign up with your email or connect with Google, Github, or LinkedIn.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-300 font-semibold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Complete Your Profile</h3>
                        <p className="text-gray-300 text-sm">Share your skills, interests, and experience with the community.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-300 font-semibold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Connect & Engage</h3>
                        <p className="text-gray-300 text-sm">Join discussion groups, attend events, and collaborate on projects.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium group"
                  >
                    Join Now - It's Free
                    <UserPlus className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
              </div>
            </div>
          </div>

          {/* Featured Communities */}
          <div className="mb-24">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Communities</h2>
                <p className="text-gray-300">Find your tribe and connect with peers who share your interests</p>
              </div>
              <Link 
                href="/community/groups" 
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group"
              >
                View all communities
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCommunities.map((community) => (
                <Link 
                  key={community.id} 
                  href={community.link}
                  className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-all hover:translate-y-[-4px] group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${community.color} mb-4`}>
                    {community.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-300 transition-colors">{community.name}</h3>
                  <div className="text-sm text-blue-400 mb-3">{community.members} members</div>
                  <p className="text-gray-300 text-sm mb-4">{community.description}</p>
                  <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-medium">
                    Join community
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

                    {/* Upcoming Events */}
            <div className="mb-24">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
                  <p className="text-gray-300">Learn, network, and collaborate at our community events</p>
                </div>
                <Link 
                  href="/community/events" 
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group mt-4 sm:mt-0"
                >
                  View all events
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl overflow-hidden group hover:border-blue-600/50 transition-all">
                    <div className="relative h-48">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback display if image fails to load */}
                      <div className="image-fallback hidden absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-800 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-blue-400/70" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-blue-900/80 backdrop-blur-sm text-xs font-medium rounded-full px-3 py-1">
                        {event.type}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-300 transition-colors">{event.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-300">
                          <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                          {event.date} | {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Globe className="h-4 w-4 mr-2 text-blue-400" />
                          {event.location}
                        </div>
                      </div>
                      <Link 
                        href={`/community/events/${event.id}`}
                        className="inline-flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-medium"
                      >
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* Two-column layout for Discussions and Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            {/* Trending Discussions */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold">Trending Discussions</h2>
                <Link 
                  href="/community/forum" 
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center group"
                >
                  View forum
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {trendingDiscussions.map((discussion) => (
                  <Link 
                    key={discussion.id}
                    href={`/community/forum/topic/${discussion.id}`}
                    className="block bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-4 hover:border-blue-600/50 transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="flex-grow">
                        <h3 className="font-semibold mb-1 group-hover:text-blue-300 transition-colors">{discussion.title}</h3>
                        <div className="flex items-center text-sm">
                          <span className="text-blue-400 bg-blue-900/50 rounded-full px-2 py-0.5 mr-3">{discussion.category}</span>
                          <span className="text-gray-400 flex items-center">
                            <MessageCircle className="h-3.5 w-3.5 mr-1" />
                            {discussion.replies} replies
                          </span>
                          <span className="mx-2 text-gray-600">•</span>
                          <span className="text-gray-400">{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  href="/community/forum/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-900/50 hover:bg-blue-800 transition-colors rounded-md text-white text-sm font-medium border border-blue-700/50"
                >
                  Start a new discussion
                </Link>
              </div>
            </div>
            
            {/* Open Source Projects */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold">Open Source Projects</h2>
                <Link 
                  href="/community/projects" 
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center group"
                >
                  Explore projects
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {openSourceProjects.map((project) => (
                  <Link 
                    key={project.id}
                    href={`/community/projects/${project.id}`}
                    className="block bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-4 hover:border-blue-600/50 transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-800/50 p-3 rounded-lg mr-4">
                        <Code className="h-5 w-5 text-blue-300" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-semibold group-hover:text-blue-300 transition-colors">{project.name}</h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                            {project.stars}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                        <div className="flex items-center text-sm">
                          <span className="flex items-center mr-4">
                            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></span>
                            {project.language}
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {project.contributors} contributors
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  href="/community/projects/contribute"
                  className="inline-flex items-center px-4 py-2 bg-blue-900/50 hover:bg-blue-800 transition-colors rounded-md text-white text-sm font-medium border border-blue-700/50"
                >
                  Contribute to a project
                </Link>
              </div>
            </div>
          </div>

          {/* Community Benefits */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Why Join Our Community?</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                The TechPoa community offers unique benefits that help you grow personally and professionally
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-colors">
                <div className="bg-gradient-to-br from-blue-600/30 to-indigo-600/30 p-3 rounded-lg inline-block mb-4">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Network</h3>
                <p className="text-gray-300 text-sm">
                  Connect with tech professionals and build meaningful relationships that can lead to opportunities.
                </p>
              </div>
              
              <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-colors">
                <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-3 rounded-lg inline-block mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn</h3>
                <p className="text-gray-300 text-sm">
                  Access exclusive resources, workshops, and mentorship to enhance your skills and knowledge.
                </p>
              </div>
              
              <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-colors">
                <div className="bg-gradient-to-br from-teal-600/30 to-green-600/30 p-3 rounded-lg inline-block mb-4">
                  <Code className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
                <p className="text-gray-300 text-sm">
                  Work on open-source projects and gain practical experience solving real-world problems.
                </p>
              </div>
              
              <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 hover:border-blue-600/50 transition-colors">
                <div className="bg-gradient-to-br from-amber-600/30 to-red-600/30 p-3 rounded-lg inline-block mb-4">
                  <Briefcase className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Grow</h3>
                <p className="text-gray-300 text-sm">
                  Discover career opportunities, get feedback on your work, and establish yourself in the industry.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div>
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
              
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Join thousands of tech enthusiasts today and become part of East Africa's most vibrant tech community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/community/join" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Join Now - It's Free
                </Link>
                <Link 
                  href="/community/learn-more" 
                  className="px-6 py-3 border border-blue-500 hover:bg-blue-800/30 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fixed icon components with proper TypeScript typing
function PenTool({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="m2 2 7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>
  );
}

function BarChart({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  );
}

function Briefcase({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}