"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartPage() {

const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
const router = useRouter();

const [loading,setLoading] = useState(false);
const [pageLoading,setPageLoading] = useState(true);
const [removeId,setRemoveId] = useState<string | null>(null);

/* SIZE SYSTEM */
const [sizeModal,setSizeModal] = useState(false);
const [sizeMap,setSizeMap] = useState<{[key:string]:string}>({});

/* ERROR MODAL */
const [errorModal,setErrorModal] = useState(false);
const [missingItems,setMissingItems] = useState<any[]>([]);
const [dragY,setDragY] = useState(0);
const [startY,setStartY] = useState(0);

/* ================= LOADING ================= */

useEffect(()=>{
setTimeout(()=>setPageLoading(false),700);
},[]);

/* ================= CALC ================= */

const safeCart = cart.map(item => ({
price: Number(item.price) || 0,
mrp: Number(item.mrp || item.oldPrice || item.price) || 0,
qty: Number(item.qty) || 1
}));

const subtotal = safeCart.reduce((s,i)=>s+i.price*i.qty,0);
const mrpTotal = safeCart.reduce((s,i)=>s+i.mrp*i.qty,0);
const discount = mrpTotal - subtotal;
const total = subtotal;

/* ================= CHECKOUT ================= */

const handleCheckout = ()=>{

if(loading) return;

const missing = cart.filter((i:any)=>!i.size);

if(missing.length > 0){

const map:any = {};
missing.forEach((i:any)=>{ map[i._id] = ""; });

setSizeMap(map);
setSizeModal(true);
return;
}

setLoading(true);

const user = localStorage.getItem("user");

setTimeout(()=>{
if(!user){
router.push("/login?redirect=/checkout/address");
}else{
router.push("/checkout/address");
}
},800);

};

/* ================= CONFIRM SIZE ================= */

const confirmAllSizes = () => {

const notSelected = cart.filter((item:any)=>!item.size && !sizeMap[item._id]);

if(notSelected.length > 0){
setMissingItems(notSelected);
setErrorModal(true);
return;
}

/* UPDATE CART */
const updatedCart = cart.map((item:any)=>{
if(sizeMap[item._id]){
return {...item, size:sizeMap[item._id]};
}
return item;
});

localStorage.setItem("cart", JSON.stringify(updatedCart));
window.dispatchEvent(new Event("storage"));

setSizeModal(false);

setLoading(true);

setTimeout(()=>{
const user = localStorage.getItem("user");

if(!user){
router.push("/login?redirect=/checkout/address");
}else{
router.push("/checkout/address");
}
},800);

};

/* ================= UI ================= */

