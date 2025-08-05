"use client";
import React, { useState, useEffect } from 'react';

const AFFIRMATIONS = [
  {
    text: "My feelings are valid and I have the right to express them.",
    author: "Mental Health",
    icon: "🌱"
  },
  {
    text: "I am worthy of love, respect, and happiness exactly as I am.",
    author: "Self-Affirmation",
    icon: "❤️"
  },
  {
    text: "It's okay to not be okay. Healing is not linear.",
    author: "Mental Wellness",
    icon: "🦋"
  },
  {
    text: "I choose to focus on what I can control and let go of what I cannot.",
    author: "Mindfulness",
    icon: "🧘"
  },
  {
    text: "Every emotion I feel is temporary and will pass.",
    author: "Emotional Health",
    icon: "🌈"
  },
  {
    text: "I am stronger than my struggles and braver than my fears.",
    author: "Resilience",
    icon: "💪"
  },
  {
    text: "My mental health is just as important as my physical health.",
    author: "Wellness",
    icon: "🧠"
  },
  {
    text: "I give myself permission to take breaks and rest when I need to.",
    author: "Self-Care",
    icon: "☕"
  },
  {
    text: "I am not defined by my mistakes or my past.",
    author: "Growth",
    icon: "🌱"
  },
  {
    text: "I deserve to be heard, understood, and supported.",
    author: "Self-Worth",
    icon: "🎯"
  }
];

const WEEKLY_CHALLENGES = [
  {
    title: "Self-Compassion Week",
    description: "Say one positive thing about yourself every day this week. Write it down and notice how it makes you feel!",
    icon: "💝"
  },
  {
    title: "Gratitude Practice",
    description: "Write down three things you're grateful for each day. Notice how this shifts your perspective.",
    icon: "🙏"
  },
  {
    title: "Emotional Awareness",
    description: "Check in with your emotions three times a day. Notice patterns and triggers.",
    icon: "🎯"
  },
  {
    title: "Mindful Moments",
    description: "Take 5 deep breaths whenever you feel overwhelmed. Notice how your body responds.",
    icon: "🌬️"
  }
];



const QUICK_ACTIVITIES = [
  {
    name: "5-Minute Meditation",
    description: "Find a quiet place and focus on your breath",
    icon: "🧘",
    duration: "5 min"
  },
  {
    name: "Gratitude List",
    description: "Write down 3 things you're thankful for",
    icon: "🙏",
    duration: "3 min"
  },
  {
    name: "Stretch Break",
    description: "Simple stretches to release tension",
    icon: "🤸",
    duration: "5 min"
  },
  {
    name: "Nature Walk",
    description: "Step outside and notice your surroundings",
    icon: "🌳",
    duration: "10 min"
  }
];

function getWellnessStats() {
  if (typeof window === 'undefined') {
    return { affirmationsRead: 0, averageMood: 0, averageStress: 0, favoriteCategory: 'Journaling', activitiesCompleted: 0 };
  }

  let affirmationsRead = 0;
  let totalMood = 0;
  let moodCount = 0;
  let totalStress = 0;
  let stressCount = 0;
  let activitiesCompleted = 0;
  const categories = { Journaling: 0, CheckIn: 0, Reflection: 0 };

  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('innerspace_')) {
      // Skip theme and quote settings as they're not JSON
      if (key === 'innerspace_theme' || key === 'innerspace_favorite_quote') {
        return;
      }
      
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (data.affirmationRead) affirmationsRead++;
        if (data.completed && data.activity) activitiesCompleted++;
        if (data.mood) {
          const moodValues = { Happy: 5, Calm: 4, Okay: 3, Sad: 2, Anxious: 1, Angry: 1 };
          totalMood += moodValues[data.mood as keyof typeof moodValues] || 3;
          moodCount++;
        }
        if (data.stressLevel) {
          totalStress += data.stressLevel;
          stressCount++;
        }
        if (data.type === 'writing') categories.Journaling++;
        if (data.type === 'checkin') categories.CheckIn++;
        if (data.type === 'reflection') categories.Reflection++;
      } catch (error) {
        console.warn('Failed to parse localStorage data for key:', key, error);
      }
    }
  });

  const favoriteCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Journaling';

  return {
    affirmationsRead,
    averageMood: moodCount > 0 ? Math.round(totalMood / moodCount) : 0,
    averageStress: stressCount > 0 ? Math.round(totalStress / stressCount) : 0,
    favoriteCategory,
    activitiesCompleted
  };
}

