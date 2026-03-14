"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RelatedProducts({ category, currentId }: any) {

const [products,setProducts] = useState<any[]>([]);

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");

if(!res.ok) return;

const data = await res.json();

/* filter related */

const related = data.filter(
(p:any)=> p.category === category && p._id !== currentId
);

setProducts(related.slice(0,4));

}catch(err){
console.log(err);
}

};

if(category) loadProducts();

},[category,currentId]);

if(products.length === 0) return null;

return(

<section className="mt-16">

<h2 className="text-2xl font-bold mb-6">
Related Products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((p:any)=>(

<Link
key={p._id}
href={`/product/${p._id}`}
className="border rounded-lg overflow-hidden hover:shadow-lg transition"
>

<img
src={p.image}
className="w-full h-40 md:h-52 object-cover"
/>

<div className="p-3">

<p className="font-medium text-sm md:text-base line-clamp-2">
{p.name}
</p>

<p className="text-gray-600 mt-1">
₹{p.price}
</p>

</div>

</Link>

))}

</div>

</section>

);

}