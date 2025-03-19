"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  Cookie, 
  Settings, 
  Info, 
  X, 
  AlertTriangle,
  Lock,
  Eye,
  Clock,
  ListFilter,
  Database,
  ExternalLink,
  FileCode,
  Globe,
  Mail
} from "lucide-react";

// Cookie types with detailed information
interface CookieType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
  necessary: boolean;
}

// Cookie provider with details
interface CookieProvider {
  name: string;
  purpose: string;
  cookies: string[];
  expiry: string;
  link: string;
}

export default function CookiePolicy() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    section1: true, // Keep the first section open by default
  });
  const [isVisible, setIsVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });
  const [showCookieManager, setShowCookieManager] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Load saved preferences if available
    const savedPreferences = localStorage.getItem('techpoa_cookie_preferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const cookieTypes: CookieType[] = [
    {
      id: "necessary",
      name: "Necessary Cookies",
      icon: <Lock className="h-5 w-5" />,
      description: "These cookies are essential for the proper functioning of our website. They enable core functionality such as security, network management, and account access. You cannot disable these cookies without affecting site functionality.",
      examples: ["session_id", "csrf_token", "auth_token"],
      necessary: true
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      icon: <Eye className="h-5 w-5" />,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website and measure the effectiveness of our marketing campaigns.",
      examples: ["_ga", "_gid", "_gat", "analytics_session_id"],
      necessary: false
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      icon: <Globe className="h-5 w-5" />,
      description: "These cookies are used to track visitors across websites. They are set to display targeted advertisements that are relevant and engaging for individual users, and thereby more valuable for publishers and third-party advertisers.",
      examples: ["_fbp", "_gcl_au", "ads_conversion_id"],
      necessary: false
    },
    {
      id: "preferences",
      name: "Preference Cookies",
      icon: <Settings className="h-5 w-5" />,
      description: "These cookies enable our website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in. They help provide enhanced, more personal features.",
      examples: ["user_language", "theme_preference", "sidebar_collapsed"],
      necessary: false
    }
  ];

  const cookieProviders: CookieProvider[] = [
    {
      name: "Google Analytics",
      purpose: "Web analytics service to track and report website traffic",
      cookies: ["_ga", "_gid", "_gat"],
      expiry: "Up to 2 years",
      link: "https://policies.google.com/privacy"
    },
    {
      name: "Facebook Pixel",
      purpose: "Advertising and analytics service to measure ad effectiveness",
      cookies: ["_fbp", "fr"],
      expiry: "Up to 3 months",
      link: "https://www.facebook.com/policy.php"
    },
    {
      name: "TechPoa Connect",
      purpose: "Essential site functionality and user preferences",
      cookies: ["session_id", "csrf_token", "user_preferences"],
      expiry: "Session to 1 year",
      link: "/privacy-policy"
    },
    {
      name: "Cloudflare",
      purpose: "Security and performance optimization",
      cookies: ["__cfduid", "__cf_bm"],
      expiry: "Up to 30 days",
      link: "https://www.cloudflare.com/privacypolicy/"
    },
    {
      name: "Stripe",
      purpose: "Payment processing",
      cookies: ["__stripe_mid", "__stripe_sid"],
      expiry: "Session to 1 year",
      link: "https://stripe.com/privacy"
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const saveCookiePreferences = () => {
    localStorage.setItem('techpoa_cookie_preferences', JSON.stringify(cookiePreferences));
    setShowCookieManager(false);
    // In a real implementation, you would also update cookie settings here
  };

  const toggleCookieType = (type: string) => {
    if (type === "necessary") return; // Necessary cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const acceptAllCookies = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    // Save immediately when accepting all
    localStorage.setItem('techpoa_cookie_preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }));
    setShowCookieManager(false);
  };

  const renderSection = (id: string, title: string, icon: React.ReactNode, content: React.ReactNode) => (
    <div className="border border-blue-800/30 rounded-lg mb-4 overflow-hidden bg-blue-900/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-700/50">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <div className="text-blue-400">{icon}</div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {openSections[id] ? (
          <ChevronUp className="h-5 w-5 text-blue-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-400" />
        )}
      </button>
      <div
        className={`px-4 pb-4 transition-all duration-300 ease-in-out overflow-hidden ${
          openSections[id] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-blue-800/30 pt-4 text-gray-300 space-y-3">
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
        
        {/* Circuit pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Cookie className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Cookie Policy</h1>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 mb-8 backdrop-blur-sm">
            <p className="text-blue-200">
              Last Updated: March 19, 2025
            </p>
            <p className="mt-4 text-gray-300">
              This Cookie Policy explains how TechPoa Connect ("we", "us", or "our") uses cookies and similar technologies 
              to recognize, understand, and facilitate your browsing experience when you visit our website. It explains what 
              these technologies are, why we use them, and your rights to control our use of them.
            </p>
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setShowCookieManager(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Cookie Preferences
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {renderSection(
              "section1",
              "1. What Are Cookies?",
              <Cookie className="h-5 w-5" />,
              <>
                <p>
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies help provide a better and more personalized experience.
                </p>
                <p className="mt-3">
                  Cookies may be either "persistent" cookies or "session" cookies:
                </p>
                <div className="ml-4 mt-2 space-y-2">
                  <div className="flex">
                    <div className="text-blue-400 mr-2 mt-1"><Clock className="h-4 w-4" /></div>
                    <div>
                      <p className="font-medium text-blue-300">Persistent cookies</p>
                      <p className="text-sm">Remain on your device after you close your browser until they expire or are deleted. They help websites remember your preferences for future visits.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="text-blue-400 mr-2 mt-1"><Clock className="h-4 w-4" /></div>
                    <div>
                      <p className="font-medium text-blue-300">Session cookies</p>
                      <p className="text-sm">Exist temporarily while you browse our website and expire when you close your browser. They help our site function correctly during your visit.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3">
                  Cookies can be set by the website you are visiting (first-party cookies) or by other websites that provide content on the page you are viewing (third-party cookies). For example, we may include content from social media platforms on our website, and those platforms may set their own cookies when you interact with that content.
                </p>
              </>
            )}
            
            {renderSection(
              "section2",
              "2. How We Use Cookies",
              <Settings className="h-5 w-5" />,
              <>
                <p>
                  We use cookies for several reasons. Some cookies are necessary for technical reasons for our website to operate, while others are used to enhance your experience. Here's how we use different types of cookies:
                </p>
                <div className="mt-4 space-y-6">
                  {cookieTypes.map(type => (
                    <div key={type.id} className="bg-blue-900/40 border border-blue-800/30 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="text-blue-400 mr-3 mt-1">{type.icon}</div>
                        <div>
                          <h4 className="font-medium text-blue-300 flex items-center">
                            {type.name}
                            {type.necessary && (
                              <span className="ml-2 text-xs font-normal bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full">Required</span>
                            )}
                          </h4>
                          <p className="mt-1 text-sm text-gray-300">{type.description}</p>
                          <div className="mt-2">
                            <p className="text-xs font-medium text-blue-300">Examples:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {type.examples.map(example => (
                                <span key={example} className="text-xs px-2 py-0.5 bg-blue-950/50 border border-blue-900 rounded-md text-gray-300">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {renderSection(
              "section3",
              "3. Cookie Providers",
              <Database className="h-5 w-5" />,
              <>
                <p>
                  We work with various third-party services that set cookies on our website. Below is a list of the main cookie providers, the purpose of their cookies, and links to their privacy policies:
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-900/40 text-left">
                        <th className="px-4 py-2 border-b border-blue-800">Provider</th>
                        <th className="px-4 py-2 border-b border-blue-800">Purpose</th>
                        <th className="px-4 py-2 border-b border-blue-800">Cookies</th>
                        <th className="px-4 py-2 border-b border-blue-800">Expiry</th>
                        <th className="px-4 py-2 border-b border-blue-800">More Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieProviders.map((provider, index) => (
                        <tr 
                          key={provider.name} 
                          className={`${index % 2 === 0 ? 'bg-blue-950/30' : 'bg-blue-900/20'} hover:bg-blue-800/30 transition-colors`}
                        >
                          <td className="px-4 py-3 border-b border-blue-800/50 font-medium">{provider.name}</td>
                          <td className="px-4 py-3 border-b border-blue-800/50 text-sm">{provider.purpose}</td>
                          <td className="px-4 py-3 border-b border-blue-800/50 text-sm">
                            <div className="flex flex-wrap gap-1">
                              {provider.cookies.map(cookie => (
                                <span key={cookie} className="text-xs px-1.5 py-0.5 bg-blue-900/40 rounded-md">
                                  {cookie}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 border-b border-blue-800/50 text-sm">{provider.expiry}</td>
                          <td className="px-4 py-3 border-b border-blue-800/50">
                            <a 
                              href={provider.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm"
                            >
                              Privacy Policy
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            
            {renderSection(
              "section4",
              "4. Managing Your Cookie Preferences",
              <ListFilter className="h-5 w-5" />,
              <>
                <p>
                  You have the right to decide whether to accept or reject cookies (except for necessary cookies, which are required for the operation of our website). You can manage your cookie preferences in several ways:
                </p>
                <div className="mt-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-300">Through our Cookie Manager</h4>
                    <p className="mt-1 text-sm">
                      You can use our cookie manager to customize your cookie preferences for our website:
                    </p>
                    <button 
                      className="mt-2 bg-blue-800/50 hover:bg-blue-800 transition-colors text-sm px-3 py-1 rounded-md flex items-center"
                      onClick={() => setShowCookieManager(true)}
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Open Cookie Manager
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">Browser Settings</h4>
                    <p className="mt-1 text-sm">
                      Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                      <li><span className="text-blue-300">Chrome:</span> Settings → Privacy and security → Cookies and other site data</li>
                      <li><span className="text-blue-300">Firefox:</span> Options → Privacy & Security → Cookies and Site Data</li>
                      <li><span className="text-blue-300">Safari:</span> Preferences → Privacy → Cookies and website data</li>
                      <li><span className="text-blue-300">Edge:</span> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">Third-Party Opt-Out Tools</h4>
                    <p className="mt-1 text-sm">
                      Some third parties provide ways to opt out of their cookies across all websites:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                      <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Google Analytics Opt-out Browser Add-on</a></li>
                      <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Network Advertising Initiative Opt-out Tool</a></li>
                      <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Your Online Choices (European Interactive Digital Advertising Alliance)</a></li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 flex">
                    <div className="text-yellow-500 mr-3 mt-1"><AlertTriangle className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-medium text-blue-300">Important Note</h4>
                      <p className="mt-1 text-sm">
                        Please be aware that restricting cookies may impact the functionality of our website. If you reject or delete certain cookies, you might not be able to use all features of our website or services. For example, you might need to provide consent or set preferences again if you delete cookies that remember these settings.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {renderSection(
              "section5",
              "5. Other Tracking Technologies",
              <FileCode className="h-5 w-5" />,
              <>
                <p>
                  In addition to cookies, we use other technologies to collect information from your device:
                </p>
                <div className="mt-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-300">Web Beacons</h4>
                    <p className="mt-1 text-sm">
                      Also known as "clear GIFs" or "pixel tags," these small graphic images are embedded invisibly on web pages and in emails. They help us understand whether content has been viewed and measure the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">Local Storage Objects</h4>
                    <p className="mt-1 text-sm">
                      These are pieces of data that websites store on your device. They can be used to enhance your experience and remember site preferences, similar to cookies but often with larger storage capacity.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">Session Replay</h4>
                    <p className="mt-1 text-sm">
                      We may use session replay services to record user interactions with our website to identify usability issues and improve site functionality. This information is anonymized and doesn't include personal data.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">Device Fingerprinting</h4>
                    <p className="mt-1 text-sm">
                      This technique collects information about your device, such as browser type, screen resolution, operating system, and language preferences to create a unique profile. It helps with fraud prevention and enhancing security.
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  You can manage these technologies similarly to cookies through your browser settings or through our Cookie Manager.
                </p>
              </>
            )}
            
            {renderSection(
              "section6",
              "6. Changes to Our Cookie Policy",
              <Info className="h-5 w-5" />,
              <>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated "Last Updated" date. For significant changes, we may provide additional notice, such as a banner on our website or an email notification.
                </p>
                <p className="mt-3">
                  We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and other tracking technologies. Your continued use of our website after any changes to this Cookie Policy constitutes your acceptance of the changes.
                </p>
              </>
            )}
            
            {renderSection(
              "section7",
              "7. Contact Us",
              <Mail className="h-5 w-5" />,
              <>
                <p>
                  If you have questions or concerns about our Cookie Policy or our use of cookies and other tracking technologies, please contact us:
                </p>
                <div className="mt-3 bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
                  <p>Email: <a href="mailto:privacy@techpoa.com" className="text-blue-400 hover:text-blue-300">privacy@techpoa.com</a></p>
                  <p className="mt-1">Address: TechPoa Connect, P.O Box 12345-00100, Nairobi, Kenya</p>
                  <p className="mt-1">Phone: +254 716 687 177</p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              By continuing to use our website, you acknowledge that you've read and understood our Cookie Policy.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/privacy-policy" 
                className="px-6 py-2 bg-blue-800/50 hover:bg-blue-700/60 transition-colors rounded-md text-white font-medium border border-blue-700/50"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="px-6 py-2 bg-blue-800/50 hover:bg-blue-700/60 transition-colors rounded-md text-white font-medium border border-blue-700/50"
              >
                Terms of Service
              </Link>
              <button 
                onClick={() => setShowCookieManager(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
              >
                Manage Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cookie Preference Manager Modal */}
      {showCookieManager && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-blue-800/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-blue-900 flex justify-between items-center">
              <div className="flex items-center">
                <Cookie className="h-5 w-5 text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
              </div>
              <button 
                onClick={() => setShowCookieManager(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <p className="text-gray-300">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
              
              <div className="space-y-4 mt-6">
                {cookieTypes.map(type => (
                  <div 
                    key={type.id} 
                    className={`p-4 rounded-lg border ${
                      cookiePreferences[type.id as keyof typeof cookiePreferences] 
                        ? 'bg-blue-900/40 border-blue-700/60' 
                        : 'bg-gray-800/40 border-gray-700/60'
                    } transition-colors`}
                  >
                    <div className="flex items-start">
                      <div 
                        onClick={() => toggleCookieType(type.id)}
                        className={`cursor-pointer flex-shrink-0 w-12 h-6 rounded-full p-1 transition-colors ${
                          cookiePreferences[type.id as keyof typeof cookiePreferences] 
                            ? 'bg-blue-600' 
                            : 'bg-gray-700'
                        } ${type.necessary ? 'opacity-60' : 'hover:bg-gray-600'}`}
                      >
                        <div 
                          className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${
                            cookiePreferences[type.id as keyof typeof cookiePreferences] ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></div>
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white flex items-center text-sm">
                            {type.name}
                            {type.necessary && (
                              <span className="ml-2 text-xs font-normal bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                          </h4>
                          {cookiePreferences[type.id as keyof typeof cookiePreferences] ? (
                            <span className="text-xs font-medium text-blue-400">Enabled</span>
                          ) : (
                            <span className="text-xs font-medium text-gray-500">Disabled</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mt-6">
                <div className="flex">
                  <div className="text-yellow-500 mr-3 mt-1"><Info className="h-5 w-5" /></div>
                  <div>
                    <h4 className="font-medium text-blue-300">About This Tool</h4>
                    <p className="mt-1 text-sm text-gray-300">
                      This cookie manager allows you to customize your cookie preferences for our website. Please note that necessary cookies cannot be disabled as they are essential for the website to function properly. You can change your preferences at any time by clicking the "Manage Cookies" button at the bottom of our website.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 mt-6 border-t border-gray-800">
                <button
                  onClick={() => setShowCookieManager(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-gray-300"
                >
                  Cancel
                </button>
                <div className="space-x-3">
                  <button
                    onClick={saveCookiePreferences}
                    className="px-4 py-2 border border-blue-600 text-blue-400 hover:bg-blue-900/30 rounded-md transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={acceptAllCookies}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}