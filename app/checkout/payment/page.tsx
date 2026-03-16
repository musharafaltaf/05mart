// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function PaymentPage() {

// const router = useRouter();

// const [cart,setCart] = useState<any[]>([]);
// const [payment,setPayment] = useState("cod");
// const [loading,setLoading] = useState(false);

// useEffect(()=>{

// const loadCart = async()=>{

// const res = await fetch("/api/cart");
// const data = await res.json();

// setCart(data.items || []);

// };

// loadCart();

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

// const total = subtotal;

// const placeOrder = async()=>{

// setLoading(true);

// const address = JSON.parse(localStorage.getItem("address") || "{}");

// await fetch("/api/orders",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body: JSON.stringify({
// items: cart,
// total,
// customer: address,
// paymentMethod: payment
// })
// });

// router.push("/success");

// };

// return(

// <main className="max-w-6xl mx-auto p-10">

// <h1 className="text-2xl font-bold mb-8">
// Payment
// </h1>

// <div className="grid md:grid-cols-2 gap-10">

// {/* PAYMENT METHODS */}

// <div className="border rounded p-6">

// <h2 className="font-semibold mb-4">
// Select Payment Method
// </h2>

// <div className="grid gap-3">

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="cod"}
// onChange={()=>setPayment("cod")}
// />

// Cash on Delivery

// </label>

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="upi"}
// onChange={()=>setPayment("upi")}
// />

// UPI

// </label>

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="card"}
// onChange={()=>setPayment("card")}
// />

// Credit / Debit Card

// </label>

// </div>

// </div>

// {/* PRICE SUMMARY */}

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

// <button
// onClick={placeOrder}
// disabled={loading}
// className="mt-6 bg-black text-white w-full py-3 rounded"
// >

// {loading ? "Processing..." : `Pay ₹${total}`}

// </button>

// </div>

// </div>

// </main>

// // 
// 










// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import CheckoutSteps from "@/components/CheckoutSteps";

// export default function PaymentPage() {

// const router = useRouter();

// const [cart,setCart] = useState<any[]>([]);
// const [payment,setPayment] = useState("cod");
// const [loading,setLoading] = useState(false);

// const [showConfirm,setShowConfirm] = useState(false);

// /* PAYMENT DATA */

// const [upiId,setUpiId] = useState("");
// const [upiConfirmed,setUpiConfirmed] = useState(false);

// const [cardNumber,setCardNumber] = useState("");
// const [cardName,setCardName] = useState("");
// const [cardExpiry,setCardExpiry] = useState("");
// const [cardCvv,setCardCvv] = useState("");
// const [cardConfirmed,setCardConfirmed] = useState(false);

// /* LOAD CART */

// useEffect(()=>{

// const user = localStorage.getItem("user");

// if(!user){
// router.push("/login");
// return;
// }

// const loadCart = async()=>{

// const buyNow = localStorage.getItem("buyNow");

// if(buyNow){
// setCart([JSON.parse(buyNow)]);
// return;
// }

// try{

// const res = await fetch("/api/cart");
// const data = await res.json();

// setCart(data.items || []);

// }catch(err){
// console.log(err);
// }

// };

// loadCart();

// },[]);

// /* PRICE CALCULATIONS */

// const subtotal = cart.reduce(
// (sum,item)=> sum + item.price * item.quantity,
// 0
// );

// const mrpTotal = cart.reduce(
// (sum,item)=> sum + (item.mrp || item.price) * item.quantity,
// 0
// );

// const discount = mrpTotal - subtotal;

// const total = subtotal;

// /* PLACE ORDER */

// const placeOrder = async()=>{

// if(cart.length===0){
// alert("Cart is empty");
// return;
// }

// setLoading(true);

// const address = JSON.parse(localStorage.getItem("address") || "{}");

// try{

// const res = await fetch("/api/orders",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// items:cart,
// total,
// customer:address,
// paymentMethod:payment
// })
// });

