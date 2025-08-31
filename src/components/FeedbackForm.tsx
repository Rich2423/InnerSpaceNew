"use client";
import React, { useState } from 'react';

interface FeedbackData {
  type: 'bug' | 'feature' | 'general';
  title: string;
  description: string;
  rating?: number;
  userAgent: string;
  timestamp: string;
}

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      type: feedbackType,
      title,
      description,
      rating,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    try {
      // For now, we'll store feedback in localStorage
      // In production, you'd send this to your backend
      const existingFeedback = JSON.parse(localStorage.getItem('innerspace_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('innerspace_feedback', JSON.stringify(existingFeedback));

      // You could also send to a service like:
      // await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedbackData)
      // });

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setTitle('');
        setDescription('');
        setRating(5);
        setFeedbackType('general');
      }, 2000);
    } catch (error) {
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span>Thank you for your feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
        title="Send Feedback"
      >
        💬
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Type
                </label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value as any)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {feedbackType === 'bug' ? 'Bug Title' : feedbackType === 'feature' ? 'Feature Request' : 'Title'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={feedbackType === 'bug' ? 'Brief description of the bug...' : 'Brief title...'}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    feedbackType === 'bug' 
                      ? 'Please describe what happened, what you expected, and steps to reproduce...'
                      : feedbackType === 'feature'
                      ? 'Please describe the feature you\'d like to see...'
                      : 'Please share your thoughts...'
                  }
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-visible-fix journal-input"
                  required
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#1f2937',
                    WebkitTextFillColor: '#1f2937',
                    opacity: 1
                  }}
                />
              </div>

              {/* Rating (for general feedback) */}
              {feedbackType === 'general' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate your experience? (1-5)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 