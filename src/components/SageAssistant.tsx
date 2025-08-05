"use client";
import React, { useState } from 'react';

const SAGE_PROMPTS = [
  "I'm feeling stuck...",
  "I want to explore my emotions...",
  "I need help with a difficult situation...",
  "I want to reflect on my day...",
  "I'm dealing with stress...",
  "I want to practice gratitude...",
  "I need motivation...",
  "I want to understand myself better..."
];

const SAGE_SUGGESTIONS = {
  "I'm feeling stuck...": [
    "What's the main obstacle you're facing right now?",
    "When did you first notice this feeling?",
    "What would success look like in this situation?",
    "What small step could you take today?"
  ],
  "I want to explore my emotions...": [
    "What emotion is most present for you right now?",
    "Where do you feel this emotion in your body?",
    "What triggered this feeling?",
    "How do you usually handle this emotion?"
  ],
  "I need help with a difficult situation...": [
    "Can you describe the situation in detail?",
    "What's the most challenging part for you?",
    "What have you tried so far?",
    "What would be the best possible outcome?"
  ],
  "I want to reflect on my day...": [
    "What was the highlight of your day?",
    "What challenged you today?",
    "What are you grateful for today?",
    "What would you do differently tomorrow?"
  ],
  "I'm dealing with stress...": [
    "What's causing you the most stress right now?",
    "How is this stress affecting you?",
    "What usually helps you feel calmer?",
    "What support do you need right now?"
  ],
  "I want to practice gratitude...": [
    "What's something good that happened today?",
    "Who are you grateful for in your life?",
    "What's something you often take for granted?",
    "How does gratitude make you feel?"
  ],
  "I need motivation...": [
    "What goal are you working toward?",
    "What's stopping you from taking action?",
    "What would motivate you most right now?",
    "What's one small thing you could do today?"
  ],
  "I want to understand myself better...": [
    "What's the main thing you're thinking about right now?",
    "What patterns do you notice in your behavior?",
    "What values are most important to you?",
    "What would you like to change about yourself?"
  ]
};

const SAGE_WRITING_TIPS = [
  "Start with whatever comes to mind - no need to edit",
  "Use specific details to make your writing more vivid",
  "Write about your feelings, not just events",
  "Don't worry about grammar or spelling",
  "Try writing in the present tense",
  "Include sensory details (what you see, hear, feel)",
  "Ask yourself 'why' questions to go deeper",
  "Write as if no one else will read it"
];

export default function SageAssistant({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setIsThinking(true);
    
    // Simulate Sage thinking
    setTimeout(() => {
      const suggestions = SAGE_SUGGESTIONS[prompt as keyof typeof SAGE_SUGGESTIONS] || [];
      if (suggestions.length > 0) {
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        onSuggestion(randomSuggestion);
      }
      setIsThinking(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestion(suggestion);
  };

  const suggestions = SAGE_SUGGESTIONS[selectedPrompt as keyof typeof SAGE_SUGGESTIONS] || [];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
      {/* Sage Assistant Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
          🧠
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">Sage Writing Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Get help when you're stuck</p>
        </div>
      </div>

      {/* Sage Prompts */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 dark:text-white mb-2">I need help with...</h4>
        <div className="grid grid-cols-2 gap-2">
          {SAGE_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(prompt)}
              disabled={isThinking}
              className="text-left p-2 text-sm bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Sage Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 dark:text-white mb-2">Sage Suggestion</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Writing Tips */}
      <div>
        <h4 className="font-medium text-gray-800 dark:text-white mb-2">Writing Tips</h4>
        <div className="space-y-1">
          {SAGE_WRITING_TIPS.map((tip, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
              • {tip}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 