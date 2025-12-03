'use client';

import { useState } from 'react';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const supabase = createBrowserClient();
      const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
          anyRes.error?.message || 'Error desconocido al iniciar sesión'
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">Accede con Google</p>
        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {loading ? 'Redirigiendo…' : 'Continuar con Google'}
        </button>
      </div>
    </div>
  );
}
