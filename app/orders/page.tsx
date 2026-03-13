"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {

const [orders,setOrders] = useState<any[]>([])

useEffect(()=>{

const loadOrders = async()=>{

try{

const res = await fetch("/api/orders")

if(!res.ok){
console.log("Orders API error")
setOrders([])
return
}

const data = await res.json()

setOrders(data || [])

}catch(err){
console.log("Orders fetch error:",err)
setOrders([])
}

}

loadOrders()

},[])

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
My Orders
</h1>

{orders.length === 0 && (
<p>No orders yet</p>
)}

<div className="space-y-4">

{orders.map((order:any)=>(
<div key={order._id} className="border p-4 rounded">

<p className="font-semibold">
Order #{order._id}
</p>

<p className="text-gray-500">
Total: ₹{order.total}
</p>

</div>
))}

</div>

</main>

)

}