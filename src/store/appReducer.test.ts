import { describe, it, expect } from "vitest";
import { appReducer, initialState } from "./appReducer";
import type { AppState } from "../types";

describe("appReducer", () => {
  // ── CREATE_PROJECT ──────────────────────────────────────
  describe("CREATE_PROJECT", () => {
    it("adds a new project to the list", () => {
      const state = appReducer(initialState, {
        type: "CREATE_PROJECT",
        payload: {
          title: "Test Project",
          description: "A test description",
          difficulty: "medium",
          status: "open",
        },
      });
      expect(state.projects).toHaveLength(initialState.projects.length + 1);
      expect(state.projects.at(-1)?.title).toBe("Test Project");
    });

    it("sets ownerName from the current user", () => {
      const state = appReducer(
        { ...initialState, currentUserId: "u1" },
        {
          type: "CREATE_PROJECT",
          payload: {
            title: "New",
            description: "desc",
            difficulty: "easy",
            status: "open",
          },
        },
      );
      expect(state.projects.at(-1)?.ownerName).toBe("Alice");
    });

    it('falls back to "Unknown" when no current user is set', () => {
      const state = appReducer(
        { ...initialState, currentUserId: null },
        {
          type: "CREATE_PROJECT",
          payload: {
            title: "Orphan",
            description: "desc",
            difficulty: "easy",
            status: "open",
          },
        },
      );
      expect(state.projects.at(-1)?.ownerName).toBe("Unknown");
    });

    it("auto-sets id, createdAt, and updatedAt", () => {
      const before = Date.now();
      const state = appReducer(initialState, {
        type: "CREATE_PROJECT",
        payload: {
          title: "X",
          description: "Y",
          difficulty: "easy",
          status: "open",
        },
      });
      const created = state.projects.at(-1)!;
      expect(created.id).toBeTruthy();
      expect(new Date(created.createdAt).getTime()).toBeGreaterThanOrEqual(
        before,
      );
      expect(created.createdAt).toBe(created.updatedAt);
    });

    it("starts with empty participantIds", () => {
      const state = appReducer(initialState, {
        type: "CREATE_PROJECT",
        payload: {
          title: "X",
          description: "Y",
          difficulty: "easy",
          status: "open",
        },
      });
      expect(state.projects.at(-1)?.participantIds).toEqual([]);
    });

    it("sanitizes title and description (strips HTML and trims whitespace)", () => {
      const state = appReducer(initialState, {
        type: "CREATE_PROJECT",
        payload: {
          title: "  <b>Bad</b> Title  ",
          description: "<script>alert(1)</script>safe desc",
          difficulty: "easy",
          status: "open",
        },
      });
      const created = state.projects.at(-1)!;
      expect(created.title).toBe("Bad Title");
      expect(created.description).toBe("alert(1)safe desc");
    });
  });

  // ── UPDATE_PROJECT ──────────────────────────────────────
  describe("UPDATE_PROJECT", () => {
    it("updates fields on the correct project", () => {
      const target = initialState.projects[0];
      const state = appReducer(initialState, {
        type: "UPDATE_PROJECT",
        payload: {
          id: target.id,
          title: "Updated Title",
          description: "Updated desc",
          difficulty: "easy",
          status: "completed",
        },
      });
      const updated = state.projects.find((p) => p.id === target.id)!;
      expect(updated.title).toBe("Updated Title");
      expect(updated.description).toBe("Updated desc");
      expect(updated.status).toBe("completed");
      expect(updated.difficulty).toBe("easy");
    });

    it("refreshes updatedAt and keeps createdAt unchanged", () => {
      const target = initialState.projects[0];
      const before = Date.now();
      const state = appReducer(initialState, {
        type: "UPDATE_PROJECT",
        payload: {
          id: target.id,
          title: "T",
          description: "D",
          difficulty: "medium",
          status: "open",
        },
      });
      const updated = state.projects.find((p) => p.id === target.id)!;
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(
        before,
      );
      expect(updated.createdAt).toBe(target.createdAt);
    });

    it("does not affect other projects", () => {
      const [first, second] = initialState.projects;
      const state = appReducer(initialState, {
        type: "UPDATE_PROJECT",
        payload: {
          id: first.id,
          title: "X",
          description: "Y",
          difficulty: "easy",
          status: "open",
        },
      });
      expect(state.projects.find((p) => p.id === second.id)).toEqual(second);
    });

    it("sanitizes updated title and description", () => {
      const target = initialState.projects[0];
      const state = appReducer(initialState, {
        type: "UPDATE_PROJECT",
        payload: {
          id: target.id,
          title: "<em>Injected</em>",
          description: "  trimmed  ",
          difficulty: "medium",
          status: "open",
        },
      });
      const updated = state.projects.find((p) => p.id === target.id)!;
      expect(updated.title).toBe("Injected");
      expect(updated.description).toBe("trimmed");
    });
  });

  // ── DELETE_PROJECT ──────────────────────────────────────
  describe("DELETE_PROJECT", () => {
    it("removes the project from the list", () => {
      const target = initialState.projects[0];
      const state = appReducer(initialState, {
        type: "DELETE_PROJECT",
        payload: { id: target.id },
      });
      expect(state.projects.find((p) => p.id === target.id)).toBeUndefined();
    });

    it("unassigns all participants of the deleted project to inactive (projectId null)", () => {
      const target = initialState.projects[0]; // participantIds: ['u1', 'u2']
      const state = appReducer(initialState, {
        type: "DELETE_PROJECT",
        payload: { id: target.id },
      });
      const u1 = state.users.find((u) => u.id === "u1")!;
      const u2 = state.users.find((u) => u.id === "u2")!;
      expect(u1.projectId).toBeNull();
      expect(u2.projectId).toBeNull();
    });

    it("does not affect users assigned to other projects", () => {
      const target = initialState.projects[0]; // p1
      const stateWithU3: AppState = {
        ...initialState,
        users: initialState.users.map((u) =>
          u.id === "u3" ? { ...u, projectId: "p2" } : u,
        ),
      };
      const state = appReducer(stateWithU3, {
        type: "DELETE_PROJECT",
        payload: { id: target.id },
      });
      const u3 = state.users.find((u) => u.id === "u3")!;
      expect(u3.projectId).toBe("p2");
    });

    it("leaves unassigned users unaffected", () => {
      const target = initialState.projects[0];
      const state = appReducer(initialState, {
        type: "DELETE_PROJECT",
        payload: { id: target.id },
      });
      const carol = state.users.find((u) => u.id === "u3")!;
      expect(carol.projectId).toBeNull();
    });
  });
});
