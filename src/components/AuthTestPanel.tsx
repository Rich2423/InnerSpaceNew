"use client";
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthTestPanel() {
  const { user, session, signInWithGoogle, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch {
      setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Auth Test Panel</h3>
      
      <div className="space-y-3">
        <div className="text-xs">
          <div className="font-medium">User:</div>
          <div className="text-gray-600 break-all">
            {user ? user.email : 'Not signed in'}
          </div>
        </div>

        <div className="text-xs">
          <div className="font-medium">Provider:</div>
          <div className="text-gray-600">
            {user?.app_metadata?.provider || 'None'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {!user ? (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Test Google Sign In'}
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          )}
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="text-xs text-gray-500">
          <div>Session: {session ? 'Active' : 'None'}</div>
          <div>User ID: {user?.id || 'None'}</div>
        </div>
      </div>
    </div>
  );
} 