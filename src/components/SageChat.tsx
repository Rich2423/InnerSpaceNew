"use client";
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'sage';
  content: string;
  timestamp: Date;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'relationships' | 'personal' | 'social' | 'conflict';
}

export default function SageChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'Authority Resolution',
      description: 'Practice handling difficult conversations with parents, teachers, bosses, and other authoritative figures',
      category: 'work'
    },
    {
      id: '2',
      title: 'Relationship Communication',
      description: 'Improve communication skills in personal relationships',
      category: 'relationships'
    },
    {
      id: '3',
      title: 'Social Anxiety',
      description: 'Build confidence in social situations and networking',
      category: 'social'
    },
    {
      id: '4',
      title: 'Personal Boundaries',
      description: 'Learn to set and maintain healthy boundaries',
      category: 'personal'
    },
    {
      id: '5',
      title: 'Conflict Resolution',
      description: 'Practice resolving conflicts in various situations',
      category: 'conflict'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate Sage response (replace with actual Sage integration)
    setTimeout(() => {
      const sageResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'sage',
        content: generateSageResponse(inputMessage, selectedScenario),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sageResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateSageResponse = (userMessage: string, scenario: Scenario | null): string => {
    if (scenario?.title === 'Authority Resolution') {
      const authorityResponses = [
        "I understand this involves someone in a position of authority. How do you feel about the power dynamic in this situation?",
        "When dealing with authority figures, it's important to stay calm and respectful. What's your goal for this conversation?",
        "Authority relationships can be complex. Have you considered how the other person might be feeling or what pressures they might be under?",
        "It's natural to feel nervous about confronting authority. What would help you feel more confident in this situation?",
        "Sometimes authority figures need to be approached differently. How might you frame your concerns in a way that shows respect?",
        "Remember, you have rights and deserve to be heard, even by authority figures. What's the most important point you want to make?",
        "Authority figures often respond well to specific examples and clear communication. How can you make your case more concrete?",
        "It's okay to ask for clarification or time to think when dealing with authority. What would make you feel more prepared?",
        "Sometimes the best approach is to find common ground. What shared goals might you and this authority figure have?",
        "Don't forget that you can also seek support from others. Who might be able to help you navigate this situation?"
      ];
      return authorityResponses[Math.floor(Math.random() * authorityResponses.length)];
    }

    const generalResponses = [
      "That's an interesting perspective. Can you tell me more about how you're feeling in this situation?",
      "I understand this might be challenging. What would be the ideal outcome you're hoping for?",
      "It sounds like you're dealing with some complex emotions. How do you think the other person might be feeling?",
      "This is a great opportunity for growth. What have you learned from similar situations in the past?",
      "I appreciate you sharing this with me. What steps do you think would help move this situation forward?",
      "That's a valid concern. How might you approach this differently if you had unlimited confidence?",
      "I can see this is important to you. What would success look like in this situation?",
      "This is a common challenge many people face. What support do you think you need right now?"
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    
    let welcomeMessage = `Welcome to the "${scenario.title}" scenario! I'm here to help you practice and gain insights. Tell me about the situation you'd like to explore, or ask me to role-play a specific scenario.`;
    
    if (scenario.title === 'Authority Resolution') {
      welcomeMessage = `Welcome to the "Authority Resolution" scenario! I'm here to help you practice handling difficult conversations with authority figures like parents, teachers, bosses, coaches, or other people in positions of power. 

You can:
• Share a specific situation you're dealing with
• Ask me to role-play as a particular authority figure
• Practice different approaches to authority conversations
• Get advice on maintaining respect while standing up for yourself

What authority figure or situation would you like to work on today?`;
    }
    
    const message: Message = {
      id: Date.now().toString(),
      type: 'sage',
      content: welcomeMessage,
      timestamp: new Date()
    };
    setMessages([message]);
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedScenario(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Choose a Scenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => startScenario(scenario)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{scenario.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{scenario.description}</p>
                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    scenario.category === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    scenario.category === 'relationships' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' :
                    scenario.category === 'social' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    scenario.category === 'personal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {scenario.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {selectedScenario && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Scenario: {selectedScenario.title}</p>
              </div>
              <button
                onClick={clearChat}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                New Chat
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 