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
import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { PROJECTS_ITEMS_PER_PAGE } from '@/lib/constants';

type useProjectsParams = {
  itemsPerPage?: number;
};

import { useProjectStore } from './use-project-store';

export function useProjects({ itemsPerPage = PROJECTS_ITEMS_PER_PAGE }: useProjectsParams = {}) {
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const statusFilter = useProjectStore((state) => state.statusFilter);

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects', { limit: itemsPerPage, search: searchQuery, status: statusFilter }],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * itemsPerPage;
      const to = from + itemsPerPage - 1;
      const { projects, error } = await actions.projects.fetchProjects(from, to, {
        search: searchQuery,
        status: statusFilter,
      });
      if (error) throw new Error(error);
      return projects;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < itemsPerPage ? undefined : allPages.length;
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    projects: data?.pages.flat() || [],
    isLoading,
    isSearching: isFetching && !isFetchingNextPage && !isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export type ProjectWithNotebooks = ProjectWithMembersAndNotebooks;

export function useProjectDetails(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { project, error } = await actions.projects.fetchProjectById(projectId);
      if (error) throw new Error(error);
      return project as ProjectWithNotebooks;
    },
  });
}

export function useProjectMutations(projectId: string, project?: ProjectWithNotebooks) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const setManageDialogOpen = useProjectStore((state) => state.setManageDialogOpen);

  const form = useForm<z.infer<typeof formEditProjectSchema>>({
    resolver: zodResolver(formEditProjectSchema),
    values: {
      title: project?.title || '',
      description: project?.description || '',
      status: project?.status || 'active',
      priority: project?.priority || 'medium',
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formEditProjectSchema>) => {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        priority: values.priority,
      };
      const { error } = await supabase.from('tbl_projects').update(payload).eq('id', projectId);
      if (error) throw error;
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto actualizado correctamente');
      setManageDialogOpen(false);
    },
    onError: (err) => {
      console.error('Error updating project:', err);
      toast.error('Error al actualizar el proyecto.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('tbl_projects').delete().eq('id', projectId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto eliminado correctamente');
      window.location.href = `${window.location.origin}/dashboard/projects`;
    },
    onError: (err) => {
      console.error('Error deleting project:', err);
      toast.error('Error al eliminar el proyecto.');
    }
  });

  return {
    form,
    onSubmit: form.handleSubmit((values) => updateMutation.mutate(values)),
    updateProject: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProject: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}

export function useMemberMutations(projectId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: Member['status'] }) => {
      const { error } = await supabase
        .from('tbl_project_members')
        .update({ status })
        .eq('project_id', projectId)
        .eq('user_id', userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Estado del miembro actualizado');
    },
    onError: (err) => {
      console.error('Error updating member status:', err);
      toast.error('Error al actualizar el estado del miembro.');
    }
  });

  const removeMemberMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('tbl_project_members')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Miembro eliminado');
    },
    onError: (err) => {
      console.error('Error removing member:', err);
      toast.error('Error al eliminar el miembro.');
    }
  });

  return {
    updateMemberStatus: updateStatusMutation.mutate,
    removeMember: removeMemberMutation.mutate,
  };
}

export function useNotebookMutations(projectId: string) {
  const supabase = createClient();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formCreateNotebookSchema>>({
    resolver: zodResolver(formCreateNotebookSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formCreateNotebookSchema>) => {
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
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Notebook creado correctamente');
      form.reset();
    },
    onError: (err) => {
      console.error('Error creating notebook:', err);
      toast.error('Error al crear el notebook.');
    }
  });

  return {
    form,
    onSubmit: form.handleSubmit((values) => createMutation.mutate(values)),
    createNotebook: createMutation.mutate,
    isCreating: createMutation.isPending,
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
      const result = data as any;
      if (result && result.success) {
        toast.success(`¡Éxito! ${result.message}`);
        close();
        form.reset();
      } else {
        toast.error(`¡Error! ${result?.message || 'No se pudo unir'}`);
        setError(result?.message || 'Error desconocido');
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
