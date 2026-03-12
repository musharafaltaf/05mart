"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      router.push("/");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg p-8 rounded-lg w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}