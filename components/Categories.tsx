"use client";

import Link from "next/link";

export default function Categories(){

const categories = [

{
name:"Anime",
image:"/categories/anime.jpg"
},

{
name:"Tshirts",
image:"/categories/tshirt.jpg"
},

{
name:"Hoodies",
image:"/categories/hoodie.jpg"
},

{
name:"Accessories",
image:"/categories/accessories.jpg"
}

];

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Shop by Category
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{categories.map((cat)=>(
<Link
key={cat.name}
href={`/category/${cat.name}`}
className="relative rounded-xl overflow-hidden"
>

<img
src={cat.image}
className="w-full h-36 md:h-48 object-cover"
/>

<div className="absolute inset-0 bg-black/40 flex items-center justify-center">

<p className="text-white font-semibold text-lg">
{cat.name}
</p>

</div>

</Link>
))}

</div>

</section>

);

}