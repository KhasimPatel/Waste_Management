// page.tsx
'use client';
// In src/app/page.tsx

import React, { useState } from 'react';
import { Eye, EyeOff, Trash2, MapPin, Camera, BarChart3, Users, Shield, Phone, Mail, MapPinned } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecycLensLanding() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const router = useRouter();

   const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Government of India Emblem" 
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">RecycLens</h1>
              <p className="text-xs text-gray-600">AI-Driven Civic Waste Intelligence</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="login"
              className="text-gray-700 hover:text-green-600 transition"
              onClick={handleLoginClick}
            >
              Login
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition">About</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 transition">Features</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Banner Section */}
    <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-32 min-h-[500px]">
  <div className="absolute inset-0 bg-black opacity-10"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-5.5xl">
        Smart Waste Management for Cleaner Cities
      </h2>
      <p className="text-lg md:text-xl mb-8 text-green-50 max-w-2xl leading-relaxed">
        Leveraging AI-powered image verification and intelligent routing to optimize waste collection, 
        improve civic services, and build sustainable urban environments.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/login" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition shadow-lg">
          Access Portal
        </a>
        <a href="#features" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>



      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About RecycLens</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            RecycLens is a smart AI-based waste management platform made for city corporations. It helps improve how cities handle waste by using image recognition, real-time GPS tracking, and smart worker management. With RecycLens, cities can keep their surroundings cleaner and healthier.

            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
             Our system allows citizens to report waste by uploading photos from their phones. It automatically checks and classifies the reports, then sends sanitation workers to the right places quickly. This smart, data-based method helps reduce response time, use resources better, and involve citizens in creating cleaner, greener communities.

            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Camera className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Image Verification</h3>
              <p className="text-gray-600">
                Advanced Gemini API-powered image analysis automatically verifies and classifies waste reports, 
                ensuring data accuracy and preventing false submissions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">GPS Location Tracking</h3>
              <p className="text-gray-600">
                Precise geolocation data enables accurate waste mapping and efficient routing of sanitation personnel 
                to exact problem areas across the municipality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Intelligent Workforce Routing</h3>
              <p className="text-gray-600">
                Smart algorithms dynamically allocate sanitation workers based on waste density, priority levels, 
                and real-time availability for optimal coverage.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Analytics Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive visualization of waste management metrics, response times, and workforce productivity 
                for data-driven decision making.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Data Management</h3>
              <p className="text-gray-600">
                Enterprise-grade security with MongoDB database integration and Firebase authentication ensures 
                citizen privacy and data integrity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automated Waste Reporting</h3>
              <p className="text-gray-600">
                Citizens can easily report waste issues through mobile apps with automated categorization, 
                priority assignment, and acknowledgment notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-100">Verification Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45%</div>
              <div className="text-green-100">Faster Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Citizen Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">60%</div>
              <div className="text-green-100">Resource Optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">1800-XXX-XXXX</p>
              <p className="text-gray-600">+91-XX-XXXX-XXXX</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">support@recyclens.gov.in</p>
              <p className="text-gray-600">info@municipal.gov.in</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinned className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Office</h3>
              <p className="text-gray-600">Municipal Corporation</p>
              <p className="text-gray-600">City Center, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">RecycLens</h4>
              <p className="text-sm text-gray-400">
                AI-Driven Civic Waste Intelligence for sustainable urban development and efficient municipal services.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
                <li><a href="#about" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#features" className="hover:text-green-400 transition">Features</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Waste Reporting</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Worker Management</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Analytics Dashboard</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Citizen Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Accessibility</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Sitemap</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 Municipal Corporation. All rights reserved. | Powered by RecycLens
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-green-400 transition">
                  National Portal of India
                </a>
                <span className="text-gray-600">|</span>
                <p className="text-sm text-gray-400">Last Updated: October 2025</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
