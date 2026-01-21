import { Button } from '@/components/ui/button';
import { FolderPlus, PlusIcon } from 'lucide-react';

export const HeaderDashboard = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">
          ¡Hola de nuevo, {`<fullname>`}!
        </h1>
        <h2 className="text-pretty text-muted-foreground">
          Aquí tienes un resumen de tus proyectos y actividades recientes.
        </h2>
      </div>
      <div className="flex gap-2 w-full md:justify-end">
        <Button variant="outline" size="lg" className="">
          <PlusIcon />
          Nueva nota
        </Button>
        <Button size="lg" className="">
          <FolderPlus />
          Nuevo proyecto
        </Button>
      </div>
    </div>
  );
};
