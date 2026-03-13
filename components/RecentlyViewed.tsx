"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function RecentlyViewed(){

const [products,setProducts] = useState<any[]>([])

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

setProducts(data)

},[])

if(products.length === 0) return null

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Recently Viewed
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((p:any)=>(
<ProductCard key={p._id} product={p}/>
))}

</div>

</section>

)

}