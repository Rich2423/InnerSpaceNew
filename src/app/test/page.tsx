"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function TestPage() {
  const [envVars, setEnvVars] = useState<any>({});
  const [supabaseInfo, setSupabaseInfo] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
    });

    // Test Supabase client
    try {
      const testSession = supabase.auth.getSession();
      setSupabaseInfo({
        clientType: supabase.auth ? 'Real Supabase' : 'Mock Supabase',
        session: 'Checking...'
      });
      
      // Handle the Promise properly
      testSession.then(({ data }: any) => {
        setSupabaseInfo((prev: any) => ({
          ...prev,
          session: data.session ? 'Available' : 'Not Available'
        }));
      }).catch((error: any) => {
        setSupabaseInfo((prev: any) => ({
          ...prev,
          session: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error')
        }));
      });
    } catch (error) {
      setSupabaseInfo({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Environment Test</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(envVars, null, 2)}
            </pre>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Supabase Client:</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(supabaseInfo, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 