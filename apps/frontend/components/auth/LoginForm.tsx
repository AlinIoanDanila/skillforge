"use client";

import { useState, ChangeEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

import { type LoginDto } from "@myproject/api-types/users";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handleChange}
                  required
                ></Input>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" onChange={handleChange} required />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

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
    </div>
  );
}
