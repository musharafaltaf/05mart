"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopByCategory(){

const [categories,setCategories] = useState<any[]>([]);
const router = useRouter();

useEffect(()=>{

const loadCategories = async()=>{

const res = await fetch("/api/categories");
const data = await res.json();

setCategories(data);

};

loadCategories();

},[]);

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Popular Categories
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{categories.map((cat:any)=>(

<div
key={cat._id}
onClick={()=>router.push(`/category/${cat.name}`)}
className="cursor-pointer border rounded-xl overflow-hidden hover:shadow-lg"
>

<img
src={cat.image}
className="w-full h-32 object-cover"
/>

<p className="text-center font-medium py-3">
{cat.name}
</p>

</div>

))}

</div>

</section>

);

}