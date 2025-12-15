'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { user: userData } = useAuth();
  const user = userData?.user_metadata;

  return (
    <div className="w-full">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="my-4 " />

      <pre>{JSON.stringify(user, undefined, 2)}</pre>
    </div>
  );
}
