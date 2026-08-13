# ADR 003 — Next.js App Router

## Status

Accepted

## Context

SkillForge is intended to use modern Next.js and React patterns.

The application will contain dashboards, authentication flows, project pages, forms, and eventually AI functionality.

## Decision

Use the Next.js App Router.

## Rationale

The App Router provides:

- React Server Components
- Nested layouts
- Route-level loading/error states
- Modern Next.js architecture
- Good support for server-side data fetching

It also provides an opportunity to learn the distinction between Server and Client Components.

## Consequences

Developers must understand:

- Server Components
- Client Components
- `"use client"`
- Server-side vs client-side data fetching
- Route layouts
- Loading and error boundaries

Client Components should be used only where interactivity or browser APIs require them.
