// interface NotificationsPageProps {}

import { Separator } from '@/components/ui/separator';

export default function NotificationsPage() {
  // props: NotificationsPageProps
  return (
    <div className="w-full">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-muted-foreground text-sm">Configure how you receive notifications.</p>
      </div>
      <Separator className="my-4 " />

      {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
    </div>
  );
}
