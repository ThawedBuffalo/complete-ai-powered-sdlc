import type { Project, User } from "./types";

const now = new Date().toISOString();

export const mockUsers: User[] = [
  { id: "user-alex", name: "Alex", createdAt: now },
  { id: "user-jordan", name: "Jordan", createdAt: now },
  { id: "user-riley", name: "Riley", createdAt: now },
];

export const mockProjects: Project[] = [
  {
    id: "project-1",
    title: "AI Schedule Builder",
    description: "Generate event schedules from attendee goals and constraints.",
    techTags: ["React", "TypeScript", "LLM"],
    difficulty: "Intermediate",
    status: "In Progress",
    ownerName: "Alex",
    participantNames: ["Alex", "Riley"],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "project-2",
    title: "Community Match Hub",
    description: "Match participants to projects by skills and interests.",
    techTags: ["Node", "GraphQL"],
    difficulty: "Beginner",
    status: "Idea",
    ownerName: "Jordan",
    participantNames: ["Jordan"],
    createdAt: now,
    updatedAt: now,
  },
];
