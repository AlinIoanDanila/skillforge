"use client";

import { useState } from "react";
import { loginRequest } from "@/features/auth/api";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login(payload: { username: string; password: string }) {
    try {
      setLoading(true);
      setError("");
      const data = await loginRequest(payload);
    } catch (error) {
      setError("Invalid credentials");
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