export default function WellnessCenter() {

  const [stats, setStats] = useState(getWellnessStats());
  const [currentAffirmation, setCurrentAffirmation] = useState(AFFIRMATIONS[0]);
  const [currentChallenge, setCurrentChallenge] = useState(WEEKLY_CHALLENGES[0]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getWellnessStats());
    // Rotate affirmations and challenges weekly - only on client side
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    setCurrentAffirmation(AFFIRMATIONS[weekNumber % AFFIRMATIONS.length]);
    setCurrentChallenge(WEEKLY_CHALLENGES[weekNumber % WEEKLY_CHALLENGES.length]);
  }, []);

  const handleGetMoreAffirmations = () => {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    setCurrentAffirmation(AFFIRMATIONS[randomIndex]);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const today = new Date();
      const key = `innerspace_affirmation_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
      localStorage.setItem(key, JSON.stringify({ affirmationRead: true }));
      setStats(getWellnessStats());
    }
  };

  const handleStartCheckIn = () => {
    setShowCheckIn(true);
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😰', '😐', '😌', '😊'];
    return emojis[Math.max(0, Math.min(mood - 1, emojis.length - 1))];
  };

  const getStressEmoji = (stress: number) => {
    const emojis = ['😌', '😐', '😰', '😱', '😵'];
    return emojis[Math.max(0, Math.min(stress - 1, emojis.length - 1))];
  };

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading wellness center...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.affirmationsRead}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Affirmations Read</div>
            </div>
            <div className="text-2xl">⭐</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.averageMood}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Mood</div>
            </div>
            <div className="text-2xl">{getMoodEmoji(stats.averageMood)}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.averageStress}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Stress</div>
            </div>
            <div className="text-2xl">{getStressEmoji(stats.averageStress)}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.activitiesCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Activities Completed</div>
            </div>
            <div className="text-2xl">⚡</div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Daily Affirmations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Daily Affirmations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Inspiring quotes from people who overcame challenges</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentAffirmation.icon}</span>
              <div className="flex-1">
                <p className="text-lg font-medium mb-2">"{currentAffirmation.text}"</p>
                <p className="text-sm text-purple-100">- {currentAffirmation.author}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGetMoreAffirmations}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Get More Affirmations
          </button>
        </div>

        {/* Right Column - Wellness Check-in & Weekly Challenge */}
        <div className="space-y-6">
          {/* Wellness Check-in */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Wellness Check-in</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">How are you feeling today?</p>
            </div>

            <button
              onClick={handleStartCheckIn}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Start Check-in
            </button>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Weekly Challenge</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Try something new this week!</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{currentChallenge.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">This Week's Challenge:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentChallenge.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Check-in Modal */}
      {showCheckIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Wellness Check-in</h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowCheckIn(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How are you feeling today?
                </label>
                <select className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Great! 😊</option>
                  <option>Good 😌</option>
                  <option>Okay 😐</option>
                  <option>Not great 😔</option>
                  <option>Struggling 😰</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stress Level (1-5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  defaultValue="3"
                  className="w-full accent-purple-500 dark:bg-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's on your mind?
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                  rows={3}
                  placeholder="Share your thoughts..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowCheckIn(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                onClick={() => setShowCheckIn(false)}
              >
                Save Check-in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Wellness Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Quick Wellness Activities</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Take a moment for yourself</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_ACTIVITIES.map((activity, index) => (
            <button
              key={index}
              onClick={() => {
                // Save activity completion to localStorage
                const today = new Date();
                const key = `innerspace_activity_${activity.name.replace(/\s+/g, '_').toLowerCase()}_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
                localStorage.setItem(key, JSON.stringify({ 
                  activity: activity.name, 
                  completed: true, 
                  timestamp: new Date().toISOString() 
                }));
                
                // Show completion message
                alert(`Great job! You completed "${activity.name}". Keep up the good work! 🌟`);
              }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100 hover:from-blue-100 hover:to-purple-100 transition-all text-left group dark:bg-gray-700 dark:border-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">{activity.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-white group-hover:text-blue-700 transition-colors">{activity.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                  <span className="text-xs text-blue-600 font-medium">{activity.duration}</span>
                </div>
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Click any activity to mark it as completed and track your wellness journey!
          </p>
        </div>
      </div>


    </div>
  );
} 