export interface User {
  id: string;
  name: string;
  createdAt: string;
}

export type ProjectStatus = "Idea" | "In Progress" | "Full";
export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Project {
  id: string;
  title: string;
  description: string;
  techTags: string[];
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  ownerName: string;
  participantNames: string[];
  createdAt: string;
  updatedAt: string;
}
