"use client";

import { ChangeEvent, useState } from "react";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/features/auth/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { CreateUserDto } from "@myproject/api-types/users";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [user, setUser] = useState<CreateUserDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "User",
  });
  const router = useRouter();
  const { error, isLoading, register } = useRegister();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await register({ ...user });
      router.push("/login");
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
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Create an account</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Get started with SkillForge today</p>
      </div>

      {/* Register Form */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Alex Johnson"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="alex@example.com"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                Confirm password
              </label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm your password"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>

      {error ? (
        <Alert>
          <AlertTitle>Registration failed</AlertTitle>
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
