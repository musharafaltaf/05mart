"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.message) {
      alert("Registration successful");
      router.push("/login");
    } else {
      alert(data.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg p-8 rounded-lg w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="border p-3 w-full rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}