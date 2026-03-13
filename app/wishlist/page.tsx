"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage(){

const [items,setItems] = useState<any[]>([]);

useEffect(()=>{

const loadWishlist = async()=>{

try{

const res = await fetch("/api/wishlist");

if(!res.ok){
setItems([]);
return;
}

const data = await res.json();

// ensure array
setItems(Array.isArray(data.items) ? data.items : []);

}catch(err){
console.log("Wishlist error:",err);
setItems([]);
}

}

loadWishlist();

},[]);

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
My Wishlist
</h1>

{items.length === 0 && (
<p>No items in wishlist</p>
)}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{items.map((product:any)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</main>

)

}