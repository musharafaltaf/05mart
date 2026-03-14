"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchContent() {

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const res = await fetch(`/api/products/search?q=${query}`);
      const data = await res.json();

      setProducts(data);

    };

    fetchProducts();

  }, [query]);

  return (

    <main className="max-w-6xl mx-auto p-10">

      <h1 className="text-2xl font-bold mb-6">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((product: any) => (

          <Link key={product._id} href={`/product/${product._id}`}>

            <div className="border p-4 rounded">

              <img
                src={product.image}
                className="h-40 w-full object-cover"
              />

              <p className="mt-2">{product.name}</p>

              <p>₹{product.price}</p>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );
}