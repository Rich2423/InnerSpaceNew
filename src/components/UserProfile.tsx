"use client";
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  const getUserDisplayName = () => {
    if (user.user_metadata?.username) {
      return user.user_metadata.username;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'Anonymous User';
  };

  const isAnonymous = user.app_metadata?.provider === 'anonymous';

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        type="button"
      >
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {getUserDisplayName().charAt(0).toUpperCase()}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-800">{getUserDisplayName()}</div>
          <div className="text-xs text-gray-500">
            {isAnonymous ? 'Anonymous Mode' : user.email}
          </div>
        </div>
        <div className="text-gray-400">▼</div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-800">{getUserDisplayName()}</div>
            <div className="text-xs text-gray-500">
              {isAnonymous ? 'Anonymous Mode' : user.email}
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              📊 View Profile
            </button>
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={() => setShowDropdown(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              🔒 Privacy
            </button>
          </div>

          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              type="button"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 