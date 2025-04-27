"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Tag,
  Heart,
  Copy,
  CheckCircle2,
  User
} from "lucide-react";

// This would be defined in your app/blog/[id]/page.jsx file
export default function BlogPost({ params }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { id } = params;
  
  // Toggle like state
  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  // Toggle bookmark state
  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };
  
  // Copy article link
  const copyLink = (e) => {
    e.stopPropagation();
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  };
  
  // Toggle share tooltip
  const toggleShareTooltip = (e) => {
    e.stopPropagation();
    setShowShareTooltip(!showShareTooltip);
  };
  
  useEffect(() => {
    setIsVisible(true);
    
    // Handle click outside to close tooltip
    const handleClickOutside = (e) => {
      if (!e.target.closest('.share-tooltip-container')) {
        setShowShareTooltip(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // In a real app, you would fetch this data from an API based on the id
  const post = {
    id: 1,
    title: "Modern Web Development with React and Next.js",
    excerpt: "Learn how to build faster, SEO-friendly applications with React and Next.js framework. We'll cover the latest features and best practices.",
    category: "frontend",
    coverImage: "/blog/nextjs.jpeg",
    date: "April 12, 2025",
    readTime: "8 min read",
    author: {
      name: "Joseph Birisio",
      image: "/authors/michael.png",
      title: "Frontend Lead",
      bio: "Joseph is a frontend developer with 8 years of experience specializing in React and modern JavaScript frameworks."
    },
    tags: ["React", "Next.js", "JavaScript", "Frontend"],
    content: `
      <p class="mb-4">Web development has evolved significantly over the years, and React has emerged as one of the most popular libraries for building user interfaces. Combined with Next.js, it offers a powerful solution for creating modern web applications.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Why Next.js?</h2>
      
      <p class="mb-4">Next.js offers several advantages over traditional React applications:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Server-side rendering for improved performance and SEO</li>
        <li>Static site generation for blazing fast page loads</li>
        <li>Built-in API routes for backend functionality</li>
        <li>File-based routing that simplifies navigation</li>
        <li>Image optimization out of the box</li>
      </ul>
      
      <p class="mb-4">These features make Next.js an excellent choice for both small and large-scale projects.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Getting Started with Next.js</h2>
      
      <p class="mb-4">Creating a new Next.js project is straightforward. You can use the create-next-app command to bootstrap a new project:</p>
      
      <pre class="bg-gray-800 p-4 rounded-md overflow-x-auto mb-6">
        <code>npx create-next-app@latest my-next-app</code>
      </pre>
      
      <p class="mb-4">This command sets up a new Next.js project with all the necessary configurations. Once the installation is complete, you can navigate to your project directory and start the development server:</p>
      
      <pre class="bg-gray-800 p-4 rounded-md overflow-x-auto mb-6">
        <code>cd my-next-app
npm run dev</code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Building Your First Page</h2>
      
      <p class="mb-6">Next.js uses a file-based routing system. Any file inside the pages directory automatically becomes a route. For example, if you create a file at pages/about.js, it will be accessible at /about.</p>
      
      <p class="mb-4">Here's a simple example of a Next.js page component:</p>
      
      <pre class="bg-gray-800 p-4 rounded-md overflow-x-auto mb-6">
        <code>// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to My Next.js App</h1>
        <p>Get started by editing pages/index.js</p>
      </main>
    </div>
  )
}</code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Data Fetching in Next.js</h2>
      
      <p class="mb-4">Next.js provides several methods for fetching data:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>getStaticProps</strong> - Fetch data at build time</li>
        <li><strong>getStaticPaths</strong> - Specify dynamic routes to pre-render based on data</li>
        <li><strong>getServerSideProps</strong> - Fetch data on each request</li>
      </ul>
      
      <p class="mb-4">For example, to fetch data at build time, you can use getStaticProps:</p>
      
      <pre class="bg-gray-800 p-4 rounded-md overflow-x-auto mb-6">
        <code>// pages/blog/index.js
export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  // Fetch data from an API
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  // Pass data to the page via props
  return {
    props: {
      posts,
    },
  }
}</code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">Next.js provides a powerful framework for building modern web applications with React. Its features like server-side rendering, static site generation, and built-in API routes make it an excellent choice for developers looking to build fast, SEO-friendly applications.</p>
      
      <p class="mb-4">As web development continues to evolve, frameworks like Next.js will play a crucial role in shaping the future of the web. By learning these tools now, you'll be well-positioned to build the next generation of web applications.</p>
    `,
    relatedPosts: [
      {
        id: 5,
        title: "Building RESTful APIs with Node.js and Express",
        excerpt: "Step-by-step guide to creating robust, scalable APIs using Node.js and Express with best practices for authentication and error handling.",
        coverImage: "/blog/nodejs-api.png",
      },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>
          </div>
          
          {/* Article header */}
          <header className="mb-8">
            <div className="text-blue-400 bg-blue-900/50 rounded-full px-3 py-1 text-sm inline-block mb-4">
              Frontend
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-300 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                {post.date}
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                {post.readTime}
              </div>
            </div>
            
            {/* Author info */}
            <div className="flex items-center">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-blue-500/50 mr-4"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-400">{post.author.title}</div>
              </div>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="relative h-72 sm:h-96 mb-8 rounded-xl overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Article actions */}
          <div className="sticky top-4 z-20">
            <div className="flex justify-end mb-8">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-blue-900/50 rounded-full p-1 flex items-center">
                <button 
                  onClick={toggleLike}
                  className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'} transition-colors`}
                  aria-label="Like article"
                  title="Like article"
                >
                  <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                </button>
                
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full ${isBookmarked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400'} transition-colors`}
                  aria-label="Bookmark article"
                  title="Bookmark article"
                >
                  <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                
                <div className="relative share-tooltip-container">
                  <button 
                    onClick={toggleShareTooltip}
                    className="p-2 rounded-full text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label="Share article"
                    title="Share article"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  
                  {showShareTooltip && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md border border-blue-800/50 rounded-md shadow-xl z-20 py-2 px-1">
                      <div className="text-xs text-gray-400 px-2 pb-1 mb-1 border-b border-gray-700">
                        Share this article
                      </div>
                      <button
                        onClick={copyLink}
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-blue-900/40 rounded flex items-center"
                      >
                        {copiedLink ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2 text-blue-400" />
                            <span>Copy link</span>
                          </>
                        )}
                      </button>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-blue-900/40 rounded flex items-center"
                      >
                        <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                        <span>Twitter</span>
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-blue-900/40 rounded flex items-center"
                      >
                        <Facebook className="h-4 w-4 mr-2 text-blue-400" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-blue-900/40 rounded flex items-center"
                      >
                        <Linkedin className="h-4 w-4 mr-2 text-blue-400" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <article className="prose prose-invert prose-blue max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          {/* Tags */}
          <div className="mb-12">
            <div className="text-lg font-bold mb-4">Tags</div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-blue-900/40 hover:bg-blue-800/60 transition-colors px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Author bio */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 mb-12">
            <div className="flex items-center mb-4">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-16 h-16 rounded-full border-2 border-blue-500/50 mr-4"
              />
              <div>
                <div className="font-bold text-lg">{post.author.name}</div>
                <div className="text-gray-400">{post.author.title}</div>
              </div>
            </div>
            <p className="text-gray-300">{post.author.bio}</p>
            <div className="mt-4">
              <Link
                href={`/blog/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-blue-400 hover:text-blue-300 inline-flex items-center group text-sm font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                View all posts by {post.author.name}
              </Link>
            </div>
          </div>
          
          {/* Comment section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 mb-6">
              <div className="text-center py-4">
                <MessageCircle className="h-10 w-10 mx-auto mb-3 text-blue-400 opacity-70" />
                <h3 className="text-lg font-medium mb-2">Join the discussion</h3>
                <p className="text-gray-400 mb-4">Share your thoughts on this article with the community</p>
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white text-sm font-medium"
                >
                  Sign in to comment
                </Link>
              </div>
            </div>
          </div>
          
          {/* Related articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group flex flex-col h-full bg-blue-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-800/50 hover:border-blue-600/50 transition-all"
                >
                  <div className="relative h-40">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-base font-bold mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-800/50 backdrop-blur-sm text-center">
            <h2 className="text-xl font-bold mb-2">Enjoyed this article?</h2>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter and get the latest tech insights delivered to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow p-2 bg-gray-800/60 text-white rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/50"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-md sm:rounded-l-none font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}