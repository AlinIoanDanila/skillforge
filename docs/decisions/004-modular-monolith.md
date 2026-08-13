# ADR 004 — Modular Monolith

## Status

Accepted

## Context

SkillForge is a single-developer learning project but is intended to explore architecture that could evolve into a larger production system.

Starting directly with microservices would add significant infrastructure and operational complexity without providing immediate value.

## Decision

Start with a modular monolith.

The application will have clear domain boundaries such as:

- Auth
- Users
- Projects
- Tasks
- Notes

## Rationale

A modular monolith provides:

- Simple local development
- Simple deployment
- Clear module boundaries
- Lower infrastructure complexity
- A path toward future service extraction

## Consequences

Modules should avoid unnecessary coupling.

Microservices should only be introduced later if a concrete architectural reason appears.
