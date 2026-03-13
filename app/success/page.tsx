"use client";

import Link from "next/link";

export default function SuccessPage() {

  return (

    <main className="max-w-4xl mx-auto p-10 text-center">

      <h1 className="text-4xl font-bold mb-6">
        🎉 Order Placed Successfully
      </h1>

      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="flex gap-4 justify-center">

        <Link href="/orders">
          <button className="bg-black text-white px-6 py-3 rounded">
            View Orders
          </button>
        </Link>

        <Link href="/">
          <button className="border px-6 py-3 rounded">
            Continue Shopping
          </button>
        </Link>

      </div>

    </main>

  );

}