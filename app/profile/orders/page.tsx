"use client";

import { useEffect,useState } from "react";

export default function OrdersPage(){

const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const loadOrders = async()=>{

try{

const res = await fetch("/api/orders");
const data = await res.json();

setOrders(data);

}catch(err){
console.log(err);
}

setLoading(false);

};

loadOrders();

},[]);

const cancelOrder = async(id:string)=>{

await fetch(`/api/orders/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
status:"cancelled"
})
});

location.reload();

};

if(loading){
return <p className="p-10 text-center">Loading orders...</p>
}

return(

<main className="max-w-6xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-8">
My Orders
</h1>

{orders.length === 0 && (
<p>No orders found</p>
)}

<div className="space-y-6">

{orders.map((order:any)=>(

<div key={order._id} className="border rounded p-6">

<p className="font-semibold mb-4">
Order ID: {order._id}
</p>

<div className="space-y-3">

{order.items.map((item:any)=>(
<div key={item._id} className="flex gap-4">

<img
src={item.image}
className="w-16 h-16 object-cover rounded"
/>

<div className="flex-1">

<p className="font-medium">
{item.name}
</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity}
</p>

<p className="text-sm">
₹{item.price}
</p>

</div>

</div>
))}

</div>

<div className="mt-4 flex items-center justify-between">

<p>
Status: <span className="font-semibold">{order.status}</span>
</p>

{order.status === "pending" && (

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
