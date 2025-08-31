"use client";
import React, { useState, useEffect } from 'react';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Force dark mode - clear any existing theme preference
    localStorage.removeItem('innerspace_theme');
    
    // Always use dark mode
    console.log('ClientThemeProvider - Forcing dark mode');
    
    // Apply dark mode classes
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    
    console.log('ClientThemeProvider - Applied dark mode classes');
    
    setIsInitialized(true);
  }, []);

  // Don't render until theme is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading theme...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 