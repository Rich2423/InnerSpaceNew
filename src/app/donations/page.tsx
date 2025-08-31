'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from '../../components/DonationForm';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [stripeKey, setStripeKey] = useState<string>('');

  // Debug: Check if Stripe key is loaded
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    console.log('Stripe Key:', key ? 'Loaded' : 'Not loaded');
    setStripeKey(key || 'Not loaded');
  }, []);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setShowPaymentForm(true);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    if (value && parseFloat(value) > 0) {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white font-bold text-xl hover:text-purple-400 transition-colors">
              InnerSpace
            </Link>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/journal" className="text-gray-300 hover:text-white transition-colors">Journal</Link>
              <Link href="/sage" className="text-gray-300 hover:text-white transition-colors">Sage</Link>
              <Link href="/wellness" className="text-gray-300 hover:text-white transition-colors">Wellness</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Support InnerSpace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us provide free mental wellness tools to young people everywhere
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Our Mission
          </h2>
          <div className="prose prose-lg text-gray-300 max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              InnerSpace was created with a simple but powerful mission: to provide free, accessible mental wellness tools to young people who need them most. We believe that everyone deserves a safe space to reflect, grow, and find emotional balance - regardless of their financial situation.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our AI companion Sage, daily check-ins, journaling tools, and wellness activities are completely free to use. We're committed to keeping it that way, because mental health support shouldn't be a luxury. Your donations help us maintain and improve these tools, develop new features, and reach more young people who are struggling with stress, anxiety, and the challenges of growing up.
            </p>
            <p className="text-lg leading-relaxed">
              Every dollar you donate goes directly toward keeping InnerSpace free and accessible. Whether it's $5 or $100, your contribution makes a real difference in someone's life. Thank you for believing in our mission and supporting the mental wellness of young people everywhere.
            </p>
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Make a Donation
          </h2>
          
          {/* Preset Amounts */}
          <div className="mb-8">
            <p className="text-gray-300 mb-4 text-center">Choose an amount:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedAmount === amount
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <span className="text-2xl font-bold">${amount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <p className="text-gray-300 mb-4 text-center">Or enter a custom amount:</p>
            <div className="max-w-xs mx-auto">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">Debug Info:</p>
            <p className="text-xs text-gray-400">Stripe Key: {stripeKey ? 'Loaded' : 'Not loaded'}</p>
            <p className="text-xs text-gray-400">Selected Amount: {selectedAmount || 'None'}</p>
            <p className="text-xs text-gray-400">Custom Amount: {customAmount || 'None'}</p>
            <p className="text-xs text-gray-400">Show Payment Form: {showPaymentForm ? 'Yes' : 'No'}</p>
          </div>

          {/* Payment Form */}
          {showPaymentForm && (
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <DonationForm 
                  selectedAmount={selectedAmount} 
                  customAmount={customAmount} 
                />
              </Elements>
            </div>
          )}

          {/* Impact Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Your donation helps keep InnerSpace free for everyone
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-300">Free Access</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-300">AI Support</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-gray-300">Unlimited Use</div>
          </div>
        </div>

        {/* Back to App */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
          >
            ← Back to InnerSpace
          </Link>
        </div>
      </main>
    </div>
  );
} 