








"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage(){

const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const loadOrders = async()=>{

try{

const userData = localStorage.getItem("user");

let data:any[] = [];

/* ========================= */
/* ✅ TRY USER FILTER FIRST */
/* ========================= */

if(userData){

const user = JSON.parse(userData);

if(user?._id){

const res = await fetch(`/api/orders?userId=${user._id}`);

if(res.ok){
const result = await res.json();
if(Array.isArray(result) && result.length > 0){
data = result;
}
}

}

}

/* ========================= */
/* 🔥 FALLBACK (BYPASS MODE) */
/* ========================= */

if(data.length === 0){

console.log("Using fallback orders");

const res = await fetch(`/api/orders`);

if(res.ok){
const result = await res.json();
data = Array.isArray(result) ? result : [];
}

}

/* ========================= */

setOrders(data);

}catch(err){

console.log("ORDER LOAD ERROR:",err);
setOrders([]);

}

/* ✅ ALWAYS STOP LOADING */
setLoading(false);

};

loadOrders();

},[]);

/* ========================= */

if(loading){
return <p className="p-10 text-center">Loading orders...</p>
}

/* EMPTY STATE */

if(!orders.length){
return(
<main className="max-w-6xl mx-auto px-4 py-10">
<h1 className="text-2xl font-bold mb-8">My Orders</h1>
<p className="text-gray-500">No orders found</p>
</main>
);
}

/* ========================= */

return(

<main className="max-w-6xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-8">
My Orders
</h1>

<div className="space-y-6">

{orders.map((order:any)=>(

<div
key={order._id}
className="border rounded-lg p-6"
>

{/* HEADER */}

<div className="flex justify-between mb-4">

<div>

<p className="font-semibold">
Order #{order._id.slice(-6)}
</p>

<p className="text-sm text-gray-500">
{new Date(order.createdAt).toDateString()}
</p>

</div>

<p className={`text-sm font-medium ${
order.status==="cancelled"
? "text-red-600"
: order.status==="delivered"
? "text-green-600"
: "text-yellow-600"
}`}>
{order.status}
</p>

</div>

{/* PRODUCTS */}

<div className="space-y-4">

{order.items?.map((item:any)=>(

<div
key={item._id}
className="flex gap-4"
>

<img
src={item.image}
className="w-16 h-16 object-cover rounded"
/>

<div className="flex-1">

<p className="font-medium">
{item.name}
</p>

<p className="text-sm text-gray-500">
Size: {item.size}
</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity}
</p>

</div>

<p className="font-semibold">
₹{item.price}
</p>

</div>

))}

</div>

{/* FOOTER */}

<div className="flex justify-between items-center mt-6">

<p className="font-semibold">
Total: ₹{order.total}
</p>

<Link
href={`/orders/${order._id}`}
className="border px-4 py-2 rounded hover:bg-gray-100"
>
View Order
</Link>

</div>

</div>

))}

</div>

</main>

);

}