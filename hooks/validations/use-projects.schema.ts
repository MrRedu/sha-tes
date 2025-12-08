import z from "zod";

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
