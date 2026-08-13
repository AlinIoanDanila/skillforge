    # SkillForge Development Roadmap

The roadmap is intentionally progressive.

The project should evolve from a simple CRUD application into a production-style fullstack system.

---

# Phase 0 — Planning & Foundation

## Repository

- [x] Create SkillForge repository
- [x] Initialize Git at repository root
- [x] Use a single Git repository
- [ ] Create documentation structure
- [ ] Create AGENTS.md
- [ ] Create README.md

## Backend

- [x] Initialize NestJS
- [x] Install Prisma
- [x] Configure PostgreSQL
- [x] Create Prisma service
- [x] Create initial Prisma schema
- [ ] Create database migration
- [ ] Verify Prisma database connection

## Frontend

- [x] Initialize Next.js
- [x] Use App Router
- [x] Use TypeScript
- [x] Configure Tailwind
- [x] Create initial login page
- [ ] Establish frontend folder architecture

---

# Phase 1 — Data Model

## User

- [ ] Define authentication requirements
- [ ] Implement User model
- [ ] Implement password hashing
- [ ] Implement OAuth-compatible structure

## Project

- [ ] Implement Project CRUD
- [ ] Implement ownership
- [ ] Validate project input

## Task

- [ ] Implement Task CRUD
- [ ] Implement project relationship
- [ ] Implement completion state

## Note

- [ ] Implement Note CRUD
- [ ] Add createdAt
- [ ] Add updatedAt

---

# Phase 2 — Authentication

- [ ] Create Auth module
- [ ] Implement registration
- [ ] Implement password hashing
- [ ] Implement login
- [ ] Implement JWT access token
- [ ] Store access token in httpOnly cookie
- [ ] Configure CORS
- [ ] Implement logout
- [ ] Implement authentication guard
- [ ] Implement `/auth/me`
- [ ] Protect project/task/note endpoints

### Later

- [ ] Refresh tokens
- [ ] Refresh token rotation
- [ ] Google OAuth
- [ ] GitHub OAuth
- [ ] Role-based authorization

---

# Phase 3 — API & Validation

- [ ] Define Zod schemas
- [ ] Create Zod validation pipe
- [ ] Create request types
- [ ] Create response types
- [ ] Validate API boundaries
- [ ] Standardize API errors
- [ ] Add pagination where useful
- [ ] Review API naming and HTTP semantics

---

# Phase 4 — Frontend MVP

## Authentication

- [ ] Login UI
- [ ] Registration UI
- [ ] Logout
- [ ] Session state
- [ ] Protected routes

## Dashboard

- [ ] Sidebar
- [ ] Navigation
- [ ] Project statistics
- [ ] Recent activity
- [ ] Task overview

## Projects

- [ ] Project list
- [ ] Create project
- [ ] Edit project
- [ ] Delete project
- [ ] Project details

## Tasks

- [ ] Task list
- [ ] Create task
- [ ] Edit task
- [ ] Complete task
- [ ] Delete task

## Notes

- [ ] Create note
- [ ] Edit note
- [ ] Delete note
- [ ] Display task notes

---

# Phase 5 — Testing

## Unit

- [ ] Auth service
- [ ] Projects service
- [ ] Tasks service
- [ ] Notes service

## Integration

- [ ] Prisma + PostgreSQL
- [ ] Project persistence
- [ ] Relationships
- [ ] Cascade behavior

## E2E

- [ ] Registration
- [ ] Login
- [ ] Logout
- [ ] Protected routes
- [ ] Project CRUD
- [ ] Task CRUD
- [ ] Note CRUD
- [ ] Authorization/ownership

---

# Phase 6 — Docker

- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] PostgreSQL container
- [ ] Docker Compose
- [ ] Environment configuration
- [ ] Health checks
- [ ] Development environment
- [ ] Production-oriented images

---

# Phase 7 — NoSQL

Introduce MongoDB only after identifying a meaningful use case.

Potential uses:

- [ ] Activity logs
- [ ] AI conversation history
- [ ] Flexible metadata

Learning goals:

- Compare relational and document modeling
- Understand polyglot persistence
- Understand tradeoffs rather than using multiple databases for the sake of it

---

# Phase 8 — GraphQL

- [ ] Introduce GraphQL
- [ ] Define schema
- [ ] Implement selected queries
- [ ] Compare REST and GraphQL
- [ ] Evaluate when GraphQL provides actual value

GraphQL should initially coexist with REST rather than replacing everything.

---

# Phase 9 — CI/CD & Cloud

- [ ] GitHub Actions
- [ ] Automated tests
- [ ] Linting
- [ ] Build verification
- [ ] Docker image build
- [ ] Deployment
- [ ] Environment secrets
- [ ] Logging
- [ ] Monitoring

Potential cloud technologies:

- Vercel
- AWS
- Railway
- Fly.io
- Supabase
- MongoDB Atlas

---

# Phase 10 — AI

Initial features:

- [ ] AI learning roadmap generation
- [ ] AI task generation
- [ ] AI explanations
- [ ] AI assistant

Advanced:

- [ ] Embeddings
- [ ] Vector search
- [ ] RAG
- [ ] Context-aware project assistant

---

# Phase 11 — Mobile

- [ ] React Native
- [ ] Expo
- [ ] Shared TypeScript contracts
- [ ] Mobile authentication
- [ ] Project management
- [ ] Task management
- [ ] Notes
- [ ] Push notifications

---

# Phase 12 — Advanced Architecture

Only introduce these if there is a genuine reason to do so.

Potential areas:

- Modular architecture improvements
- Domain boundaries
- CQRS
- Event-driven architecture
- Background jobs
- Realtime communication
- Microservice extraction

The application should remain a modular monolith unless there is a clear reason to split a component into a separate service.
