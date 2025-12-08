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
import { User } from '@/app/(authenticated)/dashboard/(projects)/projects/[projectId]/page';
import { type ProjectProps } from '@/components/organisms/project';
import { type Project } from './types/types';

type UseProjectParams = Omit<ProjectProps, 'userId' | 'project'> & {
  projectId: string;
};

type useProjectsParams = {
  projects: Project[];
};

export function useProjects({ projects }: useProjectsParams) {
  const supabase = createClient();
  const { user } = useAuth();

  const [_projects, setProjects] = useState(projects || []);

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
      setProjects([..._projects, data[0]]);
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
    _projects,
    form,
    onSubmit: onSubmitWrapper,
  };
}

export function useProject({
  projectId,
  members,
  pendingMembers,
}: UseProjectParams) {
  const [_members, setMembers] = useState<User[]>(members || []);
  const [_pendingMembers, setPendingMembers] = useState<User[]>(
    pendingMembers || []
  );

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

export function useJoinProject() {
  // const supabase = createClient();
  // const { user } = useAuth();
  const form = useForm<z.infer<typeof formJoinProject>>({
    resolver: zodResolver(formJoinProject),
    defaultValues: {
      joinCode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formJoinProject>) {
    alert(JSON.stringify(values, null, 2));
  }

  const onSubmitWrapper = form.handleSubmit(onSubmit);

  return {
    form,
    onSubmit: onSubmitWrapper,
  };
}
