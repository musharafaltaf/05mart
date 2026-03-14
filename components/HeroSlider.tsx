"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

export default function HeroSlider(){

const banners = [
{
title:"Eid Dhamaka Sale",
subtitle:"Up to 50% OFF",
image:"/banners/banner1.jpg"
},
{
title:"Summer Collection",
subtitle:"New Trending Styles",
image:"/banners/banner2.jpg"
},
{
title:"Flash Deals",
subtitle:"Limited Time Offer",
image:"/banners/banner3.jpg"
}
]

return(

<div className="max-w-7xl mx-auto px-4 py-6">

<Swiper
className="relative z-0"
modules={[Autoplay,Pagination]}
autoplay={{ delay:3000 }}
pagination={{ clickable:true }}
loop
>

{banners.map((banner,index)=>(

<SwiperSlide key={index}>

<div className="relative rounded-xl overflow-hidden pointer-events-auto">

<img
src={banner.image}
className="w-full h-[220px] md:h-[420px] object-cover"
/>

{/* overlay should not block clicks */}
<div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

{/* content */}
<div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 pointer-events-none">

<h2 className="text-white text-2xl md:text-5xl font-bold">
{banner.title}
</h2>

<p className="text-white text-sm md:text-xl mt-2">
{banner.subtitle}
</p>

</div>

</div>

</SwiperSlide>

))}

</Swiper>

</div>

)
}