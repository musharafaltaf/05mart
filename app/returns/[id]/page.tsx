"use client";

import { useParams,useRouter } from "next/navigation";
import { useEffect,useState } from "react";

export default function ReturnTracking(){

const { id } = useParams();
const router = useRouter();

const [order,setOrder] = useState<any>(null);
const [loading,setLoading] = useState(true);
const [actionLoading,setActionLoading] = useState(false);

/* ========================= */
/* RETURN STEPS */
/* ========================= */

const steps = [
"requested",
"approved",
"pickup_scheduled",
"refund_processing",
"completed"
];

const labels = [
"Return Requested",
"Return Approved",
"Pickup Scheduled",
"Refund Processing",
"Refund Completed"
];

/* ========================= */
/* LOAD ORDER */
/* ========================= */

const loadOrder = async()=>{

try{

const res = await fetch(`/api/orders/${id}`,{
cache:"no-store"
});

const data = await res.json();

setOrder(data);

}catch(err){
console.log(err);
}

setLoading(false);

};

/* AUTO REFRESH */

useEffect(()=>{

loadOrder();

const interval=setInterval(loadOrder,3000);

return ()=>clearInterval(interval);

},[]);

/* ========================= */
/* CURRENT STEP */
/* ========================= */

const currentIndex =
steps.indexOf(order?.returnRequest?.status);

/* ========================= */
/* REFUND CALCULATION */
/* ========================= */

const returnFee = 70;

const refundAmount =
order?.returnRequest?.chargeOption === "deduct"
? order?.total - returnFee
: order?.total;

/* ========================= */
/* PICKUP DATE */
/* ========================= */

const pickupDate = new Date(order?.createdAt);
pickupDate.setDate(pickupDate.getDate()+2);

/* ========================= */
/* REFUND DATE */
/* ========================= */

const refundDate = new Date(order?.createdAt);
refundDate.setDate(refundDate.getDate()+7);

/* ========================= */
/* REFUND COUNTDOWN */
/* ========================= */

const [countdown,setCountdown] = useState("");

useEffect(()=>{

const timer=setInterval(()=>{

const now = new Date().getTime();
const distance = refundDate.getTime() - now;

if(distance<=0){
setCountdown("Processing soon");
return;
}

const days=Math.floor(distance/(1000*60*60*24));
const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

setCountdown(`${days}d ${hours}h remaining`);

},1000);

return ()=>clearInterval(timer);

},[order]);

/* ========================= */
/* COURIER TRACKING */
/* ========================= */

const courierTracking =
order?.returnRequest?.pickup?.trackingNumber
|| "TRK"+order?._id?.slice(-6);

/* ========================= */
/* CANCEL RETURN */
/* ========================= */

const cancelReturn = async()=>{

if(!confirm("Cancel this return request?")) return;

setActionLoading(true);

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
returnRequest:null,
status:"delivered"
})
});

setActionLoading(false);

router.push(`/orders/${id}`);

};

if(loading){
return <p className="p-10 text-center">Loading return status...</p>
}

if(!order){
return <p className="p-10 text-center">Return not found</p>
}

const item = order.items?.[0];

/* ========================= */
/* UI */
/* ========================= */

