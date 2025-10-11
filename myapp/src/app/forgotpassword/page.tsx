// src/app/forgot-password/page.tsx
'use client';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Enter ID, 2: Enter OTP, 3: New Password
  const [empId, setEmpId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // // Handle Step 1: Request OTP
  // const handleRequestOTP = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     // Simulate API call to send OTP
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Add your OTP request logic here
  //     console.log('Requesting OTP for:', empId);
      
  //     setStep(2); // Move to OTP verification step
  //   } catch (err) {
  //     setError('Failed to send OTP. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Handle Step 2: Verify OTP
  // const handleVerifyOTP = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     // Simulate API call to verify OTP
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Add your OTP verification logic here
  //     console.log('Verifying OTP:', otp);
      
  //     setStep(3); // Move to password reset step
  //   } catch (err) {
  //     setError('Invalid OTP. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Handle Step 3: Reset Password
  // const handleResetPassword = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   // Validate passwords match
  //   if (newPassword !== confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }

  //   // Validate password strength (optional)
  //   if (newPassword.length < 8) {
  //     setError('Password must be at least 8 characters long');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     // Simulate API call to reset password
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Add your password reset logic here
  //     console.log('Resetting password for:', empId);
      
  //     // Show success popup
  //     setShowSuccessPopup(true);
      
  //     // Redirect to login after 4 seconds
  //     setTimeout(() => {
  //       router.push('/login');
  //     }, 4000);
      
  //   } catch (err) {
  //     setError('Failed to reset password. Please try again.');
  //     setIsLoading(false);
  //   }
  // };



// Step 1: Request OTP

const handleRequestOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:5000/api/forgot-password", {
      email: empId, // backend me email field
    });

    console.log(response.data.message); // OTP sent successfully
    setStep(2); // move to OTP step

  } catch (err: any) {
    console.error(err.response?.data?.message || err.message);
    setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

// Step 2: Verify OTP
const handleVerifyOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:5000/api/forgot-password/verify-otp", {
      email: empId,
      otp: otp,
    });

    console.log(response.data.message); // OTP verified successfully
    setStep(3); // move to Reset Password step

  } catch (err: any) {
    console.error(err.response?.data?.message || err.message);
    setError(err.response?.data?.message || "Invalid OTP. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

// Step 3: Reset Password
const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  // Optional: Validate password strength
  if (newPassword.length < 8) {
    setError('Password must be at least 8 characters long');
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:5000/api/forgot-password/reset-password", {
      email: empId,
      newPassword,
      confirmPassword,
    });

    console.log(response.data.message); // Password reset successfully
    setShowSuccessPopup(true);

    // Redirect to login after 4 seconds
    setTimeout(() => router.push('/login'), 4000);

  } catch (err: any) {
    console.error(err.response?.data?.message || err.message);
    setError(err.response?.data?.message || "Failed to reset password. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link href="/login" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Login
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Lock className="text-green-600" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600 text-sm">
              {step === 1 && 'Enter your Employee ID to receive an OTP'}
              {step === 2 && 'Enter the OTP sent to your registered email'}
              {step === 3 && 'Create a new password for your account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Enter Employee ID */}
          {step === 1 && (
            <form onSubmit={handleRequestOTP} className="space-y-5">
              <div>
                <label htmlFor="empId" className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="empId"
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Enter your employee ID"
                    required
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 shadow-md"
                suppressHydrationWarning
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                  suppressHydrationWarning
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  OTP sent to your registered email
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 shadow-md"
                suppressHydrationWarning
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => handleRequestOTP({ preventDefault: () => {} } as React.FormEvent)}
                className="w-full text-green-600 text-sm hover:text-green-700 transition"
              >
                Resend OTP
              </button>
            </form>
          )}

          {/* Step 3: Enter New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Enter new password"
                    required
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    suppressHydrationWarning
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Confirm new password"
                    required
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    suppressHydrationWarning
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 shadow-md"
                suppressHydrationWarning
              >
                {isLoading ? 'Saving...' : 'Save Password'}
              </button>
            </form>
          )}

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>© 2025 Municipal Corporation. All rights reserved.</p>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="text-green-600" size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-4">Password reset successfully</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgb(34 197 94 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 197 94 / 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
