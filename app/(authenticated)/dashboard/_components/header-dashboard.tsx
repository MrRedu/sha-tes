import { createClient } from '@/lib/supabase/server';
import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { Button } from '@/components/ui/button';
import { FolderPlus, PlusIcon } from 'lucide-react';

export const HeaderDashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';

  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">¡Hola de nuevo, {fullName}!</h1>
        <h2 className="text-pretty text-muted-foreground">
          Aquí tienes un resumen de tus proyectos y actividades recientes.
        </h2>
      </div>
      <div className="flex gap-2 w-full md:justify-end">
        <Button variant="outline" size="lg" className="">
          <PlusIcon />
          Nueva nota
        </Button>
        <DialogCreateProject
          triggerComponent={
            <Button size="lg" className="">
              <FolderPlus />
              Nuevo proyecto
            </Button>
          }
        />
      </div>
    </div>
  );
};
