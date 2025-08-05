import React from 'react';
import WellnessCenter from '../../components/WellnessCenter';

export const dynamic = 'force-dynamic';

export default function WellnessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Wellness Center</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Your emotional support and wellness hub</p>
      </div>

      {/* Wellness Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <WellnessCenter />
      </div>
    </main>
  );
} 