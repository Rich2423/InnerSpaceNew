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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      return { data, error: null };
    } catch (err) {
      console.error('Sign in exception:', err);
      return { error: { message: 'An unexpected error occurred' } };
    }
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