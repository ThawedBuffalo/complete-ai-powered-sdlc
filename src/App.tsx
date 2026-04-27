import { useReducer, useState } from "react";
import "./App.css";
import { appReducer, initialState } from "./store/appReducer";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetails } from "./components/ProjectDetails";
import { ProjectForm } from "./components/ProjectForm";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { EmptyState } from "./components/EmptyState";
import type { Project } from "./types";

type Modal =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "edit"; project: Project }
  | { kind: "delete"; project: Project };

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modal, setModal] = useState<Modal>({ kind: "none" });

  const currentUser =
    state.users.find((u) => u.id === state.currentUserId) ?? null;
  const selectedProject =
    state.projects.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Hackathon Project Matcher</h1>
        <div className="user-section">
          <label htmlFor="user-select">Current user:</label>
          <select
            id="user-select"
            value={state.currentUserId ?? ""}
            onChange={(e) =>
              dispatch({
                type: "SET_CURRENT_USER",
                payload: { userId: e.target.value || null },
              })
            }
          >
            <option value="">— select user —</option>
            {state.users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="app-main">
        <section className="projects-section" aria-label="Projects">
          <div className="section-header">
            <h2>Projects</h2>
            {currentUser && (
              <button
                className="btn btn-primary"
                onClick={() => setModal({ kind: "create" })}
              >
                + New Project
              </button>
            )}
          </div>

          {state.projects.length === 0 ? (
            <EmptyState message="No projects yet. Create the first one!" />
          ) : (
            <ul className="project-grid" role="list">
              {state.projects.map((project) => (
                <li key={project.id}>
                  <ProjectCard
                    project={project}
                    participantCount={project.participantIds.length}
                    isSelected={selectedId === project.id}
                    onClick={() =>
                      setSelectedId(
                        selectedId === project.id ? null : project.id,
                      )
                    }
                    onEdit={() => setModal({ kind: "edit", project })}
                    onDelete={() => setModal({ kind: "delete", project })}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {selectedProject && (
          <aside className="details-panel">
            <ProjectDetails
              project={selectedProject}
              users={state.users}
              onClose={() => setSelectedId(null)}
            />
          </aside>
        )}
      </main>

      {modal.kind === "create" && (
        <ProjectForm
          mode="create"
          onSubmit={(fields) => {
            dispatch({ type: "CREATE_PROJECT", payload: fields });
            setModal({ kind: "none" });
          }}
          onCancel={() => setModal({ kind: "none" })}
        />
      )}

      {modal.kind === "edit" && (
        <ProjectForm
          mode="edit"
          initial={modal.project}
          onSubmit={(fields) => {
            dispatch({
              type: "UPDATE_PROJECT",
              payload: { id: modal.project.id, ...fields },
            });
            setModal({ kind: "none" });
          }}
          onCancel={() => setModal({ kind: "none" })}
        />
      )}

      {modal.kind === "delete" && (
        <DeleteConfirmDialog
          projectTitle={modal.project.title}
          onConfirm={() => {
            dispatch({
              type: "DELETE_PROJECT",
              payload: { id: modal.project.id },
            });
            if (selectedId === modal.project.id) setSelectedId(null);
            setModal({ kind: "none" });
          }}
          onCancel={() => setModal({ kind: "none" })}
        />
      )}
    </div>
  );
}

export default App;