// const order = await res.json();

// localStorage.removeItem("buyNow");

// router.push(`/success?orderId=${order._id}`);

// }catch(err){
// console.log(err);
// alert("Order failed");
// }

// setLoading(false);

// };

// /* CONFIRM UPI */

// const confirmUPI = ()=>{

// if(!upiId){
// alert("Enter UPI ID");
// return;
// }

// setUpiConfirmed(true);

// };

// /* CONFIRM CARD */

// const confirmCard = ()=>{

// if(!cardNumber || !cardName || !cardExpiry || !cardCvv){
// alert("Enter all card details");
// return;
// }

// setCardConfirmed(true);

// };

// return(

// <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

// <CheckoutSteps step={3} />

// <h1 className="text-xl md:text-2xl font-bold mb-6">
// Payment
// </h1>

// <div className="grid md:grid-cols-2 gap-8 md:gap-10">

// {/* PAYMENT METHODS */}

// <div className="border rounded p-4 md:p-6">

// <h2 className="font-semibold mb-4">
// Select Payment Method
// </h2>

// <div className="grid gap-4">

// {/* COD */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="cod"}
// onChange={()=>setPayment("cod")}
// />

// Cash on Delivery

// </label>

// {payment==="cod" && (

// <div className="ml-6">

// <p className="text-sm text-gray-500 mb-3">
// Pay when the product arrives.
// </p>

// <button
// onClick={()=>setShowConfirm(true)}
// className="bg-black text-white px-6 py-2 rounded"
// >
// Place Order
// </button>

// </div>

// )}

// {/* UPI */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="upi"}
// onChange={()=>{
// setPayment("upi");
// setUpiConfirmed(false);
// }}
// />

// UPI

// </label>

// {payment==="upi" && (

// <div className="ml-6 grid gap-3">

// <input
// placeholder="Enter UPI ID"
// className="border p-2 rounded"
// value={upiId}
// onChange={(e)=>setUpiId(e.target.value)}
// />

// <button
// onClick={confirmUPI}
// className="border px-4 py-2 rounded"
// >
// Confirm UPI
// </button>

// {upiConfirmed && (

// <button
// onClick={()=>setShowConfirm(true)}
// className="bg-black text-white px-6 py-2 rounded"
// >
// Pay ₹{total}
// </button>

// )}

// </div>

// )}

// {/* CARD */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="card"}
// onChange={()=>{
// setPayment("card");
// setCardConfirmed(false);
// }}
// />

// Credit / Debit Card

// </label>

// {payment==="card" && (

// <div className="ml-6 grid gap-3">

// <input
// placeholder="Card Number"
// className="border p-2 rounded"
// value={cardNumber}
// onChange={(e)=>setCardNumber(e.target.value)}
// />

// <input
// placeholder="Card Holder Name"
// className="border p-2 rounded"
// value={cardName}
// onChange={(e)=>setCardName(e.target.value)}
// />

// <div className="flex gap-2">

// <input
// placeholder="MM/YY"
// className="border p-2 rounded w-full"
// value={cardExpiry}
// onChange={(e)=>setCardExpiry(e.target.value)}
// />

// <input
// placeholder="CVV"
// className="border p-2 rounded w-full"
// value={cardCvv}
// onChange={(e)=>setCardCvv(e.target.value)}
// />

// </div>

// <button
// onClick={confirmCard}
// className="border px-4 py-2 rounded"
// >
// Confirm Card
// </button>

// {cardConfirmed && (

// <button
// onClick={()=>setShowConfirm(true)}
// className="bg-black text-white px-6 py-2 rounded"
// >
// Pay ₹{total}
// </button>

// )}

// </div>

// )}

// </div>

// </div>

// {/* PRICE DETAILS */}

// <div className="border rounded p-4 md:p-6 h-fit">

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

// </div>

// </div>

// {/* CONFIRM ORDER POPUP */}

// {showConfirm && (

