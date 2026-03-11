"use client";

import { useState } from "react";

export default function ReviewSection(){

const [reviews,setReviews] = useState<any[]>([]);
const [rating,setRating] = useState(0);
const [text,setText] = useState("");

const submitReview = ()=>{

if(!text){
alert("Write review first");
return;
}

const newReview = {
rating,
text
};

setReviews([newReview,...reviews]);

setText("");
setRating(0);

};

return(

<div className="mt-16">

<h2 className="text-2xl font-semibold mb-6">
Customer Reviews
</h2>

{/* WRITE REVIEW */}

<div className="mb-10">

<p className="mb-2 font-medium">
Your Rating
</p>

<div className="flex gap-2 mb-4">

{[1,2,3,4,5].map((star)=>(
<button
key={star}
onClick={()=>setRating(star)}
className="text-2xl"
>
{rating>=star ? "⭐" : "☆"}
</button>
))}

</div>

<textarea
placeholder="Write your review..."
value={text}
onChange={(e)=>setText(e.target.value)}
className="border p-3 w-full rounded mb-3"
/>

<button
onClick={submitReview}
className="bg-black text-white px-6 py-2 rounded"
>
Submit Review
</button>

</div>

{/* REVIEWS LIST */}

<div className="space-y-6">

{reviews.length===0 && (
<p className="text-gray-500">
No reviews yet
</p>
)}

{reviews.map((r,index)=>(
<div key={index} className="border p-4 rounded">

<p className="text-yellow-500 mb-2">
{"⭐".repeat(r.rating)}
</p>

<p>{r.text}</p>

</div>
))}

</div>

</div>

)

}