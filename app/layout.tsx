import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">

        <CartProvider>
          <WishlistProvider>

            <Navbar />

            {/* PAGE CONTENT */}
            <main className="relative z-10">
              {children}
            </main>

            <Footer />

          </WishlistProvider>
        </CartProvider>

      </body>
    </html>
  );
}