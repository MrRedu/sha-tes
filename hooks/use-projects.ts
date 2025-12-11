import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  formCreateProject,
  formJoinProject,
} from './validations/use-projects.schema';
import type { User, ProjectWithMembers } from '../types/types';
import { toast } from 'sonner';

type useProjectsParams = {
  _projects?: ProjectWithMembers[];
};

export function useProjects({ _projects = [] }: useProjectsParams = {}) {
  const supabase = createClient();
  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectWithMembers[]>(_projects);

  const form = useForm<z.infer<typeof formCreateProject>>({
    resolver: zodResolver(formCreateProject),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formCreateProject>) {
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');

      const payload = {
        name: values.name.trim(),
      };

      const { data, error } = await supabase
        .from('tbl_projects')
        .insert(payload)
        .select();

      if (error) {
        console.error('Error creating project:', error);
        throw error;
      }

      console.log('Project created successfully:', data);
      setProjects([...projects, data[0]]);
      form.reset();
    } catch (err) {
      console.error('Failed to create project:', err);
      alert(
        `No se pudo crear el proyecto: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }

  const onSubmitWrapper = form.handleSubmit(onSubmit);

  return {
    projects,
    form,
    onSubmit: onSubmitWrapper,
  };
}

export function useProject({ projectId, members = [] }: any) {
  const [_members, setMembers] = useState<User[]>(members);
  const [_pendingMembers, setPendingMembers] = useState<User[]>([]);

  const updateProject = async (
    fields: Partial<{ members: string[]; pending_requests: string[] }>
  ) => {
    if (!projectId) return;
    const supabase = createClient();
    await supabase.from('tbl_projects').update(fields).eq('id', projectId);
  };

  const deleteProject = async () => {
    if (!projectId) return;
    const supabase = createClient();
    await supabase.from('tbl_projects').delete().eq('id', projectId);

    // TODO: Redirección a la lista de proyectos
  };

  const handleRemoveMember = async (userId: string) => {
    const newMembers = _members.filter((m) => m.id !== userId);
    setMembers(newMembers);
    await updateProject({ members: newMembers.map((m) => m.id) });
  };

  const handleAcceptPendingMember = async (userId: string) => {
    const accepted = _pendingMembers.find((m) => m.id === userId);
    if (!accepted) return;
    const newPending = _pendingMembers.filter((m) => m.id !== userId);
    const newMembers = [..._members, accepted];
    setPendingMembers(newPending);
    setMembers(newMembers);
    await updateProject({
      members: newMembers.map((m) => m.id),
      pending_requests: newPending.map((m) => m.id),
    });
  };

  const handleRejectPendingMember = async (userId: string) => {
    const newPending = _pendingMembers.filter((m) => m.id !== userId);
    setPendingMembers(newPending);
    await updateProject({ pending_requests: newPending.map((m) => m.id) });
  };

  return {
    _members,
    _pendingMembers,
    deleteProject,
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,
  };
}

export function useJoinProject({ close }: any) {
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

    try {
      // Llamamos a la función RPC que creamos en SQL
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
        toast.error(`¡Error! ${data.message || 'No se pudo unir'}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión o servidor');
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
