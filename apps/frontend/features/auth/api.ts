import { CreateUserDto } from "@myproject/api-types/users";

const BASE_URL = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export type AuthErrorMap = Record<string, string>;

export type CurrentUser = {
  id: string;
  name: string;
};

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

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res.json();
}

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

export async function logoutRequest() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res.json();
}

export async function registerRequest(payload: CreateUserDto) {
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

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    await handleResponseError(res);
  }

  return res.json();
}
