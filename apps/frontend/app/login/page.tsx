import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
