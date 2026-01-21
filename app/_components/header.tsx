import Link from 'next/link';
import { HeaderActions } from './header-actions';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/sha-tes.svg"
              alt="ShaTes"
              width={24}
              height={24}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">ShaTes</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Características
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ¿Cómo Funciona?
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Precios
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <HeaderActions />
          </div>
        </div>
      </div>
    </header>
  );
}
