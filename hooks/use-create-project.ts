import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { formCreateProject, type FormCreateProjectType } from './validations/use-projects.schema';
import { useProjectStore } from './use-project-store';

export function useCreateProject() {
  const supabase = createClient();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const setCreateDialogOpen = useProjectStore((state) => state.setCreateDialogOpen);

  const form = useForm<FormCreateProjectType>({
    resolver: zodResolver(formCreateProject),
    defaultValues: {
      title: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormCreateProjectType) => {
      if (!user?.id) throw new Error('Usuario no autenticado');
      const payload = { title: values.title.trim() };
      const { data, error } = await supabase.from('tbl_projects').insert(payload).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Proyecto "${newProject.title}" creado correctamente`);
      setCreateDialogOpen(false);
      form.reset();
      // Optional: redirect
      window.location.href = `${window.location.origin}/dashboard/projects/${newProject.id}`;
    },
    onError: (err) => {
      console.error('Failed to create project:', err);
      toast.error(`Error creando proyecto: ${err instanceof Error ? err.message : String(err)}`);
    },
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
}
