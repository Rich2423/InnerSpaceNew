"use client";
import React, { useState } from 'react';

const CRISIS_RESOURCES = [
  {
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org/',
    phone: '741741',
    color: 'bg-blue-50 border-blue-200',
    icon: '💬'
  },
  {
    name: 'National Suicide Prevention Lifeline',
    description: 'Call or text 988',
    url: 'https://988lifeline.org/',
    phone: '988',
    color: 'bg-green-50 border-green-200',
    icon: '🆘'
  },
  {
    name: 'Trevor Project (LGBTQ+)',
    description: 'Call 1-866-488-7386',
    url: 'https://www.thetrevorproject.org/',
    phone: '1-866-488-7386',
    color: 'bg-purple-50 border-purple-200',
    icon: '🌈'
  },
  {
    name: 'Teen Line',
    description: 'Call 310-855-4673',
    url: 'https://teenlineonline.org/',
    phone: '310-855-4673',
    color: 'bg-pink-50 border-pink-200',
    icon: '📞'
  },
  {
    name: 'Emergency Services',
    description: 'Call 911 for immediate emergency',
    url: '#',
    phone: '911',
    color: 'bg-red-50 border-red-200',
    icon: '🚨'
  }
];

const MENTAL_HEALTH_RESOURCES = [
  {
    name: 'MentalHealth.gov',
    description: 'Government mental health resources',
    url: 'https://www.mentalhealth.gov/',
    icon: '🏛️'
  },
  {
    name: 'NAMI HelpLine',
    description: 'National Alliance on Mental Illness',
    url: 'https://www.nami.org/help',
    icon: '🤝'
  },
  {
    name: 'Psychology Today',
    description: 'Find therapists and mental health professionals',
    url: 'https://www.psychologytoday.com/us/therapists',
    icon: '🧠'
  },
  {
    name: 'BetterHelp',
    description: 'Online therapy and counseling',
    url: 'https://www.betterhelp.com/',
    icon: '💻'
  }
];

export default function NeedHelp() {
  const [showResources, setShowResources] = useState(false);

  const handleCall = (phone: string) => {
    if (phone === '911') {
      if (confirm('Are you sure you want to call 911? Only call for true emergencies.')) {
        window.open(`tel:${phone}`, '_self');
      }
    } else {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleText = (phone: string) => {
    window.open(`sms:${phone}`, '_self');
  };

  return (
    <div className="w-full">
      {/* Prominent Help Button */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 text-white text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🆘</span>
          <h3 className="text-lg font-semibold">Need Immediate Help?</h3>
        </div>
        <p className="text-sm mb-3">Crisis resources and support are available 24/7</p>
        <button
          onClick={() => setShowResources(true)}
          className="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          type="button"
        >
          Get Help Now
        </button>
      </div>
      
      {showResources && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Crisis & Mental Health Resources</h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowResources(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Emergency:</strong> If you're in immediate danger, call 911 or go to your nearest emergency room.
              </p>
            </div>
            
            {/* Crisis Resources */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🆘 Crisis Resources (24/7)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CRISIS_RESOURCES.map((resource, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${resource.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{resource.icon}</span>
                      <div className="font-medium text-gray-800">{resource.name}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{resource.description}</div>
                    <div className="flex gap-2 flex-wrap">
                      {resource.phone && resource.phone !== '911' && (
                        <>
                          <button
                            onClick={() => handleCall(resource.phone)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            📞 Call
                          </button>
                          <button
                            onClick={() => handleText(resource.phone)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                          >
                            💬 Text
                          </button>
                        </>
                      )}
                      {resource.phone === '911' && (
                        <button
                          onClick={() => handleCall(resource.phone)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          🚨 Emergency Call
                        </button>
                      )}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors inline-block"
                      >
                        🌐 Website
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mental Health Resources */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🧠 Mental Health Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MENTAL_HEALTH_RESOURCES.map((resource, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{resource.icon}</span>
                      <div className="font-medium text-gray-800">{resource.name}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{resource.description}</div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors inline-block"
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💙 Remember:</strong> You're not alone, and it's okay to ask for help. 
                These resources are confidential and available 24/7. Your mental health matters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 