import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .max(200, {
      message: 'El título no puede exceder 200 caracteres',
    })
    .optional()
    .or(z.literal('')),
  content: z
    .string()
    .min(1, { message: 'El contenido es requerido' })
    .max(5000, { message: 'El contenido no puede exceder 5000 caracteres' }),
  color: z.string(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  is_completed: z.boolean(),
});

export const updateNoteSchema = createNoteSchema.partial();
