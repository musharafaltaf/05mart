"use client";

import { useEffect,useState } from "react";

export default function AdminReturns(){

const [localStatus,setLocalStatus] = useState<any>({});

const [orders,setOrders]=useState<any[]>([]);
const [loading,setLoading]=useState(true);

/* NEW STATE FOR BUTTON ANIMATION */

const [updating,setUpdating]=useState<string | null>(null);

/* LOAD RETURNS */

const loadReturns=async()=>{

try{

const res=await fetch("/api/orders?role=admin",{
cache:"no-store"
});
const data=await res.json();

/* ONLY ACTIVE RETURNS */

const returns=data.filter((o:any)=>o.returnRequest?.requested);

setOrders(returns);

}catch(err){
console.log(err);
}

setLoading(false);

};

/* AUTO REFRESH */

useEffect(()=>{

loadReturns();


},[]);

/* UPDATE STATUS */

const updateStatus=async(id:string,status:string)=>{

setUpdating(id+status);

try{

const res=await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({ returnStatus:status })
});

/* WAIT SERVER UPDATE */

if(res.ok){

setOrders(prev =>
prev.map(order =>
order._id===id
? { ...order, returnStatus:status }
: order
)
);

}

}catch(err){
console.log(err);
}

setUpdating(null);

};




/* WHATSAPP */

const sendWhatsApp = (order:any, type:string) => {

const item = order.items?.[0];
const returnFee = 70;

const refundAmount =
order.returnRequest?.chargeOption === "deduct"
? order.total - returnFee
: order.total;

/* FIX PHONE NUMBER */
let phone = (order.customer?.phone || "").replace(/\D/g,""); // remove spaces, + etc

if(phone.startsWith("0")){
phone = phone.substring(1); // remove leading 0
}

if(!phone.startsWith("91")){
phone = "91" + phone; // add India country code
}

/* MESSAGE */
let msg = "";

if(type==="approved"){
msg=`Hello ${order.customer?.name} 👋

🛍 05Mart Return Update

Order ID: #${order._id.slice(-6)}
Product: ${item?.name}

Your return request has been approved.

Refund Amount: ₹${refundAmount}

Our pickup partner will contact you soon.

Thank you for shopping with 05Mart 💙`;
}

if(type==="pickup"){
msg=`Hello ${order.customer?.name} 👋

Your return pickup has been scheduled.

Order ID: #${order._id.slice(-6)}
Product: ${item?.name}

Please keep the product ready.

Thank you for shopping with 05Mart 🛍`;
}

if(type==="refund"){
msg=`Hello ${order.customer?.name} 👋

💰 Refund Processed

Order ID: #${order._id.slice(-6)}
Product: ${item?.name}

Refund Amount: ₹${refundAmount}

The refund will reflect within 0-5 business days.

Thank you for shopping with 05Mart 💙`;
}

/* OPEN WHATSAPP */
const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

window.location.href = url;

};


/* DASHBOARD STATS */

const total=orders.length;
const pending=orders.filter(o=>!o.returnStatus).length;
const approved=orders.filter(o=>o.returnStatus==="approved").length;
const refunded=orders.filter(o=>o.returnStatus==="completed").length;

if(loading){
return <p className="p-10 text-center">Loading returns...</p>
}

