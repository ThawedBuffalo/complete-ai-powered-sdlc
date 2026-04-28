import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders app title and current user", () => {
    render(<App />);
    expect(screen.getByText(/hackathon project matcher/i)).toBeInTheDocument();
    expect(screen.getByText(/current user:/i)).toBeInTheDocument();
  });

  it("blocks duplicate user creation with a validation message", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/create user/i), "Alex");
    await user.click(screen.getByRole("button", { name: /create user/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/already exists/i);
  });

  it("creates a unique user and switches current user to it", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/create user/i), "  Sam   Carter  ");
    await user.click(screen.getByRole("button", { name: /create user/i }));

    expect(screen.getByText(/current user:/i)).toHaveTextContent("Sam Carter");
    expect(
      screen.getByRole("option", { name: "Sam Carter" }),
    ).toBeInTheDocument();
  });

  it("switches current user from the dropdown", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText(/switch user/i), "user-jordan");
    expect(screen.getByText(/current user:/i)).toHaveTextContent("Jordan");
  });
});
