"use client";

import { useState } from "react";

import { loginRequest, registerRequest } from "@/features/auth/api";
import type { AuthErrorMap } from "@/features/auth/api";

const normalizeError = (error: unknown): AuthErrorMap => {
  if (error instanceof Error && error.cause && typeof error.cause === "object") {
    return error.cause as AuthErrorMap;
  }

  return { general: "Invalid credentials" };
};

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);

  async function login(payload: { email: string; password: string }) {
    try {
      setLoading(true);
      setError(null);
      await loginRequest(payload);
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);

  async function register(payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    type: "Admin" | "User";
  }) {
    try {
      setLoading(true);
      setError(null);
      await registerRequest(payload);
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    loading,
    error,
  };
};