// <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

// <div className="bg-white p-6 rounded-lg w-[320px] text-center">

// <h3 className="text-lg font-semibold mb-4">
// Confirm Order
// </h3>

// <p className="text-gray-600 mb-6">
// Are you sure you want to place this order?
// </p>

// <div className="flex gap-3 justify-center">

// <button
// onClick={()=>setShowConfirm(false)}
// className="border px-4 py-2 rounded"
// >
// Cancel
// </button>

// <button
// onClick={()=>{
// setShowConfirm(false);
// placeOrder();
// }}
// className="bg-black text-white px-4 py-2 rounded"
// >
// Yes, Continue
// </button>

// </div>

// </div>

// </div>

// )}

// </main>

// );

// }




// "use client";

// import { useEffect,useState } from "react";
// import { useRouter } from "next/navigation";
// import CheckoutSteps from "@/components/CheckoutSteps";

// export default function PaymentPage(){

// const router = useRouter();

// const [cart,setCart] = useState<any[]>([]);
// const [payment,setPayment] = useState("cod");

// const [loading,setLoading] = useState(false);
// const [processing,setProcessing] = useState(false);

// const [showConfirm,setShowConfirm] = useState(false);

// /* UPI */

// const [upiId,setUpiId] = useState("");
// const [upiApp,setUpiApp] = useState("");

// /* CARD */

// const [cardNumber,setCardNumber] = useState("");
// const [cardName,setCardName] = useState("");
// const [cardExpiry,setCardExpiry] = useState("");
// const [cardCvv,setCardCvv] = useState("");

// /* PAYMENT PROOF */

// const [paymentProof,setPaymentProof] = useState("");


// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="razorpay"}
// onChange={()=>setPayment("razorpay")}
// />

// Razorpay (UPI / Card / NetBanking)

// </label>

// const confirmOrder = ()=>{

// if(payment==="razorpay"){
// payWithRazorpay()
// return
// }

// setShowConfirm(true)

// }
// /* LOAD CART */

// useEffect(()=>{

// const script = document.createElement("script");
// script.src = "https://checkout.razorpay.com/v1/checkout.js";
// script.async = true;

// document.body.appendChild(script);

// },[])

// useEffect(()=>{

// const user = localStorage.getItem("user");

// if(!user){
// router.push("/login");
// return;
// }

// const loadCart = async()=>{

// const buyNow = localStorage.getItem("buyNow");

// if(buyNow){
// setCart([JSON.parse(buyNow)]);
// return;
// }

// try{

// const res = await fetch("/api/cart");
// const data = await res.json();

// setCart(data.items || []);

// }catch(err){
// console.log(err);
// }

// };

// loadCart();

// },[]);


// const payWithRazorpay = async () => {

// try{

// const res = await fetch("/api/razorpay/order",{
// method:"POST",
// headers:{ "Content-Type":"application/json" },
// body: JSON.stringify({ amount: total })
// })

// const data = await res.json()

// const options = {

// key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

// amount: data.amount,

// currency: "INR",

// name: "05Mart",

// description: "Order Payment",

// order_id: data.id,

// handler: async function(response){

// await placeOrder()

// },

// theme: {
// color: "#000"
// }

// }

// const rzp = new window.Razorpay(options)

// rzp.open()

// }catch(err){

// console.log(err)

// }

// }

// /* PRICE */

// const subtotal = cart.reduce(
// (sum,item)=> sum + item.price * item.quantity,
// 0
// );

// const mrpTotal = cart.reduce(
// (sum,item)=> sum + (item.mrp || item.price) * item.quantity,
// 0
// );

// const discount = mrpTotal - subtotal;

// const total = subtotal;

// /* VALIDATIONS */

// const validateUPI = ()=>{

// const upiRegex = /^[\w.-]+@[\w.-]+$/;

// if(!upiApp && !upiId){
// alert("Select UPI app or enter UPI ID");
// return false;
// }

