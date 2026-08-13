# SkillForge Architecture

## Architectural Direction

SkillForge starts as a modular monolith.

The objective is to build clear boundaries between domains without prematurely introducing microservices.

The architecture should evolve based on actual requirements.

---

# High-Level Architecture

```text
┌───────────────────────────────────────┐
│              Next.js                 │
│                                       │
│  App Router                           │
│  React                                │
│  TypeScript                           │
│  Feature-based frontend               │
└───────────────────┬───────────────────┘
                    │
                    │ HTTP / REST
                    ▼
┌───────────────────────────────────────┐
│               NestJS                  │
│                                       │
│  Auth                                 │
│  Users                                │
│  Projects                             │
│  Tasks                                │
│  Notes                                │
└───────────────────┬───────────────────┘
                    │
                    ▼
             ┌──────────────┐
             │  PostgreSQL  │
             │   + Prisma   │
             └──────────────┘
```
