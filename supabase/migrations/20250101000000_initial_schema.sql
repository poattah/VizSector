-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create visualizations table
CREATE TABLE IF NOT EXISTS public.visualizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  chart_type TEXT NOT NULL,
  chart_config JSONB NOT NULL,
  dataset JSONB NOT NULL,
  is_public BOOLEAN DEFAULT false NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create shared_visualizations table
CREATE TABLE IF NOT EXISTS public.shared_visualizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  visualization_id UUID REFERENCES public.visualizations(id) ON DELETE CASCADE NOT NULL,
  shared_with_email TEXT NOT NULL,
  permission TEXT CHECK (permission IN ('view', 'edit')) DEFAULT 'view' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visualizations_user_id ON public.visualizations(user_id);
CREATE INDEX IF NOT EXISTS idx_visualizations_is_public ON public.visualizations(is_public);
CREATE INDEX IF NOT EXISTS idx_visualizations_created_at ON public.visualizations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shared_visualizations_viz_id ON public.shared_visualizations(visualization_id);
CREATE INDEX IF NOT EXISTS idx_shared_visualizations_email ON public.shared_visualizations(shared_with_email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_visualizations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Visualizations policies
CREATE POLICY "Users can view their own visualizations"
  ON public.visualizations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view public visualizations"
  ON public.visualizations FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can insert their own visualizations"
  ON public.visualizations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visualizations"
  ON public.visualizations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visualizations"
  ON public.visualizations FOR DELETE
  USING (auth.uid() = user_id);

-- Shared visualizations policies
CREATE POLICY "Users can view shares for their visualizations"
  ON public.shared_visualizations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.visualizations
      WHERE visualizations.id = shared_visualizations.visualization_id
      AND visualizations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view visualizations shared with them"
  ON public.shared_visualizations FOR SELECT
  USING (
    shared_with_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can create shares for their visualizations"
  ON public.shared_visualizations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.visualizations
      WHERE visualizations.id = shared_visualizations.visualization_id
      AND visualizations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete shares for their visualizations"
  ON public.shared_visualizations FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.visualizations
      WHERE visualizations.id = shared_visualizations.visualization_id
      AND visualizations.user_id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_visualizations_updated_at
  BEFORE UPDATE ON public.visualizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
