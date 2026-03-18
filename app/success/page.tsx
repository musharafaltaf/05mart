// "use client";

// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import jsPDF from "jspdf";

// export default function SuccessPage(){

// const searchParams = useSearchParams();
// const orderId = searchParams.get("orderId");

// /* DELIVERY DATE */

// const deliveryDate = ()=>{
// const date = new Date();
// date.setDate(date.getDate()+4);
// return date.toDateString();
// };

// /* DOWNLOAD INVOICE */

// const downloadInvoice = ()=>{

// const doc = new jsPDF();

// doc.setFontSize(22);
// doc.text("05Mart Invoice", 70, 20);

// doc.setFontSize(12);

// doc.text(`Order ID: ${orderId}`,20,50);
// doc.text(`Delivery Date: ${deliveryDate()}`,20,60);
// doc.text("Thank you for shopping with 05Mart!",20,90);

// doc.save(`invoice_${orderId}.pdf`);

// };

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// {/* SUCCESS ICON */}

// <div className="flex justify-center mb-6">

// <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl animate-pulse">

// ✔

// </div>

// </div>

// {/* TITLE */}

// <h1 className="text-3xl font-bold text-green-600 mb-2">
// Order Placed Successfully
// </h1>

// <p className="text-gray-500 mb-8">
// Your order has been confirmed and will be shipped soon.
// </p>

// {/* ORDER DETAILS CARD */}

// <div className="border rounded-lg p-6 mb-8 bg-gray-50">

// <p className="text-sm text-gray-500 mb-1">
// Order ID
// </p>

// <p className="font-semibold break-all">
// {orderId}
// </p>

// <div className="mt-4 text-sm text-gray-600">

// <p>
// Estimated Delivery
// </p>

// <p className="font-semibold text-green-600">
// {deliveryDate()}
// </p>

// </div>

// </div>

// {/* ACTION BUTTONS */}

// <div className="grid gap-4">

// <Link
// href={`/orders/${orderId}`}
// className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
// >
// View Order
// </Link>

// <Link
// href="/"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Continue Shopping
// </Link>

// <button
// onClick={downloadInvoice}
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Download Invoice
// </button>

// <a
// href="tel:+916005955305"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Contact Support
// </a>

// </div>

// </div>

// </main>

// );

// }





// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import jsPDF from "jspdf";

// function SuccessContent(){

// const searchParams = useSearchParams();
// const router = useRouter();

// const orderId = searchParams.get("orderId");

// const [orderValid,setOrderValid] = useState<boolean | null>(null);
// const [paymentFailed,setPaymentFailed] = useState(false);

// /* VERIFY ORDER */

// useEffect(()=>{

// if(!orderId){
// router.push("/");
// return;
// }

// const verifyOrder = async()=>{

// try{

// const res = await fetch(`/api/orders/${orderId}`);

// if(!res.ok){
// setOrderValid(false);
// return;
// }

// const data = await res.json();

// /* ✅ VALID CHECK */
// if(!data?._id){
//   setOrderValid(false);
//   return;
// }

// /* ========================= */
// /* PAYMENT LOGIC */
// /* ========================= */

// /* COD */
// if(data.paymentMethod === "cod" || data.status === "pending"){
//   setOrderValid(true);
//   return;
// }

// /* UPI */
// if(data.paymentMethod === "upi"){
//   setOrderValid(true);
//   return;
// }

// /* RAZORPAY */
// if(
//   data.paymentMethod === "razorpay" &&
//   (data.status === "paid" || data.status === "confirmed")
// ){
//   setOrderValid(true);
//   return;
// }

// /* FAILED */
// setPaymentFailed(true);
// setOrderValid(false);

// }catch(err){

// console.log(err);
// setOrderValid(false);

// }

// };

// verifyOrder();

// },[orderId]);

// /* DELIVERY DATE */

// const deliveryDate = ()=>{
// const date = new Date();
// date.setDate(date.getDate()+4);
// return date.toDateString();
// };

// /* DOWNLOAD INVOICE */

// const downloadInvoice = ()=>{

// const doc = new jsPDF();

// doc.setFontSize(22);
// doc.text("05Mart Invoice", 70, 20);

// doc.setFontSize(12);

// doc.text(`Order ID: ${orderId}`,20,50);
// doc.text(`Delivery Date: ${deliveryDate()}`,20,60);
// doc.text("Thank you for shopping with 05Mart!",20,90);

// doc.save(`invoice_${orderId}.pdf`);

// };

// /* LOADING */

// if(orderValid === null){
// return <div className="text-center p-10">Verifying order...</div>
// }

// /* FAILED */

// if(paymentFailed){

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// <div className="text-5xl mb-4">❌</div>

