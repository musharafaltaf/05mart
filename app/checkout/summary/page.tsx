// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SummaryPage() {

// const router = useRouter();

// const [cart,setCart] = useState<any[]>([]);
// const [address,setAddress] = useState<any>(null);

// useEffect(()=>{

// const loadCart = async()=>{

// const res = await fetch("/api/cart");
// const data = await res.json();

// setCart(data.items || []);

// };

// loadCart();

// const savedAddress = localStorage.getItem("address");

// if(savedAddress){
// setAddress(JSON.parse(savedAddress));
// }

// },[]);

// const subtotal = cart.reduce(
// (sum,item)=> sum + item.price * item.quantity,
// 0
// );

// const mrpTotal = cart.reduce(
// (sum,item)=> sum + (item.oldPrice || item.price) * item.quantity,
// 0
// );

// const discount = mrpTotal - subtotal;

// const discountPercent =
// mrpTotal > 0 ? Math.round((discount / mrpTotal) * 100) : 0;

// const total = subtotal;

// const getDeliveryDate = ()=>{

// const date = new Date();
// date.setDate(date.getDate()+4);

// return date.toDateString();

// };

// return(

// <main className="max-w-6xl mx-auto p-10">

// <h1 className="text-2xl font-bold mb-8">
// Order Summary
// </h1>

// <div className="grid md:grid-cols-2 gap-10">

// {/* LEFT SIDE */}

// <div>

// {/* ADDRESS */}

// <div className="border rounded p-6 mb-6">

// <h2 className="font-semibold mb-3">
// Deliver To
// </h2>

// {address && (

// <div className="text-sm">

// <p className="font-medium">{address.name}</p>

// <p>{address.house}, {address.area}</p>

// <p>{address.city}, {address.state}</p>

// <p>{address.pincode}</p>

// <p className="mt-1">Phone: {address.phone}</p>

// </div>

// )}

// <button
// onClick={()=>router.push("/checkout/address")}
// className="text-blue-600 mt-3 text-sm"
// >
// Change Address
// </button>

// </div>

// {/* PRODUCTS */}

// {cart.map((item:any,index:number)=>(
// <div key={index} className="flex gap-4 border-b py-4">

// <img
// src={item.image}
// className="w-20 h-20 object-cover rounded"
// />

// <div className="flex-1">

// <p className="font-medium">
// {item.name}
// </p>

// <p className="text-sm text-gray-500">
// Qty: {item.quantity}
// </p>

// <p className="text-green-600 text-sm">
// Delivery by {getDeliveryDate()}
// </p>

// <p className="text-gray-500 text-sm mt-1">
// 7 Day Return Available • ₹40 return pickup fee
// </p>

// </div>

// <div className="text-right">

// <p className="font-semibold">
// ₹{item.price * item.quantity}
// </p>

// {item.oldPrice && (
// <p className="text-gray-400 line-through text-sm">
// ₹{item.oldPrice}
// </p>
// )}

// {item.oldPrice && (
// <p className="text-green-600 text-sm">
// {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
// </p>
// )}

// </div>

// </div>
// ))}

// </div>

// {/* RIGHT SIDE */}

// <div className="border rounded p-6 h-fit">

// <h2 className="font-semibold mb-6">
// Price Details
// </h2>

// <div className="flex justify-between mb-3">
// <p>MRP</p>
// <p>₹{mrpTotal}</p>
// </div>

// <div className="flex justify-between mb-3">
// <p>Discount</p>
// <p className="text-green-600">- ₹{discount}</p>
// </div>

// <div className="flex justify-between mb-3">
// <p>Delivery Charges</p>
// <p className="text-green-600">FREE</p>
// </div>

// <hr className="my-4"/>

// <div className="flex justify-between font-bold text-lg">
// <p>Total Amount</p>
// <p>₹{total}</p>
// </div>

// <p className="text-green-600 text-sm mt-2">
// You saved ₹{discount} ({discountPercent}% OFF)
// </p>

// <button
// onClick={()=>router.push("/checkout/payment")}
// className="mt-6 bg-yellow-500 w-full py-3 rounded font-medium"
// >
// Continue to Payment
// </button>

// </div>

// </div>

// </main>

// );

// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function SummaryPage() {

const router = useRouter();

