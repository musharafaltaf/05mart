"use client";

import { useEffect,useState } from "react";

export default function AdminExchanges(){

const [orders,setOrders]=useState<any[]>([]);
const [loading,setLoading]=useState(true);
const [search,setSearch]=useState("");
const [refreshing,setRefreshing]=useState(false);

const [courier,setCourier]=useState("");
const [tracking,setTracking]=useState("");

const [actionLoading,setActionLoading]=useState<string | null>(null);

/* ================= LOAD ORDERS ================= */

const loadOrders=async()=>{

try{

setRefreshing(true);

const user = JSON.parse(localStorage.getItem("user") || "null");

if(!user || user.role !== "admin"){
alert("Access denied");
return;
}

const res = await fetch(`/api/orders?role=admin`);
const data = await res.json();

const exchanges = data.filter((o:any)=>o.exchangeRequest?.requested);

setOrders(exchanges);

}catch(err){
console.log("EXCHANGE LOAD ERROR",err);
}

setLoading(false);
setRefreshing(false);

};

/* INITIAL LOAD */

useEffect(()=>{
loadOrders();
},[]);

/* ================= UPDATE STATUS ================= */

const updateStatus=async(id:string,status:string)=>{

setActionLoading(id+status);

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({exchangeStatus:status})
});

setActionLoading(null);
loadOrders();

};

/* ================= COURIER ================= */

const saveCourier=async(id:string)=>{

setActionLoading(id+"courier");

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
pickup:{
courier,
trackingNumber:tracking
}
})
});

setCourier("");
setTracking("");

setActionLoading(null);
loadOrders();

};

/* ================= WHATSAPP ================= */

const sendWhatsApp = (phone:string, message:string) => {

let cleanPhone = phone.replace(/\D/g,""); // remove spaces + symbols

// remove leading zero if exists
if(cleanPhone.startsWith("0")){
cleanPhone = cleanPhone.substring(1);
}

// add India country code if missing
if(!cleanPhone.startsWith("91")){
cleanPhone = "91" + cleanPhone;
}

const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

window.location.href = url;

};

/* ================= MESSAGES ================= */

const msgRequested=(order:any)=>`
Hello ${order.customer?.name} 👋

Your exchange request has been received.

Order ID: ${order._id}

Team 05Mart
`;

const msgApproved=(order:any)=>`
Hello ${order.customer?.name} 👋

Your exchange request has been APPROVED.

Order ID: ${order._id}

Team 05Mart
`;

const msgPickup=(order:any)=>`
Hello ${order.customer?.name}

Pickup scheduled for your exchange.

Order ID: ${order._id}

Team 05Mart
`;

const msgShipped=(order:any)=>`
Hello ${order.customer?.name}

Your replacement product has been shipped 🚚

Order ID: ${order._id}

Team 05Mart
`;

/* ================= FILTER ================= */

const filtered = orders.filter((o:any)=>
o._id.toLowerCase().includes(search.toLowerCase())
);

/* ================= ANALYTICS ================= */

const total=orders.length;

const pending=orders.filter(o=>o.exchangeRequest?.status==="requested").length;
const approved=orders.filter(o=>o.exchangeRequest?.status==="approved").length;
const completed=orders.filter(o=>o.exchangeRequest?.status==="completed").length;
const rejected=orders.filter(o=>o.exchangeRequest?.status==="rejected").length;

const exchangeRevenue = orders.reduce((sum,o)=>
sum + (o.exchangeRequest?.charge || 0)
,0);

/* ================= LOADING ================= */

if(loading){
return <p className="p-10 text-center">Loading exchanges...</p>
}

    function whatsapp(phone: any, arg1: string): void {
        throw new Error("Function not implemented.");
    }

/* ================= UI ================= */

