// "use client";

// import { useEffect,useState } from "react";

// export default function OrdersPage(){

// const [orders,setOrders] = useState<any[]>([]);
// const [loading,setLoading] = useState(true);

// useEffect(()=>{

// let mounted = true; // ✅ prevent memory bugs

// const loadOrders = async()=>{

// try{

// /* ⏱️ TIMEOUT (5s max) */
// const controller = new AbortController();
// setTimeout(()=>controller.abort(),5000);

// const user = JSON.parse(localStorage.getItem("user") || "{}");

// let data:any[] = [];

// /* ========================= */
// /* ✅ TRY USER ORDERS */
// /* ========================= */

// if(user?._id){

// const res = await fetch(`/api/orders?userId=${user._id}`,{
// signal: controller.signal
// });

// if(res.ok){
// const result = await res.json();
// if(Array.isArray(result)){
// data = result;
// }
// }

// }

// /* ========================= */
// /* 🔥 FALLBACK */
// /* ========================= */

// if(data.length === 0){

// console.log("Fallback triggered");

// const res = await fetch(`/api/orders`,{
// signal: controller.signal
// });

// if(res.ok){
// const result = await res.json();
// data = Array.isArray(result) ? result : [];
// }

// }

// /* ========================= */

// if(mounted){
// setOrders(data);
// }

// }catch(err){

// console.log("ORDER LOAD ERROR:",err);

// /* ❌ fallback empty */
// if(mounted){
// setOrders([]);
// }

// }

// /* ✅ ALWAYS STOP LOADING */
// if(mounted){
// setLoading(false);
// }

// };

// loadOrders();

// /* CLEANUP */
// return ()=>{ mounted = false };

// },[]);

// /* ========================= */
// /* CANCEL ORDER */
// /* ========================= */

// const cancelOrder = async(id:string)=>{

// try{

// await fetch(`/api/orders/${id}`,{
// method:"PATCH",
// headers:{
// "Content-Type":"application/json"
// },
// body: JSON.stringify({
// status:"cancelled"
// })
// });

// setOrders(prev =>
// prev.map(order =>
// order._id === id ? { ...order, status:"cancelled" } : order
// )
// );

// }catch(err){
// console.log("CANCEL ERROR:",err);
// }

// };

// /* ========================= */

// if(loading){
// return <p className="p-10 text-center">Loading orders...</p>
// }

// /* EMPTY STATE */

// if(!orders.length){
// return(
// <main className="max-w-6xl mx-auto px-4 py-10">
// <h1 className="text-2xl font-bold mb-8">My Orders</h1>
// <p className="text-gray-500">No orders found</p>
// </main>
// );
// }

// /* ========================= */

// return(

// <main className="max-w-6xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-8">
// My Orders
// </h1>

// <div className="space-y-6">

// {orders.map((order:any)=>(

// <div key={order._id} className="border rounded p-6">

// <p className="font-semibold mb-4">
// Order ID: {order._id}
// </p>

// <div className="space-y-3">

// {order.items?.map((item:any)=>(
// <div key={item._id} className="flex gap-4">

// <img
// src={item.image}
// className="w-16 h-16 object-cover rounded"
// />

// <div className="flex-1">

// <p className="font-medium">{item.name}</p>

// <p className="text-sm text-gray-500">
// Qty: {item.quantity}
// </p>

// <p className="text-sm">₹{item.price}</p>

// </div>

// </div>
// ))}

// </div>

// <div className="mt-4 flex items-center justify-between">

// <p>
// Status: <span className="font-semibold">{order.status}</span>
// </p>

// {order.status === "pending" && (
// <button
// onClick={()=>cancelOrder(order._id)}
// className="text-red-600 border px-3 py-1 rounded"
// >
// Cancel Order
// </button>
// )}

// </div>

// </div>

// ))}

// </div>

// </main>

// );

// }



"use client";

import { useEffect,useState } from "react";

export default function OrdersPage(){

const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const loadOrders = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user") || "{}");

/* ❌ NO USER */
if(!user?._id){
setOrders([]);
setLoading(false);
return;
}

/* ✅ FETCH USER ORDERS */
const res = await fetch(`/api/orders?userId=${user._id}`);
const data = await res.json();

setOrders(Array.isArray(data) ? data : []);

}catch(err){
console.log(err);
}

setLoading(false);

};

loadOrders();

},[]);

/* CANCEL ORDER */

const cancelOrder = async(id:string)=>{

await fetch(`/api/orders/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ status:"cancelled" })
});

/* reload */
location.reload();

};

/* LOADING */

if(loading){
return <p className="p-10 text-center">Loading orders...</p>
}

/* EMPTY */

if(!orders.length){
return(
<main className="p-10 text-center">
<h1 className="text-xl font-bold">My Orders</h1>
<p className="text-gray-500 mt-4">No orders found</p>
</main>
);
}

/* UI */

return(

<main className="max-w-6xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-8">
My Orders
</h1>

<div className="space-y-6">

{orders.map((order:any)=>(

<div key={order._id} className="border rounded p-6">

<p className="font-semibold mb-4">
Order ID: {order._id}
</p>

<p className="mb-2 text-sm">
Status: <span className="font-semibold">{order.status}</span>
</p>

<div className="space-y-3">

{order.items?.map((item:any)=>(
<div key={item._id} className="flex gap-4">

<img
src={item.image}
className="w-16 h-16 object-cover rounded"
/>

<div className="flex-1">

<p className="font-medium">{item.name}</p>
<p className="text-sm text-gray-500">Qty: {item.quantity}</p>

</div>

<p className="font-semibold">
₹{item.price}
</p>

</div>
))}

</div>

<div className="mt-4 flex justify-between">

<p className="font-semibold">
Total: ₹{order.total}
</p>

{order.status==="pending" && (
<button
onClick={()=>cancelOrder(order._id)}
className="text-red-600 border px-3 py-1 rounded"
>
Cancel Order
</button>
)}

</div>

</div>

))}

</div>

</main>

);

}