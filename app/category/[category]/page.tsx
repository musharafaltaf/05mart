"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {

const params = useParams();

const category =
Array.isArray(params?.category)
? params.category[0]
: params?.category;

const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

if(!category) return;

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");

if(!res.ok) return;

const data = await res.json();

const filtered = data.filter(
(p:any)=> p.category?.toLowerCase() === category.toLowerCase()
);

setProducts(filtered);

}catch(err){
console.log(err);
}

setLoading(false);

};

loadProducts();

},[category]);

if(loading){
return <p className="p-10 text-center">Loading...</p>;
}

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6 capitalize">
{category} Products
</h1>

{products.length === 0 && (
<p>No products found</p>
)}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((product:any)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</main>

);

}