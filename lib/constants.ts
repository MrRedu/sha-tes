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
