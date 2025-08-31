import React from "react";
import { 
  Brain, 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  Zap,
  Heart,
  Globe,
  Code,
  MessageSquare,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI technology analyzes your responses and provides personalized feedback to help you improve."
    },
    {
      icon: Code,
      title: "Real Coding Challenges",
      description: "Practice with actual coding problems in multiple programming languages with live code execution."
    },
    {
      icon: MessageSquare,
      title: "Voice & Video Recording",
      description: "Simulate real interview conditions with voice recording and video preview capabilities."
    },
    {
      icon: TrendingUp,
      title: "Detailed Feedback",
      description: "Get comprehensive feedback on each question with specific improvement suggestions."
    },
    {
      icon: Target,
      title: "Role-Specific Questions",
      description: "Customized questions based on your target role, company, and uploaded resume."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is secure and private. We prioritize your privacy and data protection."
    }
  ];

  const stats = [
    { number: "10K+", label: "Mock Interviews Conducted" },
    { number: "85%", label: "Success Rate in Real Interviews" },
    { number: "50+", label: "Technical Roles Covered" },
    { number: "24/7", label: "Available Practice Time" }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#012A4A] via-[#013A5A] to-[#024B6F] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Revolutionizing
              <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Interview Preparation
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Empowering job seekers with AI-driven mock interviews that provide real-time feedback and personalized improvement plans.
            </p>
            <div className="flex items-center justify-center gap-4 text-blue-200">
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Brain size={60} className="text-blue-300 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Code size={80} className="text-cyan-300 animate-bounce" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#012A4A] rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that everyone deserves the opportunity to showcase their skills confidently in interviews. 
                Our AI-powered platform democratizes access to high-quality interview preparation, making it affordable 
                and accessible to job seekers everywhere.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Personalized Learning</h4>
                    <p className="text-gray-600">Tailored feedback based on your specific role and experience level</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Real-World Simulation</h4>
                    <p className="text-gray-600">Authentic interview experience with actual company-style questions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Continuous Improvement</h4>
                    <p className="text-gray-600">Track your progress and see measurable improvements over time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Lightbulb size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Innovation First</h3>
                    <p className="text-blue-100">Cutting-edge AI technology</p>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  "We're not just building another interview prep tool. We're creating an intelligent mentor 
                  that understands your unique strengths and guides you toward success."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with proven interview methodologies to give you the edge you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#012A4A] to-[#024B6F] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <Brain size={40} className="mx-auto mb-3" />
                  <h4 className="font-bold mb-2">AI Analysis</h4>
                  <p className="text-sm text-blue-100">Advanced natural language processing</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <Zap size={40} className="mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Real-time</h4>
                  <p className="text-sm text-purple-100">Instant feedback and scoring</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <Shield size={40} className="mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Secure</h4>
                  <p className="text-sm text-green-100">Enterprise-grade security</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <Award size={40} className="mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Proven</h4>
                  <p className="text-sm text-orange-100">Adaptive difficulty </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Powered by Advanced AI Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our platform leverages state-of-the-art artificial intelligence to provide you with the most 
                accurate and helpful interview preparation experience available.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#012A4A] rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Google Gemini AI for intelligent question analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#012A4A] rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Real-time code execution and evaluation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#012A4A] rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700">Adaptive difficulty based on your performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}