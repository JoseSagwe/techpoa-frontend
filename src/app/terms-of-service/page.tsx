"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Shield, FileText, ScrollText, Users, AlertTriangle, BookOpen, Code } from "lucide-react";

export default function TermsOfService() {
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
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center">Terms of Service</h1>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-5 mb-8 backdrop-blur-sm">
            <p className="text-blue-200">
              Last Updated: March 15, 2025
            </p>
            <p className="mt-4 text-gray-300">
              Welcome to TechPoa Connect. These Terms of Service govern your use of our website, services, and products. 
              By accessing or using TechPoa Connect, you agree to be bound by these terms. Please read them carefully.
            </p>
          </div>
          
          <div className="space-y-6">
            {renderSection(
              "section1",
              "1. Introduction and Acceptance",
              <FileText className="h-5 w-5" />,
              <>
                <p>
                  These Terms of Service ("Terms") are a legal agreement between you and TechPoa Connect ("we," "us," or "our") that govern your use of the TechPoa Connect platform, including our website at techpoa.com, mobile applications, APIs, and all related services, features, content, and products (collectively, the "Services").
                </p>
                <p className="mt-3">
                  By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
                </p>
                <p className="mt-3">
                  We may modify these Terms at any time at our sole discretion. If we do so, we will notify you by posting the updated Terms on our website and changing the "Last Updated" date above. Your continued use of the Services after any such change constitutes your acceptance of the new Terms.
                </p>
              </>
            )}
            
            {renderSection(
              "section2",
              "2. User Accounts and Registration",
              <Users className="h-5 w-5" />,
              <>
                <p>
                  <strong>2.1 Account Creation:</strong> To access certain features of our Services, you must create an account. When you create an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="mt-3">
                  <strong>2.2 Account Types:</strong> We offer different types of accounts, including student, instructor, developer, and client accounts. Each account type may have specific terms, features, and requirements.
                </p>
                <p className="mt-3">
                  <strong>2.3 Account Security:</strong> You are responsible for maintaining the security of your account and password. You agree to notify us immediately of any unauthorized access to or use of your account. We cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
                </p>
                <p className="mt-3">
                  <strong>2.4 Age Restrictions:</strong> You must be at least 16 years old to create an account. If you are under 18, you represent that you have your parent or guardian's permission to use the Services and that they have read and agree to these Terms on your behalf.
                </p>
                <p className="mt-3">
                  <strong>2.5 Account Termination:</strong> We reserve the right to suspend or terminate your account and access to the Services at our discretion, without notice, for conduct that we determine violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </>
            )}
            
            {renderSection(
              "section3",
              "3. Service Usage and Restrictions",
              <ScrollText className="h-5 w-5" />,
              <>
                <p>
                  <strong>3.1 Permitted Use:</strong> Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Services for your personal or internal business purposes.
                </p>
                <p className="mt-3">
                  <strong>3.2 Prohibited Activities:</strong> You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Use the Services in any way that violates any applicable law or regulation</li>
                  <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity</li>
                  <li>Engage in any automated use of the system, such as using scripts or bots to access, "scrape," or download content</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services</li>
                  <li>Interfere with or disrupt the operation of the Services or servers or networks connected to the Services</li>
                  <li>Post or transmit any content that is unlawful, fraudulent, threatening, abusive, defamatory, obscene, or otherwise objectionable</li>
                  <li>Share account credentials with others or allow others to access your account</li>
                  <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without our express permission</li>
                </ul>
                <p className="mt-3">
                  <strong>3.3 Intellectual Property:</strong> The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by TechPoa Connect, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </>
            )}
            
            {renderSection(
              "section4",
              "4. Course and Content Policies",
              <BookOpen className="h-5 w-5" />,
              <>
                <p>
                  <strong>4.1 Course Enrollment:</strong> By enrolling in a course, you agree to pay all applicable fees. Course fees are non-refundable except as described in our refund policy. We reserve the right to modify course pricing at any time.
                </p>
                <p className="mt-3">
                  <strong>4.2 Access to Course Content:</strong> When you enroll in a course, we grant you a limited, non-exclusive, non-transferable license to access and view the course content for your personal, non-commercial, educational purposes. You may not share your account or course access with others.
                </p>
                <p className="mt-3">
                  <strong>4.3 Instructor Content:</strong> Instructors are responsible for the content they provide. TechPoa Connect does not control or guarantee the quality, accuracy, or reliability of instructor content. We may review course content, but we are not obligated to do so.
                </p>
                <p className="mt-3">
                  <strong>4.4 User-Generated Content:</strong> You may have the opportunity to submit content to the Services, such as posting comments, reviews, or participating in discussions. You retain ownership of any content you submit, but you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with the Services.
                </p>
                <p className="mt-3">
                  <strong>4.5 Content Restrictions:</strong> You agree not to post or transmit any content that:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Infringes on intellectual property rights of others</li>
                  <li>Contains unlawful, defamatory, threatening, pornographic, harassing, or otherwise objectionable material</li>
                  <li>Contains personal or identifying information about another person without their explicit consent</li>
                  <li>Contains viruses, malware, or other harmful code</li>
                  <li>Constitutes unauthorized advertising, spam, or solicitation</li>
                </ul>
                <p className="mt-3">
                  <strong>4.6 Removal of Content:</strong> We reserve the right to remove any content that violates these Terms or that we find objectionable for any reason, without notice.
                </p>
              </>
            )}
            
            {renderSection(
              "section5",
              "5. Software Development and Consultancy Services",
              <Code className="h-5 w-5" />,
              <>
                <p>
                  <strong>5.1 Project Agreements:</strong> Software development and consultancy services will be governed by separate project agreements that specify project scope, deliverables, timelines, and payment terms. These Terms apply to such services except where explicitly superseded by a project agreement.
                </p>
                <p className="mt-3">
                  <strong>5.2 Intellectual Property in Custom Solutions:</strong> Unless otherwise specified in a project agreement, the client will own the custom code and solutions developed specifically for them, but TechPoa Connect retains ownership of pre-existing code, frameworks, and tools used in the development process.
                </p>
                <p className="mt-3">
                  <strong>5.3 Client Responsibilities:</strong> Clients are responsible for providing timely feedback, approvals, and any required content or information needed to complete projects. Delays caused by clients may affect project timelines and costs.
                </p>
                <p className="mt-3">
                  <strong>5.4 Payment for Services:</strong> Payment terms for development and consultancy services will be specified in the project agreement. Unless otherwise stated, invoices are due upon receipt.
                </p>
                <p className="mt-3">
                  <strong>5.5 Warranty for Services:</strong> We warrant that the services will be performed in a professional and workmanlike manner. This warranty is valid for 30 days following the completion of services. Our sole obligation for any breach of this warranty will be to re-perform the services at no additional cost.
                </p>
              </>
            )}
            
            {renderSection(
              "section6",
              "6. Payment and Refund Policies",
              <FileText className="h-5 w-5" />,
              <>
                <p>
                  <strong>6.1 Payment Methods:</strong> We accept various payment methods as specified on our payment page. You agree to provide accurate and complete payment information.
                </p>
                <p className="mt-3">
                  <strong>6.2 Course Refunds:</strong> For courses, we offer a 14-day money-back guarantee from the date of purchase, provided you have not completed more than 25% of the course. To request a refund, contact us at support@techpoa.com.
                </p>
                <p className="mt-3">
                  <strong>6.3 Consultancy and Development Refunds:</strong> Refund policies for consultancy and development services are specified in the project agreement. In general, deposits are non-refundable once work has commenced.
                </p>
                <p className="mt-3">
                  <strong>6.4 Taxes:</strong> Prices displayed do not include taxes unless explicitly stated. You are responsible for paying all applicable taxes.
                </p>
                <p className="mt-3">
                  <strong>6.5 Subscription Services:</strong> For subscription-based services, you will be billed in advance on a recurring basis. You can cancel your subscription at any time, but no refunds will be issued for partial subscription periods.
                </p>
              </>
            )}
            
            {renderSection(
              "section7",
              "7. Privacy and Data Protection",
              <Shield className="h-5 w-5" />,
              <>
                <p>
                  <strong>7.1 Privacy Policy:</strong> Our Privacy Policy, available at <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">techpoa.com/privacy-policy</Link>, describes how we collect, use, and share your personal information. By using our Services, you agree to our collection and use of information as described in the Privacy Policy.
                </p>
                <p className="mt-3">
                  <strong>7.2 Data Security:</strong> We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="mt-3">
                  <strong>7.3 User Data:</strong> You retain ownership of any data you provide to us. You grant us a license to use this data to provide and improve our Services.
                </p>
                <p className="mt-3">
                  <strong>7.4 Cookies:</strong> We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookies through your browser settings.
                </p>
              </>
            )}
            
            {renderSection(
              "section8",
              "8. Limitation of Liability",
              <AlertTriangle className="h-5 w-5" />,
              <>
                <p>
                  <strong>8.1 Disclaimer of Warranties:</strong> THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mt-3">
                  <strong>8.2 Limitation of Liability:</strong> TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL TECHPOA CONNECT, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
                  <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
                  <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
                  <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
                </ul>
                <p className="mt-3">
                  <strong>8.3 Cap on Liability:</strong> OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO THE AMOUNT YOU PAID US TO USE THE SERVICES (OR, IF WE CHOOSE, TO PROVIDING YOU THE SERVICES AGAIN).
                </p>
                <p className="mt-3">
                  <strong>8.4 Application:</strong> THE LIMITATIONS OF THIS SECTION WILL APPLY TO ANY THEORY OF LIABILITY, WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, AND WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE.
                </p>
                <p className="mt-3">
                  <strong>8.5 Exclusions:</strong> SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, WHICH MEANS THAT SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN THESE JURISDICTIONS, TECHPOA CONNECT'S LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.
                </p>
              </>
            )}
            
            {renderSection(
              "section9",
              "9. Dispute Resolution",
              <Users className="h-5 w-5" />,
              <>
                <p>
                  <strong>9.1 Governing Law:</strong> These Terms and any disputes arising out of or related to these Terms or the Services will be governed by the laws of Kenya, without regard to its conflict of law provisions.
                </p>
                <p className="mt-3">
                  <strong>9.2 Dispute Resolution:</strong> Any dispute arising from or relating to these Terms or the Services shall first be resolved through good-faith negotiations. If such negotiations fail, the dispute will be resolved through arbitration in accordance with the rules of the Nairobi Centre for International Arbitration.
                </p>
                <p className="mt-3">
                  <strong>9.3 Exceptions:</strong> Nothing in this section will prevent either party from seeking injunctive relief in a court of competent jurisdiction to prevent irreparable harm pending the outcome of arbitration.
                </p>
                <p className="mt-3">
                  <strong>9.4 Time Limitation:</strong> Any claim arising out of or related to these Terms or the Services must be filed within one year after such claim arose, otherwise, the claim is permanently barred.
                </p>
              </>
            )}
            
            {renderSection(
              "section10",
              "10. Miscellaneous Provisions",
              <FileText className="h-5 w-5" />,
              <>
                <p>
                  <strong>10.1 Entire Agreement:</strong> These Terms constitute the entire agreement between you and TechPoa Connect regarding the Services and supersede all prior agreements and understandings, whether written or oral.
                </p>
                <p className="mt-3">
                  <strong>10.2 Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.
                </p>
                <p className="mt-3">
                  <strong>10.3 Assignment:</strong> You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null. We may freely assign or transfer these Terms without restriction.
                </p>
                <p className="mt-3">
                  <strong>10.4 No Waiver:</strong> The failure of TechPoa Connect to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                </p>
                <p className="mt-3">
                  <strong>10.5 Force Majeure:</strong> We will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, riots, civil unrest, government action, labor disputes, or Internet service disruptions.
                </p>
                <p className="mt-3">
                  <strong>10.6 Contact:</strong> If you have any questions about these Terms, please contact us at legal@techpoa.com.
                </p>
              </>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              By using TechPoa Connect, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/privacy-policy" 
                className="px-6 py-2 bg-blue-800/50 hover:bg-blue-700/60 transition-colors rounded-md text-white font-medium border border-blue-700/50"
              >
                Privacy Policy
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