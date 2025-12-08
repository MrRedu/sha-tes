export interface Project {
  id: string;
  join_code: string;
  members: string[];
  name: string;
  owner_id: string;
  pending_requests: string[];
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
}
