"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Lock, Eye, Database, Globe, Server, ShieldCheck, Bell, Key, User, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    section1: true, // Keep the first section open by default
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl"></div>
        
        {/* Digital pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Lock className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Privacy Policy</h1>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 mb-8 backdrop-blur-sm">
            <p className="text-blue-200">
              Last Updated: March 15, 2025
            </p>
            <p className="mt-4 text-gray-300">
              At TechPoa Connect, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </div>
          
          <div className="space-y-6">
            {renderSection(
              "section1",
              "1. Information We Collect",
              <Database className="h-5 w-5" />,
              <>
                <p>
                  We collect various types of information to provide and improve our services to you. Information we may collect includes:
                </p>
                <div className="mt-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-300">1.1 Personal Information</h4>
                    <p className="mt-1">
                      When you register for an account, we collect information such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Password (stored in encrypted form)</li>
                      <li>Profile information (such as profile picture, bio, skills, interests)</li>
                      <li>Your role (student, instructor, developer, or client)</li>
                      <li>Payment information (handled securely through our payment processors)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">1.2 Usage Data</h4>
                    <p className="mt-1">
                      We automatically collect information about how you interact with our services, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>IP address</li>
                      <li>Device and browser information</li>
                      <li>Pages viewed and actions taken on our platform</li>
                      <li>Time spent on pages</li>
                      <li>Referring website or source</li>
                      <li>Course progress and completion data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">1.3 Content Information</h4>
                    <p className="mt-1">
                      We collect and store information related to content you create, submit, or engage with:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Comments, reviews, and forum posts</li>
                      <li>Course materials (for instructors)</li>
                      <li>Project details and requirements (for development services)</li>
                      <li>Communication with other users</li>
                      <li>Feedback and survey responses</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">1.4 Cookies and Tracking Technologies</h4>
                    <p className="mt-1">
                      We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. These technologies help us analyze website traffic, customize content, and improve your experience.
                    </p>
                  </div>
                </div>
              </>
            )}
            
            {renderSection(
              "section2",
              "2. How We Use Your Information",
              <Eye className="h-5 w-5" />,
              <>
                <p>
                  We use your information for various purposes to provide, maintain, and improve our services:
                </p>
                <div className="mt-3 space-y-3">
                  <p>
                    <strong className="text-blue-200">2.1 To Provide and Maintain Our Services:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Creating and managing your account</li>
                    <li>Providing access to courses and educational content</li>
                    <li>Processing payments and transactions</li>
                    <li>Delivering software development and consultancy services</li>
                    <li>Facilitating communication between users</li>
                    <li>Providing customer support</li>
                  </ul>
                  
                  <p>
                    <strong className="text-blue-200">2.2 To Improve and Personalize User Experience:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Analyzing usage patterns to improve our services</li>
                    <li>Personalizing content and recommendations</li>
                    <li>Measuring the effectiveness of features and content</li>
                    <li>Developing new products, services, and features</li>
                    <li>Testing and troubleshooting new features</li>
                  </ul>
                  
                  <p>
                    <strong className="text-blue-200">2.3 For Marketing and Communication:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Sending transactional emails (e.g., registration confirmation, course updates)</li>
                    <li>Sending marketing communications (if you&apos;ve opted in)</li>
                    <li>Providing updates about new features, courses, or services</li>
                    <li>Conducting surveys and collecting feedback</li>
                  </ul>
                  
                  <p>
                    <strong className="text-blue-200">2.4 For Safety, Security, and Legal Compliance:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Protecting against unauthorized access and fraud</li>
                    <li>Enforcing our Terms of Service</li>
                    <li>Verifying identity when necessary</li>
                    <li>Complying with legal obligations</li>
                    <li>Resolving disputes</li>
                  </ul>
                </div>
              </>
            )}
            
            {renderSection(
              "section3",
              "3. How We Share Your Information",
              <Globe className="h-5 w-5" />,
              <>
                <p>
                  We may share your information in the following circumstances:
                </p>
                <div className="mt-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-300">3.1 Service Providers</h4>
                    <p className="mt-1">
                      We share information with third-party service providers who perform services on our behalf, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Payment processors</li>
                      <li>Cloud hosting providers</li>
                      <li>Analytics services</li>
                      <li>Customer support services</li>
                      <li>Email service providers</li>
                    </ul>
                    <p className="mt-2">
                      These providers are contractually obligated to use your information only as necessary to provide services to us.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">3.2 Within the Community</h4>
                    <p className="mt-1">
                      Certain information may be visible to other users of TechPoa Connect:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Profile information (name, photo, bio, skills) as set in your privacy settings</li>
                      <li>Public content you post (comments, forum posts, reviews)</li>
                      <li>Instructor information for those teaching courses</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">3.3 Business Transfers</h4>
                    <p className="mt-1">
                      If TechPoa Connect is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">3.4 Legal Requirements</h4>
                    <p className="mt-1">
                      We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency). We may also disclose information to:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>Enforce our Terms of Service</li>
                      <li>Protect and defend our rights or property</li>
                      <li>Prevent or investigate possible wrongdoing</li>
                      <li>Protect the personal safety of users or the public</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
            
            {renderSection(
              "section4",
              "4. Data Security",
              <ShieldCheck className="h-5 w-5" />,
              <>
                <p>
                  Protecting your information is a priority for us. We implement appropriate technical and organizational measures to safeguard your personal information:
                </p>
                <div className="mt-3 space-y-3">
                  <p>
                    <strong className="text-blue-200">4.1 Security Measures:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls limiting employee access to personal data</li>
                    <li>Secure authentication mechanisms</li>
                    <li>Regular monitoring for potential vulnerabilities</li>
                    <li>Data backup procedures</li>
                  </ul>
                  
                  <p>
                    <strong className="text-blue-200">4.2 Limitations:</strong>
                  </p>
                  <p>
                    While we strive to protect your information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data. You are responsible for maintaining the security of your account credentials and for any activities that occur under your account.
                  </p>
                  
                  <p>
                    <strong className="text-blue-200">4.3 Data Breach Procedures:</strong>
                  </p>
                  <p>
                    In the event of a data breach that affects your personal information, we will notify you in compliance with applicable laws. We have procedures in place to respond to suspected data breaches, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Identifying and addressing the cause</li>
                    <li>Assessing the nature and scope of the breach</li>
                    <li>Notifying affected users and relevant authorities when required</li>
                    <li>Taking steps to mitigate potential harm</li>
                  </ul>
                </div>
              </>
            )}
            
            {renderSection(
              "section5",
              "5. Your Privacy Rights",
              <Key className="h-5 w-5" />,
              <>
                <p>
                  Depending on your location, you may have various rights regarding your personal information:
                </p>
                <div className="mt-3 space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-300">5.1 Access and Portability</h4>
                    <p className="mt-1">
                      You can request a copy of your personal information that we hold. In some jurisdictions, you may also have the right to receive this information in a structured, commonly used, and machine-readable format.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">5.2 Correction</h4>
                    <p className="mt-1">
                      You can update or correct inaccurate information we have about you. Many settings can be adjusted directly in your account settings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">5.3 Deletion</h4>
                    <p className="mt-1">
                      You can request that we delete your personal information in certain circumstances. Note that we may retain certain information as required by law or for legitimate business purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">5.4 Restriction and Objection</h4>
                    <p className="mt-1">
                      You may have the right to restrict or object to our processing of your personal data in certain circumstances.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">5.5 Consent Withdrawal</h4>
                    <p className="mt-1">
                      Where we process data based on your consent, you have the right to withdraw that consent at any time.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-300">5.6 Exercising Your Rights</h4>
                    <p className="mt-1">
                      To exercise your privacy rights, please contact us at privacy@techpoa.com. We will respond to your request within the timeframe required by applicable law (typically within 30 days). We may ask for verification of your identity before fulfilling requests.
                    </p>
                  </div>
                </div>
              </>
            )}
            
            {renderSection(
              "section6",
              "6. International Data Transfers",
              <Server className="h-5 w-5" />,
              <>
                <p>
                  TechPoa Connect operates globally, which means your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country.
                </p>
                <p className="mt-3">
                  When we transfer personal information across borders, we take steps to ensure that your information receives an adequate level of protection:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Using approved data transfer mechanisms such as Standard Contractual Clauses</li>
                  <li>Ensuring our service providers maintain appropriate security measures</li>
                  <li>Storing data in regions with strong data protection laws when possible</li>
                </ul>
                <p className="mt-3">
                  By using our services, you acknowledge and consent to the transfer of your information to countries outside your country of residence, including to the United States, where our primary servers are located.
                </p>
              </>
            )}
            
            {renderSection(
              "section7",
              "7. Children's Privacy",
              <User className="h-5 w-5" />,
              <>
                <p>
                  TechPoa Connect is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at privacy@techpoa.com.
                </p>
                <p className="mt-3">
                  If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we take steps to remove that information from our servers.
                </p>
              </>
            )}
            
            {renderSection(
              "section8",
              "8. Changes to This Policy",
              <Bell className="h-5 w-5" />,
              <>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Posting a notice on our website</li>
                  <li>Sending an email to the address associated with your account</li>
                  <li>Displaying a notification when you log into our services</li>
                </ul>
                <p className="mt-3">
                  We encourage you to review our Privacy Policy periodically. The &quot;Last Updated&quot; date at the top of this policy indicates when it was last revised. Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the changes.
                </p>
              </>
            )}
            
            {renderSection(
              "section9",
              "9. Contact Us",
              <Mail className="h-5 w-5" />,
              <>
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-3 bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
                  <p>Email: <a href="mailto:privacy@techpoa.com" className="text-blue-400 hover:text-blue-300">privacy@techpoa.com</a></p>
                  <p className="mt-1">Address: TechPoa Connect, P.O Box 12345-00100, Nairobi, Kenya</p>
                  <p className="mt-1">Phone: +254 716 687 177</p>
                </div>
                <p className="mt-3">
                  We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.
                </p>
              </>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              By using TechPoa Connect, you consent to our privacy practices as described in this Privacy Policy.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/terms" 
                className="px-6 py-2 bg-blue-800/50 hover:bg-blue-700/60 transition-colors rounded-md text-white font-medium border border-blue-700/50"
              >
                Terms of Service
              </Link>
              <Link 
                href="/support" 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}