'use client';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../components/auth/AuthProvider';

export const HeaderActions = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex bg-transparent"
          asChild
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex bg-transparent"
            asChild
          >
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/login">Comenzar</Link>
          </Button>
        </>
      )}
    </>
  );
};
