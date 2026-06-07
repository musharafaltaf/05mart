"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider(){

const [banners,setBanners] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const router = useRouter();

/* ========================= */
/* LOAD FROM ADMIN */
/* ========================= */

useEffect(()=>{

const loadBanners = async()=>{

try{

const res = await fetch("/api/banners");

if(!res.ok) return;

const data = await res.json();

if(Array.isArray(data)){
setBanners(data);
}

}catch(err){
console.log("Banner error:",err);
}

setLoading(false);

};

loadBanners();

},[]);

/* ========================= */
/* 🔥 PREMIUM HERO SKELETON */
/* ========================= */

if(loading){

return(

<div className="max-w-7xl mx-auto px-4 py-6">

<div className="relative rounded-xl overflow-hidden">

{/* IMAGE SKELETON */}
<div className="w-full h-[220px] md:h-[420px] bg-gray-200 shimmer"/>

{/* OVERLAY CONTENT SKELETON */}
<div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">

<div className="h-6 md:h-10 w-2/3 rounded shimmer mb-3"/>

<div className="h-4 md:h-6 w-1/2 rounded shimmer mb-4"/>

<div className="h-10 w-[140px] rounded-md shimmer"/>

</div>

</div>

</div>

);

}

/* ========================= */

if(!banners.length) return null;

/* ========================= */

return(

<div className="max-w-7xl mx-auto px-4 py-6">

<Swiper
modules={[Autoplay,Pagination]}
autoplay={{ delay:3000 }}
pagination={{ clickable:true }}
loop
className="rounded-xl overflow-hidden"
>

{banners.map((banner,index)=>(

<SwiperSlide key={index}>

<div
onClick={()=>{
if(banner.link){
router.push(banner.link);
}
}}
className="relative cursor-pointer"
>

<img
src={banner.image}
className="w-full h-[220px] md:h-[420px] object-cover"
/>

{/* overlay */}
<div className="absolute inset-0 bg-black/30"></div>

{/* content */}
<div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">

<h2 className="text-2xl md:text-5xl font-bold">
{banner.title}
</h2>

<p className="text-sm md:text-xl mt-2">
{banner.subtitle}
</p>

{banner.link && (
<button
onClick={(e)=>{
e.stopPropagation();
router.push(banner.link);
}}
className="mt-4 bg-white text-black px-6 py-2 rounded w-fit font-medium hover:scale-105 transition"
>
Shop Now
</button>
)}

</div>

</div>

</SwiperSlide>

))}

</Swiper>

</div>

);

}