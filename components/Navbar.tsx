"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="flex items-center justify-between px-12 py-6 border-b bg-white text-black">

      <Link href="/" className="text-2xl font-semibold tracking-wide">
        05Mart
      </Link>

      <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/admin">Admin</Link>
      </div>

      <Link
        href="/cart"
        className="border px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
      >
        Cart ({cart.length})
      </Link>

    </nav>
  );
}