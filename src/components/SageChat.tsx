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

    // Enhanced Sage response with unlimited conversation capability
    setTimeout(() => {
      const sageResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'sage',
        content: generateEnhancedSageResponse(inputMessage, selectedScenario),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sageResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateEnhancedSageResponse = (userMessage: string, scenario: Scenario | null): string => {
    // Enhanced response system with unlimited conversation capability
    const userMessageLower = userMessage.toLowerCase();
    
    // Check for specific keywords and provide contextual responses
    if (userMessageLower.includes('thank') || userMessageLower.includes('thanks')) {
      return "You're very welcome! I'm here to support you on your journey. Is there anything else you'd like to explore or discuss?";
    }
    
    if (userMessageLower.includes('help') || userMessageLower.includes('stuck')) {
      return "I'm here to help! Let's break this down together. What specific aspect would you like to focus on? Sometimes talking through the details can help us find new perspectives.";
    }
    
    if (userMessageLower.includes('feel') || userMessageLower.includes('emotion')) {
      return "Your feelings are valid and important. Can you tell me more about what's behind these emotions? Understanding the root cause can help us work through them together.";
    }
    
    if (userMessageLower.includes('stress') || userMessageLower.includes('anxiety')) {
      return "Stress and anxiety can be really challenging. What's causing you the most concern right now? Sometimes identifying the source helps us find better ways to manage it.";
    }
    
    if (userMessageLower.includes('relationship') || userMessageLower.includes('friend') || userMessageLower.includes('family')) {
      return "Relationships can be complex and deeply personal. What's happening in this relationship that you'd like to work through? I'm here to help you explore your feelings and find clarity.";
    }
    
    if (userMessageLower.includes('decision') || userMessageLower.includes('choice')) {
      return "Making decisions can be overwhelming, especially when they're important. What are the main factors you're considering? Sometimes writing out the pros and cons can help clarify things.";
    }
    
    if (userMessageLower.includes('future') || userMessageLower.includes('goal')) {
      return "Thinking about the future can be both exciting and daunting. What are you hoping to achieve? Let's explore what steps might help you move toward your goals.";
    }
    
    if (userMessageLower.includes('past') || userMessageLower.includes('memory')) {
      return "Our past experiences shape who we are, but they don't have to define our future. What about this memory is important to you right now? How do you think it's influencing your current situation?";
    }
    
    if (userMessageLower.includes('confidence') || userMessageLower.includes('self-esteem')) {
      return "Building confidence is a journey, and it's okay to have ups and downs. What would help you feel more confident in this situation? Sometimes we're stronger than we realize.";
    }
    
    if (userMessageLower.includes('change') || userMessageLower.includes('different')) {
      return "Change can be challenging, even when it's positive. What kind of change are you thinking about? What's motivating you to consider this change?";
    }
    
    // Scenario-specific responses
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
    
    if (scenario?.title === 'Relationship Communication') {
      const relationshipResponses = [
        "Communication in relationships takes practice and patience. What's the main message you want to convey?",
        "It's important to express your feelings while also listening to the other person. How do you think they might be feeling?",
        "Sometimes we need to take a step back and see things from the other person's perspective. What might their point of view be?",
        "Healthy communication often involves finding the right time and place. What would be the best setting for this conversation?",
        "It's okay to ask for what you need in a relationship. What would make you feel more supported or understood?",
        "Remember that both people's feelings are valid. How can you express your needs while also being considerate of theirs?",
        "Sometimes writing down your thoughts first can help clarify what you want to say. What are the key points you want to make?",
        "It's natural to feel vulnerable when opening up. What would help you feel safer in this conversation?"
      ];
      return relationshipResponses[Math.floor(Math.random() * relationshipResponses.length)];
    }

    // Enhanced general responses for unlimited conversation
    const enhancedGeneralResponses = [
      "That's an interesting perspective. Can you tell me more about how you're feeling in this situation?",
      "I understand this might be challenging. What would be the ideal outcome you're hoping for?",
      "It sounds like you're dealing with some complex emotions. How do you think the other person might be feeling?",
      "This is a great opportunity for growth. What have you learned from similar situations in the past?",
      "I appreciate you sharing this with me. What steps do you think would help move this situation forward?",
      "That's a valid concern. How might you approach this differently if you had unlimited confidence?",
      "I can see this is important to you. What would success look like in this situation?",
      "This is a common challenge many people face. What support do you think you need right now?",
      "Your feelings are completely valid. What would help you feel more at peace with this situation?",
      "Sometimes the hardest part is knowing where to start. What's one small step you could take today?",
      "I hear you, and I want you to know that you're not alone in feeling this way. What would be most helpful for you right now?",
      "It takes courage to explore these feelings. What do you think you might learn from this experience?",
      "Everyone's journey is unique, and there's no right or wrong way to feel. What's your gut telling you about this situation?",
      "Sometimes we need to give ourselves permission to feel what we're feeling. What would that look like for you?",
      "You have more strength than you might realize. What evidence do you see of your resilience in this situation?"
    ];

    return enhancedGeneralResponses[Math.floor(Math.random() * enhancedGeneralResponses.length)];
  };



  const startFreeChat = () => {
    setSelectedScenario(null);
    
    const welcomeMessage = `Hello! I'm Sage, your AI companion for unlimited conversation and support. 

I'm here to listen, help you explore your thoughts and feelings, and support you on your journey. You can talk to me about:

• Your day and how you're feeling
• Challenges you're facing
• Goals and aspirations
• Relationships and social situations
• Stress, anxiety, or difficult emotions
• Anything else on your mind

There are no limits to our conversation - I'm here for you. What would you like to talk about today?`;
    
    const message: Message = {
      id: Date.now().toString(),
      type: 'sage',
      content: welcomeMessage,
      timestamp: new Date()
    };
    setMessages([message]);
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
      {!selectedScenario && messages.length === 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Choose a Scenario</h2>
          
          {/* Free-form Chat Option */}
          <div className="mb-6">
            <div
              onClick={() => startFreeChat()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 border border-purple-200 cursor-pointer hover:shadow-lg transition-shadow text-white"
            >
              <h3 className="text-lg font-semibold mb-2">💬 Free Chat with Sage</h3>
              <p className="text-purple-100 text-sm">Talk about anything on your mind - no limits, no restrictions. Sage is here to listen and support you.</p>
              <div className="mt-3">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-white/20">
                  Unlimited Conversation
                </span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Or Choose a Specific Scenario</h3>
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
      {messages.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedScenario ? `Scenario: ${selectedScenario.title}` : 'Free Chat - Unlimited Conversation'}
                </p>
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
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-visible-fix chat-input sage-input"
                disabled={isLoading}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1f2937',
                  WebkitTextFillColor: '#1f2937',
                  opacity: 1
                }}
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