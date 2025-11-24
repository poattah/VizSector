export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      visualizations: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          chart_type: string
          chart_config: Json
          dataset: Json
          is_public: boolean
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          chart_type: string
          chart_config: Json
          dataset: Json
          is_public?: boolean
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          chart_type?: string
          chart_config?: Json
          dataset?: Json
          is_public?: boolean
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shared_visualizations: {
        Row: {
          id: string
          visualization_id: string
          shared_with_email: string
          permission: 'view' | 'edit'
          created_at: string
        }
        Insert: {
          id?: string
          visualization_id: string
          shared_with_email: string
          permission?: 'view' | 'edit'
          created_at?: string
        }
        Update: {
          id?: string
          visualization_id?: string
          shared_with_email?: string
          permission?: 'view' | 'edit'
          created_at?: string
        }
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
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type Profile = Tables<'profiles'>;
export type Visualization = Tables<'visualizations'>;
export type SharedVisualization = Tables<'shared_visualizations'>;
