import "./App.css";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { mockProjects, mockUsers } from "./mockData";
import {
  normalizeUserName,
  validateUniqueUserName,
  MAX_USER_NAME_LENGTH,
} from "./identity";
import type { Project, User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [projects] = useState<Project[]>(mockProjects);
  const [currentUserId, setCurrentUserId] = useState<string>(mockUsers[0]?.id ?? "");
  const [newUserName, setNewUserName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) ?? null,
    [currentUserId, users],
  );

  const activeUserNames = useMemo(
    () => new Set(projects.flatMap((project) => project.participantNames)),
    [projects],
  );
  const activeUsers = users.filter((user) => activeUserNames.has(user.name));
  const inactiveUsers = users.filter((user) => !activeUserNames.has(user.name));

  const createUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateUniqueUserName(newUserName, users);
    if (error) {
      setValidationError(error);
      return;
    }

    const normalized = normalizeUserName(newUserName);
    const created: User = {
      id: `user-${crypto.randomUUID()}`,
      name: normalized,
      createdAt: new Date().toISOString(),
    };

    setUsers((previous) => [...previous, created]);
    setCurrentUserId(created.id);
    setNewUserName("");
    setValidationError(null);
  };

  const switchUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(event.target.value);
    setValidationError(null);
  };

  return (
    <main className="app-shell">
      <header className="top-nav">
        <h1>Hackathon Project Matcher</h1>
        <p aria-live="polite" className="current-user">
          Current user: <strong>{currentUser?.name ?? "None selected"}</strong>
        </p>
      </header>

      <section className="identity-panel" aria-labelledby="identity-heading">
        <h2 id="identity-heading">Identity</h2>

        <label htmlFor="switch-user">Switch user</label>
        <select
          id="switch-user"
          value={currentUserId}
          onChange={switchUser}
          aria-label="Switch user"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <form onSubmit={createUser} className="create-user-form">
          <label htmlFor="new-user-name">Create user</label>
          <div className="form-row">
            <input
              id="new-user-name"
              name="new-user-name"
              type="text"
              value={newUserName}
              onChange={(event) => setNewUserName(event.target.value)}
              maxLength={MAX_USER_NAME_LENGTH}
              placeholder="Enter unique name"
            />
            <button type="submit">Create user</button>
          </div>
        </form>

        {validationError ? (
          <p className="error-message" role="alert">
            {validationError}
          </p>
        ) : null}
      </section>

      <section className="users-panel" aria-labelledby="users-heading">
        <h2 id="users-heading">Users</h2>
        <div className="user-columns">
          <div>
            <h3>Active users</h3>
            <ul>
              {activeUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Inactive users</h3>
            <ul>
              {inactiveUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
