"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { products } from "../../../data/products";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [imageIndex, setImageIndex] = useState(0);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <main className="min-h-screen p-6 bg-white text-black">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Product Images */}
        <div>

          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="w-full rounded-xl mb-4"
          />

          <div className="flex gap-3">

            {product.images.map((img, index) => (

              <img
                key={index}
                src={img}
                onClick={() => setImageIndex(index)}
                className={`w-20 h-20 rounded cursor-pointer border ${
                  imageIndex === index ? "border-black" : "border-gray-300"
                }`}
              />

            ))}

          </div>

        </div>


        {/* Product Info */}
        <div>

          <h1 className="text-3xl font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold mb-6">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}