// if(upiId && !upiRegex.test(upiId)){
// alert("Enter valid UPI ID");
// return false;
// }

// return true;

// };

// const validateCard = ()=>{

// if(cardNumber.length !== 16){
// alert("Enter valid 16 digit card number");
// return false;
// }

// if(!cardName){
// alert("Enter card holder name");
// return false;
// }

// if(!cardExpiry){
// alert("Enter expiry date");
// return false;
// }

// if(cardCvv.length !== 3){
// alert("Enter valid CVV");
// return false;
// }

// return true;

// };

// /* UPLOAD PROOF */

// const uploadProof = async(file:any)=>{

// const formData = new FormData();
// formData.append("file",file);

// const res = await fetch("/api/upload",{
// method:"POST",
// body:formData
// });

// const data = await res.json();

// setPaymentProof(data.url);

// };

// /* CONFIRM ORDER */

// const confirmOrder = ()=>{

// if(cart.length===0){
// alert("Cart is empty");
// return;
// }

// if(payment==="upi" && !validateUPI()) return;
// if(payment==="card" && !validateCard()) return;

// setShowConfirm(true);

// };

// /* PLACE ORDER */

// const placeOrder = async()=>{

// if(loading) return;

// setShowConfirm(false);
// setLoading(true);

// const address = JSON.parse(localStorage.getItem("address") || "{}");

// try{

// const res = await fetch("/api/orders",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// items:cart,
// total,
// customer:address,
// paymentMethod:payment,
// paymentProof: payment==="cod" ? null : paymentProof
// })
// });

// if(!res.ok){
// throw new Error("Order failed");
// }

// const order = await res.json();

// localStorage.removeItem("buyNow");

// /* COD → SUCCESS PAGE */

// if(payment==="cod"){
// router.push(`/success?orderId=${order._id}`);
// return;
// }

// /* ONLINE PAYMENT PROCESS */

// setProcessing(true);

// setTimeout(()=>{

// router.push(`/success/${order._id}`);

// },2000);

// }catch(err){

// console.log(err);
// alert("Payment failed");

// }

// setLoading(false);

// };
// /* PROCESSING SCREEN */

// if(processing){

// return(

// <main className="flex items-center justify-center h-screen">

// <div className="text-center">

// <h2 className="text-xl font-semibold mb-4">
// Processing Payment...
// </h2>

// <p className="text-gray-500">
// Please wait while we confirm your payment
// </p>

// </div>

// </main>

// );

// }

// return(

// <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

// <CheckoutSteps step={3} />

// <div className="flex items-center gap-2 mb-6 text-green-600 text-sm">
// <span>🔒</span>
// <span>Secure Payment • 256-bit SSL encrypted</span>
// </div>

// <h1 className="text-xl md:text-2xl font-bold mb-6">
// Payment
// </h1>

// <div className="grid md:grid-cols-2 gap-8 md:gap-10">

// {/* PAYMENT METHODS */}

// <div className="border rounded p-4 md:p-6">

// <h2 className="font-semibold mb-4">
// Select Payment Method
// </h2>

// <div className="grid gap-4">

// {/* COD */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="cod"}
// onChange={()=>setPayment("cod")}
// />

// Cash on Delivery

// </label>

// {payment==="cod" && (
// <p className="text-sm text-gray-500 ml-6">
// Pay when the product arrives
// </p>
// )}

// {/* UPI */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="upi"}
// onChange={()=>setPayment("upi")}
// />

// UPI

// </label>

// {payment==="upi" && (

// <div className="ml-6">

// <p className="text-sm font-medium mb-2">
// Choose UPI App
// </p>

// <div className="flex gap-3 mb-4 flex-wrap">

// <button
// onClick={()=>setUpiApp("gpay")}
// className={`border px-4 py-2 rounded ${upiApp==="gpay"?"bg-black text-white":""}`}
// >
// Google Pay
// </button>

