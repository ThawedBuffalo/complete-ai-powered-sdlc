export type Difficulty = "easy" | "medium" | "hard";
export type ProjectStatus = "open" | "in-progress" | "full" | "completed";

export interface User {
  id: string;
  name: string;
  projectId: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status: ProjectStatus;
  ownerName: string;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormFields {
  title: string;
  description: string;
  difficulty: Difficulty;
  status: ProjectStatus;
}

export interface AppState {
  users: User[];
  projects: Project[];
  currentUserId: string | null;
}

export type AppAction =
  | { type: "CREATE_PROJECT"; payload: ProjectFormFields }
  | { type: "UPDATE_PROJECT"; payload: { id: string } & ProjectFormFields }
  | { type: "DELETE_PROJECT"; payload: { id: string } }
  | { type: "SET_CURRENT_USER"; payload: { userId: string | null } };
