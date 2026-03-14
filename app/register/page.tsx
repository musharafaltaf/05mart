"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterContent() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {

      localStorage.setItem("user", JSON.stringify(data.user));

      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }

    } else {
      alert(data.error || "Registration failed");
    }

  };

  return (

    <main className="max-w-md mx-auto py-20 px-4">

      <h1 className="text-2xl font-bold mb-6">
        Register
      </h1>

      <div className="space-y-4">

        <input
          name="name"
          placeholder="Name"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <button
          onClick={register}
          className="bg-black text-white w-full py-3 rounded"
        >
          Register
        </button>

      </div>

    </main>

  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}