return(

<main className="max-w-7xl mx-auto px-4 py-8 pb-32">

<h1 className="text-2xl md:text-3xl font-bold mb-6">
Your Cart
</h1>

{/* ================= SKELETON ================= */}
{pageLoading && (
<div className="space-y-4">
{[1,2,3].map(i=>(
<div key={i} className="animate-pulse flex gap-4 p-4 border rounded-xl">
<div className="w-24 h-24 bg-gray-200 rounded"></div>
<div className="flex-1 space-y-2">
<div className="h-4 bg-gray-200 rounded w-2/3"></div>
<div className="h-3 bg-gray-200 rounded w-1/3"></div>
<div className="h-3 bg-gray-200 rounded w-1/4"></div>
</div>
</div>
))}
</div>
)}

{/* EMPTY */}
{!pageLoading && cart.length === 0 && (
<div className="text-center py-20">
<p className="text-lg font-semibold mb-2">🛒 Your cart feels empty</p>
<p className="text-gray-500 mb-6 text-sm">Add items and unlock amazing deals 🔥</p>

<button
onClick={()=>router.push("/")}
className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl"
>
Start Shopping
</button>
</div>
)}

{/* CART */}
{!pageLoading && cart.length > 0 && (

<div className="grid md:grid-cols-3 gap-8">

{/* ITEMS */}
<div className="md:col-span-2 space-y-5">

{cart.map((item:any)=>(

<div key={item._id} className="relative flex gap-4 p-4 rounded-2xl border shadow-sm bg-white hover:shadow-md transition hover:scale-[1.01]">

{/* REMOVE */}
<button
onClick={()=>setRemoveId(item._id)}
className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition hover:scale-110"
>
✕
</button>

<img
src={item.image}
onClick={()=>router.push(`/product/${item._id}`)}
className="w-24 h-24 object-cover rounded-xl cursor-pointer"
/>

<div className="flex-1">

<h2
onClick={()=>router.push(`/product/${item._id}`)}
className="font-semibold cursor-pointer hover:underline"
>
{item.name}
</h2>

<div className="flex gap-2 mt-1">
<span className="font-semibold text-lg">₹{item.price}</span>
<span className="line-through text-gray-400 text-sm">₹{item.mrp}</span>
</div>

<p className={`text-xs mt-1 font-medium ${
item.size ? "text-green-600" : "text-red-500 animate-pulse"
}`}>
Size: {item.size || "Select size"}
</p>

<p className="text-xs text-gray-400">
🚚 Fast delivery available
</p>

<div className="flex gap-3 mt-3">
<button onClick={()=>decreaseQty(item._id)} className="px-3 py-1 border rounded">-</button>
<span>{item.qty}</span>
<button onClick={()=>increaseQty(item._id)} className="px-3 py-1 border rounded">+</button>
</div>

</div>

</div>

))}

</div>

{/* SUMMARY */}
<div className="rounded-2xl p-6 bg-white shadow-md border h-fit">

<h2 className="font-bold text-lg mb-6">💰 Price Details</h2>

<div className="space-y-3 text-sm">

<div className="flex justify-between">
<span className="text-gray-500">Total MRP</span>
<span className="text-gray-400">₹{mrpTotal}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Selling Price</span>
<span className="font-semibold">₹{subtotal}</span>
</div>

<div className="flex justify-between text-green-600 font-medium">
<span>Discount</span>
<span>-₹{discount}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Delivery</span>
<span className="text-green-600 font-medium">FREE</span>
</div>

</div>

<div className="my-4 border-t pt-4 flex justify-between text-lg font-bold">
<span>Total</span>
<span>₹{total}</span>
</div>

<div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-xl text-center font-medium animate-pulse">
🎉 You saved ₹{discount} on this order!
</div>

<button
onClick={handleCheckout}
className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold active:scale-95 transition"
>
{loading ? "😊Processing... " : "Proceed to Checkout"}
</button>

</div>

</div>

)}

{/* ================= SIZE MODAL ================= */}
{sizeModal && (
<div
className="fixed inset-0 z-50 flex items-end justify-center"
onClick={()=>{
setSizeModal(false);
setDragY(0);
}}
>

{/* BACKDROP */}
<div
className="absolute inset-0 bg-black transition-opacity duration-200"
style={{ opacity: 0.5 - dragY / 500 }}
/>

{/* SHEET */}
<div
className="relative bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col transition-transform duration-200"
style={{ transform:`translateY(${dragY}px)` }}

onClick={(e)=>e.stopPropagation()}

/* TOUCH START */
onTouchStart={(e)=>{
setStartY(e.touches[0].clientY);
}}

/* TOUCH MOVE */
onTouchMove={(e)=>{
const move = e.touches[0].clientY - startY;

if(move > 0){
setDragY(move);
}
}}

/* TOUCH END */
onTouchEnd={()=>{
if(dragY > 120){
setSizeModal(false);
setDragY(0);
}else{
setDragY(0);
}
}}
>

{/* DRAG HANDLE */}
<div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-3"/>

<div className="px-4 pb-2">
<h2 className="font-bold text-lg">Select Sizes</h2>
<p className="text-xs text-gray-400">
✨ Better fit = better experience
</p>
</div>

{/* CONTENT */}
<div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">

{cart.filter((i:any)=>!i.size).map((item:any)=>(

<div key={item._id} className="border p-3 rounded-xl">

<div className="flex gap-3 mb-2">
<img src={item.image} className="w-14 h-14 rounded"/>
<div>
<p className="text-sm font-medium">{item.name}</p>
</div>
</div>

<div className="flex flex-wrap gap-2">

{(item.sizes || ["S","M","L","XL"]).map((s:string)=>(
<button
key={s}
onClick={()=>setSizeMap(prev=>({...prev,[item._id]:s}))}
className={`px-3 py-2 border rounded transition ${
sizeMap[item._id]===s 
? "bg-black text-white scale-105" 
: "hover:bg-gray-100"
}`}
>
{s}
</button>
))}

</div>

</div>

))}

<button
onClick={confirmAllSizes}
className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white mt-4 active:scale-95 transition"
>
Confirm Sizes & Continue
</button>

<p className="text-xs text-gray-400 text-center">
📏 Accurate size reduces returns
</p>

</div>

</div>
</div>
)}

{/* ERROR MODAL */}
{errorModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-xl w-[90%] max-w-sm">

<h3 className="font-bold mb-2 text-red-500">
⚠ Select sizes first
</h3>

<ul className="text-sm text-gray-600 mb-4 space-y-1">
{missingItems.map((i:any)=>(
<li key={i._id}>• {i.name}</li>
))}
</ul>

<button
onClick={()=>setErrorModal(false)}
className="w-full bg-black text-white py-2 rounded"
>
Got it
</button>

</div>
</div>
)}

{/* REMOVE MODAL */}
{removeId && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
onClick={()=>setRemoveId(null)}>
<div className="bg-white p-6 rounded-xl w-[90%] max-w-sm"
onClick={(e)=>e.stopPropagation()}>
<p className="mb-4">Remove item?</p>
<div className="flex gap-3">
<button onClick={()=>setRemoveId(null)} className="w-full border py-2">Cancel</button>
<button onClick={()=>{removeFromCart(removeId);setRemoveId(null);}} className="w-full bg-red-500 text-white py-2">
Remove
</button>
</div>
</div>
</div>
)}

</main>
);
}