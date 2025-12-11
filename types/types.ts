import type { Database } from './database';

export type Project = Database['public']['Tables']['tbl_projects']['Row'];
export type User = Database['public']['Tables']['tbl_users']['Row'];
export type Members = {
  status: string;
  profile: User;
}[];
export type ProjectMember =
  Database['public']['Tables']['tbl_project_members']['Row'];
export type ProjectWithMembers = Project & { members: Members };

// Responses
export type ProjectsListResponse = ProjectWithMembers[] | null;
