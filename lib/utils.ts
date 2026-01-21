import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCode(code: string): string {
  const firstPart = code.slice(0, 4);
  const secondPart = code.slice(4);

  return `${firstPart}-${secondPart}`;
}
