// interface AppearancePageProps {}

import { Separator } from '@/components/ui/separator';

export default function AppearancePage() {
  // props: AppearancePageProps
  return (
    <div className="w-full">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator className="my-4 " />

      {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
    </div>
  );
}
