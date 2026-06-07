// "use client";

// import { useEffect, useState } from "react";

// export default function FlashSale(){

// const [products,setProducts] = useState<any[]>([]);
// const [timeLeft,setTimeLeft] = useState(7200); // 2 hours

// useEffect(()=>{

// const loadProducts = async()=>{

// try{

// const res = await fetch("/api/products")

// if(!res.ok) return

// const data = await res.json()

// // pick first 6 products for flash sale
// setProducts(data.slice(0,6))

// }catch(err){
// console.log(err)
// }

// }

// loadProducts()

// },[])

// useEffect(()=>{

// const timer = setInterval(()=>{
// setTimeLeft((prev)=> prev > 0 ? prev - 1 : 0)
// },1000)

// return ()=> clearInterval(timer)

// },[])

// const hours = Math.floor(timeLeft / 3600)
// const minutes = Math.floor((timeLeft % 3600) / 60)
// const seconds = timeLeft % 60

// return(

// <section className="bg-red-50 py-10">

// <div className="max-w-7xl mx-auto px-4">

// <div className="flex items-center justify-between mb-6">

// <h2 className="text-2xl font-bold text-red-600">
// 🔥 Flash Sale
// </h2>

// <p className="font-medium">
// Ends in:
// <span className="ml-2 bg-black text-white px-3 py-1 rounded">
// {hours}:{minutes}:{seconds}
// </span>
// </p>

// </div>

// <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// {products.map((p:any)=>(
// <div key={p._id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">

// <img
// src={p.image}
// className="w-full h-40 md:h-52 object-cover"
// />

// <div className="p-3">

// <p className="font-medium text-sm md:text-base line-clamp-2">
// {p.name}
// </p>

// <div className="flex items-center gap-2 mt-1">

// <p className="font-semibold text-red-600">
// ₹{p.price}
// </p>

// {p.oldPrice && (
// <p className="text-gray-400 line-through text-sm">
// ₹{p.oldPrice}
// </p>
// )}

// </div>

// <button className="mt-3 w-full bg-red-500 text-white py-2 rounded text-sm">
// Buy Now
// </button>

// </div>

// </div>
// ))}

// </div>

// </div>

// </section>

// )

// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

/* ========================= */
/* TIMER */
/* ========================= */

function useFlashTimer(){

const [time,setTime] = useState(12 * 60 * 60);

useEffect(()=>{

const interval = setInterval(()=>{

setTime(prev=>{
if(prev <= 1) return 12 * 60 * 60;
return prev - 1;
});

},1000);

return ()=>clearInterval(interval);

},[]);

const h = String(Math.floor(time / 3600)).padStart(2,"0");
const m = String(Math.floor((time % 3600) / 60)).padStart(2,"0");
const s = String(time % 60).padStart(2,"0");

return `${h}:${m}:${s}`;
}

/* ========================= */
/* SKELETON */
/* ========================= */

function FlashSkeleton(){

return(

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{Array.from({length:6}).map((_,i)=>(

<div key={i} className="bg-white rounded-xl p-3 shadow-sm animate-pulse">

<div className="h-40 bg-gray-200 rounded mb-3"/>

<div className="h-3 w-3/4 bg-gray-200 mb-2"/>

<div className="h-4 w-1/2 bg-gray-200 mb-2"/>

<div className="h-9 bg-gray-200 rounded"/>

</div>

))}

</div>

)

}

/* ========================= */
/* MAIN COMPONENT */
/* ========================= */

export default function FlashSale(){

const { addToCart } = useCart();
const router = useRouter();

/* STATES */
const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);
const [buyLoading,setBuyLoading] = useState<string | null>(null);

const timer = useFlashTimer();

/* ========================= */
/* LOAD PRODUCTS */
/* ========================= */

useEffect(()=>{

async function loadProducts(){

try{

const res = await fetch("/api/products");
const data = await res.json();

setProducts(data.slice(0,15));

}catch(err){
console.log("FlashSale error:",err);
}

setTimeout(()=>setLoading(false),300);

}

loadProducts();

},[]);

/* ========================= */
/* BUY NOW */
/* ========================= */

const handleBuyNow = (p:any)=>{

if(buyLoading) return;

setBuyLoading(p._id);

/* ADD TO CART */
addToCart({ ...p, qty:1 });

/* REDIRECT */
setTimeout(()=>{
router.push(`/product/${p._id}`);
},700);

};

/* ========================= */
/* UI */
/* ========================= */

return(

<section className="bg-gradient-to-r from-red-50 to-orange-50 py-10">

<div className="max-w-7xl mx-auto px-4">

{/* HEADER */}
<div className="flex items-center justify-between mb-6">

<h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
🔥 Flash Sale
</h2>

<div className="bg-black text-white px-4 py-1 rounded-full text-sm font-mono shadow">
{timer}
</div>

</div>

{/* CONTENT */}
{loading ? (

<FlashSkeleton/>

) : (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((p:any)=>{

const discount = p.mrp
? Math.round(((p.mrp - p.price) / p.mrp) * 100)
: 0;

return(

<div
key={p._id}
className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition hover:scale-[1.02] relative"
>

{/* DISCOUNT */}
{discount > 0 && (
<div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
{discount}% OFF
</div>
)}

<Link href={`/product/${p._id}`}>
<img
src={p.image}
className="w-full h-40 md:h-52 object-cover"
/>
</Link>

<div className="p-3">

<Link href={`/product/${p._id}`}>
<p className="font-medium text-sm md:text-base line-clamp-2 hover:underline">
{p.name}
</p>
</Link>

<div className="flex items-center gap-2 mt-1">

<p className="text-red-600 font-bold text-lg">
₹{p.price}
</p>

{p.mrp && (
<p className="text-gray-400 line-through text-sm">
₹{p.mrp}
</p>
)}

</div>

<button
onClick={()=>handleBuyNow(p)}
className="mt-3 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-medium active:scale-[0.96] transition flex items-center justify-center gap-2"
>
{buyLoading === p._id ? (
<>
<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
Processing...
</>
) : (
"Buy Now"
)}
</button>

</div>

</div>

)

})}

</div>

)}

</div>

</section>

);
}