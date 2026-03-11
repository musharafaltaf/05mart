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
      <body>

        <CartProvider>

<WishlistProvider>

<Navbar />

{children}

<Footer />

</WishlistProvider>

</CartProvider>

      </body>
    </html>
  );
}