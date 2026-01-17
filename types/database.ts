export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      tbl_notebooks: {
        Row: {
          created_at: string;
          creator_id: string;
          description: string | null;
          id: string;
          name: string;
          project_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          creator_id: string;
          description?: string | null;
          id?: string;
          name: string;
          project_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          creator_id?: string;
          description?: string | null;
          id?: string;
          name?: string;
          project_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tbl_notebooks_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tbl_notebooks_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_projects';
            referencedColumns: ['id'];
          },
        ];
      };
      tbl_notes: {
        Row: {
          color: string | null;
          content: string;
          created_at: string;
          creator_id: string;
          id: string;
          is_completed: boolean | null;
          last_edited_by: string | null;
          notebook_id: string;
          position: number | null;
          priority: string | null;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          color?: string | null;
          content: string;
          created_at?: string;
          creator_id: string;
          id?: string;
          is_completed?: boolean | null;
          last_edited_by?: string | null;
          notebook_id: string;
          position?: number | null;
          priority?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          color?: string | null;
          content?: string;
          created_at?: string;
          creator_id?: string;
          id?: string;
          is_completed?: boolean | null;
          last_edited_by?: string | null;
          notebook_id?: string;
          position?: number | null;
          priority?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tbl_notes_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tbl_notes_last_edited_by_fkey';
            columns: ['last_edited_by'];
            isOneToOne: false;
            referencedRelation: 'tbl_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tbl_notes_notebook_id_fkey';
            columns: ['notebook_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_notebooks';
            referencedColumns: ['id'];
          },
        ];
      };
      tbl_project_members: {
        Row: {
          created_at: string | null;
          id: string;
          project_id: string;
          status: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          project_id: string;
          status?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          project_id?: string;
          status?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tbl_project_members_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tbl_project_members_user_id_fkey1';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_users';
            referencedColumns: ['id'];
          },
        ];
      };
      tbl_projects: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          join_code: string;
          name: string;
          owner_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          join_code: string;
          name: string;
          owner_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          join_code?: string;
          name?: string;
          owner_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tbl_projects_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'tbl_users';
            referencedColumns: ['id'];
          },
        ];
      };
      tbl_users: {
        Row: {
          avatar_url: string;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
        };
        Insert: {
          avatar_url: string;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
        };
        Update: {
          avatar_url?: string;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_pending_projects: {
        Args: never;
        Returns: {
          owner_full_name: string;
          owner_id: string;
          project_description: string;
          project_id: string;
          project_name: string;
        }[];
      };
      get_project_details: {
        Args: { project_id_input: string };
        Returns: {
          created_at: string;
          description: string | null;
          id: string;
          join_code: string;
          name: string;
          owner_id: string;
          updated_at: string;
        }[];
        SetofOptions: {
          from: '*';
          to: 'tbl_projects';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      is_project_member: {
        Args: { project_id_input: string; user_id_input: string };
        Returns: boolean;
      };
      is_project_pending: {
        Args: { project_id_input: string; user_id_input: string };
        Returns: boolean;
      };
      request_join_project: { Args: { code_input: string }; Returns: Json };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
