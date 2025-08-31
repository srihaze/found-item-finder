-- Create items table for lost and found items
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  name TEXT NOT NULL,
  description TEXT,
  contact TEXT NOT NULL,
  place TEXT NOT NULL,
  date DATE,
  image_url TEXT,
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is required)
CREATE POLICY "Items are viewable by everyone" 
ON public.items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create items" 
ON public.items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update items" 
ON public.items 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public) VALUES ('item-images', 'item-images', true);

-- Create policies for image uploads
CREATE POLICY "Item images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'item-images');

CREATE POLICY "Anyone can upload item images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'item-images');

CREATE POLICY "Anyone can update item images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'item-images');