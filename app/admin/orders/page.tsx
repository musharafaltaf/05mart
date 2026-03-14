"use client";

import { useEffect,useState } from "react";

export default function OrdersAdmin(){

const [orders,setOrders] = useState<any[]>([]);

useEffect(()=>{
load();
},[]);

const load = async()=>{
const res = await fetch("/api/orders");
const data = await res.json();
setOrders(data);
};

return(

<main className="max-w-7xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-8">
Orders
</h1>

{orders.map((o:any)=>(

<div key={o._id} className="border p-4 mb-4">

<p>Order ID: {o._id}</p>
<p>Total: ₹{o.total}</p>
<p>Status: {o.status}</p>

</div>

))}

</main>

);

}