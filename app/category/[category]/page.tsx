"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {

const params = useParams();

/* ✅ SAFE PARAM */
const category =
Array.isArray(params?.category)
? params.category[0]
: params?.category;

const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

/* ========================= */
/* LOAD PRODUCTS */
/* ========================= */

useEffect(()=>{

if(!category) return;

const loadProducts = async()=>{

try{

/* ✅ FETCH ALL */
const res = await fetch("/api/products");

if(!res.ok){
setProducts([]);
setLoading(false);
return;
}

const data = await res.json();

/* ✅ SAFE FILTER (VERY IMPORTANT FIX) */
const filtered = data.filter((p:any)=>{

const dbCategory = (p.category || "").toLowerCase().trim();
const urlCategory = (category || "").toLowerCase().trim();

return dbCategory === urlCategory;

});

setProducts(filtered);

}catch(err){
console.log("CATEGORY ERROR:",err);
setProducts([]);
}

setLoading(false);

};

loadProducts();

},[category]);

/* ========================= */
/* LOADING */
/* ========================= */

if(loading){
return <p className="p-10 text-center">Loading...</p>;
}

/* ========================= */
/* UI */
/* ========================= */

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6 capitalize">
{category} Products
</h1>



{products.length === 0 && (
<p className="text-center text-gray-500">
No products found in this category
</p>
)}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((product:any)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</main>

);

}