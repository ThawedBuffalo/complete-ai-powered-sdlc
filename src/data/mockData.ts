import type { User, Project } from '../types';

export const initialUsers: User[] = [
  { id: 'u1', name: 'Alice', projectId: 'p1' },
  { id: 'u2', name: 'Bob', projectId: 'p1' },
  { id: 'u3', name: 'Carol', projectId: null },
];

export const initialProjects: Project[] = [
  {
    id: 'p1',
    title: 'AI Code Reviewer',
    description:
      'A tool that automatically reviews pull requests using large language models to catch bugs and style issues.',
    difficulty: 'hard',
    status: 'open',
    ownerName: 'Alice',
    participantIds: ['u1', 'u2'],
    createdAt: '2026-04-25T10:00:00.000Z',
    updatedAt: '2026-04-25T10:00:00.000Z',
  },
  {
    id: 'p2',
    title: 'Green Hackathon Tracker',
    description:
      'Tracks the carbon footprint of hackathon submissions and visualizes team impact.',
    difficulty: 'medium',
    status: 'open',
    ownerName: 'Carol',
    participantIds: [],
    createdAt: '2026-04-25T11:00:00.000Z',
    updatedAt: '2026-04-25T11:00:00.000Z',
  },
];
