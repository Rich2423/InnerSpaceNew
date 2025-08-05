"use client";
import React, { useState, useEffect } from 'react';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Force light mode on first load - clear any existing dark mode preference
    localStorage.removeItem('innerspace_theme');
    
    // Always start in light mode
    const shouldBeDark = false;
    setIsDarkMode(shouldBeDark);
    console.log('ClientThemeProvider - Forcing light mode, setting isDarkMode to:', shouldBeDark);
    
    // Remove dark mode classes
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    
    console.log('ClientThemeProvider - Applied light mode classes');
    
    setIsInitialized(true);

    // Listen for custom event to update theme from ProfileSection
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newTheme = customEvent.detail.newTheme;
      console.log('ClientThemeProvider - Received theme change event:', newTheme);
      setIsDarkMode(newTheme);
      if (newTheme) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        console.log('ClientThemeProvider - Added dark class');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        console.log('ClientThemeProvider - Removed dark class');
      }
    };

    window.addEventListener('innerspace-theme-change', handleThemeChange);

    return () => {
      window.removeEventListener('innerspace-theme-change', handleThemeChange);
    };
  }, []);

  // Don't render until theme is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading theme...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 