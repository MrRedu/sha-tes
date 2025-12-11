import { createClient } from '@/lib/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { Projects } from '@/components/organisms/projects';
import type { ProjectsListResponse } from '@/types/types';

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: projects,
    error: projectsError,
  }: PostgrestSingleResponse<ProjectsListResponse> = await supabase
    .from('tbl_projects')
    .select(
      `
      *,
      members:tbl_project_members (
        status,
        profile:tbl_users (
          id,
          full_name,
          avatar_url,
          email
        )
      )
    `
    )
    .order('updated_at', { ascending: false });

  if (projectsError) {
    console.error('Error cargando proyectos:', projectsError.message);
  }

  return <Projects _projects={projects || []} />;
}
