"use client";
import React, { useState } from 'react';
import { signInWithPassword, signUpWithPassword } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isSignUp) {
        const result = await signUpWithPassword(
          formData.email, 
          formData.password, 
          formData.username
        );
        
        if (result.user && !result.session) {
          setSuccessMessage('Please check your email to confirm your account before signing in.');
        } else {
          setSuccessMessage('Account created successfully!');
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1500);
        }
      } else {
        const result = await signInWithPassword(formData.email, formData.password);
        if (result.user) {
          setSuccessMessage('Signed in successfully!');
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccessMessage('');
    setFormData({ email: '', password: '', username: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative border border-gray-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-xl"
          type="button"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to InnerSpace
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => !isSignUp && toggleMode()}
              className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
                !isSignUp 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={() => isSignUp && toggleMode()}
              className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
                isSignUp 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-900 text-green-300 rounded-lg text-sm border border-green-700">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-300 rounded-lg text-sm border border-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-600 rounded-lg 
                         bg-gray-700 text-white placeholder-gray-400
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-colors duration-200"
              placeholder="Enter your email"
            />
          </div>

          {/* Username Field (Sign Up Only) */}
          {isSignUp && (
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-white mb-2"
              >
                Username (Optional)
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg 
                           bg-gray-700 text-white placeholder-gray-400
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           transition-colors duration-200"
                placeholder="Choose a username"
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg 
                         bg-gray-700 text-white placeholder-gray-400
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-colors duration-200"
              placeholder="Enter your password"
            />
            {isSignUp && (
              <p className="mt-1 text-xs text-gray-400">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
                       disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed
                       text-white font-medium py-3 px-4 rounded-lg 
                       transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100
                       focus:ring-4 focus:ring-purple-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Toggle between Sign In and Sign Up */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
            type="button"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              <span>Your data is encrypted and secure</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
              <span>You can delete your account anytime</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></div>
              <span>We never share your personal information</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
              <span>Your journal entries are private and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 