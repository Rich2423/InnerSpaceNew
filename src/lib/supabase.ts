import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email?: string
          created_at: string
          updated_at: string
          username?: string
          avatar_url?: string
          is_anonymous: boolean
          pin_hash?: string
        }
        Insert: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          username?: string
          avatar_url?: string
          is_anonymous?: boolean
          pin_hash?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          username?: string
          avatar_url?: string
          is_anonymous?: boolean
          pin_hash?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood: number
          tags: string[]
          created_at: string
          updated_at: string
          is_private: boolean
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
          is_private?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          mood?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
          is_private?: boolean
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          mood: number
          factors: string[]
          activities: string[]
          notes?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood?: number
          factors?: string[]
          activities?: string[]
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: number
          factors?: string[]
          activities?: string[]
          notes?: string
          created_at?: string
        }
      }
      safety_plans: {
        Row: {
          id: string
          user_id: string
          warning_signs: string[]
          coping_strategies: string[]
          emergency_contacts: any[]
          personal_goals: string[]
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          warning_signs?: string[]
          coping_strategies?: string[]
          emergency_contacts?: any[]
          personal_goals?: string[]
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          warning_signs?: string[]
          coping_strategies?: string[]
          emergency_contacts?: any[]
          personal_goals?: string[]
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      wellness_checks: {
        Row: {
          id: string
          user_id: string
          mood: number
          safety: number
          stress: number
          sleep: number
          social: number
          notes?: string
          requires_follow_up: boolean
          follow_up_action?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood?: number
          safety?: number
          stress?: number
          sleep?: number
          social?: number
          notes?: string
          requires_follow_up?: boolean
          follow_up_action?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: number
          safety?: number
          stress?: number
          sleep?: number
          social?: number
          notes?: string
          requires_follow_up?: boolean
          follow_up_action?: string
          created_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          content: string
          nickname: string
          image_url?: string
          likes: number
          replies: any[]
          created_at: string
          is_anonymous: boolean
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          nickname: string
          image_url?: string
          likes?: number
          replies?: any[]
          created_at?: string
          is_anonymous?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          nickname?: string
          image_url?: string
          likes?: number
          replies?: any[]
          created_at?: string
          is_anonymous?: boolean
        }
      }
      vent_entries: {
        Row: {
          id: string
          user_id: string
          content: string
          auto_delete: string
          expires_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          auto_delete?: string
          expires_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          auto_delete?: string
          expires_at?: string
          created_at?: string
        }
      }
    }
  }
}

// Helper functions for common operations
export const auth = {
  // Sign up with email
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    })
  },

  // Sign in with email
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  // Sign in anonymously
  signInAnonymously: async () => {
    return await supabase.auth.signInAnonymously()
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current user
  getCurrentUser: async () => {
    return await supabase.auth.getUser()
  },

  // Get session
  getSession: async () => {
    return await supabase.auth.getSession()
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export const database = {
  // Journal entries
  journal: {
    create: async (entry: Database['public']['Tables']['journal_entries']['Insert']) => {
      return await supabase
        .from('journal_entries')
        .insert(entry)
        .select()
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    },

    update: async (id: string, updates: Database['public']['Tables']['journal_entries']['Update']) => {
      return await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .select()
    },

    delete: async (id: string) => {
      return await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id)
    }
  },

  // Mood tracking
  mood: {
    create: async (entry: Database['public']['Tables']['mood_entries']['Insert']) => {
      return await supabase
        .from('mood_entries')
        .insert(entry)
        .select()
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    }
  },

  // Safety plans
  safety: {
    create: async (plan: Database['public']['Tables']['safety_plans']['Insert']) => {
      return await supabase
        .from('safety_plans')
        .insert(plan)
        .select()
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('safety_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()
    },

    update: async (id: string, updates: Database['public']['Tables']['safety_plans']['Update']) => {
      return await supabase
        .from('safety_plans')
        .update(updates)
        .eq('id', id)
        .select()
    }
  },

  // Wellness checks
  wellness: {
    create: async (check: Database['public']['Tables']['wellness_checks']['Insert']) => {
      return await supabase
        .from('wellness_checks')
        .insert(check)
        .select()
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('wellness_checks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    }
  },

  // Community posts
  community: {
    create: async (post: Database['public']['Tables']['community_posts']['Insert']) => {
      return await supabase
        .from('community_posts')
        .insert(post)
        .select()
    },

    getAll: async () => {
      return await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
    },

    updateLikes: async (id: string, likes: number) => {
      return await supabase
        .from('community_posts')
        .update({ likes })
        .eq('id', id)
        .select()
    }
  },

  // Vent entries
  vent: {
    create: async (vent: Database['public']['Tables']['vent_entries']['Insert']) => {
      return await supabase
        .from('vent_entries')
        .insert(vent)
        .select()
    },

    getByUser: async (userId: string) => {
      return await supabase
        .from('vent_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    },

    delete: async (id: string) => {
      return await supabase
        .from('vent_entries')
        .delete()
        .eq('id', id)
    }
  }
} 