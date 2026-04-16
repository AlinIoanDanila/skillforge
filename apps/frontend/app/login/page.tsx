"use client";

import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
      <button onClick={handleClick} className="py-2 px-4 bg-black rounded-md text-white">
        Submit
      </button>
    </div>
  );
};

export default Login;
