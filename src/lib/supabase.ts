// lib/supabase.ts - Fixed Supabase configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bwegsjtluxqnlployjlf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing')
}

// Create Supabase client with proper configuration for Vercel
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // This fixes CORS issues with Vercel deployments
    flowType: 'pkce'
  },
  // Remove global headers as they can cause CORS issues
  db: {
    schema: 'public',
  },
})

// Helper function to handle auth state changes
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error.message)
      return null
    }
    return session
  } catch (error) {
    console.error('Error in getSession:', error)
    return null
  }
}

// Helper function for sign in with better error handling
export const signInWithPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      // Handle specific auth errors
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password')
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please check your email and confirm your account')
      } else {
        throw new Error(error.message)
      }
    }
    
    return data
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

// Helper function for sign up
export const signUpWithPassword = async (email: string, password: string, username = '') => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          is_anonymous: false
        }
      }
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}

// Helper function for sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          username: string | null
          avatar_url: string | null
          is_anonymous: boolean | null
          pin_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean | null
          pin_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean | null
          pin_hash?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood: number | null
          tags: string[] | null
          is_private: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: number | null
          tags?: string[] | null
          is_private?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          mood?: number | null
          tags?: string[] | null
          is_private?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 