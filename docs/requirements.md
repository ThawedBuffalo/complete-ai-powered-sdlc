# Hackathon Project Matcher - Lean PRD (v1)

## 1) Product Overview

Hackathon participants often lose time figuring out what projects exist, who is already working on them, and where they can contribute.  
Hackathon Project Matcher is a lightweight web app that lets participants browse project ideas, join one project at a time, and quickly understand active versus inactive participants.

## 2) Goals

- Help participants discover available projects quickly.
- Make team formation visible and simple.
- Let users create and manage project ideas during the event.
- Provide a clear view of:
  - all users on a specific project
  - active users (assigned to a project)
  - inactive users (not assigned)

## 3) Target Users

- Hackathon participants who want to:
  - find a project to join
  - propose new project ideas
  - see who is already working on what

## 4) Scope

### In Scope (v1)

- Lightweight local identity using unique names.
- User switching:
  - select existing user from list
  - or create a new user
- Project browsing in a simple card grid.
- Project details view (includes participant list).
- Create, edit, and delete projects.
- Join a project with one-project-per-user rule.
- Switch projects with a confirmation step.
- Display active and inactive user lists.
- In-memory data only (no persistence after refresh).

### Out of Scope (v1)

- Backend/database persistence.
- Real authentication providers.
- Advanced search/filter/sort.
- Notifications/chat.
- Role/permission system beyond basic behavior.

## 5) User Stories

1. As a participant, I can enter a unique name to start using the app.
2. As a participant, I can switch between existing users or create a new one.
3. As a participant, I can browse project cards to see ideas quickly.
4. As a participant, I can open a project and view details and current participants.
5. As a participant, I can create a new project with key metadata.
6. As a participant, I can edit or delete a project.
7. As a participant, I can join one project.
8. As a participant, if I join a different project, I must confirm switching first.
9. As a participant, I can see active users and inactive users in separate lists.

## 6) Functional Requirements

### 6.1 User Identity and Session (Local)

- User must provide a name to start.
- Name must be unique among existing users.
- If entered name already exists, show validation error and prevent creation.
- User can switch identity by:
  - selecting an existing user from a list, or
  - creating a new unique user.

### 6.2 Project Data Model and Fields

Each project includes:

- `id` (string)
- `title` (string, required)
- `description` (string, required)
- `techTags` (array of strings, optional)
- `difficulty` (enum: `Beginner | Intermediate | Advanced`)
- `status` (enum: `Idea | In Progress | Full`)
- `ownerName` (string, required)
- `participantNames` (array of strings)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### 6.3 Browse Projects (Card Grid)

- Show all projects in a simple card grid.
- Every card displays at minimum:
  - title
  - short description
  - number of participants
  - status
  - tags (if present)
- Clicking a card opens full project details.

### 6.4 Project Details

- Show full project fields.
- Show list of all users currently signed up for that project.
- Provide actions:
  - Join project
  - Edit project
  - Delete project

### 6.5 Create / Edit / Delete Projects

- Any signed-in local user can create a project.
- Creator is automatically set as `ownerName`.
- Edit updates project fields and `updatedAt`.
- Delete removes project from the app state.
- If a deleted project has participants, those users become inactive (no assigned project).

### 6.6 Join Project + One-Project Rule

- A user can only be assigned to one project at a time.
- If user has no project, Join immediately assigns them.
- If user already has a different project and chooses Join:
  - show confirmation dialog
  - on confirm: remove user from old project and add to new project
  - on cancel: no changes
- Joining same project again should be a no-op.

### 6.7 Active / Inactive User Lists

- Active users: users assigned to any project.
- Inactive users: users not assigned to any project.
- Both lists should be visible in the app and update immediately on state changes.

## 7) UX Notes (v1)

- Keep layout simple and readable for hackathon speed.
- Primary screens:
  1. user entry/switcher
  2. project card grid
  3. project details panel/view
  4. active/inactive user lists
- Use clear action labels (Join, Switch Project, Create, Save, Delete).

## 8) Success Metrics (v1)

- Participants can see the full list of projects.
- Participants can open a project and view all signed-up users.
- App accurately displays active and inactive users.
- Users can create and switch projects with the one-project rule enforced.

## 9) Technical Notes

- Stack: React + TypeScript (web app).
- Data storage: in-memory state only for v1.
- State resets on page refresh.

## 10) Acceptance Criteria Checklist

- [ ] User can create a unique local identity by name.
- [ ] User can switch to existing user from a list.
- [ ] User can create a new project with required fields.
- [ ] User can edit project fields and see updates reflected.
- [ ] User can delete a project.
- [ ] Project grid displays cards with participant count.
- [ ] Project details show full metadata and participant list.
- [ ] User can join a project when unassigned.
- [ ] Switching projects prompts for confirmation.
- [ ] After confirmed switch, old project membership is removed and new one added.
- [ ] Active and inactive user lists are visible and accurate.
- [ ] All behaviors operate fully in memory with no backend dependency.
