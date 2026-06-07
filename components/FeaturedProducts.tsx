"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

/* ========================= */
/* 🔥 PRODUCT SKELETON */
/* ========================= */

function ProductSkeleton(){

return(

<div className="bg-white rounded-xl p-3 shadow-sm">

{/* IMAGE */}
<div className="w-full h-[140px] rounded-lg shimmer mb-3"/>

{/* TITLE */}
<div className="h-3 w-3/4 rounded shimmer mb-2"/>

<div className="h-3 w-1/2 rounded shimmer mb-3"/>

{/* PRICE */}
<div className="h-4 w-1/3 rounded shimmer mb-3"/>

{/* BUTTON */}
<div className="h-9 rounded-lg shimmer"/>

</div>

);

}

/* ========================= */

export default function FeaturedProducts(){

const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");

if(!res.ok) return;

const data = await res.json();

/* filter featured */
const featured = data.filter((p:any)=>p.featured);

setProducts(featured);

}catch(err){
console.log(err);
}

/* small delay = premium feel */
setTimeout(()=>{
setLoading(false);
},300);

};

loadProducts();

},[]);

/* ========================= */
/* 🔥 SHOW PREMIUM SKELETON */
/* ========================= */

if(loading){

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
05MART Special products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{Array.from({length:8}).map((_,i)=>(
<ProductSkeleton key={i}/>
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

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
05MART Special products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((product:any)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</section>

);

}