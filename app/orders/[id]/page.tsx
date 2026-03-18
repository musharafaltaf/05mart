// "use client";

// import { useEffect,useState } from "react";
// import { useParams } from "next/navigation";

// export default function OrderDetails(){

// const params = useParams();
// const id = params?.id as string;

// const [order,setOrder] = useState<any>(null);

// useEffect(()=>{

// const loadOrder = async()=>{

// const res = await fetch(`/api/orders/${id}`);
// const data = await res.json();

// setOrder(data);

// };

// if(id) loadOrder();

// },[id]);

// if(!order){
// return <p className="p-10 text-center">Loading order...</p>
// }

// return(

// <main className="max-w-4xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-6">
// Order Details
// </h1>

// <p className="mb-6 text-gray-600">
// Order ID: {order._id}
// </p>

// {/* ADDRESS */}

// <div className="border rounded p-4 mb-6">

// <h2 className="font-semibold mb-2">
// Delivery Address
// </h2>

// <p>{order.customer?.name}</p>

// <p>
// {order.customer?.house}, {order.customer?.area}
// </p>

// {order.customer?.landmark && (
// <p>{order.customer?.landmark}</p>
// )}

// <p>
// {order.customer?.city}, {order.customer?.state}
// </p>

// <p>{order.customer?.pincode}</p>

// <p className="mt-2">
// Phone: {order.customer?.phone}
// </p>

// </div>

// {/* PRODUCTS */}

// <div className="space-y-4">

// {order.items.map((item:any)=>(
// <div
// key={item._id}
// className="flex gap-4 border p-4 rounded"
// >

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div>

// <p className="font-semibold">
// {item.name}
// </p>

// <p className="text-sm text-gray-500">
// Size: {item.size}
// </p>

// <p className="text-sm">
// Qty: {item.quantity}
// </p>

// <p className="font-semibold">
// ₹{item.price}
// </p>

// </div>

// </div>
// ))}

// </div>

// {/* TOTAL */}

// <div className="mt-6 text-lg font-semibold">

// Total Paid: ₹{order.total}

// </div>

// </main>

// );

// }



"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetails(){

const params = useParams();
const [order,setOrder] = useState<any>(null);

/* ✅ NEW STATES */
const [returnReason,setReturnReason] = useState("");
const [returnImages,setReturnImages] = useState<any[]>([]);

useEffect(()=>{

if(!params?.id) return;

const loadOrder = async()=>{

try{

const res = await fetch(`/api/orders/${params.id}`);

const data = await res.json();

setOrder(data);

}catch(err){
console.log(err);
}

};

loadOrder();

},[params?.id]);

if(!order){
return <p className="p-10 text-center">Loading order...</p>
}

/* ========================= */
/* RETURN FUNCTION */
/* ========================= */

const handleReturnRequest = async()=>{

if(!returnReason){
alert("Select reason");
return;
}

try{

const uploaded:any[] = [];

for(const file of returnImages){

const form = new FormData();
form.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:form});
const data = await res.json();

uploaded.push(data.url);

}

await fetch("/api/orders/return",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
orderId: order._id,
reason: returnReason,
images: uploaded
})
});

alert("Return requested successfully");

}catch(err){
console.log(err);
alert("Return failed");
}

};

/* ORDER TRACKING STEPS */

const steps = [
"Order Placed",
"confirmed",
"processing",
"shipped",
"out_for_delivery",
"delivered"
];

return(

<main className="max-w-5xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Order Details
</h1>

{/* ORDER INFO */}

<div className="border p-4 rounded mb-6">

<p className="font-semibold">
Order ID: {order._id}
</p>

<p>Status: {order.status}</p>

<p>Total: ₹{order.total}</p>

</div>

{/* TRACKING TIMELINE */}

<div className="border rounded p-6 mb-8">

<h2 className="font-semibold mb-6">
Order Tracking
</h2>

<div className="space-y-6">

{steps.map((step,index)=>{

const completed = order.tracking?.some((t:any)=>
t.status?.toLowerCase() === step.toLowerCase()
);

return(

<div key={index} className="flex items-start gap-4">

<div
className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
${completed ? "bg-green-500 text-white" : "bg-gray-200"}
`}
>
{completed ? "✓" : ""}
</div>

<div>

<p className={`font-medium ${completed ? "text-black":"text-gray-400"}`}>
{step.replaceAll("_"," ")}
</p>

{completed && (

<p className="text-sm text-gray-500">

{
order.tracking.find((t:any)=>
t.status?.toLowerCase() === step.toLowerCase()
)?.date
? new Date(
order.tracking.find((t:any)=>
t.status?.toLowerCase() === step.toLowerCase()
).date
).toLocaleString()
: ""
}

</p>

)}

</div>

</div>

);

})}

</div>

</div>

{/* ========================= */}
{/* 🔁 RETURN SYSTEM UI */}
{/* ========================= */}

{order.tracking?.some((t:any)=>t.status==="Delivered") && (

<div className="border p-4 rounded mb-6">

<h2 className="font-semibold mb-2">Return Product</h2>

<p className="text-sm text-gray-500 mb-3">
Return within 2 days • ₹40 charge applies
</p>

<select
className="border p-2 w-full mb-2"
onChange={(e)=>setReturnReason(e.target.value)}
>
<option>Select Reason</option>
<option>Damaged product</option>
<option>Wrong item</option>
<option>Not satisfied</option>
</select>

<input
type="file"
multiple
onChange={(e:any)=>setReturnImages([...e.target.files])}
className="mb-3"
/>

<button
onClick={handleReturnRequest}
className="bg-red-600 text-white w-full py-2 rounded"
>
Request Return
</button>

</div>

)}

{/* ========================= */}
{/* RETURN STATUS UI (ADDED) */}
{/* ========================= */}

{order.returnRequest?.requested && (

<div className="border p-4 rounded mb-6">

<p className="font-semibold mb-2">Return Status</p>

<p className={`font-medium ${
order.returnRequest.status==="approved"
? "text-green-600"
: order.returnRequest.status==="rejected"
? "text-red-600"
: "text-yellow-600"
}`}>
{order.returnRequest.status}
</p>

</div>

)}

{/* PRODUCTS */}

<div className="space-y-4">

{order?.items?.map((item:any)=>(

<div key={item._id} className="flex gap-4 border p-4 rounded">

<img
src={item.image}
className="w-20 h-20 object-cover rounded"
/>

<div>

<p className="font-semibold">
{item.name}
</p>

<p>Size: {item.size}</p>

<p>Qty: {item.quantity}</p>

<p>₹{item.price}</p>

</div>

</div>

))}

</div>

</main>

)

}