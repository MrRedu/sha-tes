import { GitPullRequest, Lock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  label?: string;
  title?: string;
  features?: Feature[];
  buttonText?: string;
  buttonUrl?: string;
}

export function Features({
  label = 'Features',
  title = 'Todo lo que necesitas para compartir notas de forma segura y colaborar con tu equipo',
  features = [
    {
      heading: 'Comparte',
      description:
        'Genera códigos únicos de acceso para compartir tus notas. Sin necesidad de invitaciones complicadas.',
      icon: <GitPullRequest className="size-4 md:size-6 text-secondary-foreground" />,
    },
    {
      heading: 'Seguridad',
      description:
        'Encriptación end-to-end. Tus notas están protegidas en todo momento. Control total del acceso.',
      icon: <Lock className="size-4 md:size-6 text-secondary-foreground" />,
    },
    {
      heading: 'Sincronización',
      description:
        'Los cambios se actualizan instantáneamente en todos los dispositivos conectados.',
      icon: <Zap className="size-4 md:size-6 text-secondary-foreground" />,
    },
    {
      heading: 'Colabora',
      description: 'Trabaja con tu equipo en las notas, comentarios y actualizaciones en vivo.',
      icon: <Users className="size-4 md:size-6 text-secondary-foreground" />,
    },
  ],
  buttonText = undefined,
  buttonUrl = undefined,
}: FeatureProps) {
  return (
    <section id="features" className="py-32">
      <div className="container">
        {(label || title) && (
          <div className="mb-12 flex max-w-3xl flex-col gap-4">
            <Badge variant="secondary">{label}</Badge>
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{title}</h2>
          </div>
        )}
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div className="flex gap-6 space-y-4 rounded-lg md:block" key={idx}>
              <span className="bg-secondary flex size-10 shrink-0 items-center justify-center rounded-full md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">{feature.heading}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        {buttonUrl && (
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
