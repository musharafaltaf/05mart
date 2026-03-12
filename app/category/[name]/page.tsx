"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "../../../data/products";
import ProductCard from "../../../components/ProductCard";

export default function CategoryPage() {

  const params = useParams();
  const category = params.name;

  const [priceFilter, setPriceFilter] = useState("all");

  let filteredProducts = products.filter(
    (p) => p.category === category
  );

  if (priceFilter === "under1000") {
    filteredProducts = filteredProducts.filter((p) => p.price < 1000);
  }

  if (priceFilter === "1000to2000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 1000 && p.price <= 2000
    );
  }

  if (priceFilter === "above2000") {
    filteredProducts = filteredProducts.filter((p) => p.price > 2000);
  }

  return (

    <main className="max-w-6xl mx-auto px-6 py-16">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-3xl font-semibold capitalize">
          {category}
        </h1>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >

          <option value="all">All Prices</option>
          <option value="under1000">Under ₹1000</option>
          <option value="1000to2000">₹1000 - ₹2000</option>
          <option value="above2000">Above ₹2000</option>

        </select>

      </div>

      {filteredProducts.length === 0 && (
        <p>No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </main>

  );

}