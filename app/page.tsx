"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../data/products";

export default function Home() {

const [search,setSearch] = useState("");

const categories = ["T-Shirts","Shirts","Hoodies","Jeans","Jackets"];

const filteredProducts = products.filter((product)=>
product.name.toLowerCase().includes(search.toLowerCase())
);

const getCategoryProducts = (category:string)=>
products.filter((p)=>p.category===category).slice(0,6);

return (

<main className="min-h-screen bg-gray-50 text-black">

{/* HERO */}

<section className="relative h-[420px] flex items-center justify-center text-center text-white">

<Image
src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200"
alt="Fashion Banner"
fill
className="object-cover"
/>

<div className="absolute inset-0 bg-black/40"></div>

<div className="relative z-10">

<h1 className="text-4xl md:text-6xl font-bold mb-4">
New Streetwear Collection
</h1>

<p>
Discover modern fashion with 05Mart
</p>

</div>

</section>


{/* SEARCH */}

<section className="py-10 flex justify-center">

<input
type="text"
placeholder="Search clothing..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border px-5 py-3 w-full max-w-md rounded-lg"
/>

</section>


{/* TRENDING */}

<section className="px-6 mb-14">

<h2 className="text-2xl font-semibold mb-6">
Trending
</h2>

<div className="flex gap-6 overflow-x-auto">

{products.slice(0,6).map((product)=>(
<Link key={product.id} href={`/product/${product.id}`} className="min-w-[220px]">

<div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

<Image
src={product.images[0]}
alt={product.name}
width={400}
height={400}
className="w-full h-48 object-cover rounded-lg mb-3"
/>

<h3 className="text-sm font-medium">
{product.name}
</h3>

<p className="text-gray-500 text-sm">
₹{product.price}
</p>

</div>

</Link>
))}

</div>

</section>


{/* CATEGORY SECTIONS */}

{categories.map((cat)=>{

const items = getCategoryProducts(cat);

if(items.length===0) return null;

return (

<section key={cat} className="px-6 mb-14">

<h2 className="text-2xl font-semibold mb-6">
{cat}
</h2>

<div className="flex gap-6 overflow-x-auto">

{items.map((product)=>(
<Link key={product.id} href={`/product/${product.id}`} className="min-w-[220px]">

<div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

<Image
src={product.images[0]}
alt={product.name}
width={400}
height={400}
className="w-full h-48 object-cover rounded-lg mb-3"
/>

<h3 className="text-sm font-medium">
{product.name}
</h3>

<p className="text-gray-500 text-sm">
₹{product.price}
</p>

</div>

</Link>
))}

</div>

</section>

);

})}


{/* ALL PRODUCTS */}

<section className="px-6 pb-20">

<h2 className="text-2xl font-semibold mb-6">
All Products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{filteredProducts.map((product)=>(

<Link key={product.id} href={`/product/${product.id}`}>

<div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

<Image
src={product.images[0]}
alt={product.name}
width={400}
height={400}
className="w-full h-52 object-cover rounded-lg mb-3"
/>

<h3 className="text-sm font-medium">
{product.name}
</h3>

<p className="text-gray-500 text-sm">
₹{product.price}
</p>

</div>

</Link>

))}

</div>

</section>

</main>

);

}