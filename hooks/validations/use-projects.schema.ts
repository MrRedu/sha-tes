import z from 'zod';

export const formCreateProject = z.object({
  title: z
    .string()
    .min(3, { message: 'Debe tener al menos 3 caracteres.' })
    .max(64, { message: 'Debe tener como máximo 64 caracteres.' }),
});

export type FormCreateProjectType = z.infer<typeof formCreateProject>;

export const formJoinProject = z.object({
  joinCode: z.string().length(8, {
    message: 'Debe tener 8 caracteres.',
  }),
});

export const formEditProjectSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Debe tener al menos 3 caracteres.' })
    .max(64, { message: 'Debe tener como máximo 64 caracteres.' }),
  description: z.string(),
  status: z.enum(['active', 'inactive', 'archived', 'featured']),
  priority: z.enum(['low', 'medium', 'high']),
});

export const formCreateNotebookSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Debe tener al menos 3 caracteres.' })
    .max(64, { message: 'Debe tener como máximo 64 caracteres.' }),
  description: z.string(),
});
