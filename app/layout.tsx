"use client";

import { useEffect, useState } from "react";

import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";
import PageTransition from "@/components/PageTransition";

import Loading from "./loading";

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
    },1900);

    return ()=>clearTimeout(timer);
  },[]);

  return (
    <html lang="en">

      <head>

        {/* GOOGLE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="qzM_-UXdyLznuXnMBrAKQG2SqReDvvLQgZ6ggDhd9fA"
        />

        {/* BASIC SEO */}
        <title>05Mart - Online Shopping Store</title>

        <meta
          name="description"
          content="05Mart is an online shopping platform for fashion, deals and fast delivery across India."
        />

        <meta
          name="keywords"
          content="05Mart, online shopping India, fashion store, buy clothes online, best deals"
        />

        <meta name="author" content="05Mart" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="05Mart - Online Shopping Store" />
        <meta property="og:description" content="Shop fashion and deals at 05Mart." />
        <meta property="og:url" content="https://05mart.in" />
        <meta property="og:image" content="https://05mart.in/logo.png" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* BRAND STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "05Mart",
              url: "https://05mart.in",
              logo: "https://05mart.in/logo.png",
            }),
          }}
        />

      </head>

      <body className="relative">

        {loading && (
          <div className="fixed inset-0 z-[9999] bg-white">
            <Loading />
          </div>
        )}

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