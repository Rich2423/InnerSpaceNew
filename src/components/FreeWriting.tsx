"use client";
import React, { useState, useEffect } from 'react';
import SageAssistant from './SageAssistant';
import { useAuth } from '../contexts/AuthContext';

const WRITING_PROMPTS = [
  "What's on your mind today?",
  "Write about something that happened recently...",
  "What are you thinking about?",
  "Share your thoughts...",
  "What's important to you right now?",
  "Write freely about anything...",
];

function getTodayKey() {
  const today = new Date();
  return `innerspace_writing_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
}

export default function FreeWriting() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [showSage, setShowSage] = useState(false);
  const [prompt] = useState(() => 
    WRITING_PROMPTS[Math.floor(Math.random() * WRITING_PROMPTS.length)]
  );

  useEffect(() => {
    const savedData = localStorage.getItem(getTodayKey());
    if (savedData) {
      const { content } = JSON.parse(savedData);
      setContent(content);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      getTodayKey(),
      JSON.stringify({ content })
    );
    setSaved(true);
  };

  const handleClear = () => {
    setContent('');
    setSaved(false);
    localStorage.removeItem(getTodayKey());
  };

  const handleSageSuggestion = (suggestion: string) => {
    setContent(prev => prev + (prev ? '\n\n' : '') + suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Header with User Context */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">Write Freely</h3>
          {user && (
            <p className="text-sm text-gray-300">
              Writing as {user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowSage(!showSage)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showSage 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-500 text-white hover:bg-purple-600 border border-purple-400'
          }`}
          type="button"
        >
          {showSage ? '🧠 Hide Sage' : '🧠 Sage Help'}
        </button>
      </div>

      {/* Sage Assistant */}
      {showSage && (
        <SageAssistant onSuggestion={handleSageSuggestion} />
      )}

      {/* Writing Area */}
      <div className="relative">
        <textarea
          className="w-full min-h-[200px] rounded-lg border border-gray-600 bg-gray-800 p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-white placeholder-gray-300 writing-content text-visible-fix journal-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={prompt}
          style={{
            backgroundColor: '#ffffff',
            color: '#1f2937',
            WebkitTextFillColor: '#1f2937',
            opacity: 1
          }}
        />
        
        {/* Word Count */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {content.length} characters
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-100 text-green-700 border border-green-200'
              : content.trim()
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSave}
          disabled={!content.trim() || saved}
          type="button"
        >
          {saved ? '✓ Saved!' : 'Save'}
        </button>
        
        {saved && (
          <button
            className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={handleClear}
            type="button"
          >
            New Entry
          </button>
        )}
      </div>

      {/* Tips */}
      <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="font-medium mb-1">💡 Writing Tips:</p>
        <ul className="space-y-1 text-xs">
          <li>• Write whatever comes to mind - no rules!</li>
          <li>• Don't worry about spelling or grammar</li>
          <li>• This is just for you - be honest</li>
          <li>• Use the Sage assistant for help when you're stuck</li>
        </ul>
      </div>
    </div>
  );
} 