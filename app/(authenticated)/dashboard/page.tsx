import { CardProject } from '@/components/molecules/card-project';
import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { EmptyProjects } from '@/components/organisms/empty-projects';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase/server';
import { Grid3x3, Rows3, SearchIcon } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
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

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Proyectos</h1>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar" type="search" className="pl-10 " />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="shared" />
            <Label htmlFor="shared">Compartidos</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <ButtonGroup>
            <Button variant="outline" size="icon-sm" aria-label="List">
              <Rows3 />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Grid">
              <Grid3x3 />
            </Button>
          </ButtonGroup>

          <DialogCreateProject />
        </div>
      </div>
      {/* Cards */}
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project) => {
          // Filtrar miembros específicos de este proyecto
          const projectMembers =
            members?.filter((member) => project.members?.includes(member.id)) ||
            [];

          return (
            <CardProject
              key={project.id}
              project={project}
              projectMembers={projectMembers}
            />
          );
        })}
      </div>
    </div>
  );
}
