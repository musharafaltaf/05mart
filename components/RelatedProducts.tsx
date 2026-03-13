"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RelatedProducts({ category }: any) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch(`/api/products/related?category=${category}`)
      .then(res => res.json())
      .then(setProducts);

  }, [category]);

  return (

    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((p: any) => (

          <Link key={p._id} href={`/product/${p._id}`}>

            <div className="border p-4 rounded">

              <img
                src={p.image}
                className="h-40 w-full object-cover"
              />

              <p className="mt-2">{p.name}</p>
              <p>₹{p.price}</p>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );
}