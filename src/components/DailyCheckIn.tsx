"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MOODS = [
  { label: 'Happy', emoji: '😊', color: 'bg-green-100 border-green-300' },
  { label: 'Calm', emoji: '😌', color: 'bg-blue-100 border-blue-300' },
  { label: 'Okay', emoji: '😐', color: 'bg-gray-100 border-gray-300' },
  { label: 'Sad', emoji: '😔', color: 'bg-blue-100 border-blue-300' },
  { label: 'Anxious', emoji: '😰', color: 'bg-yellow-100 border-yellow-300' },
  { label: 'Angry', emoji: '😤', color: 'bg-red-100 border-red-300' },
];

const REFLECTION_QUESTIONS = [
  "What's one thing you're grateful for today?",
  "What's on your mind right now?",
  "What made you smile today?",
  "What do you need right now?",
  "What's something you're looking forward to?",
  "What's challenging you today?",
];

function getTodayKey() {
  const today = new Date();
  return `innerspace_checkin_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
}

export default function DailyCheckIn() {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [question] = useState(() => 
    REFLECTION_QUESTIONS[Math.floor(Math.random() * REFLECTION_QUESTIONS.length)]
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(getTodayKey());
    if (savedData) {
      const { mood, reflection } = JSON.parse(savedData);
      setSelectedMood(mood);
      setReflection(reflection);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      getTodayKey(),
      JSON.stringify({ mood: selectedMood, reflection })
    );
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with User Context */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-1">How are you feeling?</h3>
        {user && (
          <p className="text-sm text-gray-300">
            Check-in for {user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}
          </p>
        )}
      </div>

      {/* Mood Selection */}
      <div>
        <div className="grid grid-cols-3 gap-3">
          {MOODS.map((mood) => (
            <button
              key={mood.label}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                selectedMood === mood.label 
                  ? `${mood.color} scale-105` 
                  : 'bg-gray-700 border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setSelectedMood(mood.label)}
              type="button"
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="text-sm font-medium text-white">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reflection */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Reflection</h3>
        <p className="text-sm text-gray-300 mb-3 italic">"{question}"</p>
        <textarea
          className="w-full min-h-[80px] rounded-lg border border-gray-600 bg-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-white placeholder-gray-300 writing-content text-visible-fix reflection-input"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Share your thoughts..."
          style={{
            backgroundColor: '#ffffff',
            color: '#1f2937',
            WebkitTextFillColor: '#1f2937',
            opacity: 1
          }}
        />
      </div>

      {/* Save Button */}
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          saved
            ? 'bg-green-500 text-white border border-green-400'
            : (selectedMood || reflection.trim())
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
        }`}
        onClick={handleSave}
        disabled={(!selectedMood && !reflection.trim()) || saved}
        type="button"
      >
        {saved ? '✓ Check-in saved!' : 'Save Check-in'}
      </button>
    </div>
  );
} 