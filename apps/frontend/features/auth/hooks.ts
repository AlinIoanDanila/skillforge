"use client";

import { useState } from "react";

import { getProjects, loginRequest, registerRequest } from "@/features/auth/api";
import type { AuthErrorMap } from "@/features/auth/api";

const normalizeError = (error: unknown): AuthErrorMap => {
  if (error instanceof Error && error.cause && typeof error.cause === "object") {
    return error.cause as AuthErrorMap;
  }

  return { general: "Invalid credentials" };
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);

  async function login(payload: { email: string; password: string }) {
    try {
      setIsLoading(true);
      setError(null);
      await loginRequest(payload);
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    login,
    isLoading,
    error,
  };
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);

  async function register(payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    type: "Admin" | "User";
  }) {
    try {
      setIsLoading(true);
      setError(null);
      await registerRequest(payload);
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    register,
    isLoading,
    error,
  };
};

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);
  const [projects, setProjects] = useState([]);

  async function get() {
    try {
      setIsLoading(true);
      setError(null);
      const projects = await getProjects();
      setProjects(projects);
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    projects,
    isLoading,
    error,
  };
};
