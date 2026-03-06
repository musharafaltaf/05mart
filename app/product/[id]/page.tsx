"use client";

import { useParams } from "next/navigation";
import { products } from "../../../data/products";
import { useState } from "react";
import Link from "next/link";

export default function ProductPage(){

const params = useParams();

const product = products.find(
(p)=>p.id === Number(params.id)
);

const [size,setSize] = useState("M");
const [quantity,setQuantity] = useState(1);
const [activeImage,setActiveImage] = useState(0);

if(!product){
return <div className="p-10">Product not found</div>
}

const relatedProducts = products.filter(
(p)=>p.category === product.category && p.id !== product.id
);

return (

<div className="max-w-6xl mx-auto px-6 py-12">

<div className="grid md:grid-cols-2 gap-10">

{/* IMAGE */}

<div>

<img
src={product.images[activeImage]}
className="w-full h-[450px] object-cover rounded-xl mb-4"
/>

<div className="flex gap-3">

{product.images.map((img,index)=>(
<img
key={index}
src={img}
onClick={()=>setActiveImage(index)}
className={`w-20 h-20 object-cover rounded cursor-pointer border
${activeImage===index ? "border-black":"border-gray-200"}`}
/>
))}

</div>

</div>


{/* PRODUCT DETAILS */}

<div>

<h1 className="text-3xl font-semibold mb-2">
{product.name}
</h1>

<div className="text-yellow-500 mb-3">
⭐⭐⭐⭐☆
</div>

<p className="text-xl font-medium mb-4">
₹{product.price}
</p>

<p className="text-gray-600 mb-6">
Premium quality clothing designed for comfort and modern style.
</p>

{/* SIZE */}

<div className="mb-6">

<p className="mb-2 font-medium">
Size
</p>

<div className="flex gap-3">

{["S","M","L","XL"].map((s)=>(
<button
key={s}
onClick={()=>setSize(s)}
className={`px-4 py-2 border rounded
${size===s ? "bg-black text-white":"bg-white"}`}
>
{s}
</button>
))}

</div>

</div>

{/* QUANTITY */}

<div className="flex items-center gap-4 mb-6">

<button
onClick={()=>setQuantity(q=>Math.max(1,q-1))}
className="border px-3 py-1"
>
-
</button>

<span>
{quantity}
</span>

<button
onClick={()=>setQuantity(q=>q+1)}
className="border px-3 py-1"
>
+
</button>

</div>

{/* ADD TO CART */}

<button className="bg-black text-white px-6 py-3 rounded-lg">
Add to Cart
</button>

</div>

</div>


{/* RELATED PRODUCTS */}

<div className="mt-16">

<h2 className="text-2xl font-semibold mb-6">
You May Also Like
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{relatedProducts.map((item)=>(
<Link key={item.id} href={`/product/${item.id}`}>

<div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

<img
src={item.images[0]}
className="w-full h-48 object-cover rounded-lg mb-3"
/>

<h3 className="text-sm font-medium">
{item.name}
</h3>

<p className="text-gray-500 text-sm">
₹{item.price}
</p>

</div>

</Link>
))}

</div>

</div>

</div>

);
}