return(

<main className="max-w-6xl mx-auto px-4 py-8">

{/* HEADER */}

<div className="flex justify-between items-center mb-6">

<h1 className="text-2xl font-bold">
Admin Exchange Dashboard
</h1>

<button
onClick={loadOrders}
className="bg-black text-white px-4 py-2 rounded hover:scale-105 transition"
>
{refreshing ? "Refreshing..." : "Refresh"}
</button>

</div>

{/* ================= ANALYTICS ================= */}

<div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Total</p>
<p className="text-xl font-bold">{total}</p>
</div>

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Pending</p>
<p className="text-yellow-600 font-bold">{pending}</p>
</div>

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Approved</p>
<p className="text-blue-600 font-bold">{approved}</p>
</div>

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Completed</p>
<p className="text-green-600 font-bold">{completed}</p>
</div>

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Rejected</p>
<p className="text-red-600 font-bold">{rejected}</p>
</div>

<div className="border p-4 rounded">
<p className="text-sm text-gray-500">Exchange Revenue</p>
<p className="text-purple-600 font-bold">₹{exchangeRevenue}</p>
</div>

</div>

{/* SEARCH */}

<input
placeholder="Search Order ID..."
className="border p-2 rounded w-full mb-6"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{/* ================= EXCHANGE LIST ================= */}

<div className="space-y-6">

{filtered.length === 0 &&(
<p className="text-gray-500">
No exchange requests
</p>
)}

{filtered.map((order:any)=>(

<div
key={order._id}
className="border p-6 rounded-xl shadow hover:shadow-lg transition"
>

{/* HEADER */}

<div className="flex justify-between mb-4">

<div>
<p className="font-semibold">
Order #{order._id.slice(-6)}
</p>

<p className="text-sm text-gray-500">
{order.customer?.name}
</p>
</div>

<p className="text-purple-600 font-medium">
{order.exchangeRequest?.status}
</p>

</div>

{/* ================= PRODUCT REVIEW ================= */}

<div className="border p-4 rounded mb-4 bg-gray-50">

<p className="font-semibold mb-3">
Exchange Product Review
</p>

{/* ORIGINAL PRODUCT */}

<div className="flex gap-4 mb-4">

<img
src={order.items?.[0]?.image}
className="w-20 h-20 rounded object-cover"
/>

<div>
<p className="font-medium">Original Product</p>
<p className="text-sm">{order.items?.[0]?.name}</p>
<p className="text-sm">Size: {order.items?.[0]?.size}</p>
<p className="text-sm font-semibold">₹{order.items?.[0]?.price}</p>
</div>

</div>

{/* REPLACEMENT PRODUCT */}

{order.exchangeRequest?.replacementProduct &&(

<div className="flex gap-4 mb-4">

<img
src={order.exchangeRequest.replacementProduct.image}
className="w-20 h-20 rounded object-cover"
/>

<div>
<p className="font-medium text-purple-600">Replacement Product</p>
<p className="text-sm">{order.exchangeRequest.replacementProduct.name}</p>
<p className="text-sm">Size: {order.exchangeRequest.replacementProduct.size}</p>
<p className="font-semibold">₹{order.exchangeRequest.replacementProduct.price}</p>
</div>

</div>

)}

{/* PRICE SUMMARY */}

<div className="border rounded p-3 bg-white text-sm space-y-1">

<p>
Original Price:
<b> ₹{order.items?.[0]?.price}</b>
</p>

<p>
Replacement Price:
<b> ₹{order.exchangeRequest?.replacementProduct?.price || 0}</b>
</p>

<p>
Exchange Fee:
<b> ₹{order.exchangeRequest?.charge || 70}</b>
</p>

<p className="text-green-600 font-semibold">

Total Paid:

₹{
(order.exchangeRequest?.replacementProduct?.price || 0)
-
(order.items?.[0]?.price || 0)
+
(order.exchangeRequest?.charge || 0)
}

</p>

</div>

</div>

{/* ================= CUSTOMER IMAGES ================= */}

{order.exchangeRequest?.images?.length>0 &&(

<div className="flex gap-2 flex-wrap mb-4">

{order.exchangeRequest.images.map((img:any,i:number)=>(
<img key={i} src={img} className="w-24 h-24 rounded object-cover"/>
))}

</div>

)}

{/* ================= TIMELINE ================= */}

<div className="border p-3 rounded mb-4 bg-gray-50">

<p className="font-semibold mb-2">Exchange Timeline</p>

{order.exchangeRequest?.timeline?.map((t:any,i:number)=>(

<p key={i} className="text-sm text-gray-600">
{t.status} — {new Date(t.date).toLocaleString()}
</p>

))}

</div>

{/* ================= STATUS BUTTONS ================= */}

<div className="flex flex-wrap gap-2">

<button
onClick={()=>updateStatus(order._id,"approved")}
className="btn purple"
>
{actionLoading===order._id+"approved"?"Approving...":"Approve"}
</button>

<button onClick={()=>updateStatus(order._id,"pickup_scheduled")} className="btn blue">
Pickup
</button>

<button onClick={()=>updateStatus(order._id,"pickup_completed")} className="btn yellow">
Pickup Done
</button>

<button onClick={()=>updateStatus(order._id,"replacement_shipped")} className="btn indigo">
Ship Replacement
</button>

<button onClick={()=>updateStatus(order._id,"completed")} className="btn green">
Complete
</button>

<button onClick={()=>updateStatus(order._id,"rejected")} className="btn red">
Reject
</button>

</div>

{/* ================= COURIER ================= */}

<div className="mt-4 space-y-2">

<p className="font-semibold text-sm">
Courier Tracking
</p>

<input
placeholder="Courier Name"
value={courier}
onChange={(e)=>setCourier(e.target.value)}
className="border p-2 rounded w-full"
/>

<input
placeholder="Tracking Number"
value={tracking}
onChange={(e)=>setTracking(e.target.value)}
className="border p-2 rounded w-full"
/>

<button
onClick={()=>saveCourier(order._id)}
className="bg-black text-white px-4 py-2 rounded hover:scale-105 transition"
>
Save Courier
</button>

{order.exchangeRequest?.replacementOrderId &&(

<a
href={`/admin/orders/${order.exchangeRequest.replacementOrderId}`}
className="bg-indigo-600 text-white px-3 py-2 rounded text-sm"
>

View Replacement Order

</a>

)}

</div>

{/* ================= WHATSAPP ================= */}

<div className="flex gap-2 mt-4 flex-wrap">

<button onClick={()=>whatsapp(order.customer?.phone,msgRequested(order))} className="btn green">
Request Msg
</button>

<button onClick={()=>whatsapp(order.customer?.phone,msgApproved(order))} className="btn green">
Approved Msg
</button>

<button onClick={()=>whatsapp(order.customer?.phone,msgPickup(order))} className="btn green">
Pickup Msg
</button>

<button onClick={()=>whatsapp(order.customer?.phone,msgShipped(order))} className="btn green">
Shipped Msg
</button>

</div>

</div>

))}

</div>

<style jsx>{`

.btn{
padding:6px 12px;
border-radius:6px;
color:white;
font-size:13px;
transition:0.2s;
}

.btn:hover{
transform:scale(1.05);
}

.purple{background:#7c3aed}
.blue{background:#2563eb}
.yellow{background:#eab308}
.indigo{background:#6366f1}
.green{background:#16a34a}
.red{background:#dc2626}

`}</style>

</main>

);

}