import Link from "next/link";
import { RegisterForm } from "@/app/register/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
