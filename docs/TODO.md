# TODO - Hackathon Project Matcher (Incremental Build Plan)

This checklist is intentionally split into very small, AI-friendly increments.

## Phase 0 - Initialize and first deployable Hello World

- [x] Create repository scaffold for a React + TypeScript web app.
- [x] Add `.gitignore` and verify no secrets or build artifacts are tracked.
- [x] Add minimal README sections: project goal, local run steps, and scope for v1.
- [x] Start app and render plain "Hello World" page.
- [x] Add a basic app shell component (`App`) with a title and one paragraph.
- [x] Add a smoke test that verifies "Hello World" renders.
- [x] Add formatter/linter config with one command each for check and fix.
- [x] Add initial CI workflow to run install, lint, type-check, and tests on PRs.
- [x] Add dependency vulnerability scan to CI (`npm audit` or equivalent).
- [x] Add minimal deploy config (for example, Vercel/Netlify/GitHub Pages) so Hello World can be deployed.
- [x] Deploy first Hello World build and record the URL in README.
- [x] Document security baseline in `docs/security.md` (input handling, dependency updates, no secrets in repo).

## Phase 1 - Basic UI with mocked data

- [x] Define TypeScript interfaces for `User` and `Project` per PRD fields.
- [x] Create small in-memory mock dataset file for users and projects.
- [x] Render project card grid using mock projects.
- [x] Show card fields: title, short description, participant count, status, tags.
- [x] Add read-only project details panel/view when clicking a card.
- [x] Add read-only sections for active users and inactive users from mock data.
- [x] Add loading empty-state component for "no projects yet".
- [x] Add component tests for project card rendering and details selection.
- [x] Add accessibility pass for semantic headings, button labels, and focus order.
- [x] Add input/output safety notes for mock-data UI in `docs/security.md`.
- [x] Update README with screenshots/GIF of mock UI and architecture notes.

## Phase 2 - Identity flow (real functionality, piece by piece)

- [x] Add app state slice for current local user session (in-memory only).
- [x] Build "Create user" form with unique-name validation.
- [x] Show validation message for duplicate names and block submit.
- [x] Build "Switch user" dropdown/list for existing users.
- [x] Display current user clearly in top navigation/header.
- [x] Add unit tests for unique-name validator.
- [x] Add component tests for create-user and switch-user behavior.
- [x] Add security check: sanitize/trim name input and enforce max length.
- [x] Document identity rules and edge cases in README + `docs/security.md`.

## Phase 3 - Project CRUD (real functionality, piece by piece)

- [ ] Add create-project form with required fields (`title`, `description`, `difficulty`, `status`).
- [ ] Auto-set `ownerName` from current user on create.
- [ ] Auto-set `id`, `createdAt`, and `updatedAt` on create.
- [ ] Add edit-project flow that updates fields and refreshes `updatedAt`.
- [ ] Add delete-project action with confirmation.
- [ ] On delete, remove project and unassign all its participants to inactive.
- [ ] Add form validation messages for required fields and reasonable lengths.
- [ ] Add unit tests for project create/edit/delete state transitions.
- [ ] Add component tests for form validation and delete confirmation.
- [ ] Add security checks for text input normalization and unsafe HTML avoidance.
- [ ] Document project data model and CRUD behavior in README.

## Phase 4 - Join and switch project rule

- [ ] Add join-project action for unassigned users.
- [ ] Prevent duplicate join when user already belongs to selected project (no-op).
- [ ] Detect join attempt when user already in different project.
- [ ] Add confirmation dialog for switching projects.
- [ ] On confirm, remove user from old project and add to new project.
- [ ] On cancel, keep all state unchanged.
- [ ] Add unit tests for all join/switch paths.
- [ ] Add component test for confirmation dialog behavior.
- [ ] Add security check: guard all join/switch actions against invalid IDs.
- [ ] Document one-project-per-user rule and switch semantics.

## Phase 5 - Active/inactive user lists (live derived state)

- [ ] Implement derived selectors for active users (assigned) and inactive users (unassigned).
- [ ] Render both lists in the main app layout.
- [ ] Update lists immediately after create/delete/join/switch actions.
- [ ] Add empty states for each list.
- [ ] Add tests for list accuracy across state transitions.
- [ ] Add security check: ensure user names are rendered as plain text only.
- [ ] Document list definitions and update behavior in README.

## Phase 6 - Quality hardening and core-feature testing

- [ ] Add end-to-end happy-path test: create user -> create project -> join project.
- [ ] Add end-to-end test: create second project -> switch with confirm.
- [ ] Add end-to-end test: delete project -> users become inactive.
- [ ] Add coverage reporting and minimum threshold for core state logic.
- [x] Add CI gate to fail on lint/type/test failures and low coverage.
- [x] Add CI branch protection guidance in `docs/engineering.md`.
- [x] Run dependency and license checks in CI.
- [ ] Add regression checklist in `docs/testing.md`.
- [ ] Expand `docs/security.md` with threat notes for local identity and input validation.
- [x] Update README with full local dev, test, and CI instructions.

## Phase 7 - Deployment and operational readiness

- [ ] Confirm production build pipeline and deploy from devel-jc branch.
- [ ] Add preview deploys for pull requests (if platform supports).
- [ ] Add simple health/availability check after deploy.
- [ ] Add rollback instructions in `docs/deployment.md`.
- [ ] Verify no secrets are present in repo or client bundle.
- [ ] Add release checklist with security and test verification steps.
- [ ] Publish final demo URL and usage instructions in README.

## Ongoing tasks (run at every increment)

- [ ] Keep tasks small: one behavior change per PR when possible.
- [ ] After every feature change, add or update at least one automated test.
- [ ] After every feature change, update docs (README and/or docs pages).
- [ ] After every dependency change, run vulnerability checks.
- [ ] Before merge, verify lints, tests, and build all pass in CI.
