"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b bg-white sticky top-0 z-50">

      <Link href="/">
        <h1 className="text-2xl font-bold">05Mart</h1>
      </Link>

      <div className="flex gap-8 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/wishlist">Wishlist</Link>



      </div>

      <Link href="/cart">
        <button className="border px-5 py-2 rounded-full">
          Cart ({cart.length})
        </button>
      </Link>

    </nav>
  );
}