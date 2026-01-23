// import { registerUserAction, loginUserAction } from './auth'
import {
  fetchProjectsAction,
  fetchPendingProjectsAction,
  fetchProjectByIdAction,
} from './projects';
import { fetchNotebookByIdAction } from './notebooks';

export const actions = {
  // auth: {
  //   registerUser: registerUserAction,
  //   loginUser: loginUserAction,
  // },
  projects: {
    fetchProjects: fetchProjectsAction,
    fetchPendingProjects: fetchPendingProjectsAction,
    fetchProjectById: fetchProjectByIdAction,
  },
  notebooks: {
    fetchNotebookById: fetchNotebookByIdAction,
  },
};
