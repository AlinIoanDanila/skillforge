# SkillForge — Project Overview & Technical Roadmap

## Vision

SkillForge is a modern fullstack web platform focused on learning management, project tracking, task organization, and future AI-assisted productivity features.

The project is intentionally designed as a long-term engineering playground that evolves progressively from a simple MVP into a production-style architecture.

The main goals are:

- Improve fullstack engineering skills
- Explore modern frontend and backend architecture
- Learn scalable system design
- Practice DevOps and cloud deployment
- Implement real-world authentication and security flows
- Integrate AI/LLM capabilities
- Build a portfolio-worthy production-style application

---

# Core MVP Concept

Users can:

- Register and authenticate
- Create projects
- Create tasks inside projects
- Add notes to tasks
- Track progress

Future phases will expand this into:

- AI-assisted learning roadmaps
- AI-generated task suggestions
- Mobile application support
- Activity feeds
- Analytics dashboards
- Team collaboration
- Realtime updates

---

# Technical Stack

## Frontend

### Core

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Planned Libraries

- Zod
- React Hook Form
- Zustand or TanStack Query
- shadcn/ui

### Frontend Architecture Goals

- Feature-based architecture
- Separation between UI and business logic
- Shared schemas/types with backend
- Server Components where appropriate
- Client Components only when needed

---

## Backend

### Core

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

### Planned Features

- JWT authentication
- httpOnly cookie authentication
- Role-based authorization
- REST API
- GraphQL exploration (later phase)

### Backend Architecture Goals

- Modular architecture
- DTO/schema validation
- Service-oriented design
- Clean separation of concerns
- Scalable feature modules

---

## Database Strategy

### Primary Relational Database

PostgreSQL will be used for:

- Users
- Projects
- Tasks
- Relationships
- Authentication data

### Future NoSQL Database

MongoDB may later be introduced for:

- Activity logs
- AI conversations
- Flexible metadata
- Analytics

Purpose:

- Learn polyglot persistence
- Compare relational vs document databases

---

# Authentication Architecture

## Current Strategy

- JWT-based authentication
- Access token stored in httpOnly cookie
- NestJS backend owns authentication
- Next.js frontend consumes session state

## Future Improvements

- Refresh tokens
- Session rotation
- Google OAuth
- GitHub OAuth
- Role-based access control
- Protected middleware routes

---

# Frontend Folder Structure

```text
frontend/
│
├── app/
├── components/
├── features/
├── lib/
├── styles/
└── types/
```

## Architecture Philosophy

### app/

Routing layer only.

### components/

Reusable UI components.

### features/

Business logic organized by domain.

### lib/

Infrastructure and utilities.

### types/

Frontend-only types until shared packages are introduced.

---

# Backend Folder Structure

```text
backend/src/
│
├── auth/
├── users/
├── projects/
├── tasks/
├── notes/
├── prisma/
└── common/
```

## Architecture Philosophy

- Controllers handle HTTP concerns
- Services contain business logic
- PrismaService handles database access
- Validation handled via schemas/DTOs
- Feature modules remain isolated and scalable

---

# Current Prisma Data Model

## Core Relationships

```text
User → Project → Task → Note
```

## Current Entities

### User

- Authentication
- Role management
- OAuth compatibility

### Project

- Owned by user
- Contains tasks

### Task

- Belongs to project
- Contains notes
- Completion tracking

### Note

- Belongs to task
- Stores additional context

---

# Validation Strategy

## Current Direction

Zod-based validation instead of class-validator.

Goals:

- Runtime validation
- Type inference
- Shared frontend/backend schemas
- Reduced boilerplate
- Better TypeScript integration

---

# Testing Strategy

## Tools

- Jest
- Supertest
- NestJS TestingModule

## Planned Test Types

### Unit Tests

- Services
- Utilities
- Validation logic

### Integration Tests

- Prisma + PostgreSQL
- Module integration
- Database behavior

### E2E Tests

- Authentication flows
- CRUD endpoints
- Authorization behavior

## Testing Philosophy

- Focus on meaningful business logic
- Prioritize critical flows over coverage percentage
- Use AI-assisted test scaffolding carefully

---

# Docker & DevOps

## Planned Containers

- frontend
- backend
- postgres
- mongo (future)

## Goals

- Local development parity
- Multi-service orchestration
- Reproducible environments
- Future CI/CD compatibility

---

# Cloud & Deployment Roadmap

## Planned Deployment Targets

### Frontend

- Vercel

### Backend

- Railway / Fly.io / AWS

### Database

- Supabase PostgreSQL
- MongoDB Atlas

## Future Goals

- CI/CD pipelines
- GitHub Actions
- Docker image builds
- Automated deployment

---

# AI / LLM Integration Roadmap

## Future Features

- AI-generated learning roadmaps
- Task suggestions
- AI-assisted notes
- AI explanations
- Chat assistant

## Advanced Possibilities

- Vector search
- Embeddings
- Retrieval-Augmented Generation (RAG)
- AI analytics

---

# Mobile Roadmap

## Planned Stack

- React Native
- Expo

## Goals

- Reuse backend API
- Shared TypeScript types
- Authentication parity
- Push notifications

---

# Engineering Methodologies

The project intentionally evolves through multiple engineering approaches.

## Planned Methodologies

### MVP-first development

Small iterative releases.

### Agile iteration

Feature-based incremental growth.

### Modular monolith architecture

Strong module boundaries.

### Clean architecture principles

Separation of domain and infrastructure.

### DevOps workflow

Docker + CI/CD + deployment.

### Progressive scaling

Monolith first, microservice concepts later if needed.

---

# Learning Objectives

This project is intended to strengthen:

- Fullstack architecture skills
- Backend system design
- API design
- Database modeling
- Authentication flows
- DevOps practices
- Frontend scalability
- Type-safe development
- AI-assisted engineering workflows

---

# AI Usage Philosophy During Development

AI tools should be used intentionally.

## Appropriate Uses

- Debugging
- Reviewing architecture
- Generating boilerplate
- Suggesting edge cases
- Test scaffolding

## Avoid Over-Reliance For

- Core architecture decisions
- Database modeling understanding
- Learning framework fundamentals
- Security understanding

The goal is learning and engineering growth, not merely generating code quickly.

---

# Current Priorities

## Immediate Goals

1. Finalize Prisma schema
2. Implement authentication flow
3. Build Project CRUD
4. Add DTO/schema validation
5. Improve frontend architecture separation
6. Add testing
7. Dockerize services

---

# Long-Term Vision

SkillForge should eventually demonstrate:

- Modern TypeScript ecosystem expertise
- Production-style architecture
- Fullstack engineering competency
- Cloud and DevOps knowledge
- AI integration readiness
- Scalable application design

The project is intended to serve simultaneously as:

- A learning platform
- A portfolio project
- A reusable technical foundation
- A long-term engineering sandbox
