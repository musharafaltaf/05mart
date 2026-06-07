"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function TrendingProducts(){

const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const { addToCart } = useCart();

/* ========================= */
/* LOAD PRODUCTS */
/* ========================= */

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");

if(!res.ok) return;

const data = await res.json();

/* FILTER */
const trending = data.filter((p:any)=>p.featured === true);

setProducts(trending);

}catch(err){
console.log(err);
}

/* smooth delay */
setTimeout(()=>{
setLoading(false);
},300);

};

loadProducts();

},[]);

/* ========================= */
/* 🔥 PREMIUM SKELETON */
/* ========================= */

if(loading){

return(

<section className="px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Trending Products
</h2>

<div className="flex gap-4 overflow-x-auto no-scrollbar">

{Array.from({length:6}).map((_,i)=>(

<div key={i} className="min-w-[160px] bg-white rounded-xl p-3 shadow-sm">

<div className="h-[120px] rounded-lg shimmer mb-3"/>

<div className="h-3 w-3/4 shimmer mb-2"/>

<div className="h-3 w-1/2 shimmer mb-2"/>

<div className="h-4 w-1/3 shimmer mb-3"/>

<div className="h-8 rounded shimmer"/>

</div>

))}

</div>

</section>

);

}

/* ========================= */

if(products.length === 0){
return null;
}

/* ========================= */
/* 🔥 PREMIUM SLIDER (NO SWIPER) */
/* ========================= */

return(

<section className="px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Trending Products
</h2>

<div
className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
style={{
scrollBehavior:"smooth",
WebkitOverflowScrolling:"touch"
}}
>

{products.map((p:any)=>(

<div
key={p._id}
className="min-w-[160px] md:min-w-[220px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition active:scale-[0.97]"
>

<Link href={`/product/${p._id}`}>

<img
src={p.image}
className="w-full h-[140px] md:h-[180px] object-cover"
/>

</Link>

<div className="p-3">

<Link href={`/product/${p._id}`}>

<p className="font-medium text-sm md:text-base line-clamp-2 hover:underline">
{p.name}
</p>

</Link>

<div className="flex items-center gap-2 mt-1">

<p className="font-semibold">
₹{p.price}
</p>

{p.mrp && (
<p className="text-gray-400 line-through text-sm">
₹{p.mrp}
</p>
)}

</div>

<button
onClick={()=>addToCart({...p, quantity:1})}
className="mt-3 w-full bg-black text-white py-2 rounded text-sm active:scale-[0.96]"
>
Add to Cart
</button>

</div>

</div>

))}

</div>

</section>

)

}