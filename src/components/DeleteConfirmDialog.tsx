interface Props {
  projectTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  projectTitle,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Delete confirmation"
    >
      <div className="modal-box modal-box--narrow">
        <h2>Delete Project</h2>
        <p>
          Are you sure you want to delete <strong>{projectTitle}</strong>? This
          will unassign all participants and cannot be undone.
        </p>
        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
