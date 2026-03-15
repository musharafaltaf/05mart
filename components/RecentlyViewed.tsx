"use client";

import { useEffect,useState } from "react";
import ProductCard from "./ProductCard";

export default function RecentlyViewed(){

const [products,setProducts] = useState<any[]>([]);

useEffect(()=>{

const stored = localStorage.getItem("recentProducts");

if(stored){
setProducts(JSON.parse(stored));
}

},[]);

if(products.length === 0) return null;

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-xl font-semibold mb-6">
Recently Viewed
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((p:any)=>(
<ProductCard key={p._id} product={p}/>
))}

</div>

</section>

);

}