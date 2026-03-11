"use client";

import { useParams } from "next/navigation";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {

  const params = useParams();

  const category = params.name;

  const filteredProducts = products.filter(
    (p) => p.category === category
  );

  return (

    <main className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-semibold mb-10 capitalize">
        {category}
      </h1>

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