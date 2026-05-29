"use client";

import { ChangeEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/features/auth/hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { type CreateUserDto } from "@myproject/api-types/users";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [user, setUser] = useState<CreateUserDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "User",
  });
  const router = useRouter();
  const { error, loading, register } = useRegister();

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" name="password" onChange={handleChange} required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>

              <Field>
                <Button disabled={loading} onClick={handleSubmit}>
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
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
