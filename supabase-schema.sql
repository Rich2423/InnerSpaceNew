-- InnerSpace Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE auto_delete_option AS ENUM ('1hour', '1day', '1week', 'never');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    pin_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries table
CREATE TABLE public.journal_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 10),
    tags TEXT[] DEFAULT '{}',
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood entries table
CREATE TABLE public.mood_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 10) NOT NULL,
    factors TEXT[] DEFAULT '{}',
    activities TEXT[] DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety plans table
CREATE TABLE public.safety_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    warning_signs TEXT[] DEFAULT '{}',
    coping_strategies TEXT[] DEFAULT '{}',
    emergency_contacts JSONB DEFAULT '[]',
    personal_goals TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wellness checks table
CREATE TABLE public.wellness_checks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 10) NOT NULL,
    safety INTEGER CHECK (safety >= 1 AND safety <= 10) NOT NULL,
    stress INTEGER CHECK (stress >= 1 AND stress <= 10) NOT NULL,
    sleep INTEGER CHECK (sleep >= 1 AND sleep <= 10) NOT NULL,
    social INTEGER CHECK (social >= 1 AND social <= 10) NOT NULL,
    notes TEXT,
    requires_follow_up BOOLEAN DEFAULT false,
    follow_up_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community posts table
CREATE TABLE public.community_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    nickname TEXT NOT NULL,
    image_url TEXT,
    likes INTEGER DEFAULT 0,
    replies JSONB DEFAULT '[]',
    is_anonymous BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vent entries table
CREATE TABLE public.vent_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    auto_delete auto_delete_option NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON public.journal_entries(created_at DESC);
CREATE INDEX idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON public.mood_entries(created_at DESC);
CREATE INDEX idx_safety_plans_user_id ON public.safety_plans(user_id);
CREATE INDEX idx_wellness_checks_user_id ON public.wellness_checks(user_id);
CREATE INDEX idx_wellness_checks_created_at ON public.wellness_checks(created_at DESC);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_vent_entries_user_id ON public.vent_entries(user_id);
CREATE INDEX idx_vent_entries_expires_at ON public.vent_entries(expires_at);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vent_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Journal entries policies
CREATE POLICY "Users can view own journal entries" ON public.journal_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON public.journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Mood entries policies
CREATE POLICY "Users can view own mood entries" ON public.mood_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries" ON public.mood_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries" ON public.mood_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries" ON public.mood_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Safety plans policies
CREATE POLICY "Users can view own safety plans" ON public.safety_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own safety plans" ON public.safety_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own safety plans" ON public.safety_plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own safety plans" ON public.safety_plans
    FOR DELETE USING (auth.uid() = user_id);

-- Wellness checks policies
CREATE POLICY "Users can view own wellness checks" ON public.wellness_checks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wellness checks" ON public.wellness_checks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wellness checks" ON public.wellness_checks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wellness checks" ON public.wellness_checks
    FOR DELETE USING (auth.uid() = user_id);

-- Community posts policies (anonymous but user-specific)
CREATE POLICY "Anyone can view community posts" ON public.community_posts
    FOR SELECT USING (true);

CREATE POLICY "Users can insert community posts" ON public.community_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own community posts" ON public.community_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own community posts" ON public.community_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Vent entries policies
CREATE POLICY "Users can view own vent entries" ON public.vent_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vent entries" ON public.vent_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vent entries" ON public.vent_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vent entries" ON public.vent_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, is_anonymous)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'is_anonymous', 'false')::boolean);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_safety_plans_updated_at
    BEFORE UPDATE ON public.safety_plans
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to clean up expired vent entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_vents()
RETURNS void AS $$
BEGIN
    DELETE FROM public.vent_entries 
    WHERE expires_at IS NOT NULL 
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a cron job to clean up expired vents (runs every hour)
SELECT cron.schedule(
    'cleanup-expired-vents',
    '0 * * * *',
    'SELECT public.cleanup_expired_vents();'
); 