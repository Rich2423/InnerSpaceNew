"use client";
import React from 'react';
import DailyCheckIn from '../components/DailyCheckIn';
import FreeWriting from '../components/FreeWriting';
import YourStory from '../components/YourStory';
import NeedHelp from '../components/NeedHelp';
import AuthModal from '../components/AuthModal';
import UserProfile from '../components/UserProfile';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMessage, setAuthMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Handle URL parameters for auth messages
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    
    if (success === 'email_confirmed') {
      setAuthMessage({ type: 'success', text: 'Email confirmed successfully! Welcome to InnerSpace!' });
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
    } else if (error) {
      let errorText = 'Authentication failed. Please try again.';
      if (error === 'auth_failed') errorText = 'Authentication failed. Please try again.';
      else if (error === 'session_failed') errorText = 'Session setup failed. Please sign in again.';
      else if (error === 'no_session') errorText = 'No active session. Please sign in again.';
      else if (error === 'unexpected') errorText = 'An unexpected error occurred. Please try again.';
      
      setAuthMessage({ type: 'error', text: errorText });
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading InnerSpace...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              InnerSpace
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/journal" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Journal
              </Link>
              <Link 
                href="/sage" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sage
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Profile
              </Link>
              <Link 
                href="/progress" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Progress
              </Link>
              <Link 
                href="/wellness" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Wellness
              </Link>
              <Link 
                href="/data" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Data
              </Link>
              <Link 
                href="/donations" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Support Us
              </Link>
              
              {/* Auth Section */}
              {user ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  type="button"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-8 px-4">
        {/* Auth Message */}
        {authMessage && (
          <div className={`max-w-md mx-auto mb-6 p-4 rounded-lg ${
            authMessage.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {authMessage.text}
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-white mb-2">
          {user ? `Welcome back, ${user.user_metadata?.username || 'friend'}!` : 'Welcome to InnerSpace'}
        </h1>
        <p className="text-lg text-gray-300">
          {user ? 'Your private space to reflect and grow' : 'Your private space to reflect and grow'}
        </p>
        {!user && (
          <button
            onClick={() => setShowAuthModal(true)}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            type="button"
          >
            Get Started
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Today's Check-In - Main Feature */}
        <section className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Today's Check-In</h2>
          <DailyCheckIn />
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Free Writing */}
          <section className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Write Freely</h2>
            <FreeWriting />
          </section>

          {/* Your Story */}
          <section className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Story</h2>
            <YourStory />
          </section>
        </div>

        {/* Need Help - Small, Accessible */}
        <div className="mt-6">
          <NeedHelp />
        </div>
      </div>

      {/* Auth Modal */}
      {/* Updated: Google OAuth removed, Supabase connection restored */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
    </main>
  );
}