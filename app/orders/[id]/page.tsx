// "use client";

// import { useEffect,useState } from "react";
// import { useParams } from "next/navigation";

// export default function OrderDetails(){

// const params = useParams();
// const id = params?.id as string;

// const [order,setOrder] = useState<any>(null);

// useEffect(()=>{

// const loadOrder = async()=>{

// const res = await fetch(`/api/orders/${id}`);
// const data = await res.json();

// setOrder(data);

// };

// if(id) loadOrder();

// },[id]);

// if(!order){
// return <p className="p-10 text-center">Loading order...</p>
// }

// return(

// <main className="max-w-4xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-6">
// Order Details
// </h1>

// <p className="mb-6 text-gray-600">
// Order ID: {order._id}
// </p>

// {/* ADDRESS */}

// <div className="border rounded p-4 mb-6">

// <h2 className="font-semibold mb-2">
// Delivery Address
// </h2>

// <p>{order.customer?.name}</p>

// <p>
// {order.customer?.house}, {order.customer?.area}
// </p>

// {order.customer?.landmark && (
// <p>{order.customer?.landmark}</p>
// )}

// <p>
// {order.customer?.city}, {order.customer?.state}
// </p>

// <p>{order.customer?.pincode}</p>

// <p className="mt-2">
// Phone: {order.customer?.phone}
// </p>

// </div>

// {/* PRODUCTS */}

// <div className="space-y-4">

// {order.items.map((item:any)=>(
// <div
// key={item._id}
// className="flex gap-4 border p-4 rounded"
// >

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div>

// <p className="font-semibold">
// {item.name}
// </p>

// <p className="text-sm text-gray-500">
// Size: {item.size}
// </p>

// <p className="text-sm">
// Qty: {item.quantity}
// </p>

// <p className="font-semibold">
// ₹{item.price}
// </p>

// </div>

// </div>
// ))}

// </div>

// {/* TOTAL */}

// <div className="mt-6 text-lg font-semibold">

// Total Paid: ₹{order.total}

// </div>

// </main>

// );

// }







// "use client";

// import { useEffect,useState } from "react";
// import { useParams } from "next/navigation";

// export default function OrderDetails(){

// const params = useParams();
// const [order,setOrder] = useState<any>(null);

// /* ✅ NEW STATES */
// const [returnReason,setReturnReason] = useState("");
// const [returnImages,setReturnImages] = useState<any[]>([]);

// useEffect(()=>{

// if(!params?.id) return;

// const loadOrder = async()=>{

// try{

// const res = await fetch(`/api/orders/${params.id}`);

// const data = await res.json();

// setOrder(data);

// }catch(err){
// console.log(err);
// }

// };

// loadOrder();

// },[params?.id]);

// if(!order){
// return <p className="p-10 text-center">Loading order...</p>
// }

// /* ========================= */
// /* RETURN FUNCTION */
// /* ========================= */

// const handleReturnRequest = async()=>{

// if(!returnReason){
// alert("Select reason");
// return;
// }

// try{

// const uploaded:any[] = [];

// for(const file of returnImages){

// const form = new FormData();
// form.append("file",file);

// const res = await fetch("/api/upload",{method:"POST",body:form});
// const data = await res.json();

// uploaded.push(data.url);

// }

// await fetch("/api/orders/return",{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body: JSON.stringify({
// orderId: order._id,
// reason: returnReason,
// images: uploaded
// })
// });

// alert("Return requested successfully");

// }catch(err){
// console.log(err);
// alert("Return failed");
// }

// };

// /* ORDER TRACKING STEPS */

// const steps = [
// "Order Placed",
// "confirmed",
// "processing",
// "shipped",
// "out_for_delivery",
// "delivered"
// ];

// return(

// <main className="max-w-5xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-6">
// Order Details
// </h1>

// {/* ORDER INFO */}

// <div className="border p-4 rounded mb-6">

// <p className="font-semibold">
// Order ID: {order._id}
// </p>

// <p>Status: {order.status}</p>

// <p>Total: ₹{order.total}</p>

// </div>

