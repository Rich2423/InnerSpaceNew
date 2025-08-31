"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

function getProfileStats() {
  let totalEntries = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let totalWords = 0;
  const moods = { Happy: 0, Calm: 0, Okay: 0, Sad: 0, Anxious: 0, Angry: 0 };
  
  if (typeof window === 'undefined') return { totalEntries, currentStreak, longestStreak, totalWords, moods };
  
  const keys = Object.keys(localStorage);
  const today = new Date();
  
  // Calculate total entries and words
  keys.forEach(key => {
    if (key.startsWith('innerspace_')) {
      // Skip theme and quote settings as they're not JSON
      if (key === 'innerspace_theme' || key === 'innerspace_favorite_quote') {
        return;
      }
      
      totalEntries++;
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.content) {
          totalWords += data.content.split(' ').length;
        }
        if (data.mood) {
          moods[data.mood as keyof typeof moods]++;
        }
      } catch (error) {
        console.warn('Failed to parse localStorage data for key:', key, error);
        // Skip this entry if JSON parsing fails
      }
    }
  });
  
  // Calculate streaks
  let tempStreak = 0;
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = `innerspace_checkin_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    const writingKey = `innerspace_writing_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    
    if (localStorage.getItem(key) || localStorage.getItem(writingKey)) {
      tempStreak++;
      if (i === 0) currentStreak = tempStreak;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 0;
    }
  }
  
  return { totalEntries, currentStreak, longestStreak, totalWords, moods };
}

function getRecentEntries() {
  const entries: Array<{
    date: Date;
    mood: string;
    reflection: string;
    content: string;
    type: string;
  }> = [];
  const today = new Date();
  
  if (typeof window === 'undefined') return entries;
  
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const checkinKey = `innerspace_checkin_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    const writingKey = `innerspace_writing_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    
    const checkinData = localStorage.getItem(checkinKey);
    const writingData = localStorage.getItem(writingKey);
    
    if (checkinData || writingData) {
      try {
        const checkin = checkinData ? JSON.parse(checkinData) : {};
        const writing = writingData ? JSON.parse(writingData) : {};
        
        entries.push({
          date: checkDate,
          mood: checkin.mood || 'No mood',
          reflection: checkin.reflection || '',
          content: writing.content || '',
          type: checkin.mood ? 'checkin' : 'writing'
        });
      } catch (error) {
        console.warn('Failed to parse localStorage data for recent entries:', error);
        // Skip this entry if JSON parsing fails
      }
    }
  }
  
  return entries.reverse();
}

