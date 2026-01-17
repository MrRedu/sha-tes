import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl border border-border bg-background p-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="text-center space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
                Comienza a Compartir Notas
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                Acceso gratuito a todas las características. Sin tarjeta de
                crédito requerida. Mejora cuando lo necesites.
              </p>
            </div>

            {/* Pricing comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="p-6 rounded-lg border border-border bg-background/50">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Gratuito
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Hasta 5 notas compartidas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>1 código activo por nota</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Sincronización básica</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted/50 bg-transparent"
                >
                  Comenzar
                </Button>
              </div>

              <div className="p-6 rounded-lg border-2 border-primary bg-card">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Premium
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Notas ilimitadas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Códigos ilimitados</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Sincronización en tiempo real</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Actualizar a Premium
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Crear tu primera nota
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
