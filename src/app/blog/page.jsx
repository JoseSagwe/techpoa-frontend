"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  BookOpen, 
  MessageCircle, 
  TrendingUp, 
  Filter,
  ChevronDown,
  Moon,
  Sun
} from "lucide-react";

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Sample categories
  const categories = [
    { id: "all", name: "All Posts", count: 48 },
    { id: "frontend", name: "Frontend", count: 14 },
    { id: "backend", name: "Backend", count: 12 },
    { id: "devops", name: "DevOps", count: 8 },
    { id: "career", name: "Career", count: 10 },
    { id: "ai", name: "AI & ML", count: 6 },
    { id: "mobile", name: "Mobile Dev", count: 5 },
    { id: "ux", name: "UX Design", count: 7 }
  ];
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Modern Web Development with React and Next.js",
      excerpt: "Learn how to build faster, SEO-friendly applications with React and Next.js framework. We'll cover the latest features and best practices.",
      category: "frontend",
      coverImage: "/blog/nextjs.jpeg",
      date: "April 12, 2025",
      readTime: "8 min read",
      author: {
        name: "Michael Joseph",
        image: "/authors/michael.png"
      },
      tags: ["React", "Next.js", "JavaScript"],
      featured: true
    },
    {
      id: 2,
      title: "Setting Up Effective CI/CD Pipelines for Small Teams",
      excerpt: "Discover how small development teams can implement efficient CI/CD workflows without complex infrastructure or large DevOps resources.",
      category: "devops",
      coverImage: "/blog/cicd.png",
      date: "April 5, 2025",
      readTime: "10 min read",
      author: {
        name: "David John",
        image: "/authors/david.jpg"
      },
      tags: ["DevOps", "CI/CD", "Automation"]
    },
    {
      id: 3,
      title: "Navigating Your Tech Career Path in East Africa",
      excerpt: "A comprehensive guide for tech professionals looking to advance their careers in East Africa's growing technology ecosystem.",
      category: "career",
      coverImage: "/blog/career.jpg",
      date: "March 28, 2025",
      readTime: "12 min read",
      author: {
        name: "Sarah Mwangi",
        image: "/authors/sarah.jpeg"
      },
      tags: ["Career", "Professional Growth", "Tech Industry"],
      featured: true
    },
    {
      id: 4,
      title: "Introduction to Machine Learning with Python",
      excerpt: "A beginner-friendly introduction to machine learning concepts and implementation using Python and popular libraries.",
      category: "ai",
      coverImage: "/blog/ml-python.png",
      date: "March 22, 2025",
      readTime: "15 min read",
      author: {
        name: "Amina Hassan",
        image: "/authors/amina.jpeg"
      },
      tags: ["Machine Learning", "Python", "Data Science"]
    },
    {
      id: 5,
      title: "Building RESTful APIs with Node.js and Express",
      excerpt: "Step-by-step guide to creating robust, scalable APIs using Node.js and Express with best practices for authentication and error handling.",
      category: "backend",
      coverImage: "/blog/nodejs-api.png",
      date: "March 15, 2025",
      readTime: "11 min read",
      author: {
        name: "Michael Joseph",
        image: "/authors/michael.png"
      },
      tags: ["Node.js", "Express", "API Development"]
    },
  ];
  
  // Filter blog posts based on selected category and search
  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post => {
      if (!searchQuery) return true;
      
      const search = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.tags.some(tag => tag.toLowerCase().includes(search))
      );
    });
  
  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  
  // Toggle category dropdown
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };
  
  // Select category and close dropdown
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);
  };
  
  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const bgClass = darkMode 
    ? "bg-gradient-to-br from-gray-900 to-blue-900 text-white" 
    : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Theme toggle and navigation */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} transition-colors`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${darkMode ? 'bg-blue-600/20' : 'bg-blue-500/20'} mb-6`}>
              <BookOpen className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              darkMode 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400' 
                : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600'
            }`}>
              TechPoa Blog
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Insights, tutorials, and industry perspectives from East Africa's tech community
            </p>
            
            {/* Search bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-4 pl-12 pr-4 ${
                    darkMode 
                      ? 'bg-gray-800/60 text-white border-blue-800/50' 
                      : 'bg-white/80 text-gray-800 border-blue-200'
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border transition-colors`}
                />
                <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Featured Articles */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={`group block ${
                      darkMode 
                        ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-800/50 hover:border-blue-600/50' 
                        : 'bg-gradient-to-r from-white/70 to-blue-100/70 border-blue-200 hover:border-blue-400'
                    } rounded-xl overflow-hidden border transition-all`}
                  >
                    <div className="relative h-60 sm:h-72">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className={`absolute top-4 left-4 ${
                        darkMode ? 'bg-blue-600/90' : 'bg-blue-600'
                      } backdrop-blur-sm text-xs font-semibold rounded-full px-3 py-1 z-10 text-white`}>
                        {categories.find(cat => cat.id === post.category)?.name || post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
                        darkMode ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'
                      } transition-colors`}>{post.title}</h3>
                      <p className={darkMode ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}>{post.excerpt}</p>
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-2 border border-blue-500/30"
                          />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.author.name}</span>
                        </div>
                        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">{post.date}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter and Latest Articles */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">Latest Articles</h2>
              
              {/* Category filter dropdown */}
              <div className="relative">
                <button
                  onClick={toggleCategoryDropdown}
                  className={`flex items-center space-x-2 ${
                    darkMode 
                      ? 'bg-blue-900/50 hover:bg-blue-800/60 text-white' 
                      : 'bg-white/80 hover:bg-blue-100 text-gray-800'
                  } px-4 py-2 rounded-md transition-colors`}
                >
                  <Filter size={16} />
                  <span>
                    {categories.find(cat => cat.id === selectedCategory)?.name || 'All Posts'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Dropdown menu */}
                {isCategoryDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 ${
                    darkMode 
                      ? 'bg-gray-800/95 backdrop-blur-md border-blue-800/50 text-gray-300' 
                      : 'bg-white backdrop-blur-md border-blue-200 text-gray-700'
                  } border rounded-md shadow-xl z-20 py-1`}>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          selectedCategory === category.id 
                            ? darkMode ? 'bg-blue-900/60 text-blue-300' : 'bg-blue-100 text-blue-700'
                            : darkMode ? 'hover:bg-blue-900/40' : 'hover:bg-blue-50'
                        } transition-colors flex justify-between items-center`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-xs ${
                          darkMode ? 'bg-blue-900/80' : 'bg-blue-200'
                        } px-2 py-0.5 rounded-full`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Grid of blog posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className={`group flex flex-col h-full ${
                    darkMode 
                      ? 'bg-blue-900/30 backdrop-blur-sm border-blue-800/50 hover:border-blue-600/50' 
                      : 'bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-400'
                  } rounded-xl overflow-hidden border transition-all`}
                >
                  <div className="relative h-48">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-3 left-3 ${
                      darkMode ? 'bg-blue-600/90' : 'bg-blue-600'
                    } backdrop-blur-sm text-xs font-semibold rounded-full px-2 py-0.5 z-10 text-white`}>
                      {categories.find(cat => cat.id === post.category)?.name || post.category}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className={`text-lg font-bold mb-2 ${
                      darkMode ? 'group-hover:text-blue-300' : 'group-hover:text-blue-600'
                    } transition-colors`}>{post.title}</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 flex-grow`}>{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full mr-2 border border-blue-500/30"
                        />
                        <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.author.name}</span>
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Load more button */}
            <div className="mt-12 text-center">
              <button className={`inline-flex items-center px-6 py-3 ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors rounded-md text-white font-medium`}>
                Load more articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="my-20">
            <div className={`${
              darkMode 
                ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-800/50' 
                : 'bg-gradient-to-r from-white/80 to-blue-100/80 border-blue-200'
            } rounded-xl p-8 border backdrop-blur-sm`}>
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">Stay Updated with TechPoa</h2>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Subscribe to our newsletter for weekly tech insights, tutorials, and industry news.
                  </p>
                </div>
                
                <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={`flex-grow p-3 ${
                      darkMode 
                        ? 'bg-gray-800/60 text-white border-blue-800/50' 
                        : 'bg-white/80 text-gray-800 border-blue-200'
                    } rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 border`}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md sm:rounded-l-none font-medium whitespace-nowrap text-white"
                  >
                    Subscribe
                  </button>
                </form>
                
                <div className="text-center mt-4 text-sm text-gray-400">
                  We respect your privacy. You can unsubscribe at any time.
                </div>
              </div>
            </div>
          </div>

          {/* Topic Categories */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-6">Explore Topics</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.filter(cat => cat.id !== 'all').map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border ${
                    selectedCategory === category.id
                      ? darkMode 
                        ? 'bg-blue-600/40 border-blue-500/70' 
                        : 'bg-blue-100 border-blue-300'
                      : darkMode 
                        ? 'bg-blue-900/30 border-blue-800/50 hover:border-blue-700/70' 
                        : 'bg-white/80 border-blue-200 hover:border-blue-300'
                  } transition-all flex flex-col items-center justify-center text-center`}
                >
                  <span className="font-semibold mb-1">{category.name}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{category.count} articles</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <TrendingUp className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
              <h2 className="text-2xl font-bold">Trending Topics</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                "React", "Node.js", "Python", "Next.js", "TypeScript", 
                "DevOps", "AI", "Career Growth", "AWS", "Mobile Development",
                "UI/UX Design", "Docker", "Kubernetes", "Flutter"
              ].map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${
                    darkMode 
                      ? 'bg-blue-900/40 hover:bg-blue-800/60' 
                      : 'bg-white/80 hover:bg-blue-100'
                  } transition-colors px-4 py-2 rounded-full text-sm flex items-center`}
                >
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Join Community CTA */}
          <div>
            <div className={`${
              darkMode 
                ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-800/50' 
                : 'bg-gradient-to-r from-white/80 to-blue-100/80 border-blue-200'
            } rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border`}>
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"></div>
              
              <h2 className="text-3xl font-bold mb-4">Join Our Tech Community</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-xl mx-auto`}>
                Connect with other tech enthusiasts, participate in discussions, and contribute to our growing knowledge base.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/community" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join Our Community
                </Link>
                <Link 
                  href="/blog/contribute" 
                  className={`px-6 py-3 border ${
                    darkMode ? 'border-blue-500 hover:bg-blue-800/30' : 'border-blue-400 hover:bg-blue-100'
                  } transition-colors rounded-md font-medium inline-flex items-center justify-center`}
                >
                  <User className="mr-2 h-5 w-5" />
                  Become a Contributor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}