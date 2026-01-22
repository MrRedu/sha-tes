import Link from 'next/link';
import { CardCurrentProject } from './card-current-project';
import type { Member } from '@/types/types';

const CURRENT_PROJECTS: {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'revision' | 'completed';
  icon: string;
  members: Member[];
  updated_at: string;
}[] = [
  {
    id: '1',
    name: 'Rediseño UI Dashboard',
    description: 'Optimización de flujos de usuarios y componentes para la v2.',
    status: 'active',
    icon: 'folder',
    members: [
      {
        id: '1',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',

        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '2',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',

        status: 'string',
      },
    ],
    updated_at: '2026-01-21T17:03:03-04:00',
  },
  {
    id: '2',
    name: 'Integración API REST',
    description: 'Conexión del feed de actividad con los webhooks del sistema central.',
    status: 'revision',
    icon: 'folder',
    members: [
      {
        id: '1',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
    ],
    updated_at: '2026-01-21T17:03:03-04:00',
  },
  {
    id: '3',
    name: 'Proyecto 3',
    description: 'Descripción del proyecto 3',
    icon: 'folder',
    status: 'completed',
    members: [
      {
        id: '1',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
      {
        id: '1',
        full_name: 'Juan',
        avatar_url: 'https://github.com/mrredu.png',
        email: 'x',
        created_at: '2026-01-21T17:03:03-04:00',
        status: 'string',
      },
    ],
    updated_at: '2026-01-21T17:03:03-04:00',
  },
];

export const CurrentProjects = () => {
  return (
    <section className="w-full space-y-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Proyectos actuales</h3>
        <Link href="/dashboard/projects" className="hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {CURRENT_PROJECTS.slice(0, 2).map((project) => (
          <CardCurrentProject
            key={project.id}
            status={project.status}
            title={project.name}
            members={project.members}
            description={project.description}
            updatedAt={project.updated_at}
          />
        ))}
      </div>
    </section>
  );
};
