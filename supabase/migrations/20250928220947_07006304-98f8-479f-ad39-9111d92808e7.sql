-- Create table for storing songs
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to read and insert songs (since this is a personal romantic site)
CREATE POLICY "Anyone can view songs" 
ON public.songs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add songs" 
ON public.songs 
FOR INSERT 
WITH CHECK (true);

-- Create a function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;