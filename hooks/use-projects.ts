import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Debe tener al menos 3 caracteres.',
    })
    .max(64, {
      message: 'Debe tener como máximo 64 caracteres.',
    }),
});

export function useCreateProjects() {
  const supabase = createClient();
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // CREATE POLICY "Users create own projects" ON tbl_projects
  // FOR INSERT WITH CHECK (auth.uid() = owner_id);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');

      const payload = {
        name: values.name.trim(),
        owner_id: user.id,
        // TODO: asegurar unicidad del join_code antes de insertarlo
        join_code: crypto.randomUUID().split('-')[0],
        members: [user.id],
        pending_requests: [],
        // created_at: new Date().toISOString(), // Supabase lo maneja automáticamente
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
      // limpiar el formulario
      form.reset();
      // refrescar la página para que SSR refleje los cambios
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
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
    form,
    onSubmit: onSubmitWrapper,
  };
}
