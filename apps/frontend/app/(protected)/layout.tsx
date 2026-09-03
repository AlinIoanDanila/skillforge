"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks";
import { UserProvider } from "@/features/auth/user-context";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <UserProvider user={user}>{children}</UserProvider>;
}