// {/* TRACKING TIMELINE */}

// <div className="border rounded p-6 mb-8">

// <h2 className="font-semibold mb-6">
// Order Tracking
// </h2>

// <div className="space-y-6">

// {steps.map((step,index)=>{

// const completed = order.tracking?.some((t:any)=>
// t.status?.toLowerCase() === step.toLowerCase()
// );

// return(

// <div key={index} className="flex items-start gap-4">

// <div
// className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
// ${completed ? "bg-green-500 text-white" : "bg-gray-200"}
// `}
// >
// {completed ? "✓" : ""}
// </div>

// <div>

// <p className={`font-medium ${completed ? "text-black":"text-gray-400"}`}>
// {step.replaceAll("_"," ")}
// </p>

// {completed && (

// <p className="text-sm text-gray-500">

// {
// order.tracking.find((t:any)=>
// t.status?.toLowerCase() === step.toLowerCase()
// )?.date
// ? new Date(
// order.tracking.find((t:any)=>
// t.status?.toLowerCase() === step.toLowerCase()
// ).date
// ).toLocaleString()
// : ""
// }

// </p>

// )}

// </div>

// </div>

// );

// })}

// </div>

// </div>

// {/* ========================= */}
// {/* 🔁 RETURN SYSTEM UI */}
// {/* ========================= */}

// {order.tracking?.some((t:any)=>t.status==="Delivered") && (

// <div className="border p-4 rounded mb-6">

// <h2 className="font-semibold mb-2">Return Product</h2>

// <p className="text-sm text-gray-500 mb-3">
// Return within 2 days • ₹40 charge applies
// </p>

// <select
// className="border p-2 w-full mb-2"
// onChange={(e)=>setReturnReason(e.target.value)}
// >
// <option>Select Reason</option>
// <option>Damaged product</option>
// <option>Wrong item</option>
// <option>Not satisfied</option>
// </select>

// <input
// type="file"
// multiple
// onChange={(e:any)=>setReturnImages([...e.target.files])}
// className="mb-3"
// />

// <button
// onClick={handleReturnRequest}
// className="bg-red-600 text-white w-full py-2 rounded"
// >
// Request Return
// </button>

// </div>

// )}

// {/* ========================= */}
// {/* RETURN STATUS UI (ADDED) */}
// {/* ========================= */}

// {order.returnRequest?.requested && (

// <div className="border p-4 rounded mb-6">

// <p className="font-semibold mb-2">Return Status</p>

// <p className={`font-medium ${
// order.returnRequest.status==="approved"
// ? "text-green-600"
// : order.returnRequest.status==="rejected"
// ? "text-red-600"
// : "text-yellow-600"
// }`}>
// {order.returnRequest.status}
// </p>

// </div>

// )}

// {/* PRODUCTS */}

// <div className="space-y-4">

// {order?.items?.map((item:any)=>(

// <div key={item._id} className="flex gap-4 border p-4 rounded">

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div>

// <p className="font-semibold">
// {item.name}
// </p>

// <p>Size: {item.size}</p>

// <p>Qty: {item.quantity}</p>

// <p>₹{item.price}</p>

// </div>

// </div>

// ))}

// </div>

// </main>

// )

// }















// "use client";

// import { useEffect,useState } from "react";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function OrderDetails(){

// const { id } = useParams();
// const router = useRouter();

// const [order,setOrder] = useState<any>(null);
// const [loading,setLoading] = useState(true);

// const SUPPORT_NUMBER="919103316778";

// /* ========================= */
// /* LOAD ORDER */
// /* ========================= */

// const loadOrder = async()=>{

// try{

// const res = await fetch(`/api/orders/${id}`,{
// cache:"no-store"
// });

// const data = await res.json();

// setOrder(data);

// }catch(err){
// console.log(err);
// }

// setLoading(false);

// };

// /* AUTO REFRESH */

// useEffect(()=>{

// loadOrder();

// const interval=setInterval(loadOrder,3000);

// return ()=>clearInterval(interval);

// },[]);

