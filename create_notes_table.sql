-- Tabla de notas con características avanzadas para una app llamativa
CREATE TABLE public.tbl_notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  notebook_id uuid NOT NULL,
  creator_id uuid NOT NULL,
  
  -- Contenido de la nota
  title text,  -- Título opcional de la nota
  content text NOT NULL,  -- Contenido principal de la nota
  
  -- Organización y visualización
  color text DEFAULT '#ffffff',  -- Color de la nota para categorización visual
  position integer DEFAULT 0,  -- Orden de la nota dentro del notebook (para drag & drop)
  
  -- Estado y prioridad
  is_completed boolean DEFAULT false,  -- Para marcar notas como completadas (útil para to-dos)
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Metadatos
  last_edited_by uuid,  -- Último usuario que editó la nota
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT tbl_notes_pkey PRIMARY KEY (id),
  CONSTRAINT tbl_notes_notebook_id_fkey FOREIGN KEY (notebook_id) 
    REFERENCES public.tbl_notebooks(id) ON DELETE CASCADE,
  CONSTRAINT tbl_notes_creator_id_fkey FOREIGN KEY (creator_id) 
    REFERENCES public.tbl_users(id),
  CONSTRAINT tbl_notes_last_edited_by_fkey FOREIGN KEY (last_edited_by) 
    REFERENCES public.tbl_users(id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_notes_notebook_id ON public.tbl_notes(notebook_id);
CREATE INDEX idx_notes_creator_id ON public.tbl_notes(creator_id);
CREATE INDEX idx_notes_position ON public.tbl_notes(notebook_id, position);
CREATE INDEX idx_notes_priority ON public.tbl_notes(priority);
CREATE INDEX idx_notes_is_completed ON public.tbl_notes(is_completed);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tbl_notes_updated_at 
  BEFORE UPDATE ON public.tbl_notes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE public.tbl_notes IS 'Tabla de notas dentro de notebooks';
COMMENT ON COLUMN public.tbl_notes.title IS 'Título opcional de la nota';
COMMENT ON COLUMN public.tbl_notes.content IS 'Contenido principal de la nota';
COMMENT ON COLUMN public.tbl_notes.color IS 'Color hexadecimal para categorización visual';
COMMENT ON COLUMN public.tbl_notes.position IS 'Orden de la nota para drag & drop';
COMMENT ON COLUMN public.tbl_notes.is_completed IS 'Marca si la nota está completada (útil para to-dos)';
COMMENT ON COLUMN public.tbl_notes.priority IS 'Nivel de prioridad: low, normal, high, urgent';
COMMENT ON COLUMN public.tbl_notes.last_edited_by IS 'Último usuario que editó la nota';
