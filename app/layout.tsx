"use client";

import { useEffect, useState } from "react";

import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";
import PageTransition from "@/components/PageTransition";

import Loading from "./loading"; // ✅ IMPORT LOADER

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
    },1900); // ⏱️ control loader time

    return ()=>clearTimeout(timer);
  },[]);

  return (
    <html lang="en">
      <body className="relative">

        {/* ✅ SHOW LOADER FIRST */}
        {loading && (
          <div className="fixed inset-0 z-[9999] bg-white">
            <Loading />
          </div>
        )}

        {/* ✅ YOUR ORIGINAL APP (UNCHANGED) */}
        <CartProvider>
          <WishlistProvider>

            <Navbar />

            <main className="relative z-10">
  <PageTransition>
    {children}
  </PageTransition>
</main>

            <Footer />

          </WishlistProvider>
        </CartProvider>

      </body>
    </html>
  );
}