// /* ========================= */
// /* CANCEL ORDER */
// /* ========================= */

// const cancelOrder = async()=>{

// if(!confirm("Cancel this order?")) return;

// await fetch(`/api/orders/${id}`,{
// method:"PATCH",
// headers:{ "Content-Type":"application/json"},
// body:JSON.stringify({status:"cancelled"})
// });

// loadOrder();

// };

// /* ========================= */
// /* WHATSAPP SUPPORT */
// /* ========================= */

// const openSupport=()=>{

// const msg=`Hello 05Mart Support

// Need help with order ${order._id}`;

// const url=`https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(msg)}`;

// window.open(url,"_blank");

// };

// /* ========================= */
// /* DOWNLOAD INVOICE */
// /* ========================= */

// const downloadInvoice=()=>{

// const doc=new jsPDF();

// doc.setFontSize(18);
// doc.text("05Mart Invoice",15,20);

// const rows=order.items.map((item:any)=>[
// item.name,
// item.size,
// item.quantity,
// `₹${item.price}`,
// `₹${item.price*item.quantity}`
// ]);

// autoTable(doc,{
// startY:40,
// head:[["Product","Size","Qty","Price","Total"]],
// body:rows
// });

// doc.text(`Total ₹${order.total}`,150,doc.lastAutoTable.finalY+10);

// doc.save(`invoice_${order._id}.pdf`);

// };

// /* ========================= */
// /* RETURN WINDOW (48 HOURS) */
// /* ========================= */

// const deliveredTime=new Date(order?.deliveredAt || order?.createdAt);

// const diffHours=(Date.now()-deliveredTime.getTime())/3600000;

// const allowReturn=order?.status==="delivered" && diffHours<=48;

// /* ========================= */
// /* TRACKING STEPS */
// /* ========================= */

// const steps=[
// "pending",
// "confirmed",
// "processing",
// "shipped",
// "out_for_delivery",
// "delivered"
// ];

// const labels=[
// "Order Placed",
// "Confirmed",
// "Packed",
// "Shipped",
// "Out for Delivery",
// "Delivered"
// ];

// const currentStep=steps.indexOf(order?.status);

// /* ========================= */
// /* LOADING */
// /* ========================= */

// if(loading){
// return <p className="p-10 text-center">Loading...</p>
// }
// const router = useRouter();

// useEffect(()=>{
//  if(order?.returnRequest){
//   router.push(`/returns/${order._id}`);
//  }
// },[order]);

// if(loading){
//  return <p className="p-10 text-center">Loading...</p>
// }

// if(!order){
//  return <p className="p-10 text-center">Order not found</p>
// }

// const deliveryDate=new Date(
// new Date(order.createdAt).getTime()+5*86400000
// ).toDateString();

// /* ========================= */
// /* UI */
// /* ========================= */

// return(

// <main className="max-w-3xl mx-auto px-4 py-6">

// <h1 className="text-xl font-bold mb-2">
// Order Details
// </h1>

// <p className="text-sm text-gray-500">
// Order ID: {order._id}
// </p>

// <p className="text-sm text-green-600 mb-6">
// Expected Delivery: {deliveryDate}
// </p>

// {/* ========================= */}
// {/* ORDER TRACKING */}
// {/* ========================= */}

// <div className="border rounded-xl p-5 mb-6 bg-white shadow-sm">

// <h2 className="font-semibold mb-4">
// Order Tracking
// </h2>

// <div className="relative pl-6">

// {labels.map((label,i)=>{

// const done=i<=currentStep;

// return(

// <div key={i} className="flex items-start mb-6">

// <div className={`w-4 h-4 rounded-full mt-1
// ${done?"bg-green-600":"bg-gray-300"}`} />

// <div className="ml-3">

// <p className={`font-medium ${done?"text-black":"text-gray-400"}`}>
// {label}
// </p>

// </div>

// </div>

// );

// })}

// <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200"></div>

// </div>

// </div>

// {/* ========================= */}
// {/* PRODUCTS */}
// {/* ========================= */}

// {order.items.map((item:any)=>(

