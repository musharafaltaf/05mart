// "use client";

// import { useEffect, useState } from "react";

// export default function AdminOrdersPage(){

// const [orders,setOrders] = useState<any[]>([]);
// const [loading,setLoading] = useState(true);

// useEffect(()=>{

// loadOrders();

// },[]);

// const loadOrders = async()=>{

// try{

// const res = await fetch("/api/orders");

// const data = await res.json();

// setOrders(data);

// }catch(err){

// console.log(err);

// }

// setLoading(false);

// };

// const updateStatus = async(orderId:string,status:string)=>{

// await fetch("/api/orders/update",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// orderId,
// status
// })
// });

// loadOrders();

// };

// const deleteOrder = async(id:string)=>{

// await fetch(`/api/orders/${id}`,{
// method:"DELETE"
// });

// loadOrders();

// };

// return(

// <main className="max-w-7xl mx-auto px-4 py-10">

// <h1 className="text-3xl font-bold mb-6">
// Admin Orders
// </h1>

// {loading && <p>Loading orders...</p>}

// <div className="space-y-6">

// {orders.map((order:any)=>(

// <div
// key={order._id}
// className="border rounded p-6"
// >

// {/* ORDER HEADER */}

// <div className="flex justify-between mb-4">

// <div>

// <p className="font-semibold">
// Order ID: {order._id}
// </p>

// <p className="text-sm text-gray-500">
// Total: ₹{order.total}
// </p>

// </div>

// <button
// onClick={()=>deleteOrder(order._id)}
// className="bg-red-500 text-white px-3 py-1 rounded text-sm"
// >
// Delete
// </button>

// </div>

// {/* CUSTOMER */}

// <div className="mb-4 text-sm">

// <p className="font-medium">
// Customer
// </p>

// <p>{order.customer?.name}</p>
// <p>{order.customer?.phone}</p>
// <p>{order.customer?.address}</p>
// <p>{order.customer?.city}</p>

// </div>

// {/* PRODUCTS */}

// <div className="mb-4">

// <p className="font-medium mb-2">
// Products
// </p>

// <div className="space-y-3">

// {order.items?.map((item:any,index:number)=>(

// <div
// key={index}
// className="flex items-center gap-4"
// >

// <img
// src={item.image}
// className="w-12 h-12 object-cover rounded"
// />

// <div className="flex-1">

// <p className="text-sm">
// {item.name}
// </p>

// <p className="text-xs text-gray-500">
// Qty: {item.quantity}
// </p>

// </div>

// <p className="text-sm">
// ₹{item.price}
// </p>

// </div>

// ))}

// </div>

// </div>

// {/* ORDER STATUS */}

// <div className="flex items-center gap-4">

// <p className="font-medium">
// Status
// </p>

// <select
// value={order.status}
// onChange={(e)=>updateStatus(order._id,e.target.value)}
// className="border p-2 rounded"
// >

// <option value="placed">
// Placed
// </option>

// <option value="packed">
// Packed
// </option>

// <option value="shipped">
// Shipped
// </option>

// <option value="out">
// Out for Delivery
// </option>

// <option value="delivered">
// Delivered
// </option>

// </select>

// </div>

// </div>

// ))}

// </div>

// </main>

// );

// }


// "use client";

// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";

// export default function AdminOrders() {

// const [orders,setOrders] = useState<any[]>([]);

// useEffect(()=>{

// const loadOrders = async()=>{

// try{

// const res = await fetch("/api/orders");
// const data = await res.json();

// setOrders(Array.isArray(data) ? data : []);

// }catch(err){
// console.log(err);
// }

// };

// loadOrders();

// },[]);

// const downloadInvoice = (order:any)=>{

// const doc = new jsPDF();

// doc.setFontSize(18);
// doc.text("05Mart Invoice", 70, 20);

// doc.setFontSize(12);

// doc.text(`Order ID: ${order._id}`,20,40);