// <button
// onClick={()=>setUpiApp("paytm")}
// className={`border px-4 py-2 rounded ${upiApp==="paytm"?"bg-black text-white":""}`}
// >
// Paytm
// </button>

// <button
// onClick={()=>setUpiApp("phonepe")}
// className={`border px-4 py-2 rounded ${upiApp==="phonepe"?"bg-black text-white":""}`}
// >
// PhonePe
// </button>

// </div>

// <input
// placeholder="username@upi"
// className="border p-2 rounded w-full mb-3"
// value={upiId}
// onChange={(e)=>setUpiId(e.target.value)}
// />

// <input
// type="file"
// onChange={(e:any)=>{
// const file = e.target.files?.[0];
// if(file) uploadProof(file);
// }}
// className="border p-2 rounded w-full"
// />

// </div>

// )}

// {/* CARD */}

// <label className="flex gap-3 border p-3 rounded">

// <input
// type="radio"
// checked={payment==="card"}
// onChange={()=>setPayment("card")}
// />

// Credit / Debit Card

// </label>

// {payment==="card" && (

// <div className="ml-6 grid gap-3">

// <input
// placeholder="Card Number"
// maxLength={16}
// className="border p-2 rounded"
// value={cardNumber}
// onChange={(e)=>setCardNumber(e.target.value.replace(/\D/g,''))}
// />

// <input
// placeholder="Card Holder Name"
// className="border p-2 rounded"
// value={cardName}
// onChange={(e)=>setCardName(e.target.value)}
// />

// <div className="flex gap-2">

// <input
// placeholder="MM/YY"
// className="border p-2 rounded w-full"
// value={cardExpiry}
// onChange={(e)=>setCardExpiry(e.target.value)}
// />

// <input
// placeholder="CVV"
// type="password"
// maxLength={3}
// className="border p-2 rounded w-full"
// value={cardCvv}
// onChange={(e)=>setCardCvv(e.target.value.replace(/\D/g,''))}
// />

// </div>

// </div>

// )}

// </div>

// </div>

// {/* PRICE DETAILS */}

// <div className="border rounded p-4 md:p-6 h-fit">

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

// <button
// onClick={confirmOrder}
// disabled={loading}
// className="mt-6 bg-black text-white w-full py-3 rounded"
// >
// {payment==="cod" ? "Place Order" : `Pay ₹${total}`}
// </button>

// </div>

// </div>

// {/* CONFIRMATION MODAL */}

// {showConfirm && (

// <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

// <div className="bg-white p-6 rounded-lg w-[320px] text-center">

// <h3 className="font-semibold mb-3">
// Confirm {payment==="cod" ? "Order" : "Payment"}
// </h3>

// <p className="text-sm text-gray-500 mb-4">
// {payment==="cod"
// ? "Are you sure you want to place this order?"
// : `Are you sure you want to pay ₹${total}?`
// }
// </p>

// <div className="flex gap-3">

// <button
// onClick={()=>setShowConfirm(false)}
// className="flex-1 border py-2 rounded"
// >
// Cancel
// </button>

// <button
// onClick={placeOrder}
// className="flex-1 bg-black text-white py-2 rounded"
// >
// Confirm
// </button>


// </div>

// </div>

// </div>

// )}

// </main>

// );

// }


"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function PaymentPage(){

const router = useRouter();

const [cart,setCart] = useState<any[]>([]);
const [payment,setPayment] = useState("cod");

const [loading,setLoading] = useState(false);
const [processing,setProcessing] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);

/* UPI */

const [upiId,setUpiId] = useState("");
const [upiApp,setUpiApp] = useState("");

/* CARD */

const [cardNumber,setCardNumber] = useState("");
const [cardName,setCardName] = useState("");
const [cardExpiry,setCardExpiry] = useState("");
const [cardCvv,setCardCvv] = useState("");

/* PAYMENT PROOF */

const [paymentProof,setPaymentProof] = useState("");

