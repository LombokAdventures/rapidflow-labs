-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  service_type TEXT NOT NULL,
  project_description TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget_range TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create demos table
CREATE TABLE public.demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  demo_url TEXT NOT NULL,
  preview_image TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  company TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create company info table
CREATE TABLE public.company_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_description TEXT NOT NULL,
  founder1_name TEXT NOT NULL,
  founder1_title TEXT NOT NULL,
  founder1_bio TEXT NOT NULL,
  founder1_photo TEXT NOT NULL,
  founder1_linkedin TEXT,
  founder2_name TEXT NOT NULL,
  founder2_title TEXT NOT NULL,
  founder2_bio TEXT NOT NULL,
  founder2_photo TEXT NOT NULL,
  founder2_linkedin TEXT,
  email TEXT NOT NULL,
  telegram TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;

-- Public users can insert into contact inquiries and reviews
CREATE POLICY "Anyone can submit contact inquiries"
  ON public.contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit reviews"
  ON public.reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Public users can read published demos, approved reviews, active services, and company info
CREATE POLICY "Anyone can view published demos"
  ON public.demos
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

CREATE POLICY "Anyone can view active services"
  ON public.services
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can view company info"
  ON public.company_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users (admin) have full access
CREATE POLICY "Authenticated users can manage contact inquiries"
  ON public.contact_inquiries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage demos"
  ON public.demos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage reviews"
  ON public.reviews
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage services"
  ON public.services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage company info"
  ON public.company_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default company info
INSERT INTO public.company_info (
  company_description,
  founder1_name,
  founder1_title,
  founder1_bio,
  founder1_photo,
  founder1_linkedin,
  founder2_name,
  founder2_title,
  founder2_bio,
  founder2_photo,
  founder2_linkedin,
  email,
  telegram,
  whatsapp
) VALUES (
  'We are a dynamic duo of experienced engineers passionate about delivering exceptional websites at unprecedented speed. With combined expertise from top American and Korean tech companies, we bring enterprise-level quality to businesses of all sizes.',
  'Zafar Urakov',
  'Software Engineer II',
  'Software Engineer II at Aspen Publishing with extensive experience in full-stack development. Specialized in creating scalable web applications and modern frontend experiences.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zafar',
  '',
  'Salohiddin Urokov',
  'AI Engineer',
  'AI Engineer with deep expertise in intelligent web solutions and cutting-edge technologies. Brings Korean tech industry innovation to every project.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Salohiddin',
  '',
  'contact@webagency.dev',
  '@webagency',
  '+1234567890'
);

-- Insert default services
INSERT INTO public.services (service_name, description, icon_name, display_order, is_active) VALUES
('Landing Pages', 'High-converting single page websites perfect for campaigns, product launches, or service showcases. Optimized for speed and conversions.', 'Rocket', 1, true),
('Multi-Page Websites', 'Complete corporate websites with multiple pages, advanced navigation, and comprehensive content structures.', 'Globe', 2, true),
('Admin Panels', 'Custom dashboards for managing your data, users, and content. Intuitive interfaces with powerful functionality.', 'LayoutDashboard', 3, true),
('E-commerce Solutions', 'Full-featured online stores with payment integration, inventory management, and order processing.', 'ShoppingCart', 4, true),
('Web Applications', 'Complex interactive applications with custom logic, real-time features, and advanced user experiences.', 'Zap', 5, true),
('Landing + Admin Combo', 'Complete solution combining a public-facing landing page with a powerful admin backend for content management.', 'Package', 6, true);

-- Insert sample demos
INSERT INTO public.demos (project_name, category, description, key_features, demo_url, preview_image, is_featured, display_order) VALUES
('TechStart SaaS', 'Landing Pages', 'Modern SaaS landing page with animated sections and conversion-optimized design.', '["Animated hero section", "Pricing tables", "Feature showcase", "Customer testimonials"]', '#', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', true, 1),
('Dashboard Pro', 'Admin Panels', 'Comprehensive admin dashboard with analytics, user management, and data visualization.', '["Real-time analytics", "User management", "Data tables", "Chart visualizations"]', '#', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', true, 2),
('StyleShop', 'E-commerce', 'Modern e-commerce platform with cart, checkout, and payment integration.', '["Product catalog", "Shopping cart", "Secure checkout", "Order tracking"]', '#', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop', false, 3);

-- Insert sample reviews
INSERT INTO public.reviews (reviewer_name, company, rating, review_text, is_approved, approved_at) VALUES
('Michael Chen', 'TechVision Inc', 5, 'Absolutely incredible service! They delivered a complex web application in just 3 days. The quality exceeded our expectations and the team was very professional throughout.', true, NOW()),
('Sarah Johnson', 'StartupHub', 5, 'Best decision we made for our launch. The landing page they created converted 40% better than our previous one. Fast, reliable, and stunning design.', true, NOW()),
('David Rodriguez', 'E-Store Solutions', 5, 'They built our entire e-commerce platform in 2 days. Unbelievable speed without compromising on quality. Highly recommend!', true, NOW());