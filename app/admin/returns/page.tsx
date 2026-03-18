"use client";

import { useEffect,useState } from "react";

export default function AdminReturns(){

const [orders,setOrders] = useState<any[]>([]);

const loadReturns = async()=>{

const res = await fetch("/api/orders");
const data = await res.json();

/* FILTER ONLY RETURN REQUESTS */
const filtered = data.filter((o:any)=>
o.returnRequest?.requested
);

setOrders(filtered);

};

useEffect(()=>{
loadReturns();
},[]);

/* ========================= */
/* ACTIONS */
/* ========================= */

const updateReturn = async(id:string,status:string)=>{

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
returnStatus: status
})
});

loadReturns();

};

return(

<main className="max-w-6xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-8">
Return Requests
</h1>

<div className="space-y-6">

{orders.map((order:any)=>(

<div key={order._id} className="border p-6 rounded">

<p className="font-semibold mb-2">
Order: {order._id}
</p>

<p className="text-sm mb-2">
Reason: {order.returnRequest?.reason}
</p>

<p className="text-sm mb-4">
Status: 
<span className={`ml-2 font-semibold ${
order.returnRequest?.status==="approved"
? "text-green-600"
: order.returnRequest?.status==="rejected"
? "text-red-600"
: "text-yellow-600"
}`}>
{order.returnRequest?.status}
</span>
</p>

{/* IMAGES */}
<div className="flex gap-3 mb-4">

{order.returnRequest?.images?.map((img:string,i:number)=>(
<img key={i} src={img} className="w-20 h-20 object-cover rounded"/>
))}

</div>

{/* ACTIONS */}
<div className="flex gap-3">

<button
onClick={()=>updateReturn(order._id,"approved")}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Approve
</button>

<button
onClick={()=>updateReturn(order._id,"rejected")}
className="bg-red-600 text-white px-4 py-2 rounded"
>
Reject
</button>

</div>

</div>

))}

</div>

</main>

);

}