import z from 'zod';

export const formCreateProject = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Debe tener al menos 3 caracteres.',
    })
    .max(64, {
      message: 'Debe tener como máximo 64 caracteres.',
    }),
});

export const formJoinProject = z.object({
  joinCode: z.string().length(8, {
    message: 'Debe tener 8 caracteres.',
  }),
});
