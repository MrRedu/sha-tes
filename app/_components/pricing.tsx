'use client';

import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface PricingProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

export function Pricing({
  heading = 'Planes de Precios',
  description = 'Elige el plan que mejor se adapte a tus necesidades de colaboración',
  plans = [
    {
      id: 'free',
      name: 'Gratis',
      description: 'Ideal para uso personal y pequeños proyectos',
      monthlyPrice: '$0',
      yearlyPrice: '$0',
      features: [
        { text: 'Hasta 5 notebooks' },
        { text: 'Notas ilimitadas' },
        { text: 'Códigos de acceso temporales' },
        { text: 'Sincronización básica' },
      ],
      button: {
        text: 'Empezar ya',
        url: '/login',
      },
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Para profesionales y equipos colaborativos',
      monthlyPrice: '$12',
      yearlyPrice: '$99',
      features: [
        { text: 'Notebooks ilimitados' },
        { text: 'Códigos personalizados' },
        { text: 'Historial de versiones' },
        { text: 'Soporte prioritario' },
        { text: 'Exportación avanzada (PDF/MD)' },
      ],
      button: {
        text: 'Obtener Pro',
        url: '/login',
      },
    },
  ],
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{heading}</h2>
          <p className="text-muted-foreground lg:text-xl">{description}</p>
          <div className="flex items-center gap-3 text-lg">
            Mensual
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            Anual
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex w-80 flex-col justify-between text-left">
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-2xl font-semibold">
                      {isYearly ? '/yr' : '/mo'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {plan.id === 'pro' && (
                    <p className="mb-3 font-semibold">Todo lo de Gratis, más:</p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <a href={plan.button.url}>{plan.button.text}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