/* STORE MANUAL PAYMENT DETAILS (NEW FEATURE) */

const STORE_UPI = "05mart@upi";

/* LOAD RAZORPAY SCRIPT */

useEffect(()=>{

if((window as any).Razorpay) return;

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.async = true;

document.body.appendChild(script);

},[])

/* LOAD CART */

useEffect(()=>{

const user = localStorage.getItem("user");

if(!user){
router.push("/login");
return;
}

const loadCart = async()=>{

const buyNow = localStorage.getItem("buyNow");

if(buyNow){
setCart([JSON.parse(buyNow)]);
return;
}

try{

const res = await fetch("/api/cart");
const data = await res.json();

setCart(data.items || []);

}catch(err){
console.log(err);
}

};

loadCart();

},[]);

/* PRICE */

const subtotal = cart.reduce(
(sum,item)=> sum + Number(item.price) * Number(item.quantity || item.qty || 1),
0
);

const mrpTotal = cart.reduce(
(sum,item)=> sum + Number(item.mrp || item.price) * Number(item.quantity || item.qty || 1),
0
);

const discount = mrpTotal - subtotal;

const total = subtotal;

/* RAZORPAY */

const payWithRazorpay = async () => {

if(total <= 0){
alert("Invalid payment amount");
return;
}

try{

const res = await fetch("/api/razorpay/order",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ amount: total })
})

const data = await res.json()

const user = JSON.parse(localStorage.getItem("user") || "{}")
const address = JSON.parse(localStorage.getItem("address") || "{}")

const options = {

key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

amount: data.amount,

currency: "INR",

name: "05Mart",

description: "Secure Payment",

image: "/logo.png",

order_id: data.id,

prefill: {

name: address?.name || user?.name || "Customer",
email: user?.email || "customer@email.com",
contact: address?.phone || "9999999999"

},

notes: {

address: address?.city || "India",
store: "05Mart"

},

theme: {
color: "#000"
},

modal:{
ondismiss:function(){
console.log("Payment popup closed")
}
},

handler: async function(){

await placeOrder()

}

}

const rzp = new (window as any).Razorpay(options)

rzp.open()

}catch(err){

console.log(err)

}

}

/* VALIDATIONS */

const validateUPI = ()=>{

const upiRegex = /^[\w.-]+@[\w.-]+$/;

if(!upiApp && !upiId){
alert("Select UPI app or enter UPI ID");
return false;
}

if(upiId && !upiRegex.test(upiId)){
alert("Enter valid UPI ID");
return false;
}

return true;

};

const validateCard = ()=>{

if(cardNumber.length !== 16){
alert("Enter valid 16 digit card number");
return false;
}

if(!cardName){
alert("Enter card holder name");
return false;
}

if(!cardExpiry){
alert("Enter expiry date");
return false;
}

if(cardCvv.length !== 3){
alert("Enter valid CVV");
return false;
}

return true;

};

/* UPLOAD PROOF */

const uploadProof = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{
method:"POST",
body:formData
});

const data = await res.json();

setPaymentProof(data.url);

};

/* CONFIRM ORDER */

const confirmOrder = ()=>{

if(cart.length===0){
alert("Cart is empty");
return;
}

if(total <= 0){
alert("Invalid order amount");
return;
}

/* NEW: Require screenshot for manual payment */

if(payment==="upi" && !paymentProof){
alert("Please upload payment screenshot");
return;
}

if(payment==="upi" && !validateUPI()) return;
if(payment==="card" && !validateCard()) return;

if(payment==="razorpay"){
payWithRazorpay()
return
}

setShowConfirm(true);

};

/* PLACE ORDER */

const placeOrder = async()=>{

if(loading) return;

setShowConfirm(false);
setLoading(true);

const address = JSON.parse(localStorage.getItem("address") || "{}");

if(!address || !address.name){
alert("Address missing. Please enter address first.");
router.push("/checkout/address");
return;
}

try{

const res = await fetch("/api/orders",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
items:cart,
total,
customer:address,
paymentMethod:payment,
paymentProof: payment==="cod" ? null : paymentProof
})
});

