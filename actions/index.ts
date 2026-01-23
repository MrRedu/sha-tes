// import { registerUserAction, loginUserAction } from './auth'
import { fetchProjectsAction, fetchPendingProjectsAction } from "./projects";

export const actions = {
  // auth: {
  //   registerUser: registerUserAction,
  //   loginUser: loginUserAction,
  // },
  projects: {
    fetchProjects: fetchProjectsAction,
    fetchPendingProjects: fetchPendingProjectsAction,
  },
}
