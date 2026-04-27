import type { Project } from '../types';

interface Props {
  project: Project;
  participantCount: number;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const STATUS_LABEL: Record<string, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  full: 'Full',
  completed: 'Completed',
};

export function ProjectCard({
  project,
  participantCount,
  isSelected,
  onClick,
  onEdit,
  onDelete,
}: Props) {
  return (
    <article
      className={`project-card${isSelected ? ' project-card--selected' : ''}`}
      aria-selected={isSelected}
    >
      <button
        className="project-card__body"
        onClick={onClick}
        aria-expanded={isSelected}
        aria-label={`View details for ${project.title}`}
      >
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__meta">
          <span className="badge badge--difficulty">
            {DIFFICULTY_LABEL[project.difficulty]}
          </span>
          <span className="badge badge--status">
            {STATUS_LABEL[project.status]}
          </span>
          <span className="project-card__participants">
            {participantCount} participant{participantCount !== 1 ? 's' : ''}
          </span>
        </div>
      </button>
      <div className="project-card__actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onEdit}
          aria-label={`Edit ${project.title}`}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          aria-label={`Delete ${project.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
