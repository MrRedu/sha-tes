import { type Metadata } from 'next';
import { ProjectsClient } from './_components/projects-client';
import { PROJECTS_ITEMS_PER_PAGE } from '@/lib/constants';
import { actions } from '@/actions';

export const metadata: Metadata = {
  title: 'Proyectos',
};

export default async function ProjectsPage() {
  const { projects, error: projectsError } = await actions.projects.fetchProjects(0, PROJECTS_ITEMS_PER_PAGE - 1);
  const { pendingProjects, error: pendingProjectsError } = await actions.projects.fetchPendingProjects();

  if (projectsError) console.error('Error cargando proyectos:', projectsError);
  if (pendingProjectsError) console.error('Error cargando proyectos pendientes:', pendingProjectsError);

  return (
    <ProjectsClient
      _projects={projects || []}
      _pendingProjects={pendingProjects || []}
    />
  );
}
