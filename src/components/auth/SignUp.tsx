"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  EyeOff, 
  Eye, 
  CheckCircle, 
  BookOpen, 
  Code, 
  Users, 
  Briefcase,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldCheck
} from "lucide-react";

// Define user role types
type UserRole = "student" | "instructor" | "developer" | "client";

// Define form steps
type FormStep = "personal" | "role" | "profile" | "verification";

export default function SignUp() {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole,
    bio: "",
    interests: [] as string[],
    skills: [] as string[],
    agreeToTerms: false,
    subscribeToNewsletter: false
  });

  // State for form progression
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  // Interest options
  const interestOptions = [
    "Web Development", "Mobile Apps", "Data Science", "AI & Machine Learning",
    "Cybersecurity", "DevOps", "Cloud Computing", "Blockchain", "IoT",
    "UI/UX Design", "Game Development"
  ];

  // Skill options (shown based on selected role)
  const skillOptions = {
    student: ["Beginner", "Intermediate", "Advanced"],
    instructor: ["Teaching", "Curriculum Development", "Assessment", "Mentoring"],
    developer: ["Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Data Engineering"],
    client: ["Project Management", "Business Analysis", "Product Ownership"]
  };

  // Password requirements
  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "At least one uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "At least one number", test: (pw: string) => /[0-9]/.test(pw) },
    { label: "At least one special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) }
  ];

  // Check if the verification code is complete
  const isVerificationCodeComplete = () => {
    return verificationCode.every(digit => digit !== "");
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    
    // Clear role error if it exists
    if (errors.role) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.role;
        return newErrors;
      });
    }
  };

  // Handle interest selection
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return { ...prev, interests: newInterests };
    });
  };

  // Handle skill selection
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      return { ...prev, skills: newSkills };
    });
  };

  // Handle verification code input
  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle key down on verification inputs (for backspace navigation)
  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignUp = () => {
    setIsSubmitting(true);
    // Here you would typically redirect to your OAuth provider
    setTimeout(() => {
      window.location.href = "/api/auth/google";
    }, 500);
  };

  // Validate the current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === "personal") {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain at least one uppercase letter";
      else if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain at least one number";
      else if (!/[^A-Za-z0-9]/.test(formData.password)) newErrors.password = "Password must contain at least one special character";
      
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    if (currentStep === "role" && !formData.role) {
      newErrors.role = "Please select a role";
    }
    
    if (currentStep === "verification" && !isVerificationCodeComplete()) {
      newErrors.verificationCode = "Please enter the full 6-digit code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (!validateStep()) return;
    
    if (currentStep === "personal") setCurrentStep("role");
    else if (currentStep === "role") setCurrentStep("profile");
    else if (currentStep === "profile") {
      setCurrentStep("verification");
      // Simulate verification code being sent
      setVerificationSent(false);
      setTimeout(() => {
        setVerificationSent(true);
      }, 1500);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep === "role") setCurrentStep("personal");
    else if (currentStep === "profile") setCurrentStep("role");
    else if (currentStep === "verification") setCurrentStep("profile");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For verification step, check if code is complete
    if (currentStep === "verification") {
      if (!validateStep()) return;
      
      setIsSubmitting(true);
      
      // Simulate API call to verify code and complete registration
      setTimeout(() => {
        // Redirect to dashboard or welcome page after successful signup
        window.location.href = "/dashboard";
      }, 1500);
      
      return;
    }
    
    goToNextStep();
  };

  // Render password requirements
  const renderPasswordRequirements = () => {
    if (!showPasswordRequirements && !formData.password) return null;
    
    return (
      <div className="mt-2 rounded-md bg-gray-800/50 p-3 border border-gray-700 text-xs">
        <div className="font-medium text-blue-300 mb-2 flex items-center">
          <ShieldCheck className="h-4 w-4 mr-1" />
          Password Requirements
        </div>
        <ul className="space-y-1">
          {passwordRequirements.map((req, idx) => {
            const isMet = formData.password ? req.test(formData.password) : false;
            return (
              <li key={idx} className="flex items-center">
                {isMet ? (
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                ) : (
                  <X className="h-3 w-3 mr-1.5 text-gray-500" />
                )}
                <span className={isMet ? "text-gray-300" : "text-gray-500"}>
                  {req.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // Render password strength indicator
  const renderPasswordStrength = () => {
    if (!formData.password) return null;
    
    let strength = 0;
    let message = "";
    
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    
    switch (strength) {
      case 0:
      case 1:
        message = "Weak";
        break;
      case 2:
        message = "Fair";
        break;
      case 3:
        message = "Good";
        break;
      case 4:
        message = "Strong";
        break;
      default:
        message = "";
    }
    
    return (
      <div className="mt-1">
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              strength <= 1 ? 'bg-red-500' : 
              strength === 2 ? 'bg-yellow-500' : 
              strength === 3 ? 'bg-blue-500' : 'bg-green-500'
            } transition-all duration-300`} 
            style={{ width: `${strength * 25}%` }}
          ></div>
        </div>
        <p className={`text-xs mt-1 flex items-center ${
          strength <= 1 ? 'text-red-500' : 
          strength === 2 ? 'text-yellow-500' : 
          strength === 3 ? 'text-blue-400' : 'text-green-500'
        }`}>
          {strength <= 1 && <AlertCircle className="h-3 w-3 mr-1" />}
          {strength >= 3 && <CheckCircle2 className="h-3 w-3 mr-1" />}
          {message}
        </p>
      </div>
    );
  };

  // Render progress bar
  const renderProgressBar = () => {
    const steps = ["personal", "role", "profile", "verification"];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;
    
    return (
      <div className="w-full mb-8">
        <div className="relative">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <div className={`flex flex-col items-center ${currentIndex >= 0 ? 'text-blue-400' : ''}`}>
              <span className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                currentIndex > 0 ? 'bg-blue-500 text-white' : 
                currentIndex === 0 ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-700'
              }`}>
                {currentIndex > 0 && <CheckCircle2 className="h-3 w-3" />}
                {currentIndex === 0 && <span className="text-xs">1</span>}
              </span>
              <span>Personal</span>
            </div>
            <div className={`flex flex-col items-center ${currentIndex >= 1 ? 'text-blue-400' : ''}`}>
              <span className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                currentIndex > 1 ? 'bg-blue-500 text-white' : 
                currentIndex === 1 ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-700'
              }`}>
                {currentIndex > 1 && <CheckCircle2 className="h-3 w-3" />}
                {currentIndex === 1 && <span className="text-xs">2</span>}
              </span>
              <span>Role</span>
            </div>
            <div className={`flex flex-col items-center ${currentIndex >= 2 ? 'text-blue-400' : ''}`}>
              <span className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                currentIndex > 2 ? 'bg-blue-500 text-white' : 
                currentIndex === 2 ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-700'
              }`}>
                {currentIndex > 2 && <CheckCircle2 className="h-3 w-3" />}
                {currentIndex === 2 && <span className="text-xs">3</span>}
              </span>
              <span>Profile</span>
            </div>
            <div className={`flex flex-col items-center ${currentIndex >= 3 ? 'text-blue-400' : ''}`}>
              <span className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                currentIndex > 3 ? 'bg-blue-500 text-white' : 
                currentIndex === 3 ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-700'
              }`}>
                {currentIndex === 3 && <span className="text-xs">4</span>}
              </span>
              <span>Verify</span>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <div className="space-y-4">
            {/* Google Sign Up Button - Only on first step */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group"
              >
               <Image 
                src="/google.svg" 
                alt="Google logo" 
                width={20}
                height={20}
                className="mr-2" 
              />
                Sign up with Google
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/60 text-gray-400">
                    Or sign up with email
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-blue-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 bg-gray-800/60 text-white rounded-md border ${
                      errors.firstName ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="John"
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-blue-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 bg-gray-800/60 text-white rounded-md border ${
                      errors.lastName ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                    placeholder="Doe"
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 pl-10 bg-gray-800/60 text-white rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                  placeholder="john.doe@example.com"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-blue-300">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                  className={`w-full p-3 pl-10 pr-10 bg-gray-800/60 text-white rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {renderPasswordStrength()}
              {renderPasswordRequirements()}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-blue-300">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-3 pl-10 pr-10 bg-gray-800/60 text-white rounded-md border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-blue-700/50 focus:border-blue-500'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-300">
                    I agree to the <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</Link> and <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="subscribeToNewsletter"
                    name="subscribeToNewsletter"
                    type="checkbox"
                    checked={formData.subscribeToNewsletter}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="subscribeToNewsletter" className="text-gray-300">
                    Subscribe to our newsletter for updates and promotional offers
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "role":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-blue-300">
              Select Your Primary Role
            </h3>
            <p className="text-gray-400 text-center mb-6">
              This will help us personalize your experience on TechPoa Connect
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              <button
                type="button"
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all ${
                  formData.role === "student" 
                    ? "border-blue-500 bg-blue-900/40 shadow-md shadow-blue-500/20" 
                    : "border-blue-800/50 bg-gray-800/40 hover:bg-gray-800/80 hover:border-blue-700 hover:shadow-md hover:shadow-blue-500/10"
                }`}
                onClick={() => handleRoleSelect("student")}
              >
                <div className={`p-3 rounded-full mb-2 ${formData.role === "student" ? "bg-blue-800/50" : "bg-gray-800/50"}`}>
                  <BookOpen size={30} className={formData.role === "student" ? "text-blue-400" : "text-gray-400"} />
                </div>
                <h4 className="mt-1 font-medium text-lg">Student</h4>
                <p className="mt-1 text-sm text-center text-gray-400">
                  Learn new skills and grow your tech career
                </p>
              </button>
              
              <button
                type="button"
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all ${
                  formData.role === "instructor" 
                    ? "border-blue-500 bg-blue-900/40 shadow-md shadow-blue-500/20" 
                    : "border-blue-800/50 bg-gray-800/40 hover:bg-gray-800/80 hover:border-blue-700 hover:shadow-md hover:shadow-blue-500/10"
                }`}
                onClick={() => handleRoleSelect("instructor")}
              >
                <div className={`p-3 rounded-full mb-2 ${formData.role === "instructor" ? "bg-blue-800/50" : "bg-gray-800/50"}`}>
                  <Users size={30} className={formData.role === "instructor" ? "text-blue-400" : "text-gray-400"} />
                </div>
                <h4 className="mt-1 font-medium text-lg">Instructor</h4>
                <p className="mt-1 text-sm text-center text-gray-400">
                  Share your knowledge and teach courses
                </p>
              </button>
              
              <button
                type="button"
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all ${
                  formData.role === "developer" 
                    ? "border-blue-500 bg-blue-900/40 shadow-md shadow-blue-500/20" 
                    : "border-blue-800/50 bg-gray-800/40 hover:bg-gray-800/80 hover:border-blue-700 hover:shadow-md hover:shadow-blue-500/10"
                }`}
                onClick={() => handleRoleSelect("developer")}
              >
                <div className={`p-3 rounded-full mb-2 ${formData.role === "developer" ? "bg-blue-800/50" : "bg-gray-800/50"}`}>
                  <Code size={30} className={formData.role === "developer" ? "text-blue-400" : "text-gray-400"} />
                </div>
                <h4 className="mt-1 font-medium text-lg">Developer</h4>
                <p className="mt-1 text-sm text-center text-gray-400">
                  Work on projects and collaborate with teams
                </p>
              </button>
              
              <button
                type="button"
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all ${
                  formData.role === "client" 
                    ? "border-blue-500 bg-blue-900/40 shadow-md shadow-blue-500/20" 
                    : "border-blue-800/50 bg-gray-800/40 hover:bg-gray-800/80 hover:border-blue-700 hover:shadow-md hover:shadow-blue-500/10"
                }`}
                onClick={() => handleRoleSelect("client")}
              >
                <div className={`p-3 rounded-full mb-2 ${formData.role === "client" ? "bg-blue-800/50" : "bg-gray-800/50"}`}>
                  <Briefcase size={30} className={formData.role === "client" ? "text-blue-400" : "text-gray-400"} />
                </div>
                <h4 className="mt-1 font-medium text-lg">Client</h4>
                <p className="mt-1 text-sm text-center text-gray-400">
                  Hire developers and get your projects done
                </p>
              </button>
            </div>
            
            {errors.role && (
              <p className="text-red-500 text-sm text-center mt-4">{errors.role}</p>
            )}
          </div>
        );
      
      case "profile":
        return (
          <div className="space-y-5">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1 text-blue-300">
                Brief Bio <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Tell us a little about yourself..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">
                Tech Interests <span className="text-gray-500">(select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      formData.interests.includes(interest)
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            
            {formData.role && (
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-300">
                  Skills & Experience <span className="text-gray-500">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions[formData.role].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        formData.skills.includes(skill)
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Almost there!
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  In the next step, we&apos;ll send a verification code to your email to confirm your account.
                </p>
              </div>
            </div>
          </div>
        );
      
      case "verification":
        return (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 mb-2 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 animate-pulse"></div>
              <Mail className="h-8 w-8 text-blue-400 relative z-10" />
            </div>
            
            <h3 className="text-xl font-semibold text-blue-300">
              Email Verification
            </h3>
            
            <p className="text-gray-400">
              We&apos;ve sent a 6-digit verification code to
              <strong className="block mt-1 text-white">{formData.email}</strong>
            </p>
            
            <div className="my-6">
              {!verificationSent ? (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-gray-400">Sending verification code...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={verificationCode[index]}
                        onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                        className="w-12 h-14 text-center text-lg font-bold bg-gray-800/60 text-white rounded-md border border-blue-700/50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="0"
                      />
                    ))}
                  </div>
                  
                  {errors.verificationCode && (
                    <p className="text-red-500 text-sm mt-2">{errors.verificationCode}</p>
                  )}
                  
                  <p className="text-sm text-gray-400 mt-4">
                    Didn&apos;t receive the code? 
                    <button 
                      type="button"
                      className="ml-1 text-blue-400 hover:text-blue-300 focus:outline-none transition-colors"
                      onClick={() => {
                        // Simulate resending code
                        setVerificationSent(false);
                        setTimeout(() => setVerificationSent(true), 1500);
                      }}
                    >
                      Resend
                    </button>
                  </p>
                </>
              )}
            </div>
            
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-left">
              <h4 className="font-medium text-blue-300 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                What&apos;s Next?
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                After verifying your email, you&apos;ll be able to access all TechPoa Connect features, including courses, community forums, and development projects.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Tech-inspired decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit pattern background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2px, transparent 0)`, 
          backgroundSize: '50px 50px' 
        }}></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 relative z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-36">
              {/* Logo background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-lg blur-sm group-hover:blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Logo content */}
              <div className="relative px-3 py-1 bg-indigo-900/80 backdrop-blur-sm rounded-lg border border-purple-500/40 group-hover:border-blue-400/50 transition-colors duration-300">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
                  Tech<span className="text-blue-400 relative">
                    Poa
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 animate-typewriter"></span>
                  </span>
                </h1>
                <style jsx>{`
                  @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .animate-gradient-x {
                    background-size: 200% auto;
                    animation: gradient-shift 3s ease infinite;
                  }
                  @keyframes typewriter {
                    0% { width: 0; }
                    50% { width: 100%; }
                    90% { opacity: 1; }
                    95% { opacity: 0; }
                    100% { opacity: 1; width: 100%; }
                  }
                  .animate-typewriter {
                    animation: typewriter 3.5s ease-in-out infinite;
                  }
                `}</style>
              </div>
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="bg-gray-900/60 backdrop-blur-sm py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-blue-800/50">
          {renderProgressBar()}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex items-center justify-between pt-4">
              {currentStep !== "personal" ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border border-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting || (currentStep === "verification" && !isVerificationCodeComplete())}
                className={`inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  currentStep === "verification" 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting || (currentStep === "verification" && !isVerificationCodeComplete()) ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {currentStep === "verification" ? "Complete Sign Up" : "Continue"}
                    {currentStep !== "verification" && <ArrowRight className="w-4 h-4 ml-2" />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer with additional information */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center text-xs text-gray-400">
        <p className="mb-2">
          By creating an account, you agree to our <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">Terms</Link>,
          <Link href="/privacy" className="mx-1 text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</Link> and 
          <Link href="/cookies" className="ml-1 text-blue-400 hover:text-blue-300 transition-colors">Cookie Policy</Link>
        </p>
        <p>
          Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}