return(

<main className="max-w-7xl mx-auto px-4 py-10 space-y-8">

<h1 className="text-3xl font-bold">
Return Management
</h1>

<button
onClick={loadReturns}
className="bg-black text-white px-4 py-2 rounded"
>
Refresh
</button>


{/* STATS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<div className="border p-5 rounded-xl bg-white shadow">
<p>Total Returns</p>
<p className="text-2xl font-bold">{total}</p>
</div>

<div className="border p-5 rounded-xl bg-yellow-50">
<p>Pending</p>
<p className="text-2xl font-bold">{pending}</p>
</div>

<div className="border p-5 rounded-xl bg-blue-50">
<p>Approved</p>
<p className="text-2xl font-bold">{approved}</p>
</div>

<div className="border p-5 rounded-xl bg-green-50">
<p>Refund Done</p>
<p className="text-2xl font-bold">{refunded}</p>
</div>

</div>

{/* RETURNS */}

<div className="space-y-6">

{orders.map((order:any)=>{

const item=order.items?.[0];

const refundAmount=
order.returnRequest?.chargeOption==="deduct"
? order.total-70
: order.total;

return(

<div key={order._id} className="border rounded-xl p-6 bg-white shadow space-y-4">

{/* ORDER HEADER */}

<div className="flex justify-between flex-wrap">

<div>
<p className="font-semibold">
Order #{order._id.slice(-6)}
</p>

<p className="text-sm text-gray-500">
Customer: {order.customer?.name}
</p>

<p className="text-sm text-gray-500">
Phone: {order.customer?.phone}
</p>
</div>

<div>

<p>Status</p>

<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
order.returnStatus==="approved"
? "bg-blue-100 text-blue-700"
: order.returnStatus==="pickup_scheduled"
? "bg-yellow-100 text-yellow-700"
: order.returnStatus==="refund_processing"
? "bg-purple-100 text-purple-700"
: order.returnStatus==="completed"
? "bg-green-100 text-green-700"
: "bg-gray-100 text-gray-700"
}`}>
{order.returnStatus || "Pending"}
</span>

</div>

</div>


{/* PRODUCT */}

<div className="flex gap-4 border p-4 rounded">

<img
src={item?.image}
className="w-20 h-20 rounded object-cover"
/>

<div>
<p className="font-semibold">{item?.name}</p>

<p className="text-sm text-gray-500">
Size: {item?.size}
</p>

<p className="text-sm text-gray-500">
Qty: {item?.quantity}
</p>

<p className="font-bold">₹{item?.price}</p>
</div>

</div>


{/* RETURN REASON */}

<div>

<p className="font-medium">
Return Reason
</p>

<p className="text-gray-600 text-sm">
{order.returnRequest?.reason || "Not provided"}
</p>

</div>


{/* CUSTOMER IMAGES */}

{order.returnRequest?.images &&(

<div>

<p className="font-medium mb-2">
Customer Images
</p>

<div className="flex gap-3 flex-wrap">

{Object.values(order.returnRequest.images)
.filter(Boolean)
.map((img:any,i:number)=>(
<img
key={i}
src={img}
className="w-20 h-20 rounded border object-cover"
/>
))}

</div>

</div>

)}


{/* REFUND SUMMARY */}

<div className="border p-4 rounded bg-green-50">

<div className="flex justify-between text-sm">
<span>Product Price</span>
<span>₹{order.total}</span>
</div>

{order.returnRequest?.chargeOption==="deduct" &&(

<div className="flex justify-between text-red-600 text-sm">
<span>Return Fee</span>
<span>- ₹70</span>
</div>

)}

<div className="flex justify-between font-bold text-green-700">
<span>Refund Amount</span>
<span>₹{refundAmount}</span>
</div>

</div>


{/* REFUND METHOD */}

{order.returnRequest?.refundMethod==="upi" &&(

<div>
<p className="font-medium">UPI ID</p>
<p>{order.returnRequest?.upi}</p>
</div>

)}

{order.returnRequest?.refundMethod==="bank" &&(

<div>

<p className="font-medium">Bank Details</p>

<p>Holder: {order.returnRequest?.bank?.holder}</p>
<p>Bank: {order.returnRequest?.bank?.bankName}</p>
<p>Account: {order.returnRequest?.bank?.account}</p>
<p>IFSC: {order.returnRequest?.bank?.ifsc}</p>

</div>

)}


{/* ACTION BUTTONS */}

<div className="flex flex-wrap gap-3">

<button
onClick={()=>updateStatus(order._id,"approved")}
disabled={(localStatus[order._id] || order.returnStatus)==="approved"}
className={`px-4 py-2 rounded text-white ${
(localStatus[order._id] || order.returnStatus)==="approved"
? "bg-green-400 cursor-not-allowed"
: "bg-green-600"
}`}
>
{(localStatus[order._id] || order.returnStatus)==="approved"
? "Approved ✓"
: "Approve"}
</button>


<button
onClick={()=>updateStatus(order._id,"pickup_scheduled")}
disabled={(localStatus[order._id] || order.returnStatus)==="pickup_scheduled"}
className={`px-4 py-2 rounded text-white ${
(localStatus[order._id] || order.returnStatus)==="pickup_scheduled"
? "bg-yellow-400 cursor-not-allowed"
: "bg-yellow-500"
}`}
>
{(localStatus[order._id] || order.returnStatus)==="pickup_scheduled"
? "Pickup Scheduled ✓"
: "Schedule Pickup"}
</button>


<button
onClick={()=>updateStatus(order._id,"refund_processing")}
disabled={(localStatus[order._id] || order.returnStatus)==="refund_processing"}
className={`px-4 py-2 rounded text-white ${
(localStatus[order._id] || order.returnStatus)==="refund_processing"
? "bg-blue-400 cursor-not-allowed"
: "bg-blue-600"
}`}
>
{(localStatus[order._id] || order.returnStatus)==="refund_processing"
? "Processing ✓"
: "Refund Processing"}
</button>


<button
onClick={()=>updateStatus(order._id,"completed")}
disabled={(localStatus[order._id] || order.returnStatus)==="completed"}
className={`px-4 py-2 rounded text-white ${
(localStatus[order._id] || order.returnStatus)==="completed"
? "bg-purple-400 cursor-not-allowed"
: "bg-purple-600"
}`}
>
{(localStatus[order._id] || order.returnStatus)==="completed"
? "Refund Completed ✓"
: "Refund Done"}
</button>

</div>

{/* WHATSAPP */}

<div className="flex flex-wrap gap-3">

<button
onClick={()=>sendWhatsApp(order,"approved")}
className="border px-4 py-2 rounded"
>
WhatsApp Approved
</button>

<button
onClick={()=>sendWhatsApp(order,"pickup")}
className="border px-4 py-2 rounded"
>
WhatsApp Pickup
</button>

<button
onClick={()=>sendWhatsApp(order,"refund")}
className="border px-4 py-2 rounded"
>
WhatsApp Refund
</button>

</div>

</div>

);

})}

</div>

</main>

);

}