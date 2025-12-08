import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCode(code: string): string {
  const upperCaseCode = code.toUpperCase();
  const firstPart = upperCaseCode.slice(0, 4);
  const secondPart = upperCaseCode.slice(4);

  return `${firstPart}-${secondPart}`;
}
