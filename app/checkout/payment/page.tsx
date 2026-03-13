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

// );

// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function PaymentPage() {

const router = useRouter();

const [cart,setCart] = useState<any[]>([]);
const [payment,setPayment] = useState("cod");
const [loading,setLoading] = useState(false);

useEffect(()=>{

const loadCart = async()=>{

const res = await fetch("/api/cart");
const data = await res.json();

setCart(data.items || []);

};

loadCart();

},[]);

const subtotal = cart.reduce(
(sum,item)=> sum + item.price * item.quantity,
0
);

const mrpTotal = cart.reduce(
(sum,item)=> sum + (item.oldPrice || item.price) * item.quantity,
0
);

const discount = mrpTotal - subtotal;

const total = subtotal;

const placeOrder = async()=>{

setLoading(true);

const address = JSON.parse(localStorage.getItem("address") || "{}");

await fetch("/api/orders",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
items: cart,
total,
customer: address,
paymentMethod: payment
})
});

router.push("/success");

};

return(

<main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

    <CheckoutSteps step={3} />

{/* STEP BAR */}

<div className="flex justify-center mb-10 text-sm md:text-base font-medium">

<div className="flex items-center gap-3 text-gray-400">
① Address
<span>→</span>
</div>

<div className="flex items-center gap-3 text-gray-400">
② Order Summary
<span>→</span>
</div>

<div className="text-blue-600 font-semibold">
③ Payment
</div>

</div>


<h1 className="text-xl md:text-2xl font-bold mb-6">
Payment
</h1>


<div className="grid md:grid-cols-2 gap-8 md:gap-10">

{/* PAYMENT METHODS */}

<div className="border rounded p-4 md:p-6">

<h2 className="font-semibold mb-4">
Select Payment Method
</h2>

<div className="grid gap-3">

<label className="flex gap-3 border p-3 rounded">

<input
type="radio"
checked={payment==="cod"}
onChange={()=>setPayment("cod")}
/>

Cash on Delivery

</label>

<label className="flex gap-3 border p-3 rounded">

<input
type="radio"
checked={payment==="upi"}
onChange={()=>setPayment("upi")}
/>

UPI

</label>

<label className="flex gap-3 border p-3 rounded">

<input
type="radio"
checked={payment==="card"}
onChange={()=>setPayment("card")}
/>

Credit / Debit Card

</label>

</div>

</div>


{/* PRICE DETAILS */}

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

<button
onClick={placeOrder}
disabled={loading}
className="mt-6 bg-black text-white w-full py-3 rounded"
>

{loading ? "Processing..." : `Pay ₹${total}`}

</button>

</div>

</div>

</main>

);

}