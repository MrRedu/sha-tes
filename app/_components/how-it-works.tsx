import { Timeline } from '../../components/molecules/timeline';

const timelineData = [
  {
    id: 1,
    // date: 'January 15, 2024',
    title: 'Crea tu Nota',
    description:
      'Comienza escribiendo tu contenido. Puedes usar formato de texto enriquecido, imágenes y más.',
  },
  {
    id: 2,
    // date: 'March 30, 2024',
    title: 'Genere un Código',
    description:
      'Con un clic, genera un código único para compartir. Personaliza los permisos de acceso.',
  },
  {
    id: 3,
    // date: 'June 15, 2024',
    title: 'Comparte el Código',
    description: 'Envía el código a través de cualquier canal. No se requiere invitación previa.',
  },
  {
    id: 4,
    // date: 'September 1, 2024',
    title: 'Colabora en Vivo',
    description:
      'Tu equipo accede a la nota y colabora en tiempo real. Todos ven los cambios al instante.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 ">
      <div className="container">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">¿Cómo Funciona?</h2>
          <p className="text-muted-foreground lg:text-xl">
            Cuatro simples pasos para comenzar a compartir tus notas
          </p>
        </div>

        <div className="w-full py-12">
          <Timeline items={timelineData} />
        </div>
      </div>
    </section>
  );
}
