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
export type MemberStatus = 'pending' | 'member' | 'rejected';

export type OwnerProfile = {
  full_name: string;
};
export type PendingProject = {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  owner_profile: OwnerProfile | null;
};

export type PendingProjectEntry = {
  project: PendingProject | null;
};

export type RpcPendingProject = {
  project_id: string;
  project_name: string;
  project_description: string | null;
  owner_id: string;
  owner_full_name: string;
};

// Responses
export type ProjectsListResponse = ProjectWithMembers[] | null;
export type ProjectResponse = ProjectWithMembers | null;
export type PendingProjectsListResponse = PendingProjectEntry[] | null;
