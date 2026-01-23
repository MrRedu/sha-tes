import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  formCreateNotebookSchema,
  formCreateProject,
  type FormCreateProjectType,
  formEditProjectSchema,
  formJoinProject,
} from './validations/use-projects.schema';
import type {
  ProjectWithMembers,
  ProjectWithMembersAndNotebooks,
  Member,
  Notebook,
} from '../types/types';
import { toast } from 'sonner';
import { actions } from '@/actions';

import { PROJECTS_ITEMS_PER_PAGE } from '@/lib/constants';

type useProjectsParams = {
  _projects?: ProjectWithMembers[];
  itemsPerPage?: number;
};

type useProjectParams = {
  _project: ProjectWithMembersAndNotebooks;
};

export function useProjects({ _projects = [], itemsPerPage = PROJECTS_ITEMS_PER_PAGE }: useProjectsParams = {}) {
  const supabase = createClient();
  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectWithMembers[]>(_projects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(_projects.length >= itemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const form = useForm<FormCreateProjectType>({
    resolver: zodResolver(formCreateProject),
    defaultValues: {
      title: '',
    },
  });

  async function loadMoreProjects() {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const from = (nextPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { projects: newProjects, error } = await actions.projects.fetchProjects(from, to);

    if (error) {
      toast.error('Error al cargar más proyectos');
    } else {
      if (newProjects.length < itemsPerPage) {
        setHasMore(false);
      }
      setProjects((prev) => [...prev, ...newProjects]);
      setPage(nextPage);
    }
    setIsLoadingMore(false);
  }

  async function onSubmit(values: FormCreateProjectType) {
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');

      const payload = {
        title: values.title.trim(),
      };

      const { data, error } = await supabase.from('tbl_projects').insert(payload).select();

      if (error) {
        toast.error(`Error creando proyecto: ${error.message}`);
        console.error('Error creating project:', error);
        throw error;
      }

      setProjects([...projects, data[0] as ProjectWithMembers]);
      toast.success(`Proyecto "${data[0].title}" creado correctamente`);
      // TODO: Redirigir con Next.js redirect() maybe
      window.location.href = `${window.location.origin}/dashboard/projects/${data[0].id}`;
    } catch (err) {
      console.error('Failed to create project:', err);
      toast.error(`Error creando proyecto: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const onSubmitWrapper = form.handleSubmit(onSubmit);

  return {
    projects,
    form,
    onSubmit: onSubmitWrapper,
    loadMoreProjects,
    hasMore,
    isLoadingMore,
  };
}

export function useProject({ _project }: useProjectParams) {
  const { user } = useAuth();
  const supabase = createClient();
  const projectId = _project?.id;

  const [project, setProject] = useState(_project);
  const [members, setMembers] = useState<Member[]>(_project.members);
  const [notebooks, setNotebooks] = useState<Notebook[]>(_project.notebooks);
  const [projectName, setProjectName] = useState(_project?.title || '');
  const [projectDescription, setProjectDescription] = useState(_project?.description || '');

  const formEditProject = useForm<z.infer<typeof formEditProjectSchema>>({
    resolver: zodResolver(formEditProjectSchema),
    defaultValues: {
      title: _project?.title || '',
      description: _project?.description || '',
    },
  });

  const formCreateNotebook = useForm<z.infer<typeof formCreateNotebookSchema>>({
    resolver: zodResolver(formCreateNotebookSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmitEditProject = formEditProject.handleSubmit(async (values) => {
    try {
      if (!projectId) return;

      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
      };

      const { error } = await supabase.from('tbl_projects').update(payload).eq('id', projectId);

      if (error) throw error;

      setProjectName(payload.title);
      setProjectDescription(payload.description);
      toast.success('Proyecto actualizado correctamente');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Error al actualizar el proyecto.');
    }
  });

  const onSubmitCreateNotebook = formCreateNotebook.handleSubmit(async (values) => {
    // return alert(JSON.stringify(values, null, 2));
    try {
      if (!projectId) return;

      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        project_id: projectId,
        creator_id: user?.id as string,
      };

      const { data, error } = await supabase
        .from('tbl_notebooks')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      setNotebooks([...notebooks, data]);
      formCreateNotebook.reset();

      toast.success('Notebook creado correctamente');
    } catch (error) {
      console.error('Error creating notebook:', error);
      toast.error('Error al crear el notebook.');
    }
  });

  // --- Funciones de Utilidad ---
  const updateMemberStatus = async (
    userId: string,
    newStatus: Member['status'],
    successMessage: string
  ) => {
    if (!projectId) return false;

    try {
      const { error } = await supabase
        .from('tbl_project_members')
        .update({ status: newStatus })
        .eq('project_id', projectId)
        .eq('user_id', userId);

      if (error) throw error;

      // 1. Actualizar el estado local (optimización de UI)
      setMembers(
        (prevMembers) =>
          prevMembers?.map((member) =>
            member?.id === userId ? { ...member, status: newStatus } : member
          ) || null
      );

      toast.success(successMessage);
      return true;
    } catch (error) {
      console.error('Error updating member status:', error);
      toast.error('Error al actualizar el estado del miembro.');
      return false;
    }
  };

  const removeMemberEntry = async (userId: string, successMessage: string) => {
    if (!projectId) return false;

    try {
      // Borramos la fila de la tabla pivote
      const { error } = await supabase
        .from('tbl_project_members')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

      if (error) throw error;

      // 1. Actualizar el estado local (eliminamos el miembro del array)
      setMembers((prevMembers) => prevMembers?.filter((member) => member?.id !== userId) || null);

      toast.success(successMessage);
      return true;
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Error al eliminar el miembro.');
      return false;
    }
  };

  // --- Funciones Exportadas ---

  const handleAcceptPendingMember = (userId: string) => {
    return updateMemberStatus(userId, 'member', 'Miembro aceptado. ');
  };

  const handleRejectPendingMember = (userId: string) => {
    // Opción 1: Cambiar a 'rejected'
    // return updateMemberStatus(userId, 'rejected', 'Solicitud rechazada.');

    // Opción 2: Eliminar completamente la fila de la solicitud pendiente (si no necesitas el historial)
    return removeMemberEntry(userId, 'Solicitud rechazada y eliminada.');
  };

  const handleRemoveMember = (userId: string) => {
    return removeMemberEntry(userId, 'Miembro eliminado del proyecto.');
  };

  const deleteProject = async () => {
    if (!projectId) return;

    try {
      await supabase.from('tbl_projects').delete().eq('id', projectId);
      toast.success('Proyecto eliminado correctamente');

      // TODO: Redirigir con Next.js redirect()
      window.location.href = `${window.location.origin}/dashboard/projects`;
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const currentMembers = members.filter((member) => member.status === 'member') || [];
  const pendingMembers = members.filter((member) => member.status === 'pending') || [];

  return {
    project,
    notebooks,

    members,
    currentMembers,
    pendingMembers,

    projectName,
    projectDescription,
    formEditProject,
    onSubmitEditProject,

    deleteProject,
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,

    formCreateNotebook,
    onSubmitCreateNotebook,
  };
}

export function useJoinProject({ close }: { close: () => void }) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useForm<z.infer<typeof formJoinProject>>({
    resolver: zodResolver(formJoinProject),
    defaultValues: {
      joinCode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formJoinProject>) {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.rpc('request_join_project', {
        code_input: values.joinCode,
      });

      if (error) throw error;

      // La función devuelve un objeto JSON custom
      if (data && data.success) {
        toast.success(`¡Éxito! ${data.message}`);
        close();
        form.reset();
      } else {
        toast.error(`¡Error! ${data?.message || 'No se pudo unir'}`);
        setError(data?.message || 'Error desconocido');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión o servidor');
      setError('Error de conexión o servidor');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
  };
}
