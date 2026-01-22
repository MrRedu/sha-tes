import type { Database } from './database';

// User from tbl_users
export type User = Database['public']['Tables']['tbl_users']['Row'];

// Member from tbl_project_members
// User + status
export type Member = User & {
  status: Database['public']['Tables']['tbl_project_members']['Row']['status'];
};

export type ProjectWithMembers = Project & { members: Member[] };

export type OwnerProfile = {
  full_name: string;
};
export type PendingProject = {
  id: string;
  title: string;
  description: string | null;
  owner_id: string;
  owner_profile: OwnerProfile | null;
};

export type PendingProjectEntry = {
  project: PendingProject | null;
};

export type RpcPendingProjects =
  Database['public']['Functions']['get_pending_projects']['Returns'];

export type Notebook = Database['public']['Tables']['tbl_notebooks']['Row'];

// Note
export type Note = Database['public']['Tables']['tbl_notes']['Row'];
export type NotebookWithNotes = Notebook & {
  notes: Note[];
  creator: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
};

// Project
export type Project = Database['public']['Tables']['tbl_projects']['Row'];
export type ProjectWithMembersAndNotebooks = Project & {
  members: Member[];
  notebooks: Notebook[];
};

// Responses
export type ProjectsListResponse = ProjectWithMembers[] | null;
export type ProjectResponse = ProjectWithMembers | null;
export type PendingProjectsListResponse = PendingProjectEntry[] | null;