// doc.text(`Customer: ${order.customer?.name || ""}`,20,50);
// doc.text(`Phone: ${order.customer?.phone || ""}`,20,60);

// doc.text("Address:",20,75);

// doc.text(
// `${order.customer?.house || ""} ${order.customer?.area || ""}`,
// 20,
// 85
// );

// doc.text(
// `${order.customer?.city || ""}, ${order.customer?.state || ""} ${order.customer?.pincode || ""}`,
// 20,
// 95
// );

// let y = 120;

// doc.text("Products:",20,y);

// y += 10;

// order.items?.forEach((item:any)=>{

// doc.text(
// `${item.name} | Size ${item.size || "-"} | Qty ${item.quantity} | ₹${item.price}`,
// 20,
// y
// );

// y += 10;

// });

// doc.text(`Total: ₹${order.total}`,20,y+10);

// doc.save(`invoice_${order._id}.pdf`);

// };

// return(

// <main className="max-w-6xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-8">
// Admin Orders
// </h1>

// {orders.length === 0 && (
// <p>No orders found</p>
// )}

// <div className="space-y-6">

// {orders.map((order:any)=>(
// <div key={order._id} className="border p-6 rounded-lg">

// {/* ORDER HEADER */}

// <div className="flex justify-between mb-4">

// <p className="font-semibold">
// Order ID: {order._id}
// </p>

// <p className="text-sm bg-gray-100 px-3 py-1 rounded">
// {order.status}
// </p>

// </div>

// {/* CUSTOMER */}

// <div className="bg-gray-50 p-4 rounded mb-4">

// <p className="font-semibold mb-2">Customer</p>

// <p>{order.customer?.name}</p>

// <p>
// {order.customer?.house} {order.customer?.area}
// </p>

// <p>
// {order.customer?.city}, {order.customer?.state}
// </p>

// <p>{order.customer?.pincode}</p>

// <p className="mt-2">
// Phone: {order.customer?.phone}
// </p>

// {/* CALL BUTTON */}

// {order.customer?.phone && (

// <a
// href={`tel:${order.customer?.phone || ""}`}
// className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
// >
// Call Customer
// </a>

// )}

// </div>

// {/* PRODUCTS */}

// <div className="space-y-3">

// {order.items?.map((item:any)=>(
// <div key={item._id} className="flex gap-4 border p-3 rounded">

// <img
// src={item.image}
// className="w-16 h-16 object-cover rounded"
// />

// <div>

// <p className="font-medium">{item.name}</p>

// <p className="text-sm">Size: {item.size}</p>

// <p className="text-sm">Qty: {item.quantity}</p>

// <p className="font-semibold">₹{item.price}</p>

// </div>

// </div>
// ))}

// </div>

// {/* TOTAL */}

// <div className="flex justify-between mt-4 items-center">

// <p className="font-semibold">
// Total: ₹{order.total}
// </p>

// <button
// onClick={()=>downloadInvoice(order)}
// className="bg-black text-white px-4 py-2 rounded"
// >
// Download Invoice
// </button>

// </div>

// </div>
// ))}

// </div>

// </main>

// );

// }



"use client";

import { useEffect,useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function AdminOrders(){

const [orders,setOrders] = useState([]);

const loadOrders = async()=>{

const res = await fetch("/api/orders");
const data = await res.json();

setOrders(data);

};

useEffect(()=>{
loadOrders();
},[]);

/* UPDATE STATUS */

const updateStatus = async(id,status)=>{

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({status})
});

loadOrders();

};

/* SHIPPING LABEL */

const downloadLabel = (order)=>{

const doc = new jsPDF();

doc.setFontSize(18);
doc.text("Shipping Label",80,20);

doc.setFontSize(12);

doc.text(`Order: ${order._id}`,20,40);
doc.text(`Name: ${order.customer?.name}`,20,50);
doc.text(`Phone: ${order.customer?.phone}`,20,60);

doc.text(`${order.customer?.house} ${order.customer?.area}`,20,70);
doc.text(`${order.customer?.city}, ${order.customer?.state}`,20,80);
doc.text(`Pincode: ${order.customer?.pincode}`,20,90);

doc.save(`label_${order._id}.pdf`);

};

