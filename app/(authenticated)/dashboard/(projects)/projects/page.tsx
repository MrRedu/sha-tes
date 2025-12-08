import { EmptyProjects } from '@/components/organisms/empty-projects';
import { Projects } from '@/components/organisms/projects';
import { Project } from '@/hooks/types/types';
import { createClient } from '@/lib/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects }: PostgrestSingleResponse<Project[]> = await supabase
    .from('tbl_projects')
    .select('*')
    .order('updated_at', { ascending: false });

  // 2. Extraer todos los member IDs únicos
  const allMemberIds =
    projects?.flatMap((p) => p.members)?.filter(Boolean) || [];

  // 3. Obtener todos los miembros únicos
  const { data: members } = await supabase
    .from('tbl_users')
    .select('id, full_name, avatar_url, email')
    .in('id', allMemberIds);

  // const [position, setPosition] = useState("grid")

  if (projects?.length === 0) {
    return <EmptyProjects />;
  }

  return <Projects projects={projects || []} members={members || []} />;
}
