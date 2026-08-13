# AGENTS.md

## Project

SkillForge is a learning and productivity platform for developers and self-learners.

The application allows users to organize learning goals into projects, projects into tasks, and tasks into notes. The long-term goal is to evolve SkillForge into a production-style fullstack application that demonstrates modern web development, backend architecture, testing, DevOps, cloud, AI/LLM integration, and mobile development.

This is also a learning project. The developer should understand the architecture and implementation rather than blindly accepting generated code.

---

## Core Development Philosophy

SkillForge should evolve progressively.

Do not introduce advanced architecture, infrastructure, or dependencies unless they solve an actual problem or are part of an intentional learning phase.

Prefer:

- Simple implementations first
- Clear separation of concerns
- Explicit architectural decisions
- Strong TypeScript typing
- Small incremental changes
- Testable code
- Documented decisions

Avoid premature optimization and over-engineering.

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- Zod
- React Hook Form where appropriate
- shadcn/ui where appropriate

### Backend

- Node.js
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Zod for validation

### Planned technologies

- MongoDB
- GraphQL
- Docker
- GitHub Actions / CI
- Cloud deployment
- React Native + Expo
- AI/LLM integration
- Vector search / RAG if justified later

---

## Architecture

The project currently follows a modular monolith approach.

The repository contains multiple applications but uses a single Git repository.

Expected high-level structure:

```text
skillforge/
├── AGENTS.md
├── README.md
├── docs/
├── backend/
├── frontend/
├── mobile/
└── packages/
```