// <Link
// href={`/product/${item._id}`}
// key={item._id}
// className="flex gap-4 border p-4 rounded mb-4 hover:bg-gray-50"
// >

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div className="flex-1">

// <p className="font-semibold">
// {item.name}
// </p>

// <p className="text-sm text-gray-500">
// Size: {item.size}
// </p>

// <p className="text-sm text-gray-500">
// Qty: {item.quantity}
// </p>

// <p className="font-bold">
// ₹{item.price}
// </p>

// </div>

// </Link>

// ))}

// {/* ========================= */}
// {/* ACTION BUTTONS */}
// {/* ========================= */}

// <div className="flex flex-wrap gap-3 mt-6">

// {/* CANCEL */}

// {["pending","confirmed","processing"].includes(order.status)&&(

// <button
// onClick={cancelOrder}
// className="border px-4 py-2 rounded text-red-600"
// >
// Cancel
// </button>

// )}

// {/* RETURN */}

// {allowReturn &&(

// <Link
// href={`/orders/${order._id}/return`}
// className="border px-4 py-2 rounded"
// >
// Return
// </Link>

// )}

// {/* EXCHANGE */}

// {allowReturn &&(

// <Link
// href={`/orders/${order._id}/exchange`}
// className="border px-4 py-2 rounded"
// >
// Exchange
// </Link>

// )}

// {/* INVOICE */}

// <button
// onClick={downloadInvoice}
// className="border px-4 py-2 rounded"
// >
// Download Invoice
// </button>

// {/* HELP */}

// <button
// onClick={openSupport}
// className="bg-green-600 text-white px-4 py-2 rounded"
// >
// Need Help
// </button>

// </div>

// </main>

// );

// }







"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OrderDetails(){

const { id } = useParams();
const router = useRouter();

const [order,setOrder] = useState<any>(null);
const [loading,setLoading] = useState(true);

const SUPPORT_NUMBER="919103316778";

/* ========================= */
/* LOAD ORDER */
/* ========================= */

const loadOrder = async()=>{

try{

const res = await fetch(`/api/orders/${id}`,{
cache:"no-store"
});

const data = await res.json();

setOrder(data);

}catch(err){
console.log(err);
}

setLoading(false);

};

/* AUTO REFRESH */

useEffect(()=>{

loadOrder();

const interval=setInterval(loadOrder,3000);

return ()=>clearInterval(interval);

},[]);

/* ========================= */
/* CANCEL ORDER */
/* ========================= */

const cancelOrder = async()=>{

if(!confirm("Cancel this order?")) return;

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({status:"cancelled"})
});

loadOrder();

};

/* ========================= */
/* WHATSAPP SUPPORT */
/* ========================= */

const openSupport=()=>{

const msg=`Hello 05Mart Support

Need help with order ${order._id}`;

const url=`https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(msg)}`;

window.open(url,"_blank");

};

/* ========================= */
/* DOWNLOAD INVOICE */
/* ========================= */

const downloadInvoice=()=>{

const doc=new jsPDF();

doc.setFontSize(18);
doc.text("05Mart Invoice",15,20);

const rows=order.items.map((item:any)=>[
item.name,
item.size,
item.quantity,
`₹${item.price}`,
`₹${item.price*item.quantity}`
]);

autoTable(doc,{
startY:40,
head:[["Product","Size","Qty","Price","Total"]],
body:rows
});

const finalY = (doc as any).lastAutoTable?.finalY || 40;
doc.text(`Total ₹${order.total}`,150,finalY + 10);

doc.save(`invoice_${order._id}.pdf`);

};

/* ========================= */
/* RETURN WINDOW */
/* ========================= */

const deliveredTime=new Date(order?.deliveredAt || order?.createdAt);

const diffHours=(Date.now()-deliveredTime.getTime())/3600000;

const allowReturn=order?.status==="delivered" && diffHours<=48;

/* ========================= */
/* TRACKING */
/* ========================= */

const steps=[
"pending",
"confirmed",
"processing",
"shipped",
"out_for_delivery",
"delivered"
];

