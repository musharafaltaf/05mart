"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { useWishlist } from "../app/context/WishlistContext";

export default function ProductCard({ product }: any) {

  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  if (!product) return null;

  const liked = wishlist?.some((item: any) => item && item.id === product.id);

  return (

    <div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden relative">

      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-3 right-3 text-xl"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      <Link href={`/product/${product.id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover"
        />

      </Link>

      <div className="p-4">

        <p className="text-yellow-500 text-sm mb-1">
          ⭐⭐⭐⭐☆
        </p>

        <h3 className="font-medium mb-1">
          {product.name}
        </h3>

        <p className="text-gray-700 font-semibold mb-3">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Add to Cart
        </button>

      </div>

    </div>

  );

}