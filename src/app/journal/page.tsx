import React from 'react';
import DailyCheckIn from '../../components/DailyCheckIn';
import FreeWriting from '../../components/FreeWriting';

export const dynamic = 'force-dynamic';

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-2">Journal</h1>
        <p className="text-lg text-gray-300">Express yourself and track your emotional journey</p>
      </div>

      {/* Journal Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Check-in */}
          <div>
            <DailyCheckIn />
          </div>
          
          {/* Free Writing */}
          <div>
            <FreeWriting />
          </div>
        </div>
      </div>
    </main>
  );
} 