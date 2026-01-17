import type { Metadata } from 'next';
import { Architects_Daughter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { cookies } from 'next/headers';

const architectsDaughter = Architects_Daughter({
  variable: '--font-architects-daughter',
  weight: ['400'],
  subsets: ['latin'],
});

// const timesNewRoman = Times_New_Roman({
//   variable: '--font-times-new-roman',
//   weight: ['400'],
//   subsets: ['latin'],
// });

// const courierNew = Courier_New({
//   variable: '--font-courier-new',
//   weight: ['400'],
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'ShaTes',
  description: 'A simple project management tool.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${architectsDaughter.variable} antialiased`}>
        <Providers sidebarIsOpen={defaultOpen}>{children}</Providers>
      </body>
    </html>
  );
}
