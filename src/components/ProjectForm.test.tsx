import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectForm } from "./ProjectForm";
import type { Project } from "../types";

const noOp = vi.fn();

const stubProject: Project = {
  id: "p1",
  title: "Existing Project",
  description: "Existing description",
  difficulty: "hard",
  status: "in-progress",
  ownerName: "Alice",
  participantIds: [],
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("ProjectForm", () => {
  describe("create mode validation", () => {
    it("shows error when title is empty on submit", () => {
      render(<ProjectForm mode="create" onSubmit={noOp} onCancel={noOp} />);
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(screen.getByText("Title is required.")).toBeInTheDocument();
    });

    it("shows error when description is empty on submit", () => {
      render(<ProjectForm mode="create" onSubmit={noOp} onCancel={noOp} />);
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "My Project" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(screen.getByText("Description is required.")).toBeInTheDocument();
    });

    it("does not call onSubmit when validation fails", () => {
      const onSubmit = vi.fn();
      render(<ProjectForm mode="create" onSubmit={onSubmit} onCancel={noOp} />);
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("shows title length error when title exceeds 100 characters", () => {
      render(<ProjectForm mode="create" onSubmit={noOp} onCancel={noOp} />);
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "a".repeat(101) },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: "valid description" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(screen.getByText(/100 characters or fewer/)).toBeInTheDocument();
    });

    it("shows description length error when description exceeds 500 characters", () => {
      render(<ProjectForm mode="create" onSubmit={noOp} onCancel={noOp} />);
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "Valid Title" },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: "b".repeat(501) },
      });
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(screen.getByText(/500 characters or fewer/)).toBeInTheDocument();
    });
  });

  describe("successful submission", () => {
    it("calls onSubmit with correct field values when valid", () => {
      const onSubmit = vi.fn();
      render(<ProjectForm mode="create" onSubmit={onSubmit} onCancel={noOp} />);
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "Test Project" },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: "Test description" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Test Project",
        description: "Test description",
        difficulty: "medium",
        status: "open",
      });
    });
  });

  describe("edit mode", () => {
    it("pre-fills form with initial project values", () => {
      render(
        <ProjectForm
          mode="edit"
          initial={stubProject}
          onSubmit={noOp}
          onCancel={noOp}
        />,
      );
      expect(screen.getByLabelText(/title/i)).toHaveValue("Existing Project");
      expect(screen.getByLabelText(/description/i)).toHaveValue(
        "Existing description",
      );
    });

    it('shows "Save" button in edit mode', () => {
      render(
        <ProjectForm
          mode="edit"
          initial={stubProject}
          onSubmit={noOp}
          onCancel={noOp}
        />,
      );
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("calls onSubmit with updated values when edited and saved", () => {
      const onSubmit = vi.fn();
      render(
        <ProjectForm
          mode="edit"
          initial={stubProject}
          onSubmit={onSubmit}
          onCancel={noOp}
        />,
      );
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: "Renamed Project" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Renamed Project" }),
      );
    });
  });

  it("calls onCancel when Cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<ProjectForm mode="create" onSubmit={noOp} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
  });
});
