"use client";

import { useEffect, useState } from "react";

import { getCurrentUser, getProjects, loginRequest, logoutRequest, registerRequest } from "@/features/auth/api";

import type { AuthErrorMap, CurrentUser } from "@/features/auth/api";
import type { ProjectDto } from "@myproject/api-types/projects";

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

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthErrorMap | null>(null);

  async function logout() {
    try {
      setIsLoading(true);
      setError(null);
      await logoutRequest();
    } catch (error: unknown) {
      setError(normalizeError(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    logout,
    isLoading,
    error,
  };
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    void verifySession();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
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
      console.log(payload);

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
  const [projects, setProjects] = useState<ProjectDto[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (error: unknown) {
        setError(normalizeError(error));
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    get();
  }, []);

  return {
    projects,
    isLoading,
    error,
  };
};
