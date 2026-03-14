"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange = (e:any)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {

    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(res.ok){

      localStorage.setItem("user",JSON.stringify(data.user));

      /* IMPORTANT REDIRECT */

      if(redirect){
        router.push(redirect);
      }else{
        router.push("/");
      }

    }else{
      alert(data.error || "Login failed");
    }

  };

  return(

    <main className="max-w-md mx-auto py-20 px-4">

      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <div className="space-y-4">

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
          onClick={login}
          className="bg-black text-white w-full py-3 rounded"
        >
          Login
        </button>

      </div>

    </main>

  );

}