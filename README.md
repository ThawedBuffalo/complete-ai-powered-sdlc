# Hackathon Project Matcher

## Project goal

Hackathon Project Matcher helps participants quickly browse project ideas, understand who is active or inactive, and join one project at a time.

## Local run steps

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Quality and checks

```bash
npm run lint
npm run lint:fix
npm run type-check
npm run test
npm run test:coverage
npm run build
npm run licenses:check
npm run format:check
npm run format:fix
```

CI workflow runs these checks on pull requests and pushes to `main`:

- lint + format check
- type-check + test coverage threshold
- production build
- dependency vulnerability audit
- license summary check

## v1 scope

- React + TypeScript frontend with in-memory state.
- Local user creation/switching with unique names.
- Project browsing, details, create/edit/delete, and join/switch behavior.
- Active/inactive user lists.

## Identity rules and edge cases

- User names are normalized by trimming and collapsing repeated whitespace.
- Names are unique case-insensitively (`alex` and `Alex` are duplicates).
- Empty names are rejected.
- Names longer than 40 characters are rejected.
- Creating a valid user auto-switches the current local session to that user.

## Deploy

- GitHub Pages deploy workflow: `.github/workflows/deploy.yml`
- Recorded Hello World URL: [https://thawedbuffalo.github.io/complete-ai-powered-sdlc/](https://thawedbuffalo.github.io/complete-ai-powered-sdlc/)

If GitHub Pages is not enabled yet, enable it in repository settings and run the deploy workflow once from `main`.
