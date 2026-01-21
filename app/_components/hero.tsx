import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeroProps {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
}

export function Hero({
  badge = '✨ Colaboración sin límites',
  heading = 'Comparte tus notas al instante',
  description = 'ShaTes es la forma más sencilla de compartir notas y colaborar en tiempo real. Genera un código único, compártelo y empieza a trabajar con tu equipo al instante.',
  buttons = {
    primary: {
      text: 'Empieza gratis',
      url: '/login',
    },
    secondary: {
      text: 'Ver características',
      url: '#features',
    },
  },
  image = {
    src: '/sha-tes.svg',
    alt: 'Hero section demo image showing interface components',
  },
}: HeroProps) {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-balance text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            className="max-h-96 w-full rounded-md bg-secondary"
          />
        </div>
      </div>
    </section>
  );
}
