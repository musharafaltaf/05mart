"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

  const fetchProducts = async () => {

    try {

      const res = await fetch("/api/products");

      if (!res.ok) {
        console.error("API error");
        return;
      }

      const text = await res.text();

      if (!text) {
        console.log("Empty response");
        return;
      }

      const data = JSON.parse(text);

      setProducts(data);

    } catch (error) {
      console.error("Fetch error:", error);
    }

  };

  fetchProducts();

}, []);
  return (

    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {products.map((product: any) => (

          <Link key={product._id} href={`/product/${product._id}`}>

            <div className="border p-4 rounded hover:shadow-lg">

              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />

              <h2 className="mt-3 font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-500">
                ₹{product.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );
}