// src/app/login/page.tsx
'use client';
import axios from 'axios';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleforgotpassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/forgotpassword');
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  // try {
  //   // Simulate API authentication call
  //   await new Promise(resolve => setTimeout(resolve, 1500));
    
  //   // Example: Check credentials (replace with actual API call)
  //   if (formData.username && formData.password) {
  //     console.log('Login successful:', { username: formData.username, rememberMe });
      
  //     // Navigate to admin dashboard
  //     router.push('/AdminDashboard');
  //   } else {
  //     throw new Error('Invalid credentials');
  //   }
    
  // } catch (err) {
  //   setError('Invalid username or password. Please try again.');
  //   setIsLoading(false);
  // }
  // Note: Don't set isLoading to false here if navigation is successful
  // as the component will unmount during navigation


try {
  const response = await axios.post("http://localhost:5000/api/login", {
    email: formData.username,
    password: formData.password,
  });

  // Success
  const data = response.data;
  localStorage.setItem("token", data.token);
  router.push("/AdminDashboard");

} catch (err: any) {
  // Axios error
  setError(err.response?.data?.message || "Invalid username or password.");
  setIsLoading(false);
}


};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-5xl relative z-10">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Horizontal Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-12 text-white flex flex-col justify-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-full">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="Government of India" 
                    className="h-16 w-16"
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-center">RecycLens</h1>
              <p className="text-xl text-center mb-6 text-green-50">Municipal Corporation Portal</p>
              <p className="text-center text-green-100">
                AI-Driven Civic Waste Intelligence for sustainable urban development
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Shield className="mr-3" size={24} />
                  <span>Secure Authentication</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-3" size={24} />
                  <span>Role-Based Access</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-3" size={24} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Employee Login
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your credentials to access the portal
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username / Employee ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400" size={20} />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                      placeholder="Enter your username"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-400" size={20} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                      placeholder="Enter your password"
                      required
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      suppressHydrationWarning
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      suppressHydrationWarning
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    onClick={handleforgotpassword}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition shadow-lg disabled:opacity-50"
                  suppressHydrationWarning
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Help Section */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Need help accessing your account?
                </p>
                <a href="/contact-support" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Contact IT Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>© 2025 Municipal Corporation. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgb(34 197 94 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 197 94 / 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
