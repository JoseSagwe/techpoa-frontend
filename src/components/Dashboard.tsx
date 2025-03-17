"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Folder, 
  MessageSquare, 
  Bell, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState("");
  
  // Set greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Dashboard quick links
  const quickLinks = [
    { 
      title: "My Courses", 
      description: "View your enrolled courses", 
      icon: <BookOpen className="h-8 w-8 text-blue-400" />,
      link: "/my-courses",
      bgClass: "from-blue-900/40 to-blue-800/40"
    },
    { 
      title: "Community", 
      description: "Connect with other tech enthusiasts", 
      icon: <Users className="h-8 w-8 text-purple-400" />, 
      link: "/community",
      bgClass: "from-purple-900/40 to-purple-800/40"
    },
    { 
      title: "Projects", 
      description: "Manage your development projects", 
      icon: <Folder className="h-8 w-8 text-green-400" />, 
      link: "/projects",
      bgClass: "from-green-900/40 to-green-800/40"
    },
    { 
      title: "Messages", 
      description: "Check your conversations", 
      icon: <MessageSquare className="h-8 w-8 text-pink-400" />, 
      link: "/messages",
      bgClass: "from-pink-900/40 to-pink-800/40"
    }
  ];

  // Recent activities (mock data)
  const recentActivities = [
    { 
      title: "Course Progress", 
      description: "You completed Module 3 of 'Advanced React'", 
      time: "2 hours ago",
      link: "/courses/advanced-react"
    },
    { 
      title: "Community Post", 
      description: "Your question received 5 new replies", 
      time: "Yesterday",
      link: "/community/thread/123"
    },
    { 
      title: "Project Update", 
      description: "New commit pushed to 'Frontend Dashboard'", 
      time: "2 days ago",
      link: "/projects/456"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {greeting}, {user?.firstName || 'User'}!
            </h1>
            <p className="text-blue-300 mt-1">
              Welcome back to your TechPoa Connect dashboard
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-blue-900/50 hover:bg-blue-800 p-2 rounded-full relative text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="bg-blue-900/50 hover:bg-blue-800 p-2 rounded-full text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleLogout}
              className="bg-blue-900/50 hover:bg-red-900/50 p-2 rounded-full text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.link}
              className={`bg-gradient-to-br ${link.bgClass} p-6 rounded-xl border border-blue-800/50 hover:border-blue-500/50 transition-all transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-start">
                <div className="bg-gray-900/50 p-3 rounded-lg mr-4">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">{link.title}</h3>
                  <p className="text-gray-300 text-sm">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats Overview */}
          <div className="lg:col-span-2">
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Progress Overview</h2>
              
              {/* Course Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-300">Advanced React</span>
                    <span className="text-sm text-blue-300">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-300">Data Structures & Algorithms</span>
                    <span className="text-sm text-blue-300">40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-300">Fullstack Next.js</span>
                    <span className="text-sm text-blue-300">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <Link 
                    key={index} 
                    href={activity.link}
                    className="block bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-blue-300">{activity.title}</h4>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{activity.description}</p>
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  href="/activity"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  View all activity
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile & Recommendations */}
          <div>
            {/* User Profile Card */}
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                
                <h3 className="text-xl font-semibold text-white">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-blue-300 mb-2">{user?.role}</p>
                
                <div className="w-full mt-4">
                  <Link 
                    href="/profile"
                    className="block w-full bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-md transition-colors"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Recommended Courses */}
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recommended for You</h2>
              
              <div className="space-y-4">
                <Link 
                  href="/courses/react-advanced-patterns"
                  className="block bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors"
                >
                  <h4 className="font-medium text-blue-300">React Advanced Patterns</h4>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">4.8 (126 reviews)</span>
                  </div>
                </Link>
                
                <Link 
                  href="/courses/aws-certification"
                  className="block bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors"
                >
                  <h4 className="font-medium text-blue-300">AWS Certification Guide</h4>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">4.9 (208 reviews)</span>
                  </div>
                </Link>
                
                <Link 
                  href="/courses/mobile-development"
                  className="block bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors"
                >
                  <h4 className="font-medium text-blue-300">Modern Mobile App Development</h4>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">4.7 (154 reviews)</span>
                  </div>
                </Link>
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  href="/courses"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  View all courses
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}