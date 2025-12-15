// interface AppearancePageProps {}

import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from '@/components/organisms/appearance-form';

export default function AppearancePage() {
  // props: AppearancePageProps
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
          Personaliza la apariencia de la aplicación. Cambia entre temas claros
          y oscuros.
        </p>
      </div>
      <Separator className="my-4 " />

      <AppearanceForm />

      {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
    </div>
  );
}
