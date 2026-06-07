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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function PaymentPage() {

const router = useRouter();

const [cart, setCart] = useState<any[]>([]);
const [payment, setPayment] = useState("cod");

const [loading, setLoading] = useState(false);
const [showModal, setShowModal] = useState(false);

const [toast, setToast] = useState<string | null>(null);

const [pageLoading,setPageLoading] = useState(true);
const [confirmLoading,setConfirmLoading] = useState(false);

const STORE_UPI = "daraamir369369@okhdfcbank";

/* ================= LOAD ================= */

useEffect(() => {

const user = localStorage.getItem("user");

if (!user) {
router.push("/login");
return;
}

const loadCart = async () => {

const buyNow = localStorage.getItem("buyNow");

if (buyNow) {
setCart([JSON.parse(buyNow)]);
setPageLoading(false);
return;
}

const res = await fetch("/api/cart");
const data = await res.json();

setCart(data.items || []);
setPageLoading(false);

};

loadCart();

}, []);

/* ================= PRICE ================= */

const subtotal = cart.reduce(
(sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
0
);

const mrpTotal = cart.reduce(
(sum, item) => sum + Number(item.mrp || item.price) * Number(item.quantity || 1),
0
);

const discount = mrpTotal - subtotal;

const total = subtotal;

/* ================= TOAST ================= */

const showToast = (msg:string)=>{
setToast(msg);
setTimeout(()=>setToast(null),2000);
};

/* ================= UPI ================= */

const handleUPIPayment = () => {

const link = `upi://pay?pa=${STORE_UPI}&pn=05Mart&am=${total}&cu=INR`;

window.location.href = link;

setTimeout(()=>{
showToast("If UPI didn't open, use QR");
},1200);

};

const copyUPI = async () => {
await navigator.clipboard.writeText(STORE_UPI);
showToast("UPI Copied");
};

/* ================= RAZORPAY ================= */

useEffect(() => {
if ((window as any).Razorpay) return;
const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
document.body.appendChild(script);
}, []);

const payWithRazorpay = async () => {

const res = await fetch("/api/razorpay/order", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ amount: total })
});

const data = await res.json();

const rzp = new (window as any).Razorpay({
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
amount: data.amount,
currency: "INR",
order_id: data.id,
handler: async () => placeOrder("paid")
});

rzp.open();

};

/* ================= CONFIRM ================= */

const confirmOrder = ()=>{
setShowModal(true);
};

const proceedPayment = ()=>{

setConfirmLoading(true);

setTimeout(()=>{

setShowModal(false);

if (payment === "cod") return placeOrder();
if (payment === "upi") return handleUPIPayment();
if (payment === "razorpay") return payWithRazorpay();

},800);

};

/* ================= ORDER ================= */

const placeOrder = async (statusParam = "pending") => {

if (loading) return;

setLoading(true);

try {

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

const address = JSON.parse(localStorage.getItem("selectedAddress") || "{}");

const res = await fetch("/api/orders", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
items: cart,
total,
customer: address,
paymentMethod: payment,
userId: user?._id || "guest",
status: statusParam
})
});

const order = await res.json();

if (!res.ok) {
alert(order?.error || "Order failed");
setLoading(false);
return;
}

router.push(`/success?orderId=${order._id}`);

} catch (err) {
console.log(err);
alert("Something went wrong");
}

setLoading(false);

};

/* ================= SKELETON ================= */

if(pageLoading){
return(
<main className="max-w-7xl mx-auto px-4 py-8">

<CheckoutSteps step={3} />

<div className="h-6 w-40 bg-gray-200 rounded shimmer mb-6"></div>

<div className="grid md:grid-cols-2 gap-6">

{[1,2].map(i=>(
<div key={i} className="p-6 border rounded-xl space-y-3">

<div className="h-4 w-32 bg-gray-200 shimmer rounded"></div>
<div className="h-3 w-24 bg-gray-200 shimmer rounded"></div>
<div className="h-3 w-48 bg-gray-200 shimmer rounded"></div>

</div>
))}

</div>

</main>
);
}

