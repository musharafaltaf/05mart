"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {

  const router = useRouter();
  const [user,setUser] = useState<any>(null);

  useEffect(()=>{

    const storedUser = localStorage.getItem("user");

    if(!storedUser){
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));

  },[]);

  const logout = ()=>{

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    router.push("/");

  };

  if(!user){
    return(
      <p className="p-10 text-center">
        Loading...
      </p>
    )
  }

  return(

    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* TOP NAVIGATION */}

      <div className="flex items-center justify-between mb-8">

        <button
          onClick={()=>router.back()}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Home
        </Link>

      </div>


      {/* PAGE TITLE */}

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        My Profile
      </h1>


      {/* PROFILE GRID */}

      <div className="grid md:grid-cols-3 gap-8">

        {/* ACCOUNT DETAILS */}

        <div className="border rounded p-6">

          <h2 className="font-semibold mb-4">
            Account Details
          </h2>

          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>

          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>


        {/* QUICK ACTIONS */}

        <div className="md:col-span-2 grid gap-4">

          <button
            onClick={()=>router.push("/orders")}
            className="border p-4 rounded hover:bg-gray-50 text-left"
          >
            📦 My Orders
          </button>

          <button
            onClick={()=>router.push("/wishlist")}
            className="border p-4 rounded hover:bg-gray-50 text-left"
          >
            ❤️ My Wishlist
          </button>

          <button
            onClick={()=>router.push("/cart")}
            className="border p-4 rounded hover:bg-gray-50 text-left"
          >
            🛒 My Cart
          </button>

          <button
            onClick={()=>router.push("/checkout/address")}
            className="border p-4 rounded hover:bg-gray-50 text-left"
          >
            🏠 Saved Address
          </button>

        </div>

      </div>

    </main>

  );

}