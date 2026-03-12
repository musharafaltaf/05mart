"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {

  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    const fetchProduct = async () => {

      const res = await fetch(`/api/products/${id}`);

      const data = await res.json();

      setProduct(data);

    };

    fetchProduct();

  }, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  const finalPrice =
    product.price - (product.price * product.discount) / 100;

  return (

    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10">

      <img
        src={product.image || "https://via.placeholder.com/500"}
        alt={product.name}
        className="w-full rounded"
      />

      <div>

        <h1 className="text-3xl font-bold mb-4">
          {product.name}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="flex items-center gap-3 mb-6">

          <span className="text-2xl font-bold text-green-600">
            ₹{Math.round(finalPrice)}
          </span>

          {product.discount > 0 && (
            <>
              <span className="line-through text-gray-400">
                ₹{product.price}
              </span>

              <span className="text-red-500">
                {product.discount}% OFF
              </span>
            </>
          )}

        </div>

        <button className="bg-black text-white px-6 py-3 rounded">
          Add to Cart
        </button>

      </div>

    </div>

  );
}