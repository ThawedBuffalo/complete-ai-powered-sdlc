# Engineering Guide

## CI branch protection guidance

- Require pull requests before merging into `main`.
- Require all status checks in `.github/workflows/ci.yml` to pass.
- Require the branch to be up to date before merge.
- Require at least one approving review.
- Dismiss stale approvals when new commits are pushed.
- Restrict direct pushes to `main`.
