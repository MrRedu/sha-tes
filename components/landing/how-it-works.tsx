import { Card } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'Crea tu Nota',
    description:
      'Comienza escribiendo tu contenido. Puedes usar formato de texto enriquecido, imágenes y más.',
  },
  {
    number: '02',
    title: 'Genera un Código',
    description:
      'Con un clic, genera un código único para compartir. Personaliza los permisos de acceso.',
  },
  {
    number: '03',
    title: 'Comparte el Código',
    description:
      'Envía el código a través de cualquier canal. No se requiere invitación previa.',
  },
  {
    number: '04',
    title: 'Colabora en Vivo',
    description:
      'Tu equipo accede a la nota y colabora en tiempo real. Todos ven los cambios al instante.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Cuatro simples pasos para comenzar a compartir tus notas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%+12px)] w-6 h-1 bg-gradient-to-r from-primary to-transparent"></div>
              )}

              <Card className="p-6 border-border bg-background h-full hover:border-primary/50 transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Visual representation */}
        <div className="mt-16 p-8 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center flex-1 min-w-[120px]">
              <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-sm font-medium text-foreground">Nota</p>
            </div>

            <div className="text-primary text-2xl hidden sm:block">→</div>

            <div className="text-center flex-1 min-w-[120px]">
              <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">🔐</span>
              </div>
              <p className="text-sm font-medium text-foreground">Código</p>
            </div>

            <div className="text-primary text-2xl hidden sm:block">→</div>

            <div className="text-center flex-1 min-w-[120px]">
              <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-sm font-medium text-foreground">Equipo</p>
            </div>

            <div className="text-primary text-2xl hidden sm:block">→</div>

            <div className="text-center flex-1 min-w-[120px]">
              <div className="w-16 h-16 rounded-lg bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm font-medium text-foreground">En Vivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
