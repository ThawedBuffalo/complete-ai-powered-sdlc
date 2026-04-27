import type { AppState, AppAction } from "../types";
import { initialUsers, initialProjects } from "../data/mockData";
import { sanitizeText } from "../utils/sanitize";

export const initialState: AppState = {
  users: initialUsers,
  projects: initialProjects,
  currentUserId: "u1",
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "CREATE_PROJECT": {
      const currentUser = state.users.find((u) => u.id === state.currentUserId);
      const now = new Date().toISOString();
      const newProject = {
        id: crypto.randomUUID(),
        title: sanitizeText(action.payload.title),
        description: sanitizeText(action.payload.description),
        difficulty: action.payload.difficulty,
        status: action.payload.status,
        ownerName: currentUser?.name ?? "Unknown",
        participantIds: [],
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, projects: [...state.projects, newProject] };
    }

    case "UPDATE_PROJECT": {
      const now = new Date().toISOString();
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                title: sanitizeText(action.payload.title),
                description: sanitizeText(action.payload.description),
                difficulty: action.payload.difficulty,
                status: action.payload.status,
                updatedAt: now,
              }
            : p,
        ),
      };
    }

    case "DELETE_PROJECT": {
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload.id),
        users: state.users.map((u) =>
          u.projectId === action.payload.id ? { ...u, projectId: null } : u,
        ),
      };
    }

    case "SET_CURRENT_USER": {
      return { ...state, currentUserId: action.payload.userId };
    }

    default:
      return state;
  }
}
