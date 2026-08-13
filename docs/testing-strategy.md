# SkillForge Testing Strategy

## Goals

Testing should provide confidence that the application behaves correctly while also serving as a learning tool.

The goal is not to maximize the number of tests or achieve an arbitrary 100% coverage percentage.

The goal is meaningful coverage of important behavior.

---

# Testing Stack

Backend:

- Jest
- Supertest
- NestJS TestingModule
- Prisma
- PostgreSQL

Future frontend testing may include:

- React Testing Library
- Playwright

---

# Testing Pyramid

```text
             E2E
              ▲
              │
        Integration
              ▲
              │
             Unit
```
