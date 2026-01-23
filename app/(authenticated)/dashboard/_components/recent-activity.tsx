import { Switch } from '@/components/ui/switch';

export const RecentActivity = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Actividad reciente</h2>
        <Switch />
      </div>
    </div>
  );
};
