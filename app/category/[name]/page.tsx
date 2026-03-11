"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "../../../data/products";
import ProductCard from "../../../components/ProductCard";

export default function CategoryPage() {

  const params = useParams();
  const category = params.name;

  const [sort,setSort] = useState("default");

  let filteredProducts = products.filter(
    (p)=>p.category === category
  );

  if(sort==="low"){
    filteredProducts = [...filteredProducts].sort((a,b)=>a.price - b.price)
  }

  if(sort==="high"){
    filteredProducts = [...filteredProducts].sort((a,b)=>b.price - a.price)
  }

  if(sort==="new"){
    filteredProducts = [...filteredProducts].sort((a,b)=>b.id - a.id)
  }

  return(

<main className="max-w-6xl mx-auto px-6 py-16">

<div className="flex justify-between items-center mb-10">

<h1 className="text-3xl font-semibold capitalize">
{category}
</h1>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
className="border px-4 py-2 rounded"
>

<option value="default">Sort</option>
<option value="low">Price: Low to High</option>
<option value="high">Price: High to Low</option>
<option value="new">Newest</option>

</select>

</div>

{filteredProducts.length===0 && (
<p>No products found</p>
)}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{filteredProducts.map((product)=>(
<ProductCard key={product.id} product={product}/>
))}

</div>

</main>

  )

}