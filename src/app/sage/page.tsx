import SageChat from '../../components/SageChat';

export default function SagePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Sage</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Your Sage companion for gaining insights and perspective</p>
        </div>
        
        <SageChat />
      </div>
    </main>
  );
} 