/* ================= UI ================= */

return (

<main className="max-w-7xl mx-auto px-4 py-8">

<div className="fixed top-20 left-0 w-full z-[999] bg-white/90 backdrop-blur-md border-b shadow-sm">
  <CheckoutSteps step={3} />
</div>

<div className="h-[80px]" /> {/* spacing */}

<h1 className="text-2xl font-bold mb-6">Complete Payment</h1>

<div className="grid md:grid-cols-2 gap-6">

{/* LEFT */}
<div className="space-y-4">

<div className="shadow-md rounded-xl p-4 space-y-3 bg-white">

{["cod","razorpay","upi"].map(type=>(
<label key={type}
className={`flex gap-3 p-3 rounded-lg cursor-pointer transition ${
payment===type?"border-2 border-black":"border"
}`}>
<input type="radio"
checked={payment===type}
onChange={()=>setPayment(type)}
/>
{type==="cod"?"Cash on Delivery":
type==="razorpay"?"Online Payment":
"UPI Payment"}
</label>
))}

</div>

{payment==="upi" && (
<div className="shadow-md rounded-xl p-4 bg-gray-50">

<img src="/upi-qr.png" className="w-40 mx-auto mb-3" />

<button onClick={handleUPIPayment}
className="bg-green-600 text-white w-full py-2 rounded-lg">
Open UPI
</button>

<button onClick={copyUPI}
className="border w-full py-2 rounded-lg mt-2">
Copy UPI
</button>

</div>
)}

</div>

{/* RIGHT */}
<div className="shadow-md rounded-xl p-5 bg-white sticky top-20">

<h2 className="font-semibold mb-4">Price Details</h2>

<div className="flex justify-between mb-2">
<span>MRP</span>
<span className="line-through text-gray-400">₹{mrpTotal}</span>
</div>

<div className="flex justify-between text-green-600 mb-2">
<span>Discount</span>
<span>-₹{discount}</span>
</div>

<hr className="my-3"/>

<div className="flex justify-between font-bold text-lg">
<span>Total</span>
<span>₹{total}</span>
</div>

{/* BUTTON */}

<button
onClick={confirmOrder}
disabled={loading}
className={`w-full mt-4 py-3 rounded-xl text-white flex justify-center items-center gap-2 transition
${loading ? "bg-gray-400" : "bg-black hover:scale-[1.02] active:scale-95"}
`}
>

{loading ? (
<>
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
Placing Order...
</>
) : payment==="cod"?"Place Order":`Pay ₹${total}`}

</button>

</div>

</div>

{/* MODAL */}

{showModal && (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[90%] max-w-md animate-scaleIn">

<h2 className="font-bold mb-2">Confirm Payment</h2>

<p className="text-gray-500 mb-4">
Pay ₹{total} via {payment.toUpperCase()}
</p>

<div className="flex gap-3">

<button
onClick={()=>setShowModal(false)}
className="border w-full py-2 rounded">
Cancel
</button>

<button
onClick={proceedPayment}
className="bg-black text-white w-full py-2 rounded flex justify-center items-center gap-2"
>

{confirmLoading ? (
<>
<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
Processing
</>
) : "Confirm"}

</button>

</div>

</div>

</div>
)}

{/* TOAST */}

{toast && (
<div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
{toast}
</div>
)}

<style jsx global>{`
.shimmer{
position:relative;
overflow:hidden;
}
.shimmer::after{
content:"";
position:absolute;
top:0;
left:-100%;
width:100%;
height:100%;
background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);
animation:shimmer 1.2s infinite;
}
@keyframes shimmer{100%{left:100%;}}
@keyframes scaleIn{
from{transform:scale(0.9);opacity:0}
to{transform:scale(1);opacity:1}
}
.animate-scaleIn{
animation:scaleIn 0.25s ease;
}
`}</style>

</main>

);
}