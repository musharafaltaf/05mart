import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function RelatedProducts({ category, currentId }: any) {

  const related = products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0,4);

  if (related.length === 0) return null;

  return (

    <div className="mt-20">

      <h2 className="text-2xl font-semibold mb-8">
        You may also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </div>

  );

}