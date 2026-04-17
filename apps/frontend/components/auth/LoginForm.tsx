"use client";

import { useLogin } from "@/features/auth/hooks";
import { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, login } = useLogin();

  const handleSubmit = async () => {
    await login({ username, password });
  };

  return (
    <div className="flex flex-col items-center content-center ">
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        id="username"
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        id="password"
        type="password"
      />
      <button disabled={loading} onClick={handleSubmit} className="py-2 px-4 bg-black rounded-md text-white">
        {loading ? "Loading..." : "Submit"}
      </button>

      {error && <p>{error}</p>}
    </div>
  );
};
