"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCart } from "@/app/context/CartContext";

import "swiper/css";
import "swiper/css/navigation";

export default function TrendingProducts(){

const [products,setProducts] = useState<any[]>([])
const { addToCart } = useCart();

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products")

if(!res.ok) return

const data = await res.json()

setProducts(data)

}catch(err){
console.log(err)
}

}

loadProducts()

},[])

return(

<section className="max-w-7xl mx-auto px-4 py-10 relative">

<h2 className="text-2xl font-bold mb-6">
Trending Products
</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={16}
slidesPerView={2}
className="relative z-0"
breakpoints={{
640:{ slidesPerView:2 },
768:{ slidesPerView:3 },
1024:{ slidesPerView:4 }
}}
>

{products.map((p:any)=>(

<SwiperSlide key={p._id}>

<div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">

<img
src={p.image}
className="w-full h-40 md:h-56 object-cover"
/>

<div className="p-3">

<p className="font-medium text-sm md:text-base line-clamp-2">
{p.name}
</p>

<p className="text-gray-600 mt-1">
₹{p.price}
</p>

<button
onClick={()=>addToCart({...p, qty:1})}
className="mt-3 w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800"
>
Add to Cart
</button>

</div>

</div>

</SwiperSlide>

))}

</Swiper>

</section>

)

}