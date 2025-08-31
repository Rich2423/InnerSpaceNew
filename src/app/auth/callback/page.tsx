"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        console.log('Auth callback - Session data:', data);
        console.log('Auth callback - Error:', error);
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/?error=auth_failed');
          return;
        }

        if (data.session) {
          console.log('Auth callback - User authenticated successfully');
          // Successfully authenticated, redirect to home
          router.push('/?success=email_confirmed');
        } else {
          console.log('Auth callback - No session found, checking for email confirmation');
          // Check if this is an email confirmation
          const urlParams = new URLSearchParams(window.location.search);
          const accessToken = urlParams.get('access_token');
          const refreshToken = urlParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('Auth callback - Setting session from URL params');
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (sessionError) {
              console.error('Auth callback - Session error:', sessionError);
              router.push('/?error=session_failed');
              return;
            }
            
            if (sessionData.session) {
              console.log('Auth callback - Session set successfully');
              router.push('/?success=email_confirmed');
            } else {
              console.log('Auth callback - No session after setting tokens');
              router.push('/?error=no_session');
            }
          } else {
            console.log('Auth callback - No tokens in URL, redirecting to home');
            router.push('/');
          }
        }
      } catch (err) {
        console.error('Auth callback - Unexpected error:', err);
        router.push('/?error=unexpected');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Completing sign in...</h2>
        <p className="text-gray-300">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
} 