export default function ProfileSection() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState(getProfileStats());
  const [recentEntries, setRecentEntries] = useState(getRecentEntries());
  const [favoriteQuote, setFavoriteQuote] = useState('');
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setStats(getProfileStats());
    setRecentEntries(getRecentEntries());
    
    // Load saved quote from localStorage
    const savedQuote = localStorage.getItem('innerspace_favorite_quote');
    if (savedQuote) {
      setFavoriteQuote(savedQuote);
    }
  }, []);

  const handleSaveQuote = () => {
    localStorage.setItem('innerspace_favorite_quote', favoriteQuote);
    setIsEditingQuote(false);
  };



  // Debug: Check authentication state
  console.log('ProfileSection - User:', user);
  console.log('ProfileSection - Loading:', loading);
  console.log('ProfileSection - User metadata:', user?.user_metadata);

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      'Happy': '😊',
      'Calm': '😌',
      'Okay': '😐',
      'Sad': '😔',
      'Anxious': '😰',
      'Angry': '😤',
      'No mood': '📝'
    };
    return emojis[mood] || '📝';
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      'Happy': 'bg-green-100 text-green-800',
      'Calm': 'bg-blue-100 text-blue-800',
      'Okay': 'bg-gray-100 text-gray-800',
      'Sad': 'bg-blue-100 text-blue-800',
      'Anxious': 'bg-yellow-100 text-yellow-800',
      'Angry': 'bg-red-100 text-red-800',
      'No mood': 'bg-purple-100 text-purple-800'
    };
    return colors[mood] || 'bg-gray-100 text-gray-800';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In to View Profile</h2>
          <p className="text-gray-600 mb-6">
            Your profile will show your emotional journey, statistics, and achievements once you sign in.
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">What you'll see:</h3>
            <ul className="text-sm space-y-1 text-purple-100">
              <li>• Your emotional journey and patterns</li>
              <li>• Writing statistics and streaks</li>
              <li>• Personal achievements and milestones</li>
              <li>• Recent entries and reflections</li>
            </ul>
          </div>
          <div className="mt-6">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
            <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white border-2 border-white/30">
              {user ? 
                (user.user_metadata?.username ? 
                  user.user_metadata.username.charAt(0).toUpperCase() : 
                  (user.email ? user.email.charAt(0).toUpperCase() : 'A')
                ) : 'U'
              }
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">My InnerSpace Journey</h2>
              <p className="text-purple-100">Keep track of your amazing emotional journey!</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.totalEntries}</div>
            <div className="text-sm text-purple-100">Total Entries</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'all-entries', label: 'All Entries', icon: '📄' },
            { id: 'statistics', label: 'Statistics', icon: '📊' },
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'sage-settings', label: 'Sage Settings', icon: '🧠' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Avatar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Profile Avatar</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Choose your profile picture or avatar</p>
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">🏞️</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700">
                      {user.user_metadata?.username ? 
                        user.user_metadata.username.charAt(0).toUpperCase() : 
                        (user.email ? user.email.charAt(0).toUpperCase() : 'A')
                      }
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer">
                      ✏️
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Choose Avatar
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Name Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Name Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Customize how your name appears in InnerSpace</p>
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">👤</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Current Display Name</div>
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">First Name:</span>
                      <span className="ml-2 font-medium text-gray-800 dark:text-white">
                        {user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Nickname:</span>
                      <span className="ml-2 font-medium text-gray-800 dark:text-white">Not set</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Name Settings
                  </button>
                </div>
              </div>

              {/* Favorite Quote/Lyrics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Favorite Quote</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Share a quote or lyrics that inspire you</p>
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">💭</div>
                </div>
                {isEditingQuote ? (
                  <div className="space-y-3">
                    <textarea
                      value={favoriteQuote}
                      onChange={(e) => setFavoriteQuote(e.target.value)}
                      placeholder="Enter your favorite quote or song lyrics..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-visible-fix journal-input"
                      rows={3}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1f2937',
                        WebkitTextFillColor: '#1f2937',
                        opacity: 1
                      }}
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSaveQuote}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Quote
                      </button>
                      <button 
                        onClick={() => setIsEditingQuote(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favoriteQuote ? (
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                        <p className="text-gray-800 dark:text-gray-200 italic">"{favoriteQuote}"</p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
                        <p>No favorite quote set yet</p>
                      </div>
                    )}
                    <button 
                      onClick={() => setIsEditingQuote(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {favoriteQuote ? 'Edit Quote' : 'Add Quote'}
                    </button>
                  </div>
                )}
              </div>


            </div>
          )}

          {activeTab === 'all-entries' && (
            <div className="space-y-4">
              {recentEntries.length > 0 ? (
                recentEntries.map((entry, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {entry.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                        {entry.mood}
                      </span>
                    </div>
                    {(entry.reflection || entry.content) && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {entry.reflection || entry.content.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">📝</div>
                  <p>No entries yet. Start your journey today!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.currentStreak}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Current Streak</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.longestStreak}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Longest Streak</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalWords}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Words Written</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.round(stats.totalWords / Math.max(stats.totalEntries, 1))}</div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">Avg. Words/Entry</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Mood Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(stats.moods).map(([mood, count]) => (
                    <div key={mood} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{getMoodEmoji(mood)}</span>
                        <span className="font-medium text-gray-800 dark:text-white">{count}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{mood}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sage-settings' && (
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🧠</div>
                <p>Sage Settings coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 