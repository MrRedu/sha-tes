import { Bell, BellOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/ui/typography';

export default function NotificationsPage() {
  return (
    <div className="w-full">
      <div className="flex-none">
        {/* <h3 className="text-lg font-medium">Notifications</h3> */}
        <h3 className="text-lg font-medium">Notificaciones</h3>
        {/* <p className="text-muted-foreground text-sm">Configure how you receive notifications.</p> */}
        <p className="text-muted-foreground text-sm">Configura cómo recibirás notificaciones.</p>
      </div>
      <Separator className="my-6" />

      <div className="space-y-10 max-w-2xl">
        {/* Email Notifications Section */}
        <section className="space-y-6">
          <Typography
            variant="h4"
            className="text-xs uppercase tracking-wider text-muted-foreground/70"
          >
            {/* Email Notifications */}
            Notificaciones por correo electrónico
          </Typography>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Typography variant="p" className="text-sm font-semibold">
                  {/* Email notifications for new notes */}
                  Notificaciones por correo electrónico
                </Typography>
                <Typography variant="p" className="mt-0! text-sm text-muted-foreground text-pretty">
                  {/* Receive an email whenever a team member shares a new note with you. */}
                  Recibirás un correo electrónico cada vez que un miembro del equipo comparta una
                  nueva nota contigo.
                </Typography>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Typography variant="p" className="text-sm font-semibold">
                  {/* Project activity updates */}
                  Actualizaciones de actividad del proyecto
                </Typography>
                <Typography variant="p" className="mt-0! text-sm text-muted-foreground text-pretty">
                  {/* Monthly digests of your project activity and performance stats. */}
                  Resúmenes mensuales de tu actividad y estadísticas de rendimiento del proyecto.
                </Typography>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Platform Updates Section */}
        <section className="space-y-6">
          <Typography
            variant="h4"
            className="text-xs uppercase tracking-wider text-muted-foreground/70"
          >
            Actualizaciones de la plataforma
          </Typography>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Typography variant="p" className="text-sm font-semibold">
                {/* System announcements */}
                Anuncios del sistema
              </Typography>
              <Typography variant="p" className="mt-0! text-sm text-muted-foreground text-pretty">
                {/* Important news regarding platform updates and maintenance schedules. */}
                Noticias importantes sobre actualizaciones y mantenimiento del sistema.
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>
        </section>

        <Separator className="my-4" />

        {/* Push Notifications Card */}
        <div className="bg-muted/30 rounded-2xl p-6 border border-border/40 space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="size-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <Typography variant="p" className="text-sm font-bold">
                Notificaciones Push
              </Typography>
              <Typography variant="p" className="mt-0! text-xs text-muted-foreground text-pretty">
                Actualmente deshabilitado para este navegador
              </Typography>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            {/* Enable Push Notifications */}
            Habilitar Notificaciones Push
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 pt-4">
          {/* Update Preferences */}
          <Button>Actualizar preferencias</Button>
        </div>
      </div>
    </div>
  );
}