return(

<main className="max-w-3xl mx-auto px-3 md:px-4 py-6 space-y-6">

<h1 className="text-2xl font-bold">
Return Tracking
</h1>

<p className="text-sm text-gray-500">
Return ID: {order._id}
</p>

{/* PRODUCT */}

<div className="flex gap-4 border p-4 rounded-lg shadow-sm">

<img
src={item?.image}
className="w-16 h-16 md:w-20 md:h-20 rounded object-cover"
/>

<div>

<p className="font-semibold">
{item?.name}
</p>

<p className="text-sm text-gray-500">
Size: {item?.size}
</p>

<p className="font-bold text-lg">
₹{item?.price}
</p>

</div>

</div>

{/* REFUND SUMMARY */}

<div className="border p-4 rounded-lg bg-green-50 space-y-2">

<h2 className="font-semibold">
Refund Summary
</h2>

<div className="flex justify-between text-sm">
<span>Product Price</span>
<span>₹{order.total}</span>
</div>

{order.returnRequest?.chargeOption==="deduct" &&(

<div className="flex justify-between text-red-600 text-sm">
<span>Return Fee</span>
<span>- ₹70</span>
</div>

)}

<hr/>

<div className="flex justify-between font-bold text-lg text-green-700">
<span>Refund Amount</span>
<span>₹{refundAmount}</span>
</div>

</div>

{/* PROGRESS TRACKER */}

<div className="border p-4 rounded-lg overflow-x-auto">

<div className="min-w-[420px]">

<div className="relative">

<div className="absolute top-3 left-0 right-0 h-1 bg-gray-200"></div>

<div
className="absolute top-3 left-0 h-1 bg-green-500 transition-all duration-700"
style={{
width:`${((currentIndex+1)/steps.length)*100}%`
}}
></div>

{/* MOVING COURIER */}

<div
className="absolute -top-3 transition-all duration-700 text-lg"
style={{
left:`calc(${((currentIndex+1)/steps.length)*100}% - 10px)`
}}
>
🏍
</div>

<div className="flex justify-between">

{labels.map((step,i)=>(

<div
key={i}
className="flex flex-col items-center text-[10px] text-center flex-1 min-w-[55px]"
>

<div
className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-all
${i<=currentIndex ? "bg-green-600 scale-110 shadow" : "bg-gray-300"}`}
>
{i<=currentIndex ? "✓" : ""}
</div>

<p className="mt-2">
{i<currentIndex ? `${step} Done` : step}
</p>

</div>

))}

</div>

</div>

</div>

</div>

{/* PICKUP STATUS */}

<div className="border p-4 rounded-lg">

<p className="font-semibold">
Pickup Scheduled
</p>

{currentIndex>2 ? (

<p className="text-green-600 font-semibold">
Pickup Completed ✓
</p>

):( 

<>
<p className="text-sm text-gray-500">
Expected Pickup Date
</p>

<p className="text-lg font-bold">
{pickupDate.toDateString()}
</p>
</>

)}

</div>

{/* REFUND STATUS */}

<div className="border p-4 rounded-lg">

<p className="font-semibold">
Refund Processing
</p>

{currentIndex===4 ? (

<p className="text-green-600 font-semibold animate-pulse">
Refund Completed ✓
</p>

):( 

<>
<p className="text-sm text-gray-500">
Expected Refund By
</p>

<p className="text-lg font-bold text-green-600">
{refundDate.toDateString()}
</p>

<p className="text-sm text-gray-500">
{countdown}
</p>
</>

)}

</div>

{/* COURIER */}

<div className="border p-4 rounded-lg">

<p className="font-semibold">
Courier Tracking
</p>

<p className="text-lg font-mono">
{courierTracking}
</p>

</div>

{/* CUSTOMER IMAGES */}

{order.returnRequest?.images &&(

<div>

<h2 className="font-semibold mb-2">
Image Proof Submitted
</h2>

<div className="grid grid-cols-2 gap-3">

{order.returnRequest.images.map((img:any,i:number)=>(

<img
key={i}
src={img}
className="rounded-lg border"
/>

))}

</div>

</div>

)}

{/* CANCEL RETURN */}

{currentIndex===0 &&(

<button
onClick={cancelReturn}
disabled={actionLoading}
className={`border border-red-500 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition
${actionLoading?"opacity-50":""}`}
>
{actionLoading?"Cancelling...":"Cancel Return Request"}
</button>

)}

{/* SUPPORT */}

<a
href={`https://wa.me/919103316778?text=Return help for order ${order._id}`}
target="_blank"
className="block bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition"
>
Contact Support
</a>

</main>

);

}