const labels=[
"Order Placed",
"Confirmed",
"Packed",
"Shipped",
"Out for Delivery",
"Delivered"
];

const currentStep=steps.indexOf(order?.status);

/* ========================= */
/* LOADING */
/* ========================= */

if(loading){
return <p className="p-10 text-center">Loading...</p>
}

if(!order){
return <p className="p-10 text-center">Order not found</p>
}

const deliveryDate=new Date(
new Date(order.createdAt).getTime()+5*86400000
).toDateString();

/* ========================= */
/* UI */
/* ========================= */

return(

<main className="max-w-3xl mx-auto px-4 py-6 animate-fadeIn">

<h1 className="text-xl font-bold mb-2">
Order Details
</h1>

<p className="text-sm text-gray-500">
Order ID: {order._id}
</p>

<p className="text-sm text-green-600 mb-4">
Expected Delivery: {deliveryDate}
</p>

{/* STATUS BADGE */}

<p className={`inline-block mb-6 text-xs px-3 py-1 rounded-full
${order.status==="delivered"
?"bg-green-100 text-green-700"
:"bg-yellow-100 text-yellow-700"}
`}>
{order?.status ? order.status.replaceAll("_"," ") : "pending"}
</p>

{/* ========================= */}
{/* ORDER TRACKING */}
{/* ========================= */}

<div className="border rounded-xl p-5 mb-6 bg-white shadow-sm">

<h2 className="font-semibold mb-4">
Order Tracking
</h2>

{/* PROGRESS BAR */}

<div className="w-full bg-gray-200 h-2 rounded mb-6">

<div
className="bg-green-600 h-2 rounded transition-all duration-500"
style={{width:`${((currentStep+1)/steps.length)*100}%`}}
/>

</div>

<div className="relative pl-6">

{labels.map((label,i)=>{

const done=i<=currentStep;

return(

<div key={i} className="flex items-start mb-6">

<div className={`w-4 h-4 rounded-full mt-1 transition-all duration-300
${done
? "bg-green-600 scale-110 shadow-md"
: "bg-gray-300"}`} />

<div className="ml-3">

<p className={`font-medium ${done?"text-black":"text-gray-400"}`}>
{label}
</p>

</div>

</div>

);

})}

<div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gray-200"></div>

</div>

</div>

{/* ========================= */}
{/* PRODUCTS */}
{/* ========================= */}

{order?.items?.length > 0 && order.items.map((item:any)=>(

<Link
href={`/product/${item._id}`}
key={item._id}
className="flex gap-4 border p-4 rounded-xl mb-4 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200"
>

<img
src={item.image}
className="w-20 h-20 object-cover rounded transition-transform duration-200 hover:scale-105"
/>

<div className="flex-1">

<p className="font-semibold">
{item.name}
</p>

<p className="text-sm text-gray-500">
Size: {item.size}
</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity}
</p>

<p className="font-bold">
₹{item.price}
</p>

</div>

</Link>

))}

{/* ========================= */}
{/* ACTION BUTTONS */}
{/* ========================= */}

<div className="flex flex-wrap gap-3 mt-6">

{/* CANCEL */}

{["pending","confirmed","processing"].includes(order.status)&&(

<button
onClick={cancelOrder}
className="border px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
>
Cancel
</button>

)}

{/* RETURN */}

{allowReturn &&(

<Link
href={`/orders/${order._id}/return`}
className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
>
Return
</Link>

)}

{/* EXCHANGE */}

{allowReturn &&(

<Link
href={`/orders/${order._id}/exchange`}
className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
>
Exchange
</Link>

)}

{/* INVOICE */}

<button
onClick={downloadInvoice}
className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
>
Download Invoice
</button>

{/* HELP */}

<button
onClick={openSupport}
className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
>
Need Help
</button>

</div>

<style jsx>{`

@keyframes fadeIn{
0%{opacity:0;transform:translateY(10px);}
100%{opacity:1;transform:translateY(0);}
}

.animate-fadeIn{
animation:fadeIn .5s ease;
}

`}</style>

</main>

);

}