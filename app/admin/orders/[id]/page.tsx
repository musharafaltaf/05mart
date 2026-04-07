"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminReplacementOrder() {

const { id } = useParams();
const [order,setOrder] = useState<any>(null);
const [loading,setLoading] = useState(true);
const [actionLoading,setActionLoading] = useState("");

const load = async ()=>{
const res = await fetch(`/api/orders/${id}`,{cache:"no-store"});
const data = await res.json();
setOrder(data);
setLoading(false);
};

useEffect(()=>{
load();
},[]);

const updateStatus = async(status:string)=>{

setActionLoading(status);

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({status})
});

setActionLoading("");
load();
};

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

/* ================= WHATSAPP MESSAGES ================= */

const msgProcessing = (order:any)=>`
Hello ${order.customer?.name} 👋

Your replacement order has been created successfully.

Order ID: ${order._id}

Product: ${order.items?.[0]?.name}

We are preparing your order for dispatch.

Thank you for shopping with 05Mart ❤️
`;

const msgPacked = (order:any)=>`
Hello ${order.customer?.name} 📦

Your replacement order has been packed.

Order ID: ${order._id}

Product: ${order.items?.[0]?.name}

It will be shipped shortly.

05Mart Support
`;

const msgShipped = (order:any)=>`
Hello ${order.customer?.name} 🚚

Your replacement order has been shipped.

Order ID: ${order._id}

Product: ${order.items?.[0]?.name}

Track your order here:
https://05mart.in/replacement/${order._id}

Thank you for choosing 05Mart.
`;

const msgOutForDelivery = (order:any)=>`
Hello ${order.customer?.name} 🛵

Good news!

Your replacement order is out for delivery today.

Order ID: ${order._id}

Please keep your phone reachable.

05Mart Team
`;

const msgDelivered = (order:any)=>`
Hello ${order.customer?.name} 🎉

Your replacement order has been delivered successfully.

Order ID: ${order._id}

We hope you enjoy your product!

Thank you for shopping with 05Mart ❤️
`;

if(loading){
return <p className="p-10 text-center">Loading replacement order...</p>
}

const item = order.items?.[0];

    function whatsapp(phone: any, arg1: string): void {
        throw new Error("Function not implemented.");
    }

return(

<main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

<h1 className="text-2xl font-bold">
Replacement Order #{order._id.slice(-6)}
</h1>

{/* PRODUCT CARD */}

<div className="border rounded-xl p-6 flex gap-6 shadow hover:shadow-lg transition">

<img
src={item.image}
className="w-32 h-32 rounded-lg object-cover"
/>

<div className="space-y-1">

<p className="font-semibold text-lg">
{item.name}
</p>

<p className="text-gray-500">
Size: {item.size}
</p>

<p className="font-bold">
₹{item.price}
</p>

</div>

</div>

{/* TRACKING TIMELINE */}

<div className="border rounded-xl p-6 bg-gray-50">

<p className="font-semibold mb-4">
Order Timeline
</p>

{order.tracking?.map((t:any,i:number)=>(
<div key={i} className="flex items-center gap-3 mb-2">

<div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>

<p className="text-sm">
{t.status} — {new Date(t.date).toLocaleString()}
</p>

</div>
))}

</div>

{/* STATUS BUTTONS */}

<div className="flex flex-wrap gap-3">

<button
onClick={()=>updateStatus("packed")}
className="btn yellow"
>
{actionLoading==="packed"?"Packing...":"Packed"}
</button>

<button
onClick={()=>updateStatus("shipped")}
className="btn blue"
>
{actionLoading==="shipped"?"Shipping...":"Shipped"}
</button>

<button
onClick={()=>updateStatus("out_for_delivery")}
className="btn purple"
>
{actionLoading==="out_for_delivery"?"Updating...":"Out for Delivery"}
</button>

<button
onClick={()=>updateStatus("delivered")}
className="btn green"
>
{actionLoading==="delivered"?"Completing...":"Delivered"}
</button>

</div>

{/* WHATSAPP BUTTONS */}

<div className="flex flex-wrap gap-2 mt-6">

<button
onClick={()=>whatsapp(order.customer?.phone,msgProcessing(order))}
className="btn green"
>
Processing Msg
</button>

<button
onClick={()=>whatsapp(order.customer?.phone,msgPacked(order))}
className="btn yellow"
>
Packed Msg
</button>

<button
onClick={()=>whatsapp(order.customer?.phone,msgShipped(order))}
className="btn blue"
>
Shipped Msg
</button>

<button
onClick={()=>whatsapp(order.customer?.phone,msgOutForDelivery(order))}
className="btn purple"
>
Out for Delivery Msg
</button>

<button
onClick={()=>whatsapp(order.customer?.phone,msgDelivered(order))}
className="btn green"
>
Delivered Msg
</button>

</div>

<style jsx>{`

.btn{
padding:8px 14px;
border-radius:8px;
color:white;
font-size:14px;
transition:0.2s;
}

.btn:hover{
transform:scale(1.05);
}

.yellow{background:#eab308}
.blue{background:#2563eb}
.purple{background:#7c3aed}
.green{background:#16a34a}

`}</style>

</main>

);

}