# RunDiff Example: Node + Express + PostgreSQL

A deliberately small external application used to prove RunDiff's multi-runtime pull-request validation.

## Stack

- Node.js
- Express
- PostgreSQL via `pg`

## Behavior under test

`POST /widgets` performs a real PostgreSQL query and returns HTTP 200 when the query succeeds.

RunDiff compares the exact baseline and candidate revisions by running the same scenario against both.

The acceptance proof for this repository is:

```text
real external pull request
  -> RunDiff GitHub App
  -> Cloudflare control plane
  -> Go Executor
  -> npm dependency cache / npm ci
  -> Node process service
  -> Node HTTP sensor
  -> Behavioral Diff
  -> BLOCK

same pull request, fixed
  -> ALLOW
```

This repository is intentionally application-only. The RunDiff executor and control plane live in `rundiff-hq/rundiff`.
