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
  const { data: projects } = await supabase.from('tbl_projects').select('*');
  // const [position, setPosition] = useState("bottom")

  if (!projects) {
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
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card>
              <CardHeader>
                <h3>{project.name}</h3>
              </CardHeader>
              <CardContent>
                <code>
                  ID: {project.id} | Join Code: {project.join_code}
                </code>
              </CardContent>
              <CardFooter>
                {project.members.length === 1 && (
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${project.members[0]}`}
                      alt={project.members[0]}
                    />
                    <AvatarFallback>
                      {project.members[0].slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                {project.members.length > 1 && (
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                    {/* TODO */}
                    {project.members.map((member: string[]) => (
                      <Avatar key={member.toString()}>
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`}
                          alt={member.toString()}
                        />
                        <AvatarFallback>HP</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
