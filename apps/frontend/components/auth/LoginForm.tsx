"use client";

import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { error, loading, login } = useLogin();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await login({ email, password });
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
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} onClick={handleSubmit}>
                  Login
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {error ? <div>error {error}</div> : null}
    </div>
  );
}
