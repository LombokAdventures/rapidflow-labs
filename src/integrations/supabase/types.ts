export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      company_info: {
        Row: {
          company_description: string
          email: string
          founder1_bio: string
          founder1_linkedin: string | null
          founder1_name: string
          founder1_photo: string
          founder1_title: string
          founder2_bio: string
          founder2_linkedin: string | null
          founder2_name: string
          founder2_photo: string
          founder2_title: string
          id: string
          telegram: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          company_description: string
          email: string
          founder1_bio: string
          founder1_linkedin?: string | null
          founder1_name: string
          founder1_photo: string
          founder1_title: string
          founder2_bio: string
          founder2_linkedin?: string | null
          founder2_name: string
          founder2_photo: string
          founder2_title: string
          id?: string
          telegram: string
          updated_at?: string
          whatsapp: string
        }
        Update: {
          company_description?: string
          email?: string
          founder1_bio?: string
          founder1_linkedin?: string | null
          founder1_name?: string
          founder1_photo?: string
          founder1_title?: string
          founder2_bio?: string
          founder2_linkedin?: string | null
          founder2_name?: string
          founder2_photo?: string
          founder2_title?: string
          id?: string
          telegram?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          budget_range: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          project_description: string
          service_type: string
          status: string
          timeline: string
        }
        Insert: {
          budget_range?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          project_description: string
          service_type: string
          status?: string
          timeline: string
        }
        Update: {
          budget_range?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          project_description?: string
          service_type?: string
          status?: string
          timeline?: string
        }
        Relationships: []
      }
      demos: {
        Row: {
          category: string
          created_at: string
          demo_url: string
          description: string
          display_order: number
          id: string
          is_featured: boolean
          is_published: boolean
          key_features: Json
          preview_image: string
          project_name: string
        }
        Insert: {
          category: string
          created_at?: string
          demo_url: string
          description: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_published?: boolean
          key_features?: Json
          preview_image: string
          project_name: string
        }
        Update: {
          category?: string
          created_at?: string
          demo_url?: string
          description?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_published?: boolean
          key_features?: Json
          preview_image?: string
          project_name?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          created_at: string
          delivery_time: string
          demo_url: string
          description: string
          display_order: number
          features: string[]
          id: string
          is_published: boolean
          project_name: string
          thumbnail_url: string
        }
        Insert: {
          category: string
          created_at?: string
          delivery_time: string
          demo_url: string
          description: string
          display_order?: number
          features?: string[]
          id?: string
          is_published?: boolean
          project_name: string
          thumbnail_url: string
        }
        Update: {
          category?: string
          created_at?: string
          delivery_time?: string
          demo_url?: string
          description?: string
          display_order?: number
          features?: string[]
          id?: string
          is_published?: boolean
          project_name?: string
          thumbnail_url?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved_at: string | null
          company: string | null
          created_at: string
          id: string
          is_approved: boolean
          rating: number
          review_text: string
          reviewer_name: string
        }
        Insert: {
          approved_at?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          rating: number
          review_text: string
          reviewer_name: string
        }
        Update: {
          approved_at?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean
          rating?: number
          review_text?: string
          reviewer_name?: string
        }
        Relationships: []
      }
      service_templates: {
        Row: {
          category: string
          created_at: string
          demo_url: string
          description: string
          display_order: number
          id: string
          is_active: boolean
          preview_url: string
          template_name: string
        }
        Insert: {
          category: string
          created_at?: string
          demo_url: string
          description: string
          display_order?: number
          id?: string
          is_active?: boolean
          preview_url: string
          template_name: string
        }
        Update: {
          category?: string
          created_at?: string
          demo_url?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          preview_url?: string
          template_name?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string
          display_order: number
          icon_name: string
          id: string
          is_active: boolean
          service_name: string
        }
        Insert: {
          description: string
          display_order?: number
          icon_name: string
          id?: string
          is_active?: boolean
          service_name: string
        }
        Update: {
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean
          service_name?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          company: string | null
          created_at: string
          display_order: number
          id: string
          linkedin: string | null
          name: string
          photo_url: string
          skills: string[] | null
          title: string
          twitter: string | null
          updated_at: string
        }
        Insert: {
          bio: string
          company?: string | null
          created_at?: string
          display_order?: number
          id?: string
          linkedin?: string | null
          name: string
          photo_url: string
          skills?: string[] | null
          title: string
          twitter?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string
          company?: string | null
          created_at?: string
          display_order?: number
          id?: string
          linkedin?: string | null
          name?: string
          photo_url?: string
          skills?: string[] | null
          title?: string
          twitter?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
