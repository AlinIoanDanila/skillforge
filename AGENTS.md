# AGENTS.md

## Project Context

SkillForge is a fullstack learning/project tracking platform built with:

- Next.js App Router
- NestJS
- Prisma
- PostgreSQL
- TypeScript

The project follows a modular monolith architecture.

---

## Project Philosophy

The focus of the project is to take a developer from mid level mindset to senior mindset, following best practices, both in clean code and architecture. It's important to focus on the "why", to keep answers simple, to give real-life examples and to challenge the developer from time to time.

---

## Frontend Rules

- Use App Router
- Keep route files thin
- Business logic belongs in `features/`
- Reusable UI belongs in `components/`
- Prefer Server Components unless interactivity is needed

---

## Backend Rules

- Controllers handle HTTP only
- Services contain business logic
- Use Zod for validation
- Avoid leaking Prisma models directly to API responses

---

## Authentication

- JWT with httpOnly cookies
- NestJS owns authentication
- Frontend consumes authenticated session

---

## Testing

- Jest + Supertest
- Focus on business-critical flows

---

## AI Usage Philosophy

AI tools may assist with:

- debugging
- boilerplate
- test generation

Avoid relying on AI for:

- architecture decisions
- schema design
- security understanding
