// Mock Supabase client for testing without actual Supabase setup
let currentUser: any = null;
const authCallbacks: any[] = [];

export const mockSupabase = {
  auth: {
    getSession: async () => ({ 
      data: { 
        session: currentUser ? { user: currentUser } : null 
      }, 
      error: null 
    }),
    onAuthStateChange: (callback: any) => {
      // Store callback for later use
      authCallbacks.push(callback);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: async ({ email, password }: any) => {
      // Mock successful login
      if (email && password) {
        const user = {
          id: 'mock-user-id',
          email,
          user_metadata: { username: email.split('@')[0] },
          app_metadata: { provider: 'email' },
          created_at: new Date().toISOString()
        };
        currentUser = user;
        
        // Trigger auth state change
        authCallbacks.forEach(callback => callback('SIGNED_IN', { user }));
        
        return {
          data: {
            user,
            session: { user }
          },
          error: null
        };
      }
      return { data: null, error: { message: 'Invalid credentials' } };
    },
    signUp: async ({ email, password, options }: any) => {
      // Mock successful signup
      if (email && password) {
        const user = {
          id: 'mock-user-id',
          email,
          user_metadata: { username: options?.data?.username || email.split('@')[0] },
          app_metadata: { provider: 'email' },
          created_at: new Date().toISOString()
        };
        currentUser = user;
        
        // Trigger auth state change
        authCallbacks.forEach(callback => callback('SIGNED_UP', { user }));
        
        return {
          data: {
            user
          },
          error: null
        };
      }
      return { data: null, error: { message: 'Signup failed' } };
    },
    signInAnonymously: async () => {
      // Mock anonymous login
      const user = {
        id: 'mock-anonymous-id',
        email: null,
        user_metadata: {},
        app_metadata: { provider: 'anonymous' },
        created_at: new Date().toISOString()
      };
      currentUser = user;
      
      // Trigger auth state change
      authCallbacks.forEach(callback => callback('SIGNED_IN', { user }));
      
      return {
        data: {
          user,
          session: { user }
        },
        error: null
      };
    },
    signOut: async () => {
      currentUser = null;
      
      // Trigger auth state change
      authCallbacks.forEach(callback => callback('SIGNED_OUT', null));
      
      return { error: null };
    },
    signInWithOAuth: async ({ provider, options }: any) => {
      // Mock OAuth sign-in
      if (provider === 'google') {
        const user = {
          id: 'mock-google-user-id',
          email: 'user@gmail.com',
          user_metadata: { 
            full_name: 'Mock Google User',
            avatar_url: 'https://via.placeholder.com/150'
          },
          app_metadata: { provider: 'google' },
          created_at: new Date().toISOString()
        };
        currentUser = user;
        
        // Trigger auth state change
        authCallbacks.forEach(callback => callback('SIGNED_IN', { user }));
        
        return {
          data: {
            user,
            session: { user }
          },
          error: null
        };
      }
      return { data: null, error: { message: 'OAuth provider not supported' } };
    }
  },
  from: () => ({
    update: () => ({
      eq: () => ({ error: null })
    })
  })
}; 