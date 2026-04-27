import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /hackathon project matcher/i }),
    ).toBeInTheDocument();
  });

  it("renders the projects section", () => {
    render(<App />);
    expect(
      screen.getByRole("region", { name: /projects/i }),
    ).toBeInTheDocument();
  });

  it("renders mock project cards on load", () => {
    render(<App />);
    expect(screen.getByText("AI Code Reviewer")).toBeInTheDocument();
    expect(screen.getByText("Green Hackathon Tracker")).toBeInTheDocument();
  });
});
