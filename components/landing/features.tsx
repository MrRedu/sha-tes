import { Card } from '@/components/ui/card';
import { Share2, Lock, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Share2,
    title: 'Comparte con un Código',
    description:
      'Genera códigos únicos de acceso para compartir tus notas. Sin necesidad de invitaciones complicadas.',
  },
  {
    icon: Lock,
    title: 'Seguridad Garantizada',
    description:
      'Encriptación end-to-end. Tus notas están protegidas en todo momento. Control total del acceso.',
  },
  {
    icon: Zap,
    title: 'Sincronización en Tiempo Real',
    description:
      'Los cambios se actualizan instantáneamente en todos los dispositivos conectados.',
  },
  {
    icon: Users,
    title: 'Colaboración Flexible',
    description:
      'Trabaja con tu equipo en las notas, comentarios y actualizaciones en vivo.',
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Características Poderosas
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Todo lo que necesitas para compartir notas de forma segura y
            colaborar con tu equipo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 border-border bg-background hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
