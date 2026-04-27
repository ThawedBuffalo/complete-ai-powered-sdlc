# Security Baseline

## Input handling

- Treat all user-provided text as untrusted input.
- Normalize and trim text input before saving it to state.
- Render user-generated values as plain text, not HTML.

## Dependency updates

- Run `npm audit` in CI on pull requests.
- Keep dependencies current and avoid pinning old vulnerable versions.
- Review dependency alerts before merging.

## No secrets in repo

- Do not commit API keys, tokens, or credentials.
- Use environment variables for secrets when backend services are introduced.
- `.gitignore` excludes local files and build artifacts like `node_modules` and `dist`.
