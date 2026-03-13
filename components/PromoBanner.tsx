"use client";

export default function PromoBanner(){

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<div className="relative rounded-2xl overflow-hidden">

<img
src="/banners/sale-banner.jpg"
className="w-full h-[220px] md:h-[360px] object-cover"
/>

<div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-16">

<h2 className="text-white text-2xl md:text-4xl font-bold">
Eid Dhamaka Sale
</h2>

<p className="text-white mt-2 text-sm md:text-lg">
Flat 40% OFF on Selected Items
</p>

<button className="mt-4 bg-white text-black px-6 py-2 rounded w-fit font-medium">
Shop Now
</button>

</div>

</div>

</section>

)

}