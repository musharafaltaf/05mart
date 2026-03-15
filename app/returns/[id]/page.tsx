"use client";

import { useState } from "react";
import { useRouter,useParams } from "next/navigation";

export default function ReturnPage(){

const router = useRouter();
const params = useParams();

const orderId = params.id;

const [reason,setReason] = useState("");

const submitReturn = async()=>{

if(!reason){
alert("Select reason");
return;
}

await fetch("/api/returns",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
orderId,
reason,
returnCharge:40,
paymentStatus:"paid"
})
});

alert("Return request submitted");

router.push("/orders");

};

return(

<main className="max-w-4xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Return Product
</h1>

<select
value={reason}
onChange={(e)=>setReason(e.target.value)}
className="border p-3 rounded w-full"
>

<option value="">
Select reason
</option>

<option value="size">
Size issue
</option>

<option value="damaged">
Damaged product
</option>

<option value="wrong">
Wrong item
</option>

</select>

<p className="mt-4 text-sm text-gray-500">
Return charge ₹40 (Online payment)
</p>

<button
onClick={submitReturn}
className="mt-6 bg-black text-white px-6 py-2 rounded"
>
Pay ₹40 & Submit Return
</button>

</main>

);

}