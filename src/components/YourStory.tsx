"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function getStreakDays() {
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = `innerspace_checkin_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    const writingKey = `innerspace_writing_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    
    if (localStorage.getItem(key) || localStorage.getItem(writingKey)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function getTotalEntries() {
  let total = 0;
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('innerspace_')) {
      total++;
    }
  });
  
  return total;
}

function getRecentMoods() {
  const moods = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = `innerspace_checkin_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    const data = localStorage.getItem(key);
    
    if (data) {
      const { mood } = JSON.parse(data);
      moods.push({ date: checkDate, mood });
    }
  }
  
  return moods.reverse();
}

function getMoodStats() {
  const moodCounts = { Happy: 0, Calm: 0, Okay: 0, Sad: 0, Anxious: 0, Angry: 0 };
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('innerspace_checkin_')) {
      const data = localStorage.getItem(key);
      if (data) {
        const { mood } = JSON.parse(data);
        if (moodCounts.hasOwnProperty(mood)) {
          moodCounts[mood as keyof typeof moodCounts]++;
        }
      }
    }
  });
  
  return moodCounts;
}

function getWeeklyActivity() {
  const activity = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const checkinKey = `innerspace_checkin_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    const writingKey = `innerspace_writing_${checkDate.getFullYear()}-${checkDate.getMonth()+1}-${checkDate.getDate()}`;
    
    const hasCheckin = localStorage.getItem(checkinKey);
    const hasWriting = localStorage.getItem(writingKey);
    
    activity.push({
      date: checkDate,
      hasActivity: !!(hasCheckin || hasWriting),
      type: hasCheckin && hasWriting ? 'both' : hasCheckin ? 'checkin' : hasWriting ? 'writing' : 'none'
    });
  }
  
  return activity;
}

export default function YourStory() {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [moodStats, setMoodStats] = useState<{[key: string]: number}>({});
  const [weeklyActivity, setWeeklyActivity] = useState<any[]>([]);

  useEffect(() => {
    setStreak(getStreakDays());
    setTotalEntries(getTotalEntries());
    setRecentMoods(getRecentMoods());
    setMoodStats(getMoodStats());
    setWeeklyActivity(getWeeklyActivity());
  }, []);

  const getStreakMessage = () => {
    if (streak === 0) return "Start your journey today!";
    if (streak === 1) return "Great start! Keep going!";
    if (streak < 7) return `You're on a ${streak}-day streak!`;
    if (streak < 30) return `Amazing! ${streak} days strong!`;
    return `Incredible! ${streak} days of reflection!`;
  };

  const getTotalMessage = () => {
    if (totalEntries === 0) return "Your story begins here";
    if (totalEntries < 10) return `${totalEntries} entries so far`;
    if (totalEntries < 50) return `${totalEntries} moments captured`;
    return `${totalEntries} reflections saved`;
  };

  return (
    <div className="space-y-6">
      {/* Header with User Context */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {user ? `${user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}'s Progress` : 'Your Progress'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Track your emotional journey and growth</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Counter */}
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{streak}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Day Streak</div>
          <div className="text-xs text-blue-600 dark:text-blue-400">{getStreakMessage()}</div>
        </div>

        {/* Total Entries */}
        <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{totalEntries}</div>
          <div className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-1">Total Entries</div>
          <div className="text-xs text-purple-600 dark:text-purple-400">{getTotalMessage()}</div>
        </div>

        {/* Weekly Activity */}
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-100 dark:border-green-800">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {weeklyActivity.filter(day => day.hasActivity).length}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">Active Days</div>
          <div className="text-xs text-green-600 dark:text-green-400">This week</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">This Week's Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium ${
                day.type === 'both' ? 'bg-purple-500 text-white' :
                day.type === 'checkin' ? 'bg-blue-500 text-white' :
                day.type === 'writing' ? 'bg-green-500 text-white' :
                'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-300'
              }`}>
                {day.type === 'both' ? '✓' : day.type === 'checkin' ? '😊' : day.type === 'writing' ? '✍' : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Distribution */}
      {Object.values(moodStats).some(count => count > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your Mood Patterns</h3>
          <div className="space-y-3">
            {Object.entries(moodStats)
              .filter(([, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {mood === 'Happy' && '😊'}
                      {mood === 'Calm' && '😌'}
                      {mood === 'Okay' && '😐'}
                      {mood === 'Sad' && '😔'}
                      {mood === 'Anxious' && '😰'}
                      {mood === 'Angry' && '😤'}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{mood}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(count / totalEntries) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Moods */}
      {recentMoods.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Moods</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentMoods.map((entry, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-2">
                  {entry.mood === 'Happy' && '😊'}
                  {entry.mood === 'Calm' && '😌'}
                  {entry.mood === 'Okay' && '😐'}
                  {entry.mood === 'Sad' && '😔'}
                  {entry.mood === 'Anxious' && '😰'}
                  {entry.mood === 'Angry' && '😤'}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{entry.mood}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
        <div className="text-lg font-medium text-yellow-700 dark:text-yellow-300 mb-2">Keep going!</div>
        <div className="text-sm text-yellow-600 dark:text-yellow-400">
          Every entry is a step toward understanding yourself better. 
          {streak > 0 && ` You're on a ${streak}-day streak!`}
        </div>
      </div>
    </div>
  );
} 