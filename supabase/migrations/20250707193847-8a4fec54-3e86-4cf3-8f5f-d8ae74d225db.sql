-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create policies for avatar uploads
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create hospitals table for map functionality
CREATE TABLE public.hospitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hospital', 'clinic', 'pharmacy', 'dispensary')),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  phone TEXT,
  services TEXT[],
  is_sha_accredited BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  has_emergency BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on hospitals table
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to hospitals
CREATE POLICY "Hospitals are viewable by everyone" 
ON public.hospitals 
FOR SELECT 
USING (true);

-- Add some sample hospital data for Nairobi
INSERT INTO public.hospitals (name, type, latitude, longitude, address, phone, services, is_sha_accredited, is_public, has_emergency) VALUES
('Kenyatta National Hospital', 'hospital', -1.3013, 36.8067, 'Hospital Road, Nairobi', '+254-20-2726300', ARRAY['emergency', 'surgery', 'cardiology', 'oncology', 'MRI'], true, true, true),
('Nairobi Hospital', 'hospital', -1.2920, 36.8219, 'Argwings Kodhek Road, Nairobi', '+254-20-2845000', ARRAY['emergency', 'surgery', 'cardiology', 'maternity', 'MRI'], true, false, true),
('Aga Khan University Hospital', 'hospital', -1.2669, 36.8074, '3rd Parklands Avenue, Nairobi', '+254-20-3662000', ARRAY['emergency', 'surgery', 'cardiology', 'pediatrics', 'MRI'], true, false, true),
('Gertrudes Children Hospital', 'hospital', -1.2921, 36.7902, 'Muthaiga Road, Nairobi', '+254-20-3763474', ARRAY['pediatrics', 'surgery', 'emergency'], true, false, true),
('Mathare North Health Centre', 'clinic', -1.2586, 36.8572, 'Mathare North, Nairobi', '+254-20-4440986', ARRAY['general medicine', 'maternal health'], false, true, false),
('Westlands Health Centre', 'clinic', -1.2650, 36.8066, 'Westlands, Nairobi', '+254-20-4448925', ARRAY['general medicine', 'vaccination'], false, true, false),
('Goodlife Pharmacy Westgate', 'pharmacy', -1.2675, 36.8063, 'Westgate Shopping Mall, Nairobi', '+254-709-691000', ARRAY['pharmacy', 'consultation'], false, false, false),
('Dawa Life Pharmacy', 'pharmacy', -1.2920, 36.8219, 'City Centre, Nairobi', '+254-20-2240584', ARRAY['pharmacy', 'consultation'], false, false, false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hospitals_updated_at
BEFORE UPDATE ON public.hospitals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();