// <h1 className="text-2xl font-bold text-red-600 mb-4">
// Payment Not Completed
// </h1>

// <p className="text-gray-500 mb-6">
// Your payment was not completed or failed.
// </p>

// <div className="grid gap-4">

// <Link href="/cart" className="bg-black text-white py-3 rounded-lg">
// Retry Payment
// </Link>

// <Link href="/" className="border py-3 rounded-lg">
// Go to Home
// </Link>

// </div>

// </div>

// </main>

// );

// }

// /* SUCCESS */

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// {/* ICON */}
// <div className="flex justify-center mb-6">
// <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl animate-pulse">
// ✔
// </div>
// </div>

// {/* TITLE */}
// <h1 className="text-3xl font-bold text-green-600 mb-2">
// Order Placed Successfully
// </h1>

// <p className="text-gray-500 mb-8">
// Your order has been confirmed and will be shipped soon.
// </p>

// {/* ORDER DETAILS */}
// <div className="border rounded-lg p-6 mb-8 bg-gray-50">

// <p className="text-sm text-gray-500 mb-1">
// Order ID
// </p>

// <p className="font-semibold break-all">
// {orderId}
// </p>

// <div className="mt-4 text-sm text-gray-600">

// <p>Estimated Delivery</p>

// <p className="font-semibold text-green-600">
// {deliveryDate()}
// </p>

// </div>

// </div>

// {/* BUTTONS */}
// <div className="grid gap-4">

// <Link
// href={`/orders/${orderId}`}
// className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
// >
// View Order
// </Link>

// <Link
// href="/"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Continue Shopping
// </Link>

// <button
// onClick={downloadInvoice}
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Download Invoice
// </button>

// <a
// href="tel:+916005955305"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Contact Support
// </a>

// </div>

// </div>

// </main>

// );
// }

// export default function SuccessPage(){
// return(
// <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
// <SuccessContent/>
// </Suspense>
// );
// }





// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import jsPDF from "jspdf";

// function SuccessContent(){

// const searchParams = useSearchParams();
// const router = useRouter();

// const orderId = searchParams.get("orderId");

// const [orderValid,setOrderValid] = useState<boolean | null>(null);
// const [paymentFailed,setPaymentFailed] = useState(false);

// /* ✅ FIXED: TOAST STATE */
// const [toast,setToast] = useState<string | null>(null);

// /* ========================= */
// /* 🎉 PREMIUM CONFETTI + SOUND */
// /* ========================= */

// useEffect(()=>{

// if(orderValid){

// /* 🎉 MULTI COLOR CONFETTI */
// const colors = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#a855f7"];

// for(let i=0;i<50;i++){

// setTimeout(()=>{

// const confetti = document.createElement("div");

// confetti.style.position = "fixed";
// confetti.style.left = Math.random()*100 + "vw";
// confetti.style.top = "-20px";
// confetti.style.width = "8px";
// confetti.style.height = "8px";
// confetti.style.background = colors[Math.floor(Math.random()*colors.length)];
// confetti.style.zIndex = "9999";
// confetti.style.borderRadius = "2px";
// confetti.style.opacity = "1";

// document.body.appendChild(confetti);

// /* explosion + fall */
// setTimeout(()=>{
// confetti.style.transition = "transform 2s linear, opacity 2s";
// confetti.style.transform = `translateY(100vh) rotate(${Math.random()*720}deg)`;
// confetti.style.opacity = "0";
// },50);

// setTimeout(()=>confetti.remove(),2000);

// }, i * 40);

// }

// /* 🔊 SOUND FIX */
// const audio = new Audio("/success.mp3");
// audio.volume = 0.7;

// audio.play().catch(()=>{
// const playOnClick = () => {
// audio.play();
// document.removeEventListener("click", playOnClick);
// };
// document.addEventListener("click", playOnClick);
// });

// /* 🔔 TOAST */
// setToast("Order placed successfully 🎉");
// setTimeout(()=>setToast(null),2500);

// }

// },[orderValid]);

// /* ========================= */
// /* VERIFY ORDER */
// /* ========================= */

// useEffect(()=>{

// if(!orderId){
// router.push("/");
// return;
// }

// const verifyOrder = async()=>{

// try{

// const res = await fetch(`/api/orders/${orderId}`);

// if(!res.ok){
// setOrderValid(false);
// return;
// }

// const data = await res.json();

// /* VALID */
// if(!data?._id){
// setOrderValid(false);
// return;
// }

// /* COD */
// if(data.paymentMethod === "cod" || data.status === "pending"){
// setOrderValid(true);
// return;
// }

// /* UPI */
// if(data.paymentMethod === "upi"){
// setOrderValid(true);
// return;
// }

