# ADR 001 — PostgreSQL as Primary Database

## Status

Accepted

## Context

SkillForge requires relational data with clear relationships between users, projects, tasks, and notes.

The core relationship is:

```text
User → Project → Task → Note
```
