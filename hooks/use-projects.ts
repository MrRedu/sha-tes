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
import type {
  ProjectWithMembers,
  Project,
  Members,
  MemberStatus,
} from '../types/types';
import { toast } from 'sonner';

type useProjectsParams = {
  _projects?: ProjectWithMembers[];
};

type useProjectParams = {
  projectId: Project['id'];
  _members: Members;
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
        toast.error(`Error creando proyecto: ${error.message}`);
        console.error('Error creating project:', error);
        throw error;
      }

      // console.log('Project created successfully:', data);
      setProjects([...projects, data[0]]);
      toast.success(`Proyecto "${data[0].name}" creado correctamente`);
      // TODO: Redirigir con Next.js redirect() maybe
      window.location.href = `${window.location.origin}/dashboard/projects/${data[0].id}`;
    } catch (err) {
      console.error('Failed to create project:', err);
      toast.error(
        `Error creando proyecto: ${
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

export function useProject({ projectId, _members }: useProjectParams) {
  const supabase = createClient();
  const [members, setMembers] = useState<Members>(_members);

  // --- Funciones de Utilidad ---

  const updateMemberStatus = async (
    userId: string,
    newStatus: MemberStatus,
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
            member.profile?.id === userId
              ? { ...member, status: newStatus }
              : member
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
      const { data, error } = await supabase
        .from('tbl_project_members')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

      console.log(data);

      if (error) throw error;

      // 1. Actualizar el estado local (eliminamos el miembro del array)
      setMembers(
        (prevMembers) =>
          prevMembers?.filter((member) => member.profile?.id !== userId) || null
      );

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

  const currentMembers =
    members.filter((member) => member.status === 'member') || [];
  const pendingMembers =
    members.filter((member) => member.status === 'pending') || [];

  return {
    members,
    currentMembers,
    pendingMembers,
    deleteProject,
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,
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