const [cart,setCart] = useState<any[]>([]);
const [address,setAddress] = useState<any>(null);

useEffect(()=>{

const user = localStorage.getItem("user");

if(!user){
router.push("/login?redirect=/checkout/summary");
return;
}

/* LOAD CART FROM LOCAL STORAGE */

const storedCart = localStorage.getItem("cart");

/* BUY NOW SUPPORT */

const buyNow = localStorage.getItem("buyNow");

if(buyNow){
setCart([JSON.parse(buyNow)]);
}else if(storedCart){
setCart(JSON.parse(storedCart));
}

/* LOAD ADDRESS */

const savedAddress = localStorage.getItem("address");

if(savedAddress){
setAddress(JSON.parse(savedAddress));
}

},[]);

/* CALCULATIONS */

const subtotal = cart.reduce(
(sum,item)=> sum + item.price * item.quantity,
0
);

const mrpTotal = cart.reduce(
(sum,item)=> sum + ((item.oldPrice || item.mrp || item.price) * item.quantity),
0
);

const discount = mrpTotal - subtotal;

const discountPercent =
mrpTotal > 0 ? Math.round((discount / mrpTotal) * 100) : 0;

const total = subtotal;

/* DELIVERY DATE */

const getDeliveryDate = ()=>{

const date = new Date();
date.setDate(date.getDate()+4);

return date.toDateString();

};

return(

<main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

<CheckoutSteps step={2} />

<h1 className="text-xl md:text-2xl font-bold mb-6">
Order Summary
</h1>

<div className="grid md:grid-cols-2 gap-8 md:gap-10">

{/* LEFT SIDE */}

<div>

{/* ADDRESS */}

<div className="border rounded p-4 md:p-6 mb-6">

<h2 className="font-semibold mb-3">
Deliver To
</h2>

{address && (

<div className="text-sm">

<p className="font-medium">{address.name}</p>

<p>{address.house}, {address.area}</p>

<p>{address.city}, {address.state}</p>

<p>{address.pincode}</p>

<p className="mt-1">Phone: {address.phone}</p>

</div>

)}

<button
onClick={()=>router.push("/checkout/address")}
className="text-blue-600 mt-3 text-sm"
>
Change Address
</button>

</div>

{/* PRODUCTS */}

{cart.length === 0 && (
<p className="text-gray-500">No items in cart</p>
)}

{cart.map((item:any,index:number)=>(

<div key={index} className="flex gap-4 border-b py-4">

<img
src={item.image}
className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
/>

<div className="flex-1">

<p className="font-medium text-sm md:text-base">
{item.name}
</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity}
</p>

<p className="text-green-600 text-sm">
Delivery by {getDeliveryDate()}
</p>

<p className="text-gray-500 text-sm mt-1">
7 Day Return Available • ₹40 return pickup fee
</p>

</div>

<div className="text-right">

<p className="font-semibold">
₹{item.price * item.quantity}
</p>

{item.oldPrice && (
<p className="text-gray-400 line-through text-sm">
₹{item.oldPrice}
</p>
)}

{item.oldPrice && (
<p className="text-green-600 text-sm">
{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% OFF
</p>
)}

</div>

</div>

))}

</div>

{/* RIGHT SIDE */}

<div className="border rounded p-4 md:p-6 h-fit">

<h2 className="font-semibold mb-6">
Price Details
</h2>

<div className="flex justify-between mb-3">
<p>MRP</p>
<p>₹{mrpTotal}</p>
</div>

<div className="flex justify-between mb-3">
<p>Discount</p>
<p className="text-green-600">- ₹{discount}</p>
</div>

<div className="flex justify-between mb-3">
<p>Delivery Charges</p>
<p className="text-green-600">FREE</p>
</div>

<hr className="my-4"/>

<div className="flex justify-between font-bold text-lg">
<p>Total Amount</p>
<p>₹{total}</p>
</div>

<p className="text-green-600 text-sm mt-2">
You saved ₹{discount} ({discountPercent}% OFF)
</p>

<button
onClick={()=>router.push("/checkout/payment")}
className="mt-6 bg-yellow-500 hover:bg-yellow-600 w-full py-3 rounded font-medium"
>
Continue to Payment
</button>

</div>

</div>

</main>

);

}