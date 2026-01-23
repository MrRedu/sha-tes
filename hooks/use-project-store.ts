import { create } from 'zustand';
import { type FormCreateProjectType } from './validations/use-projects.schema';
import { type UseFormReturn } from 'react-hook-form';

interface ProjectState {
  // Filtering
  searchQuery: string;
  statusFilter: string;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;

  // Create Project Dialog
  isCreateDialogOpen: boolean;
  setCreateDialogOpen: (isOpen: boolean) => void;
  
  // Create Project Form (optional, but requested for global onSubmit)
  // Note: Managing the full form instance in Zustand can be tricky with RHF,
  // but we can store the "trigger" for submission or the state.
  // For now, let's just keep the visibility and filters here.
}

export const useProjectStore = create<ProjectState>((set) => ({
  searchQuery: '',
  statusFilter: 'all',
  isCreateDialogOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setCreateDialogOpen: (isOpen) => set({ isCreateDialogOpen: isOpen }),
}));
