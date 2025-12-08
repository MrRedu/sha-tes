import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { EmptyProjects } from '@/components/organisms/empty-projects';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase/server';
import { LayoutPanelTop, SearchIcon } from 'lucide-react';
import Link from 'next/link';

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
            <Input placeholder="Buscar" className="pl-10" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="shared" />
            <Label htmlFor="shared">Compartidos</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <LayoutPanelTop /> Vista
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Cambiar layout</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={'grid'}
                // onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card>
                <CardHeader>
                  <h3>{project.name}</h3>
                </CardHeader>
                <CardContent>
                  <code>
                    ID: {project.id} | Join: {project.join_code}
                  </code>
                </CardContent>
                <CardFooter>
                  <AvatarGroup members={projectMembers} />{' '}
                  {/* ✅ Miembros completos */}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
