import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from './_components/appearance-form';

export default function AppearancePage() {
  return (
    <div className="w-full">
      <div className="flex-none">
        <h3 className="text-lg font-medium">
          {/* Appearance */}
          Apariencia
        </h3>
        <p className="text-muted-foreground text-sm">
          {/* Customize the appearance of the app. Automatically switch between day
          and night themes. */}
          Personaliza la apariencia de la aplicación. Cambia entre temas claros y oscuros.
        </p>
      </div>
      <Separator className="my-4 " />

      <AppearanceForm />
    </div>
  );
}
