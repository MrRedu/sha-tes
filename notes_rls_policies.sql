-- ============================================
-- RLS (Row Level Security) para tbl_notes
-- ============================================

-- 1. Habilitar RLS en la tabla
ALTER TABLE public.tbl_notes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE LECTURA (SELECT)
-- ============================================

-- Los usuarios pueden ver notas de notebooks a los que pertenecen como miembros
CREATE POLICY "Users can view notes from their project notebooks"
ON public.tbl_notes
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_project_members pm 
      ON pm.project_id = nb.project_id
    WHERE nb.id = tbl_notes.notebook_id
      AND pm.user_id = auth.uid()
      AND pm.status = 'member'
  )
);

-- ============================================
-- POLÍTICAS DE INSERCIÓN (INSERT)
-- ============================================

-- Los usuarios pueden crear notas en notebooks de proyectos donde son miembros
CREATE POLICY "Users can create notes in their project notebooks"
ON public.tbl_notes
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_project_members pm 
      ON pm.project_id = nb.project_id
    WHERE nb.id = notebook_id
      AND pm.user_id = auth.uid()
      AND pm.status = 'member'
  )
  AND creator_id = auth.uid()
);

-- ============================================
-- POLÍTICAS DE ACTUALIZACIÓN (UPDATE)
-- ============================================

-- Los usuarios pueden actualizar notas en notebooks de proyectos donde son miembros
CREATE POLICY "Users can update notes in their project notebooks"
ON public.tbl_notes
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_project_members pm 
      ON pm.project_id = nb.project_id
    WHERE nb.id = tbl_notes.notebook_id
      AND pm.user_id = auth.uid()
      AND pm.status = 'member'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_project_members pm 
      ON pm.project_id = nb.project_id
    WHERE nb.id = notebook_id
      AND pm.user_id = auth.uid()
      AND pm.status = 'member'
  )
);

-- ============================================
-- POLÍTICAS DE ELIMINACIÓN (DELETE)
-- ============================================

-- Opción 1: Solo el creador puede eliminar sus propias notas
CREATE POLICY "Users can delete their own notes"
ON public.tbl_notes
FOR DELETE
USING (
  creator_id = auth.uid()
  AND EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_project_members pm 
      ON pm.project_id = nb.project_id
    WHERE nb.id = tbl_notes.notebook_id
      AND pm.user_id = auth.uid()
      AND pm.status = 'member'
  )
);

-- Opción 2 (ALTERNATIVA): El dueño del proyecto puede eliminar cualquier nota
-- Descomenta esta política si prefieres que el owner del proyecto pueda eliminar notas

CREATE POLICY "Project owners can delete any note in their projects"
ON public.tbl_notes
FOR DELETE
USING (
  EXISTS (
    SELECT 1 
    FROM public.tbl_notebooks nb
    INNER JOIN public.tbl_projects p 
      ON p.id = nb.project_id
    WHERE nb.id = tbl_notes.notebook_id
      AND p.owner_id = auth.uid()
  )
);


-- ============================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================

COMMENT ON POLICY "Users can view notes from their project notebooks" 
  ON public.tbl_notes IS 
  'Permite a los miembros del proyecto ver todas las notas de los notebooks del proyecto';

COMMENT ON POLICY "Users can create notes in their project notebooks" 
  ON public.tbl_notes IS 
  'Permite a los miembros del proyecto crear notas en cualquier notebook del proyecto';

COMMENT ON POLICY "Users can update notes in their project notebooks" 
  ON public.tbl_notes IS 
  'Permite a los miembros del proyecto actualizar cualquier nota del proyecto (colaborativo)';

COMMENT ON POLICY "Users can delete their own notes" 
  ON public.tbl_notes IS 
  'Permite a los usuarios eliminar solo las notas que ellos crearon';
