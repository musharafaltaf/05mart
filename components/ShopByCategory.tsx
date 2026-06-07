// "use client";

// import { useEffect, useState } from "react";

// export default function ShopByCategory(){

// const [categories,setCategories] = useState<any[]>([]);

// useEffect(()=>{

// const loadCategories = async()=>{

// try{

// const res = await fetch("/api/categories");

// if(!res.ok){
// console.log("Categories API failed");
// return;
// }

// const text = await res.text();

// if(!text){
// setCategories([]);
// return;
// }

// const data = JSON.parse(text);

// setCategories(data);

// }catch(err){

// console.log("Categories error:",err);
// setCategories([]);

// }

// };

// loadCategories();

// },[]);

// return(

// <section className="max-w-7xl mx-auto px-4 py-10">

// <h2 className="text-xl font-bold mb-6">
// Shop by Category
// </h2>

// <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// {categories.map((cat:any)=>(

// <div
// key={cat._id}
// className="border rounded p-4 text-center hover:shadow"
// >

// <img
// src={cat.image}
// className="w-full h-28 object-cover rounded mb-3"
// />

// <p className="font-medium">
// {cat.name}
// </p>

// </div>

// ))}

// </div>

// </section>

// );

// }








"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopByCategory(){

const [categories,setCategories] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const router = useRouter();

useEffect(()=>{

const loadCategories = async()=>{

try{

const res = await fetch("/api/categories");

if(res.ok){
const data = await res.json();
setCategories(data || []);
}

}catch(err){
console.log("Categories error:",err);
}

setLoading(false);

};

loadCategories();

},[]);

/* ========================= */
/* 🔥 PREMIUM SKELETON */
/* ========================= */

if(loading){

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<div className="h-6 w-40 mb-6 rounded shimmer"/>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{Array.from({length:6}).map((_,i)=>(

<div key={i} className="rounded-xl overflow-hidden">

<div className="w-full h-36 md:h-48 shimmer"/>

<div className="absolute inset-0 flex items-center justify-center"/>

</div>

))}

</div>

</section>

);

}

/* ========================= */

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Shop by Category
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{categories.map((cat:any)=>(

<div
key={cat._id}
onClick={()=>router.push(`/category/${cat.name?.toLowerCase()}`)}
className="relative rounded-xl overflow-hidden cursor-pointer group active:scale-95 transition duration-150"
>

{/* IMAGE */}
<img
src={cat.image}
className="w-full h-36 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
/>

{/* OVERLAY */}
<div className="absolute inset-0 bg-black/40 flex items-center justify-center">

<p className="text-white font-semibold text-lg tracking-wide">
{cat.name}
</p>

</div>

</div>

))}

</div>

</section>

);

}