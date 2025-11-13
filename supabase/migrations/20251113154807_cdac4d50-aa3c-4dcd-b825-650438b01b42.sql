-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  bio TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  linkedin TEXT,
  twitter TEXT,
  skills TEXT[],
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_templates table
CREATE TABLE public.service_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  template_name TEXT NOT NULL,
  description TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_projects table
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage team members"
ON public.team_members FOR ALL USING (true) WITH CHECK (true);

-- RLS Policies for service_templates
CREATE POLICY "Anyone can view active templates"
ON public.service_templates FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage templates"
ON public.service_templates FOR ALL USING (true) WITH CHECK (true);

-- RLS Policies for portfolio_projects
CREATE POLICY "Anyone can view published projects"
ON public.portfolio_projects FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can manage projects"
ON public.portfolio_projects FOR ALL USING (true) WITH CHECK (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-photos', 'team-photos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-screenshots', 'project-screenshots', true);

-- Storage policies for team-photos
CREATE POLICY "Anyone can view team photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

CREATE POLICY "Authenticated users can upload team photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update team photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete team photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-photos' AND auth.role() = 'authenticated');

-- Storage policies for project-screenshots
CREATE POLICY "Anyone can view project screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-screenshots');

CREATE POLICY "Authenticated users can upload project screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-screenshots' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project screenshots"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-screenshots' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-screenshots' AND auth.role() = 'authenticated');

-- Update existing tables: Remove e-commerce references
UPDATE public.services SET is_active = false WHERE service_name ILIKE '%e-commerce%' OR service_name ILIKE '%ecommerce%';
UPDATE public.demos SET is_published = false WHERE category ILIKE '%e-commerce%' OR category ILIKE '%ecommerce%';

-- Update services table to remove e-commerce combo
DELETE FROM public.services WHERE service_name = 'Landing + Admin Combo';

-- Insert new service entry for Complete Solutions
INSERT INTO public.services (service_name, description, icon_name, display_order)
VALUES (
  'Complete Solutions',
  'Full-stack solutions combining beautiful landing pages with powerful admin panels. Get everything you need to launch and manage your online presence.',
  'Layers',
  5
) ON CONFLICT DO NOTHING;