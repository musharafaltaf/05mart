"use client";

import { useEffect, useState } from "react";

export default function FlashSale(){

const [products,setProducts] = useState<any[]>([]);
const [timeLeft,setTimeLeft] = useState(7200); // 2 hours

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products")

if(!res.ok) return

const data = await res.json()

// pick first 6 products for flash sale
setProducts(data.slice(0,6))

}catch(err){
console.log(err)
}

}

loadProducts()

},[])

useEffect(()=>{

const timer = setInterval(()=>{
setTimeLeft((prev)=> prev > 0 ? prev - 1 : 0)
},1000)

return ()=> clearInterval(timer)

},[])

const hours = Math.floor(timeLeft / 3600)
const minutes = Math.floor((timeLeft % 3600) / 60)
const seconds = timeLeft % 60

return(

<section className="bg-red-50 py-10">

<div className="max-w-7xl mx-auto px-4">

<div className="flex items-center justify-between mb-6">

<h2 className="text-2xl font-bold text-red-600">
🔥 Flash Sale
</h2>

<p className="font-medium">
Ends in:
<span className="ml-2 bg-black text-white px-3 py-1 rounded">
{hours}:{minutes}:{seconds}
</span>
</p>

</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{products.map((p:any)=>(
<div key={p._id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">

<img
src={p.image}
className="w-full h-40 md:h-52 object-cover"
/>

<div className="p-3">

<p className="font-medium text-sm md:text-base line-clamp-2">
{p.name}
</p>

<div className="flex items-center gap-2 mt-1">

<p className="font-semibold text-red-600">
₹{p.price}
</p>

{p.oldPrice && (
<p className="text-gray-400 line-through text-sm">
₹{p.oldPrice}
</p>
)}

</div>

<button className="mt-3 w-full bg-red-500 text-white py-2 rounded text-sm">
Buy Now
</button>

</div>

</div>
))}

</div>

</div>

</section>

)

}