// e.g. src/prisma/prisma-error.ts
type ErrorWithCode = { code: string };

export function hasErrorCode(error: unknown): error is ErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string'
  );
}

export function isPrismaErrorCode(error: unknown, code: string): boolean {
  return hasErrorCode(error) && error.code === code;
}
