"use client";

import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductRow from "../components/ProductRow";
import { products } from "../data/products";

export default function Home(){

return(

<main className="bg-gray-50">

<Hero />

<CategorySection />

<ProductRow title="Trending" products={products.slice(0,6)} />

<ProductRow title="New Arrivals" products={products.slice(6,12)} />

<ProductRow title="Best Sellers" products={products.slice(12,18)} />

</main>

)

}