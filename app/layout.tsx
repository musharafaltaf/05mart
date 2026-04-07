import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SupportButton from "@/components/SupportButton";
import PageTransition from "@/components/PageTransition";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import ClientLayout from "@/components/ClientLayout";
import ReviewPopup from "@/components/ReviewPopup";

export const metadata = {
  title: "05Mart - Online Shopping Store",
  description:
    "05Mart is an online shopping platform for fashion, deals and fast delivery across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <head>

        <meta
          name="google-site-verification"
          content="qzM_-UXdyLznuXnMBrAKQG2SqReDvvLQgZ6ggDhd9fA"
        />

        <meta
          name="keywords"
          content="05Mart, online shopping India, fashion store, buy clothes online, best deals"
        />

        <meta name="author" content="05Mart" />

        <meta property="og:title" content="05Mart - Online Shopping Store" />
        <meta property="og:description" content="Shop fashion and deals at 05Mart." />
        <meta property="og:url" content="https://05mart.in" />
        <meta property="og:image" content="https://05mart.in/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />

      </head>

      <body className="relative">
        <ReviewPopup/>

        <CartProvider>
          <WishlistProvider>

            <ClientLayout>

              <Navbar children={""}/>

              <SupportButton />

              <main className="relative z-10">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>

              <Footer />

            </ClientLayout>

          </WishlistProvider>
        </CartProvider>

      </body>

    </html>
  );
}