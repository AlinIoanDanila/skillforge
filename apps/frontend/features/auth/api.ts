import { CreateUserDto } from "@myproject/api-types/users";

const BASE_URL = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export type AuthErrorMap = Record<string, string>;

const handleResponseError = async (res: Response): Promise<never> => {
  const rawError = await res.text();
  const fallbackMessage = rawError || res.statusText || "Request failed";

  let errorInfo: AuthErrorMap = { general: fallbackMessage };

  try {
    const parsedError = JSON.parse(rawError) as {
      message?: string;
      properties?: Record<string, { errors?: string[] }>;
    };

    if (parsedError?.properties && typeof parsedError.properties === "object") {
      const fieldErrors: AuthErrorMap = {};

      for (const key in parsedError.properties) {
        if (parsedError.properties[key]?.errors?.[0]) {
          fieldErrors[key] = parsedError.properties[key].errors[0];
        }
      }

      if (Object.keys(fieldErrors).length > 0) {
        errorInfo = fieldErrors;
      }
    } else if (typeof parsedError?.message === "string" && parsedError.message.trim().length > 0) {
      errorInfo = { general: parsedError.message };
    }
  } catch {
    // Keep fallback message for non-JSON responses.
  }

  throw new Error("Auth request failed", { cause: errorInfo });
};

export async function loginRequest(payload: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res.json();
}

export async function registerRequest({ confirmPassword: _, ...payload }: CreateUserDto) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res.json();
}
