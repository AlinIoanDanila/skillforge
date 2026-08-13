# SkillForge

SkillForge is a fullstack learning and productivity platform designed for developers and self-learners.

The platform helps users organize learning goals into projects, break projects into tasks, attach notes to tasks, and track their progress.

The project is intentionally being developed as a long-term engineering playground. It starts as a relatively simple MVP and progressively introduces more advanced technologies and methodologies.

The goal is not simply to build another CRUD application, but to use the project to explore how a modern production-style application can evolve.

---

## Goals

SkillForge has three primary goals:

1. Build a useful application.
2. Learn and refine modern fullstack development skills.
3. Create a portfolio project demonstrating practical engineering knowledge.

The project will progressively explore:

- Fullstack TypeScript
- Modern React/Next.js architecture
- Backend API development
- Relational and NoSQL databases
- Authentication and authorization
- API design
- Automated testing
- Containerization
- CI/CD
- Cloud deployment
- GraphQL
- AI/LLM integration
- Mobile development
- Architecture and system-design methodologies

---

# MVP

The initial MVP focuses on a small set of core concepts.

Users should be able to:

- Register
- Log in
- Create projects
- View projects
- Update projects
- Delete projects
- Create tasks within projects
- Update tasks
- Mark tasks as completed
- Add notes to tasks

The initial data hierarchy is:

```text
User
 └── Project
      └── Task
           └── Note
```