// /* RAZORPAY */
// if(
// data.paymentMethod === "razorpay" &&
// (data.status === "paid" || data.status === "confirmed")
// ){
// setOrderValid(true);
// return;
// }

// /* FAILED */
// setPaymentFailed(true);
// setOrderValid(false);

// }catch(err){
// console.log(err);
// setOrderValid(false);
// }

// };

// verifyOrder();

// },[orderId]);

// /* ========================= */
// /* DELIVERY */
// /* ========================= */

// const deliveryDate = ()=>{
// const date = new Date();
// date.setDate(date.getDate()+4);
// return date.toDateString();
// };

// /* ========================= */
// /* INVOICE */
// /* ========================= */

// const downloadInvoice = ()=>{

// const doc = new jsPDF();

// doc.setFontSize(22);
// doc.text("05Mart Invoice", 70, 20);

// doc.setFontSize(12);

// doc.text(`Order ID: ${orderId}`,20,50);
// doc.text(`Delivery Date: ${deliveryDate()}`,20,60);
// doc.text("Thank you for shopping with 05Mart!",20,90);

// doc.save(`invoice_${orderId}.pdf`);

// };

// /* ========================= */
// /* LOADING */
// /* ========================= */

// if(orderValid === null){
// return <div className="text-center p-10">Verifying order...</div>
// }

// /* ========================= */
// /* FAILED */
// /* ========================= */

// if(paymentFailed){

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// <div className="text-5xl mb-4 animate-bounce">❌</div>

// <h1 className="text-2xl font-bold text-red-600 mb-4">
// Payment Not Completed
// </h1>

// <p className="text-gray-500 mb-6">
// Your payment was not completed or failed.
// </p>

// <div className="grid gap-4">

// <Link href="/cart" className="bg-black text-white py-3 rounded-lg">
// Retry Payment
// </Link>

// <Link href="/" className="border py-3 rounded-lg">
// Go to Home
// </Link>

// </div>

// </div>

// </main>

// );

// }

// /* ========================= */
// /* SUCCESS */
// /* ========================= */

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// {/* ICON */}
// <div className="flex justify-center mb-6">
// <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl animate-bounce">
// ✔
// </div>
// </div>

// {/* TITLE */}
// <h1 className="text-3xl font-bold text-green-600 mb-2">
// Order Placed Successfully
// </h1>

// <p className="text-gray-500 mb-8">
// Your order has been confirmed and will be shipped soon.
// </p>

// {/* ORDER DETAILS */}
// <div className="border rounded-lg p-6 mb-8 bg-gray-50">

// <p className="text-sm text-gray-500 mb-1">
// Order ID
// </p>

// <p className="font-semibold break-all">
// {orderId}
// </p>

// <div className="mt-4 text-sm text-gray-600">

// <p>Estimated Delivery</p>

// <p className="font-semibold text-green-600">
// {deliveryDate()}
// </p>

// </div>

// </div>

// {/* BUTTONS */}
// <div className="grid gap-4">

// <Link
// href={`/orders/${orderId}`}
// className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
// >
// View Order
// </Link>

// <Link
// href="/"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Continue Shopping
// </Link>

// <button
// onClick={downloadInvoice}
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Download Invoice
// </button>

// <a
// href="tel:+916005955305"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Contact Support
// </a>

// </div>

// </div>

// {/* 🔔 TOAST */}
// {toast && (
// <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
// {toast}
// </div>
// )}

// </main>

// );
// }

// export default function SuccessPage(){
// return(
// <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
// <SuccessContent/>
// </Suspense>
// );
// }




"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";

