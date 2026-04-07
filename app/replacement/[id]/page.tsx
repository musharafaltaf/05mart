"use client";

import { useParams } from "next/navigation";
import { useEffect,useState } from "react";

export default function ReplacementTracking(){

const { id } = useParams();

const [order,setOrder] = useState<any>(null);
const [loading,setLoading] = useState(true);

/* ================= LOAD ORDER ================= */

const load = async()=>{
try{
const res = await fetch(`/api/orders/${id}`,{cache:"no-store"});
const data = await res.json();
setOrder(data);
}catch(err){
console.log("LOAD ERROR",err);
}
setLoading(false);
};

/* ================= AUTO REFRESH ================= */

useEffect(()=>{

load();

const interval=setInterval(()=>{
load();
},3000);

return ()=>clearInterval(interval);

},[]);

/* ================= LOADING ================= */

if(loading){
return(

<div className="p-10 text-center">

<div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>

<p>Loading tracking details...</p>

</div>

);
}

const item = order.items?.[0];

/* ================= DELIVERY ESTIMATE ================= */

const estimate = new Date(order.createdAt);
estimate.setDate(estimate.getDate()+5);

/* ================= STATUS STEPS ================= */

const steps = [
"processing",
"packed",
"shipped",
"out_for_delivery",
"delivered"
];

const labels = [
"Order Processing",
"Packed",
"Shipped",
"Out for Delivery",
"Delivered"
];

const current = steps.indexOf(order.status);

/* ================= STATUS COLORS ================= */

const statusColor:any={
processing:"bg-yellow-100 text-yellow-700",
packed:"bg-blue-100 text-blue-700",
shipped:"bg-indigo-100 text-indigo-700",
out_for_delivery:"bg-purple-100 text-purple-700",
delivered:"bg-green-100 text-green-700"
};

return(

<main className="max-w-3xl mx-auto p-6 space-y-6">

{/* HEADER */}

<div className="flex justify-between items-center">

<h1 className="text-xl font-bold">
Replacement Order Tracking
</h1>

<span className={`px-3 py-1 text-sm rounded-full ${statusColor[order.status]}`}>
{order.status}
</span>

</div>

{/* PRODUCT CARD */}

<div className="flex gap-4 border p-4 rounded-xl shadow hover:shadow-lg transition bg-white">

<img
src={item?.image}
className="w-20 h-20 rounded object-cover"
/>

<div className="space-y-1">

<p className="font-medium">
{item?.name}
</p>

<p className="text-sm text-gray-500">
Size {item?.size}
</p>

<p className="font-semibold">
₹{item?.price}
</p>

<p className="text-xs text-gray-400">
Order ID: {order._id}
</p>

<p className="text-xs text-green-600 font-semibold">
Estimated Delivery: {estimate.toDateString()}
</p>

</div>

</div>

{/* PROGRESS BAR */}

<div className="border p-6 rounded-xl bg-white shadow">

<div className="w-full bg-gray-200 h-3 rounded mb-6 overflow-hidden">

<div
className="bg-purple-600 h-3 rounded transition-all duration-700"
style={{width:`${((current+1)/steps.length)*100}%`}}
/>

</div>

<div className="flex justify-between text-xs text-gray-500 mb-6">

<p>Processing</p>
<p>Packed</p>
<p>Shipped</p>
<p>Out for delivery</p>
<p>Delivered</p>

</div>

{/* TIMELINE */}

{labels.map((label,i)=>{

const done=i<=current;

return(

<div key={i} className="flex items-center gap-3 mb-4">

<div className={`w-4 h-4 rounded-full ${done?"bg-purple-600 animate-pulse":"bg-gray-300"}`} />

<p className={done?"font-semibold":"text-gray-400"}>
{label}
</p>

</div>

);

})}

</div>

{/* DELIVERY ANIMATION */}

{order.status==="out_for_delivery" &&(

<div className="border rounded-xl p-6 bg-green-50 text-center">

<p className="text-green-700 font-semibold mb-2">
Your order is arriving today 🚚
</p>

<div className="animate-bounce text-3xl">
📦
</div>

</div>

)}

{order.status==="delivered" &&(

<div className="border rounded-xl p-6 bg-green-50 text-center space-y-4">

<p className="text-green-700 font-semibold text-lg">
Order Delivered Successfully 🎉
</p>

<p className="text-sm text-gray-600">
Thank you for shopping with 05Mart ❤️
</p>

<button
onClick={()=>window.location.href="/"}
className="bg-black text-white px-6 py-2 rounded-lg hover:scale-105 transition"
>
Continue Shopping
</button>

</div>

)}

</main>

);

}