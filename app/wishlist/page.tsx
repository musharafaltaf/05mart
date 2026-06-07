"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

export default function WishlistPage(){

const [items,setItems] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const router = useRouter();

/* ================= LOAD WISHLIST ================= */

useEffect(()=>{

const loadWishlist = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user") || "null");

const res = await fetch(
`/api/wishlist?userId=${user?._id || "guest"}`
);

if(!res.ok){
setItems([]);
return;
}

const data = await res.json();

setItems(Array.isArray(data.items) ? data.items : []);

}catch(err){
console.log("Wishlist error:",err);
setItems([]);
}

setLoading(false);

};

loadWishlist();

},[]);

/* ================= UI ================= */

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl md:text-3xl font-bold mb-6">
My Wishlist
</h1>

{/* ================= SKELETON ================= */}

{loading && (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{[...Array(8)].map((_,i)=>(
<div key={i} className="animate-pulse">

<div className="bg-gray-200 h-40 rounded-xl mb-3"></div>

<div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
<div className="bg-gray-200 h-4 w-1/2 rounded"></div>

</div>
))}

</div>

)}

{/* ================= EMPTY STATE ================= */}

{!loading && items.length === 0 && (

<div className="flex flex-col items-center justify-center py-20 text-center">

<p className="text-xl font-semibold mb-2">
💔 Your wishlist is empty
</p>

<p className="text-gray-500 text-sm mb-6 max-w-sm">
Save your favorite items and never miss deals again 🔥
</p>

<button
onClick={()=>router.push("/")}
className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl active:scale-95 transition"
>
Explore Products
</button>

<p className="text-xs text-gray-400 mt-3">
✨ Tap ❤️ on products to add them here
</p>

</div>

)}

{/* ================= PRODUCTS ================= */}

{!loading && items.length > 0 && (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">

{items.map((product:any)=>(
<ProductCard key={product.productId || product._id} product={product}/>
))}

</div>

)}

{/* ================= ANIMATION ================= */}

<style jsx>{`

@keyframes fadeIn{
from{opacity:0; transform:translateY(10px);}
to{opacity:1; transform:translateY(0);}
}

.animate-fadeIn{
animation:fadeIn .4s ease;
}

`}</style>

</main>

);

}