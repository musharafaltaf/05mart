"use client";

import { useState } from "react";
import { useRouter,useParams } from "next/navigation";

export default function ReviewPage(){

const router = useRouter();
const params = useParams();

const productId = params.productId;

const [rating,setRating] = useState(5);
const [comment,setComment] = useState("");

const submitReview = async()=>{

await fetch("/api/reviews",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
productId,
rating,
comment
})
});

alert("Review submitted");

router.push(`/product/${productId}`);

};

return(

<main className="max-w-4xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Write Review
</h1>

<select
value={rating}
onChange={(e)=>setRating(Number(e.target.value))}
className="border p-3 rounded w-full"
>

<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>

</select>

<textarea
placeholder="Write your review"
className="border p-3 rounded w-full mt-4"
value={comment}
onChange={(e)=>setComment(e.target.value)}
/>

<button
onClick={submitReview}
className="mt-6 bg-black text-white px-6 py-2 rounded"
>
Submit Review
</button>

</main>

);

}