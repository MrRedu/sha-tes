import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shareProjectToWhatsApp = ({
  title = 'Título',
  code = '[]',
}: {
  title: string;
  code: string;
}) => {
  if (!code) return;
  const message = `Invitación al proyecto: *${title}*.\nUtiliza este código: *${code}* para solicitar acceso.`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
