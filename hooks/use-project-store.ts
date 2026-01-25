import { create } from 'zustand';

interface ProjectState {
  // Filtering
  searchQuery: string;
  statusFilter: string;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;

  // Create Project Dialog
  isCreateDialogOpen: boolean;
  setCreateDialogOpen: (isOpen: boolean) => void;

  // Manage Project Dialog
  isManageDialogOpen: boolean;
  setManageDialogOpen: (isOpen: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  searchQuery: '',
  statusFilter: 'all',
  isCreateDialogOpen: false,
  isManageDialogOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setCreateDialogOpen: (isOpen) => set({ isCreateDialogOpen: isOpen }),
  setManageDialogOpen: (isOpen) => set({ isManageDialogOpen: isOpen }),
}));
