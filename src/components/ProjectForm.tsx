import { useState } from "react";
import type {
  Difficulty,
  Project,
  ProjectFormFields,
  ProjectStatus,
} from "../types";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "../utils/sanitize";

interface Props {
  mode: "create" | "edit";
  initial?: Project;
  onSubmit: (fields: ProjectFormFields) => void;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

function validate(title: string, description: string): FormErrors {
  const errors: FormErrors = {};
  const trimmedTitle = title.trim();
  const trimmedDesc = description.trim();

  if (!trimmedTitle) {
    errors.title = "Title is required.";
  } else if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    errors.title = `Title must be ${MAX_TITLE_LENGTH} characters or fewer.`;
  }

  if (!trimmedDesc) {
    errors.description = "Description is required.";
  } else if (trimmedDesc.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }

  return errors;
}

export function ProjectForm({ mode, initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [difficulty, setDifficulty] = useState<Difficulty>(
    initial?.difficulty ?? "medium",
  );
  const [status, setStatus] = useState<ProjectStatus>(
    initial?.status ?? "open",
  );
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(title, description);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ title, description, difficulty, status });
  }

  const heading = mode === "create" ? "New Project" : "Edit Project";
  const submitLabel = mode === "create" ? "Create" : "Save";

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={heading}
    >
      <div className="modal-box">
        <h2>{heading}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="project-title">Title *</label>
            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-describedby={errors.title ? "title-error" : undefined}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <span id="title-error" className="field-error" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="project-description">Description *</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <span id="description-error" className="field-error" role="alert">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="project-difficulty">Difficulty *</label>
            <select
              id="project-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="project-status">Status *</label>
            <select
              id="project-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="full">Full</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
