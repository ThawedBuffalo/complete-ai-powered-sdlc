import type { Project, User } from '../types';

interface Props {
  project: Project;
  users: User[];
  onClose: () => void;
}

export function ProjectDetails({ project, users, onClose }: Props) {
  const participants = users.filter((u) =>
    project.participantIds.includes(u.id),
  );

  return (
    <section className="project-details" aria-label="Project details">
      <div className="project-details__header">
        <h2>{project.title}</h2>
        <button
          className="btn btn-icon"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>
      </div>
      <p>{project.description}</p>
      <dl className="project-details__fields">
        <dt>Owner</dt>
        <dd>{project.ownerName}</dd>
        <dt>Difficulty</dt>
        <dd>{project.difficulty}</dd>
        <dt>Status</dt>
        <dd>{project.status}</dd>
        <dt>Created</dt>
        <dd>{new Date(project.createdAt).toLocaleString()}</dd>
        <dt>Updated</dt>
        <dd>{new Date(project.updatedAt).toLocaleString()}</dd>
      </dl>
      <h3>Participants ({participants.length})</h3>
      {participants.length === 0 ? (
        <p>No participants yet.</p>
      ) : (
        <ul>
          {participants.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
