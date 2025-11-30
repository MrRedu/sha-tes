import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full">
              ✨ Colaboración sin límites
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-balance leading-tight">
            Comparte tus notas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              al instante
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            NotesShare te permite compartir notas con un simple código. Colabora
            en tiempo real, sincroniza cambios automáticamente y controla quién
            accede a tus notas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Empieza gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-muted/50 font-semibold bg-transparent"
            >
              Ver demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Confían en nosotros
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {['Empresa 1', 'Empresa 2', 'Empresa 3'].map((company, i) => (
                <div
                  key={i}
                  className="text-muted-foreground font-semibold text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
