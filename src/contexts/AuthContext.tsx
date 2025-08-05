"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { username?: string; avatar_url?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug: Check which Supabase client we're using
    console.log('🔍 AuthProvider: Checking Supabase client...');
    console.log('🔍 Using client:', supabase.auth ? 'Real Supabase' : 'Mock Supabase');
    
    // Test Supabase connection
    if (supabase.auth) {
      console.log('🔍 Testing real Supabase connection...');
      supabase.auth.getSession().then((result: any) => {
        console.log('🔍 Supabase connection test result:', result);
      }).catch((error: any) => {
        console.error('❌ Supabase connection test failed:', error);
      });
    }
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    console.log('🔍 Starting signup process...');
    console.log('🔍 Email:', email);
    console.log('🔍 Username:', username);
    console.log('🔍 Redirect URL:', `${window.location.origin}/auth/callback`);
    
    const signUpConfig = {
      email,
      password,
      options: {
        data: {
          username,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    };
    
    console.log('🔍 Signup config:', signUpConfig);
    
    const { data, error } = await supabase.auth.signUp(signUpConfig);
    
    console.log('🔍 Signup response:', { data, error });
    
    if (error) {
      console.error('❌ Signup error:', error);
      return { error };
    } else {
      console.log('✅ Signup successful, email sent');
      console.log('🔍 User data:', data.user);
      console.log('🔍 Session data:', data.session);
      return { error: null };
    }
  };

  const signInWithGoogle = async () => {
    console.log('🔍 Starting Google OAuth sign-in...');
    console.log('🔍 Using Supabase client:', supabase.auth ? 'Real Supabase' : 'Mock Supabase');
    
    const redirectTo = `${window.location.origin}/auth/callback`;
    console.log('🔍 Redirect URI being sent:', redirectTo);
    console.log('🔍 Current origin:', window.location.origin);
    console.log('🔍 Full URL:', window.location.href);
    console.log('🔍 Port:', window.location.port);
    
    // Show alert with the redirect URI for debugging (with longer timeout)
    const alertMessage = `DEBUG: Redirect URI being sent: ${redirectTo}\nPort: ${window.location.port}\nOrigin: ${window.location.origin}`;
    console.log('🔍 ALERT MESSAGE:', alertMessage);
    alert(alertMessage);
    
    // Log the exact OAuth configuration
    const oauthConfig = {
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    };
    console.log('🔍 OAuth config being sent to Supabase:', oauthConfig);
    
    // Also log what Supabase might be sending
    console.log('🔍 Supabase URL:', supabase.supabaseUrl);
    console.log('🔍 Supabase Auth URL:', supabase.auth?.getUrl?.());
    
    try {
      console.log('🔍 About to call supabase.auth.signInWithOAuth...');
      
      // Capture the current URL before the redirect
      const beforeUrl = window.location.href;
      console.log('🔍 URL before OAuth call:', beforeUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth(oauthConfig);
      
      console.log('🔍 Supabase OAuth response:', { data, error });
      
      if (error) {
        console.error('❌ Google OAuth error:', error);
        console.error('❌ Error details:', JSON.stringify(error, null, 2));
        return { error };
      } else {
        console.log('✅ Google OAuth initiated successfully');
        console.log('🔍 This should redirect to Google...');
        console.log('🔍 Data returned:', data);
        
        // Check if we got a URL to redirect to
        if (data?.url) {
          console.log('🔍 Supabase returned redirect URL:', data.url);
          console.log('🔍 ALERT: Supabase redirect URL:', data.url);
          alert(`DEBUG: Supabase redirect URL: ${data.url}`);
          
          // Parse the URL to see what redirect_uri is being sent
          try {
            const url = new URL(data.url);
            const redirectUri = url.searchParams.get('redirect_uri');
            console.log('🔍 Actual redirect_uri being sent to Google:', redirectUri);
            console.log('🔍 ALERT: Actual redirect_uri:', redirectUri);
            alert(`DEBUG: Actual redirect_uri: ${redirectUri}`);
          } catch (e) {
            console.error('❌ Could not parse redirect URL:', e);
          }
        } else {
          console.log('🔍 No URL returned from Supabase OAuth');
          console.log('🔍 ALERT: No URL returned from Supabase OAuth');
          alert('DEBUG: No URL returned from Supabase OAuth');
        }
        
        return { error: null };
      }
    } catch (err) {
      console.error('❌ Unexpected error during Google OAuth:', err);
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: { username?: string; avatar_url?: string }) => {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user?.id);
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 