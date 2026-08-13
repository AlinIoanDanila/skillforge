# ADR 002 — Zod for API Validation

## Status

Accepted

## Context

The application uses TypeScript across the frontend and backend.

The project requires:

- Runtime validation
- Type inference
- Strong API boundaries
- Potential sharing of schemas between frontend and backend

## Decision

Use Zod for request validation.

TypeScript types should be inferred from Zod schemas where practical.

## Rationale

Zod provides both:

- Runtime validation
- Compile-time type inference

This reduces duplication between validation schemas and TypeScript types.

## Consequences

NestJS requires a custom validation integration such as a Zod pipe.

The project will need to establish conventions for:

- Request schemas
- Response schemas
- Shared schemas
- Error formatting
