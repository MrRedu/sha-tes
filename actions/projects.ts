'use server';

import { createClient } from '@/lib/supabase/server';
import { PROJECTS_QUERY } from '@/lib/constants';

export async function fetchProjectsAction(
  from: number, 
  to: number, 
  options?: { search?: string; status?: string }
) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return { projects: [], error: 'Not authenticated' };

  let query = supabase
    .from('tbl_projects')
    .select(PROJECTS_QUERY)
    .eq('tbl_project_members.status', 'member');

  if (options?.status && options.status !== 'all') {
    // Note: status is on tbl_projects
    query = query.eq('status', options.status as any);
  }

  if (options?.search) {
    query = query.ilike('title', `%${options.search}%`);
  }

  const { data: projects, error } = await query
    .order('updated_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching projects:', error);
    return { projects: [], error: error.message };
  }

  return { projects: projects || [], error: null };
}

export async function fetchPendingProjectsAction() {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) return { pendingProjects: [], error: 'Not authenticated' };

    const { data: pendingProjects, error } =
      await supabase.rpc('get_pending_projects');

    if (error) {
      console.error('Error fetching pending projects:', error);
      return { pendingProjects: [], error: error.message };
    }

    return { pendingProjects: pendingProjects || [], error: null };
  } 