function SuccessContent(){

const searchParams = useSearchParams();
const router = useRouter();

const orderId = searchParams.get("orderId");

const [orderValid,setOrderValid] = useState<boolean | null>(null);
const [paymentFailed,setPaymentFailed] = useState(false);

/* ✅ EXISTING */
const [toast,setToast] = useState<string | null>(null);

/* ✅ NEW (SAFE) */
const [orderData,setOrderData] = useState<any>(null);

/* ========================= */
/* 🎉 CONFETTI + SOUND */
/* ========================= */

useEffect(()=>{

if(orderValid){

const colors = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#a855f7"];

for(let i=0;i<50;i++){

setTimeout(()=>{

const confetti = document.createElement("div");

confetti.style.position = "fixed";
confetti.style.left = Math.random()*100 + "vw";
confetti.style.top = "-20px";
confetti.style.width = "8px";
confetti.style.height = "8px";
confetti.style.background = colors[Math.floor(Math.random()*colors.length)];
confetti.style.zIndex = "9999";

document.body.appendChild(confetti);

setTimeout(()=>{
confetti.style.transition = "transform 2s linear, opacity 2s";
confetti.style.transform = `translateY(100vh) rotate(${Math.random()*720}deg)`;
confetti.style.opacity = "0";
},50);

setTimeout(()=>confetti.remove(),2000);

}, i * 40);

}

/* SOUND */
const audio = new Audio("/success.mp3");
audio.play().catch(()=>{
document.addEventListener("click",()=>audio.play(),{once:true});
});

/* TOAST */
setToast("Order placed successfully 🎉");
setTimeout(()=>setToast(null),2500);

}

},[orderValid]);

/* ========================= */
/* VERIFY ORDER */
/* ========================= */

useEffect(()=>{

if(!orderId){
router.push("/");
return;
}

const verifyOrder = async()=>{

try{

const res = await fetch(`/api/orders/${orderId}`);

if(!res.ok){
setOrderValid(false);
return;
}

const data = await res.json();

/* ✅ NEW */
setOrderData(data);

if(!data?._id){
setOrderValid(false);
return;
}

if(data.paymentMethod === "cod" || data.status === "pending"){
setOrderValid(true);
return;
}

if(data.paymentMethod === "upi"){
setOrderValid(true);
return;
}

if(
data.paymentMethod === "razorpay" &&
(data.status === "paid" || data.status === "confirmed")
){
setOrderValid(true);
return;
}

setPaymentFailed(true);
setOrderValid(false);

}catch(err){
console.log(err);
setOrderValid(false);
}

};

verifyOrder();

},[orderId]);

/* ========================= */
/* REAL-TIME REFRESH */
/* ========================= */

useEffect(()=>{

if(!orderId) return;

const interval = setInterval(async ()=>{

try{
const res = await fetch(`/api/orders/${orderId}`);
const data = await res.json();
setOrderData(data);
}catch{}

},5000);

return ()=>clearInterval(interval);

},[orderId]);

/* ========================= */
/* TRACKING LOGIC */
/* ========================= */

const steps = [
"Order Placed",
"Processing",
"Shipped",
"Out for Delivery",
"Delivered"
];

const currentStepIndex = orderData?.tracking
? steps.findIndex(s => s === orderData.tracking.slice(-1)[0]?.status)
: 0;

/* ========================= */
/* DELIVERY */
/* ========================= */

const deliveryDate = ()=>{
const date = new Date();
date.setDate(date.getDate()+4);
return date.toDateString();
};

/* ========================= */
/* INVOICE */
/* ========================= */

const downloadInvoice = ()=>{
const doc = new jsPDF();
doc.text("05Mart Invoice",70,20);
doc.text(`Order ID: ${orderId}`,20,50);
doc.save(`invoice_${orderId}.pdf`);
};

/* ========================= */

if(orderValid === null){
return <div className="text-center p-10">Verifying order...</div>
}

/* ========================= */
/* FAILED */
/* ========================= */

if(paymentFailed){
return(
<main className="min-h-screen flex items-center justify-center">
<h1>Payment Failed</h1>
</main>
);
}

/* ========================= */
/* SUCCESS */
/* ========================= */

return(

<main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

<div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

<div className="text-5xl mb-4 animate-bounce">✔</div>

<h1 className="text-3xl font-bold text-green-600 mb-2">
Order Placed Successfully
</h1>

<p className="text-gray-500 mb-6">
Your order has been confirmed.
</p>

{/* ORDER */}
<div className="border p-4 mb-6">
<p>{orderId}</p>
<p>{deliveryDate()}</p>
</div>

{/* ========================= */}
{/* TRACKING UI */}
{/* ========================= */}

{orderData?.tracking && (

<div className="border p-4 mb-6 text-left">

<div className="h-2 bg-gray-200 rounded mb-4">
<div
className="h-2 bg-green-500"
style={{
width: `${((currentStepIndex+1)/steps.length)*100}%`
}}
></div>
</div>

{steps.map((step,i)=>(
<div key={i} className={i<=currentStepIndex?"text-green-600":"text-gray-400"}>
{step}
</div>
))}

</div>

)}

{/* BUTTONS */}
<div className="grid gap-3">

<Link href={`/orders/${orderId}`} className="bg-black text-white py-2">
View Order
</Link>

<a
href={`https://wa.me/916005955305?text=Track order ${orderId}`}
target="_blank"
className="border py-2"
>
Track on WhatsApp
</a>

<button onClick={downloadInvoice} className="border py-2">
Download Invoice
</button>

</div>

</div>

{/* TOAST */}
{toast && (
<div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded">
{toast}
</div>
)}

</main>

);
}

export default function SuccessPage(){
return(
<Suspense fallback={<div>Loading...</div>}>
<SuccessContent/>
</Suspense>
);
}