import Image from 'next/image';

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

export function Footer({
  logo = {
    src: '/sha-tes.svg',
    alt: 'ShaTes Logo',
    title: 'ShaTes',
    url: '/',
  },
  tagline = 'Comparte con un solo clic.',
  menuItems = [
    {
      title: 'Producto',
      links: [
        { text: 'Características', url: '#features' },
        { text: 'Cómo funciona', url: '#how-it-works' },
        { text: 'Precios', url: '#pricing' },
        { text: 'API', url: '#' },
      ],
    },
    {
      title: 'Compañía',
      links: [
        { text: 'Sobre nosotros', url: '#' },
        { text: 'Blog', url: '#' },
        { text: 'Carreras', url: '#' },
        { text: 'Contacto', url: '#' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { text: 'Ayuda', url: '#' },
        { text: 'Comunidad', url: '#' },
        { text: 'Privacidad', url: '#' },
        { text: 'Términos', url: '#' },
      ],
    },
    {
      title: 'Social',
      links: [
        { text: 'Twitter', url: '#' },
        { text: 'Instagram', url: '#' },
        { text: 'LinkedIn', url: '#' },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} ShaTes. Todos los derechos reservados.`,
  bottomLinks = [
    { text: 'Términos y Condiciones', url: '#' },
    { text: 'Política de Privacidad', url: '#' },
  ],
}: FooterProps) {
  return (
    <section className="py-32 w-full px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Image src={logo.src} alt={logo.alt} width={100} height={100} />
              </div>
              <p className="mt-4 font-bold text-balance">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary font-medium">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
