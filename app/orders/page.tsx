// "use client";

// import { useEffect,useState } from "react";

// export default function OrdersPage(){

// const [orders,setOrders] = useState<any[]>([]);
// const [filter,setFilter] = useState("all");

// useEffect(()=>{

// const loadOrders = async()=>{

// const res = await fetch("/api/orders");
// const data = await res.json();

// setOrders(data.orders || []);

// };

// loadOrders();

// },[]);

// /* FILTER ORDERS */

// const filteredOrders = orders.filter((order:any)=>{

// if(filter==="all") return true;

// return order.status === filter;

// });
// /* CANCEL ORDER */

// const cancelOrder = async(id:string)=>{

// if(!confirm("Cancel this order?")) return;

// await fetch(`/api/orders/${id}`,{
// method:"PATCH",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({status:"cancelled"})
// });

// location.reload();

// };

// return(

// <main className="max-w-6xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-6">
// My Orders
// </h1>

// {/* FILTER TABS */}

// <div className="flex gap-3 mb-8 flex-wrap">

// <button
// onClick={()=>setFilter("all")}
// className={`px-4 py-2 rounded border ${filter==="all" && "bg-black text-white"}`}
// >
// All Orders
// </button>

// <button
// onClick={()=>setFilter("pending")}
// className={`px-4 py-2 rounded border ${filter==="pending" && "bg-black text-white"}`}
// >
// Pending
// </button>

// <button
// onClick={()=>setFilter("shipped")}
// className={`px-4 py-2 rounded border ${filter==="shipped" && "bg-black text-white"}`}
// >
// Shipped
// </button>

// <button
// onClick={()=>setFilter("delivered")}
// className={`px-4 py-2 rounded border ${filter==="delivered" && "bg-black text-white"}`}
// >
// Delivered
// </button>

// <button
// onClick={()=>setFilter("cancelled")}
// className={`px-4 py-2 rounded border ${filter==="cancelled" && "bg-black text-white"}`}
// >
// Cancelled
// </button>

// </div>

// {/* ORDERS */}

// {filteredOrders.length===0 && (
// <p>No orders found</p>
// )}

// <div className="space-y-6">

// {filteredOrders.map((order:any)=>(

// <div key={order._id} className="border rounded-lg p-6">

// <div className="flex justify-between mb-4">

// <p className="font-semibold">
// Order #{order._id}
// </p>

// <span className={`px-3 py-1 text-sm rounded
// ${order.status==="pending" && "bg-yellow-100 text-yellow-700"}
// ${order.status==="shipped" && "bg-blue-100 text-blue-700"}
// ${order.status==="delivered" && "bg-green-100 text-green-700"}
// ${order.status==="cancelled" && "bg-red-100 text-red-700"}
// `}>
// {order.status}
// </span>

// </div>

// {/* PRODUCTS */}

// {order.items.map((item:any,index:number)=>(

// <div key={index} className="flex gap-4 mb-4">

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div>

// <p className="font-medium">
// {item.name}
// </p>

// <p className="text-sm text-gray-500">
// Qty: {item.quantity}
// </p>

// <p className="font-semibold">
// ₹{item.price}
// </p>

// </div>

// </div>

// ))}

// {/* CANCEL BUTTON */}

// {order.status==="pending" && (

// <button
// onClick={()=>cancelOrder(order._id)}
// className="border px-4 py-2 rounded text-red-600"
// >
// Cancel Order
// </button>

// )}

// </div>

// ))}

// </div>

// </main>

// );

// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {

const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const loadOrders = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user") || "{}");

const res = await fetch(`/api/orders?userId=${user._id}`);
const data = await res.json();

setOrders(data);

}catch(err){
console.log(err);
}

setLoading(false);

};

loadOrders();

},[]);

if(loading){
return <p className="p-10 text-center">Loading orders...</p>
}

return(

<main className="max-w-6xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-8">
My Orders
</h1>

{orders.length===0 && (
<p className="text-gray-500">
No orders found
</p>
)}

<div className="space-y-6">

{orders.map((order:any)=>(

<div
key={order._id}
className="border rounded-lg p-6"
>

{/* ORDER HEADER */}

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

{order.items.map((item:any)=>(
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

{/* ORDER FOOTER */}

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