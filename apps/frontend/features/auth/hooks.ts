"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/features/auth/api";

export const useLogin = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login(payload: { username: string; password: string }) {
    try {
      setLoading(true);
      setError("");
      await loginRequest(payload);

      router.push("/dashboard");
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
