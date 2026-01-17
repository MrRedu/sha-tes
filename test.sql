-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.tbl_notebooks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  creator_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tbl_notebooks_pkey PRIMARY KEY (id),
  CONSTRAINT tbl_notebooks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.tbl_projects(id),
  CONSTRAINT tbl_notebooks_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.tbl_users(id)
);
CREATE TABLE public.tbl_project_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  user_id uuid NOT NULL,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'member'::text, 'rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tbl_project_members_pkey PRIMARY KEY (id),
  CONSTRAINT tbl_project_members_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.tbl_projects(id),
  CONSTRAINT tbl_project_members_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES public.tbl_users(id)
);
CREATE TABLE public.tbl_projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text,
  join_code text NOT NULL UNIQUE,
  owner_id uuid NOT NULL,
  CONSTRAINT tbl_projects_pkey PRIMARY KEY (id),
  CONSTRAINT tbl_projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.tbl_users(id)
);
CREATE TABLE public.tbl_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text NOT NULL,
  avatar_url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tbl_users_pkey PRIMARY KEY (id),
  CONSTRAINT tbl_users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);