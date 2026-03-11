"use client";

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: any) {

  const [wishlist, setWishlist] = useState<any[]>([]);

  const addToWishlist = (product: any) => {

    if (!product) return;

    setWishlist((prev) => {

      const exists = prev.find((item) => item && item.id === product.id);

      if (exists) {
        return prev.filter((item) => item && item.id !== product.id);
      }

      return [...prev, product];

    });

  };

  return (

    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>

  );

}

export const useWishlist = () => useContext(WishlistContext);