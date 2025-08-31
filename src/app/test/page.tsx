"use client";
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">InnerSpace Test Page</h1>
      <p className="text-lg mb-4">If you can see this, the app is working!</p>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Test Features:</h2>
        <ul className="space-y-2">
          <li>✅ Dark theme working</li>
          <li>✅ Text visibility good</li>
          <li>✅ No loading issues</li>
        </ul>
      </div>
      <Link href="/" className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Go to Main App
      </Link>
    </div>
  );
} 