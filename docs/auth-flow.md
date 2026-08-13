# SkillForge Authentication Flow

## Authentication Goals

SkillForge authentication should provide:

- Secure browser authentication
- Protected API endpoints
- Persistent sessions
- Clear separation between authentication and authorization
- Future compatibility with mobile clients
- Future OAuth support

---

# Authentication Technology

Backend:

- NestJS
- JWT
- Prisma
- PostgreSQL
- bcrypt

Frontend:

- Next.js App Router
- httpOnly cookies
- Protected routes
- `/auth/me`

---

# Current User Model

The current Prisma User model supports:

- Email/password authentication
- Google OAuth
- GitHub OAuth
- User/Admin roles
- Email verification

Password authentication uses:

```text
email + hashedPassword
```
