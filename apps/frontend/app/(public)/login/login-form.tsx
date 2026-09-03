"use client";
import { ChangeEvent, useState } from "react";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/hooks";
import { LoginDto } from "@myproject/api-types/users";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  const [user, setUser] = useState<LoginDto>({ email: "", password: "" });

  const router = useRouter();
  const { error, isLoading, login } = useLogin();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await login({ ...user });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-primary-foreground">SF</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to your SkillForge account</p>
      </div>

      {/* Login Form */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="alex@example.com"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="button" className="mt-2 w-full" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
          Create account
        </Link>
      </p>

      {error ? (
        <Alert>
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>
            {(Object.keys(error) as Array<keyof typeof error>).map((item) => (
              <div key={String(item)}>
                {item} {error[item]}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}
