'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Google } from '@/components/ui/svgs/google';
import { Apple } from '@/components/ui/svgs/apple';

export function FormLogin({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const supabase = createClient();
      const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      // `signInWithOAuth` returns an object; if there is an immediate error
      // we surface it to the user instead of silently failing.
      // In normal flow Supabase will redirect the browser and this code won't
      // continue executing, but if the provider is not enabled we'll get an
      // error object here.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyRes: any = result;
      if (anyRes.error) {
        setErrorMessage(
          anyRes.error?.message || 'Error desconocido al iniciar sesión',
        );
        setLoading(false);
      }
    } catch (err) {
      console.error('Google sign-in error', err);
      setErrorMessage((err as Error)?.message ?? String(err));
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">¡Bienvenido!</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Apple o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" disabled>
                  <Apple />
                  Continuar con Apple
                </Button>
                {errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Google />
                  {loading ? 'Iniciando...' : 'Continuar con Google'}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                O continúa con
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required disabled />
              </Field>
              <Field>
                <Button type="submit" disabled>
                  Continuar
                </Button>
                <FieldDescription className="text-center">
                  ¿No tienes una cuenta? <Link href="#">Regístrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al hacer clic en continuar, aceptas nuestros{' '}
        <Link href="#">Términos de servicio</Link> y nuestra{' '}
        <Link href="#">Política de privacidad</Link>.
      </FieldDescription>
    </div>
  );
}
