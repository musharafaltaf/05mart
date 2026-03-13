"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductPage() {

const params = useParams();

const [product,setProduct] = useState<any>(null);
const [reviews,setReviews] = useState<any[]>([]);


// FETCH PRODUCT
useEffect(()=>{

const loadProduct = async()=>{

const res = await fetch(`/api/products/${params.id}`);
const data = await res.json();

setProduct(data);

};

if(params?.id) loadProduct();

},[params]);


// FETCH REVIEWS
useEffect(()=>{

const loadReviews = async()=>{

try{

const res = await fetch(`/api/reviews?productId=${product._id}`);

if(!res.ok) return;

const data = await res.json();

setReviews(data);

}catch(err){
console.log(err);
}

};

if(product?._id) loadReviews();

},[product]);


if(!product){
return <p className="p-10">Loading product...</p>;
}


return(

<main className="max-w-6xl mx-auto p-10">

{/* PRODUCT SECTION */}

<div className="grid md:grid-cols-2 gap-10">

<img
src={product.image}
className="w-full rounded"
/>

<div>

<h1 className="text-3xl font-semibold mb-3">
{product.name}
</h1>

<p className="text-xl font-bold mb-4">
₹{product.price}
</p>

<p className="text-gray-600 mb-6">
{product.description}
</p>

<button className="bg-black text-white px-6 py-3 rounded">
Add to Cart
</button>

</div>

</div>


{/* REVIEWS SECTION */}

<div className="mt-14">

<h2 className="text-2xl font-semibold mb-6">
Customer Reviews
</h2>


{reviews.length === 0 && (
<p className="text-gray-500">
No reviews yet
</p>
)}


{reviews.map((r:any)=>(
<div key={r._id} className="border p-5 mb-4 rounded">

<p className="text-yellow-500 text-lg">
{"★".repeat(r.rating)}
</p>

<p className="text-gray-700 mt-2">
{r.comment}
</p>

<p className="text-xs text-gray-400 mt-2">
{new Date(r.createdAt).toLocaleDateString()}
</p>

</div>
))}


{/* WRITE REVIEW */}

<Link
href={`/review/${product._id}`}
className="text-blue-600 text-sm"
>
Write a review
</Link>

</div>

</main>

);

}