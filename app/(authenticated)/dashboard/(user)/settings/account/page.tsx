// interface AccountPageProps {}

import { Separator } from '@/components/ui/separator';

export default function AccountPage() {
  // props: AccountPageProps
  return (
    <div className="w-full">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator className="my-4 " />

      {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
    </div>
  );
}