if(!res.ok){
throw new Error("Order failed");
}

const order = await res.json();

localStorage.removeItem("buyNow");

if(payment==="cod" && order?._id){
router.push(`/success?orderId=${order._id}`);
return;
}

setProcessing(true);

setTimeout(()=>{
router.push(`/success?orderId=${order._id}`);
},2000);

}catch(err){

console.log(err);
alert("Payment failed");

}

setLoading(false);

};

/* PROCESSING SCREEN */

if(processing){

return(

<main className="flex items-center justify-center h-screen">

<div className="text-center">

<h2 className="text-xl font-semibold mb-4">
Processing Payment...
</h2>

<p className="text-gray-500">
Please wait while we confirm your payment
</p>

</div>

</main>

);

}

return(

<main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 md:py-12">

<CheckoutSteps step={3} />

<div className="flex items-center gap-2 mb-6 text-green-600 text-sm">
<span>🔒</span>
<span>Secure Payment • 256-bit SSL encrypted</span>
</div>

<h1 className="text-xl md:text-2xl font-bold mb-6">
Payment
</h1>

<div className="grid md:grid-cols-2 gap-6 md:gap-10">

{/* PAYMENT METHODS */}

<div className="border rounded p-4 sm:p-5 md:p-6">

<h2 className="font-semibold mb-4">
Select Payment Method
</h2>

<div className="grid gap-4">

<label className={`flex gap-3 border p-3 rounded cursor-pointer ${payment==="cod"?"border-black":""}`}>
<input type="radio" checked={payment==="cod"} onChange={()=>setPayment("cod")} />
Cash on Delivery
</label>

<label className={`flex gap-3 border p-3 rounded cursor-pointer ${payment==="razorpay"?"border-black":""}`}>
<input type="radio" checked={payment==="razorpay"} onChange={()=>setPayment("razorpay")} />
Razorpay (UPI / Card / NetBanking)
</label>

<label className={`flex gap-3 border p-3 rounded cursor-pointer ${payment==="upi"?"border-black":""}`}>
<input type="radio" checked={payment==="upi"} onChange={()=>setPayment("upi")} />
Manual UPI Payment
</label>

{/* NEW MANUAL PAYMENT UI */}

{payment==="upi" && (
<div className="border p-4 rounded mt-3 bg-gray-50">

<p className="font-semibold mb-2">
Pay using UPI
</p>

<p className="text-sm">
UPI ID : <b>{STORE_UPI}</b>
</p>

<img
src="/upi-qr.png"
className="w-40 mt-3 border rounded"
/>

<p className="text-xs text-gray-500 mt-2">
Scan QR → Pay → Upload Screenshot
</p>

<input
type="file"
onChange={(e:any)=>{
const file = e.target.files?.[0];
if(file) uploadProof(file);
}}
className="border p-2 rounded w-full mt-3"
/>

</div>
)}

</div>

</div>

{/* PRICE DETAILS */}

<div className="border rounded p-4 sm:p-5 md:p-6 h-fit">

<h2 className="font-semibold mb-6">Price Details</h2>

<div className="flex justify-between mb-3">
<p>MRP</p>
<p>₹{mrpTotal}</p>
</div>

<div className="flex justify-between mb-3">
<p>Discount</p>
<p className="text-green-600">- ₹{discount}</p>
</div>

<hr className="my-4"/>

<div className="flex justify-between font-bold text-lg">
<p>Total Amount</p>
<p>₹{total}</p>
</div>

<button
onClick={confirmOrder}
disabled={loading}
className="mt-6 bg-black text-white w-full py-3 rounded"
>
{loading ? "Processing..." : payment==="cod" ? "Place Order" : `Pay ₹${total}`}
</button>

</div>

</div>

</main>

);

}