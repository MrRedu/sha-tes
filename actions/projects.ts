'use server';

import { createClient } from '@/lib/supabase/server';
import { PROJECTS_QUERY } from '@/lib/constants';

export async function fetchProjectsAction(from: number, to: number) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return { projects: [], error: 'Not authenticated' };

  const { data: projects, error } = await supabase
    .from('tbl_projects')
    .select(PROJECTS_QUERY)
    .eq('tbl_project_members.status', 'member') // Only include projects where the user is status: 'member'. That means the user is not 'pending'
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