/* INVOICE */

const downloadInvoice = async(order)=>{

const doc = new jsPDF();

let y = 20;

doc.setFontSize(20);
doc.text("05Mart Invoice",80,y);

y+=20;

doc.text(`Order: ${order._id}`,20,y);

y+=10;

doc.text(`Customer: ${order.customer?.name}`,20,y);

y+=10;

doc.text(`Phone: ${order.customer?.phone}`,20,y);

y+=10;

doc.text(`${order.customer?.house} ${order.customer?.area}`,20,y);

y+=10;

doc.text(`${order.customer?.city}, ${order.customer?.state}`,20,y);

y+=10;

doc.text(`Pincode: ${order.customer?.pincode}`,20,y);

y+=20;

order.items.forEach(item=>{

doc.text(
`${item.name} | ${item.size} | Qty ${item.quantity} | ₹${item.price}`,
20,
y
);

y+=10;

});

y+=10;

doc.text(`Total ₹${order.total}`,20,y);

const qr = await QRCode.toDataURL(order._id);

doc.addImage(qr,"PNG",150,20,40,40);

doc.save(`invoice_${order._id}.pdf`);

};

return(

<main className="max-w-6xl mx-auto px-4 py-6">

<h1 className="text-xl md:text-2xl font-bold mb-6">
Admin Orders
</h1>

<div className="space-y-5">

{orders.map(order=>(

<div key={order._id} className="border p-4 md:p-6 rounded-lg">

{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

<p className="font-semibold text-sm md:text-base break-all">
Order {order._id}
</p>

<select
value={order.status}
onChange={(e)=>updateStatus(order._id,e.target.value)}
className="border rounded px-2 py-1 text-sm bg-white w-full md:w-[150px] max-w-[160px]"
style={{ maxHeight: "120px" }}
>
<option value="pending">Pending</option>
<option value="confirmed">Confirmed</option>
<option value="processing">Processing</option>
<option value="shipped">Shipped</option>
<option value="out_for_delivery">Out for Delivery</option>
<option value="delivered">Delivered</option>
<option value="cancelled">Cancelled</option>
<option value="returned">Returned</option>
<option value="refunded">Refunded</option>
</select>

</div>

{/* CUSTOMER */}

<div className="mt-4 text-sm">

<p className="font-semibold mb-1">
Customer
</p>

<p>{order.customer?.name}</p>

<p>{order.customer?.phone}</p>

<p>
{order.customer?.house} {order.customer?.area}
</p>

<p>
{order.customer?.city}, {order.customer?.state}
</p>

<p>{order.customer?.pincode}</p>

<a
href={`tel:${order.customer?.phone}`}
className="bg-green-600 text-white px-3 py-1 rounded mt-2 inline-block text-sm"
>
Call Customer
</a>

</div>

{/* PRODUCTS */}

<div className="mt-4 space-y-3">

{order.items.map(item=>(

<div key={item._id} className="flex gap-3 border p-2 rounded">

<img
src={item.image}
className="w-14 h-14 md:w-16 md:h-16 object-cover rounded"
/>

<div className="text-sm">

<p className="font-medium">{item.name}</p>
<p>Size {item.size}</p>
<p>Qty {item.quantity}</p>
<p>₹{item.price}</p>

</div>

</div>

))}

</div>

{/* ACTIONS */}

<div className="flex flex-col sm:flex-row gap-3 mt-4">

<button
onClick={()=>downloadInvoice(order)}
className="bg-black text-white px-3 py-2 rounded text-sm w-full sm:w-auto"
>
Invoice
</button>

<button
onClick={()=>downloadLabel(order)}
className="bg-blue-600 text-white px-3 py-2 rounded text-sm w-full sm:w-auto"
>
Shipping Label
</button>

</div>

</div>

))}

</div>

</main>

);

}