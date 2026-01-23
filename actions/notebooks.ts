'use server';

import { createClient } from '@/lib/supabase/server';
import type { NotebookWithNotes } from '@/types/types';

export async function fetchNotebookByIdAction(notebookId: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return { notebook: null, error: 'Not authenticated' };

  const { data: notebook, error } = await supabase
    .from('tbl_notebooks')
    .select(
      `
      *,
      creator:creator_id ( id, full_name, avatar_url ),
      notes:tbl_notes ( * ),
      project:tbl_projects ( id, title )
    `
    )
    .eq('id', notebookId)
    .order('position', { foreignTable: 'tbl_notes', ascending: true })
    .single();

  if (error) {
    console.error('Error fetching notebook:', error);
    return { notebook: null, error: error.message };
  }

  // Ensure count_notes is present for consistency
  const transformedNotebook: NotebookWithNotes = {
    ...notebook,
    count_notes: notebook.notes?.length || 0,
  } as any;

  return { notebook: transformedNotebook, error: null };
}
