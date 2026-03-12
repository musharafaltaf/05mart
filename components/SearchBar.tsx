"use client";

import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function SearchBar() {

const [query,setQuery] = useState("");

const filtered = products.filter((product)=>
product.name.toLowerCase().includes(query.toLowerCase()) ||
product.category.toLowerCase().includes(query.toLowerCase())
);

return(

<div className="max-w-6xl mx-auto px-6 py-10">

<input
type="text"
placeholder="Search products..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="border w-full p-3 rounded mb-8"
/>

{query && (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{filtered.length===0 && (
<p>No products found</p>
)}

{filtered.map((product)=>(
<ProductCard key={product.id} product={product}/>
))}

</div>

)}

</div>

)

}