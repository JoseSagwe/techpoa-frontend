"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FileText, MessageSquare, LogOut, BarChart2, Mail, RefreshCw, Search, X, Copy, Calendar, Clock } from 'lucide-react';
import { 
  getDashboardStats, 
  getSubscribers, 
  getQuoteRequests, 
  getContactMessages,
  type DashboardStats,
  type ContactMessage,
  type NewsletterSubscriber,
  type QuoteRequest
} from '@/services/admin-api';

interface AdminDashboardProps {
  accessCode: string;
  onLogout: () => void;
}

type ActiveTab = 'overview' | 'subscribers' | 'quotes' | 'messages';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ accessCode, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expandedQuoteId, setExpandedQuoteId] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const statsData = await getDashboardStats(accessCode);
      if (statsData) {
        setStats(statsData);
      }
      
      // Fetch data based on active tab to save bandwidth
      if (activeTab === 'overview' || activeTab === 'subscribers') {
        const subscribersData = await getSubscribers(accessCode);
        setSubscribers(subscribersData);
      }
      
      if (activeTab === 'overview' || activeTab === 'quotes') {
        const quotesData = await getQuoteRequests(accessCode);
        setQuotes(quotesData);
      }
      
      if (activeTab === 'overview' || activeTab === 'messages') {
        const messagesData = await getContactMessages(accessCode);
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, accessCode]);


  useEffect(() => {
  fetchDashboardData();
}, [fetchDashboardData]);

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotes = quotes.filter(quote => 
    quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (quote.company && quote.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-screen flex flex-col fixed left-0 top-0">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">TechPoa Admin</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            <li>
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-blue-800/50 text-blue-300' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <BarChart2 size={18} className="mr-3" />
                Dashboard Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('subscribers')}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                  activeTab === 'subscribers' 
                    ? 'bg-blue-800/50 text-blue-300' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Mail size={18} className="mr-3" />
                Newsletter Subscribers
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('quotes')}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                  activeTab === 'quotes' 
                    ? 'bg-blue-800/50 text-blue-300' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <FileText size={18} className="mr-3" />
                Quote Requests
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                  activeTab === 'messages' 
                    ? 'bg-blue-800/50 text-blue-300' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <MessageSquare size={18} className="mr-3" />
                Contact Messages
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'subscribers' && 'Newsletter Subscribers'}
            {activeTab === 'quotes' && 'Quote Requests'}
            {activeTab === 'messages' && 'Contact Messages'}
          </h2>
          
          <div className="flex items-center space-x-4">
            {activeTab !== 'overview' && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 px-4 pl-10 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
            
            <button 
              onClick={fetchDashboardData}
              className="flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-md text-red-300">
            {error}
          </div>
        )}
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading data...</p>
          </div>
        ) : (
          <>
            {/* Overview Dashboard */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-lg border border-blue-700/30 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-blue-300">Newsletter Subscribers</h3>
                      <Mail size={20} className="text-blue-400" />
                    </div>
                    <p className="text-4xl font-bold">{stats.subscriberCount}</p>
                    <p className="mt-2 text-sm text-gray-400">Total subscribers to date</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-lg border border-purple-700/30 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-purple-300">Quote Requests</h3>
                      <FileText size={20} className="text-purple-400" />
                    </div>
                    <p className="text-4xl font-bold">{stats.quoteCount}</p>
                    <p className="mt-2 text-sm text-gray-400">Project inquiries received</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 rounded-lg border border-emerald-700/30 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-emerald-300">Contact Messages</h3>
                      <MessageSquare size={20} className="text-emerald-400" />
                    </div>
                    <p className="text-4xl font-bold">{stats.messageCount}</p>
                    <p className="mt-2 text-sm text-gray-400">Messages from visitors</p>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Subscribers */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-4 bg-gray-700/50 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold">Recent Subscribers</h3>
                      <button 
                        onClick={() => setActiveTab('subscribers')}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-4">
                      {subscribers.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No subscribers yet</p>
                      ) : (
                        <ul className="divide-y divide-gray-700">
                          {subscribers.slice(0, 5).map((sub, index) => (
                            <li key={index} className="py-3 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-700/30 flex items-center justify-center mr-3">
                                  <Mail size={14} className="text-blue-300" />
                                </div>
                                <span className="text-gray-300">{sub.email}</span>
                              </div>
                              <button 
                                onClick={() => copyToClipboard(sub.email || '')}
                                className="text-gray-500 hover:text-gray-300"
                                title="Copy email"
                              >
                                <Copy size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  {/* Recent Messages */}
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-4 bg-gray-700/50 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold">Recent Messages</h3>
                      <button 
                        onClick={() => setActiveTab('messages')}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-4">
                      {messages.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No messages yet</p>
                      ) : (
                        <ul className="divide-y divide-gray-700">
                          {messages.slice(0, 5).map((msg, index) => (
                            <li key={index} className="py-3">
                              <div className="flex items-center mb-1">
                                <span className="font-medium text-gray-300 mr-2">{msg.name}</span>
                                <span className="text-sm text-gray-500">{msg.email}</span>
                              </div>
                              <p className="text-gray-400 text-sm line-clamp-2">{msg.message}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Subscribers List */}
            {activeTab === 'subscribers' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-700/50 border-b border-gray-700">
                  <h3 className="font-semibold">All Subscribers ({filteredSubscribers.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  {filteredSubscribers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {subscribers.length === 0 ? 'No subscribers yet' : 'No matching subscribers found'}
                    </p>
                  ) : (
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-700/30">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subscribed On</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredSubscribers.map((sub, index) => (
                          <tr key={index} className="hover:bg-gray-700/30">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-700/30 flex items-center justify-center mr-3">
                                  <Mail size={14} className="text-blue-300" />
                                </div>
                                <span className="text-gray-300">{sub.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                              {formatDate(sub.subscribedAt)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button 
                                onClick={() => copyToClipboard(sub.email || '')}
                                className="inline-flex items-center px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                              >
                                <Copy size={12} className="mr-1" />
                                Copy
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
            
            {/* Quote Requests */}
            {activeTab === 'quotes' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-700/50 border-b border-gray-700">
                  <h3 className="font-semibold">All Quote Requests ({filteredQuotes.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  {filteredQuotes.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {quotes.length === 0 ? 'No quote requests yet' : 'No matching quote requests found'}
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-700">
                      {filteredQuotes.map((quote, index) => (
                        <div key={index} className="p-4 hover:bg-gray-700/20">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-200">{quote.name}</h4>
                              <div className="flex items-center text-sm text-gray-400 mt-1">
                                <Mail size={14} className="mr-1" />
                                {quote.email}
                                
                                {quote.phone && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{quote.phone}</span>
                                  </>
                                )}
                                
                                {quote.company && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{quote.company}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                              {quote.createdAt && (
                                <div className="text-xs text-gray-500 flex items-center">
                                  <Calendar size={12} className="mr-1" />
                                  {new Date(quote.createdAt).toLocaleDateString()}
                                </div>
                              )}
                              
                              <button
                                onClick={() => setExpandedQuoteId(expandedQuoteId === quote.id ? null : quote.id as number)}
                                className={`px-3 py-1 text-xs rounded-full ${
                                  expandedQuoteId === quote.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                              >
                                {expandedQuoteId === quote.id ? 'Hide Details' : 'View Details'}
                              </button>
                            </div>
                          </div>
                          
                          {expandedQuoteId === quote.id && (
                            <div className="mt-4 bg-gray-700/30 p-4 rounded-md">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <h5 className="text-xs text-gray-400 mb-1">Project Type</h5>
                                  <p className="text-gray-300">{quote.projectType || 'Not specified'}</p>
                                </div>
                                <div>
                                  <h5 className="text-xs text-gray-400 mb-1">Budget</h5>
                                  <p className="text-gray-300">{quote.budget || 'Not specified'}</p>
                                </div>
                                <div>
                                  <h5 className="text-xs text-gray-400 mb-1">Timeline</h5>
                                  <p className="text-gray-300">{quote.timeline || 'Not specified'}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-xs text-gray-400 mb-1">Project Description</h5>
                                <p className="text-gray-300 whitespace-pre-wrap">{quote.description || 'No description provided'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Contact Messages */}
            {activeTab === 'messages' && (
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-700/50 border-b border-gray-700">
                  <h3 className="font-semibold">All Contact Messages ({filteredMessages.length})</h3>
                </div>
                <div>
                  {filteredMessages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {messages.length === 0 ? 'No messages yet' : 'No matching messages found'}
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-700">
                      {filteredMessages.map((msg, index) => (
                        <div key={index} className="p-4 hover:bg-gray-700/20">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-200">{msg.name}</h4>
                              <div className="text-sm text-gray-400 mt-1">
                                <span>{msg.email}</span>
                              </div>
                            </div>
                            
                            {msg.createdAt && (
                              <div className="text-xs text-gray-500 flex items-center mt-2 sm:mt-0">
                                <Clock size={12} className="mr-1" />
                                {formatDate(msg.createdAt)}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-2 text-gray-300 whitespace-pre-wrap bg-gray-700/30 p-3 rounded-md">
                            {msg.message}
                          </div>
                          
                          <div className="mt-2 flex justify-end">
                            <a 
                              href={`mailto:${msg.email}?subject=Re: Your message to TechPoa&body=Hello ${msg.name},\n\nThank you for reaching out to us.\n\n`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 text-xs bg-blue-700 text-white rounded hover:bg-blue-600"
                            >
                              <Mail size={12} className="mr-1" />
                              Reply via Email
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;