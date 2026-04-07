"use client";

import {useEffect,useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";

export default function ExchangeTracking(){

const {id}=useParams();
const router = useRouter();
const [order,setOrder]=useState<any>(null);

const load=async()=>{
const res=await fetch(`/api/orders/${id}`,{cache:"no-store"});
const data=await res.json();
setOrder(data);
};

useEffect(()=>{
load();
const interval=setInterval(load,3000);
return()=>clearInterval(interval);
},[]);

if(!order){
return <p className="p-10 text-center">Loading...</p>
}

if(order.exchangeRequest?.status === "cancelled"){
return(

<div className="max-w-xl mx-auto text-center p-10">

<h2 className="text-xl font-semibold mb-2">
Exchange Cancelled
</h2>

<p className="text-gray-500 mb-6">
Your exchange request has been cancelled.
</p>

<div className="flex justify-center gap-4">

<Link
href="/"
className="bg-black text-white px-6 py-2 rounded"
>
Continue Shopping
</Link>

<Link
href="/help"
className="border px-6 py-2 rounded"
>
Get Help
</Link>

</div>

</div>

);
}

const steps=[
"requested",
"approved",
"pickup_scheduled",
"pickup_completed",
"replacement_shipped",
"completed"
];

const labels=[
"Exchange Requested",
"Admin Approved",
"Pickup Scheduled",
"Pickup Completed",
"Replacement Shipped",
"Exchange Completed"
];

const current=steps.indexOf(order.exchangeRequest?.status);

return(

<main className="max-w-3xl mx-auto p-6">

<h1 className="text-xl font-bold mb-6">
Exchange Tracking
</h1>

<div className="border rounded-xl p-6 bg-white shadow">

<div className="w-full bg-gray-200 h-2 rounded mb-6">

<div
className="bg-purple-600 h-2 rounded transition-all"
style={{width:`${((current+1)/steps.length)*100}%`}}
/>

</div>

{labels.map((label,i)=>{

const done=i<=current;

return(

<div key={i} className="flex items-center gap-3 mb-4">

<div className={`w-4 h-4 rounded-full ${done?"bg-purple-600":"bg-gray-300"}`} />

<p className={done?"font-semibold":"text-gray-400"}>
{label}
</p>

</div>

);

})}

</div>

{order.exchangeRequest?.status!=="replacement_shipped" &&
order.exchangeRequest?.status!=="completed" &&(

<button
onClick={async ()=>{

if(!confirm("Cancel exchange request?")) return;

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({ cancelExchange:true })
});

alert("Exchange cancelled");

router.push("/orders");
router.refresh();

}}
className="border text-red-600 px-4 py-2 rounded"
>
Cancel Exchange
</button>

)}

<div className="mt-6 flex gap-3">

<Link
href="/orders"
className="border px-4 py-2 rounded hover:bg-gray-100"
>

Back to Orders

</Link>

<a
href="https://wa.me/919103316778"
className="bg-green-600 text-white px-4 py-2 rounded"
>

Help Support

</a>


</div>

</main>

);

}