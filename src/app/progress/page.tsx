import React from 'react';
import YourStory from '../../components/YourStory';

export const dynamic = 'force-dynamic';

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Progress</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Track your growth and insights</p>
      </div>

      {/* Progress Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <YourStory />
        </div>
      </div>
    </main>
  );
} 