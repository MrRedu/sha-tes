import { Constants } from '@/types/database';

export const STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  archived: 'Archivado',
  featured: 'Destacado',
};

export const PRIORITY_LABELS: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

export const STATUS_OPTIONS = Constants.public.Enums.project_status.map((status) => ({
  value: status,
  label: STATUS_LABELS[status] || status.charAt(0).toUpperCase() + status.slice(1),
}));

export const PRIORITY_OPTIONS = Constants.public.Enums.project_priority.map((priority) => ({
  value: priority,
  label: PRIORITY_LABELS[priority] || priority.charAt(0).toUpperCase() + priority.slice(1),
}));

export const PROJECTS_ITEMS_PER_PAGE = 7;

export const PROJECTS_QUERY = `
  id,
  title,
  description,
  owner_id,
  join_code,
  updated_at,
  created_at,
  status, 
  priority,
  members:tbl_project_members (
    status,
    ...tbl_users (
      id,
      full_name,
      avatar_url,
      email,
      created_at
    )
  )
`;

export const PROJECT_WITH_NOTEBOOKS_QUERY = `
  id,
  title,
  description,
  owner_id,
  join_code,
  updated_at,
  created_at,
  status, 
  priority,
  members:tbl_project_members (
    status,
    ...tbl_users ( 
      id, 
      full_name, 
      avatar_url,
      email,
      created_at
    )
  ),
  notebooks:tbl_notebooks (
    id,
    name,
    description,
    created_at,
    updated_at,
    creator:creator_id ( id, full_name, avatar_url ),
    count_notes:tbl_notes ( count )
  )
`;
