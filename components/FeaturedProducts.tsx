"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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

setLoading(false);

};

loadProducts();

},[]);

if(loading){
return <p className="text-center py-10">Loading...</p>;
}

if(products.length === 0){
return null;
}

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Featured Products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((product:any)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</section>

);

}