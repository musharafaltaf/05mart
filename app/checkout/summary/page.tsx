"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function SummaryPage() {

const router = useRouter();

const [cart,setCart] = useState<any[]>([]);
const [address,setAddress] = useState<any>(null);

const [pageLoading,setPageLoading] = useState(true);
const [continueLoading,setContinueLoading] = useState(false);

/* ================= LOAD ================= */

useEffect(()=>{

const user = localStorage.getItem("user");

if(!user){
router.push("/login?redirect=/checkout/summary");
return;
}

const storedCart = localStorage.getItem("cart");
const buyNow = localStorage.getItem("buyNow");

if(buyNow){
setCart([JSON.parse(buyNow)]);
}else if(storedCart){
setCart(JSON.parse(storedCart));
}

const savedAddress = localStorage.getItem("selectedAddress");

if(savedAddress){
setAddress(JSON.parse(savedAddress));
}

setTimeout(()=>setPageLoading(false),600); // smooth skeleton

},[]);

/* ================= CALCULATIONS ================= */

const safeCart = cart.map(item => ({
price: Number(item.price) || 0,
mrp: Number(item.oldPrice || item.mrp || item.price) || 0,
quantity: Number(item.quantity || item.qty) || 1
}));

const subtotal = safeCart.reduce(
(sum,item)=> sum + item.price * item.quantity,
0
);

const mrpTotal = safeCart.reduce(
(sum,item)=> sum + item.mrp * item.quantity,
0
);

const discount = mrpTotal > subtotal ? (mrpTotal - subtotal) : 0;

const discountPercent =
mrpTotal > 0
? Math.round((discount / mrpTotal) * 100)
: 0;

const total = subtotal;

/* ================= DELIVERY ================= */

const getDeliveryDate = ()=>{
const date = new Date();
date.setDate(date.getDate()+4);
return date.toDateString();
};

/* ================= CONTINUE ================= */

const handleContinue = ()=>{

if(!address){
return alert("Select address first");
}

setContinueLoading(true);

setTimeout(()=>{
router.push("/checkout/payment");
},800);
};

/* ================= SKELETON ================= */

if(pageLoading){
return(
<main className="max-w-7xl mx-auto px-4 py-8">

<CheckoutSteps step={2} />

<div className="h-6 w-40 bg-gray-200 rounded shimmer mb-6"></div>

<div className="grid md:grid-cols-2 gap-8">

{[1,2].map(i=>(
<div key={i} className="border rounded-xl p-6 space-y-3">

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

return(

<main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

<div className="sticky top-0 z-[999] bg-white">

<div className="fixed top-20 left-0 w-full z-[999] bg-white/90 backdrop-blur-md border-b shadow-sm">
  <CheckoutSteps step={2} />
</div>

<div className="h-[80px]" /> {/* spacing */}

</div>


<h1 className="text-xl md:text-2xl font-bold mb-6">
Order Summary
</h1>

<div className="grid md:grid-cols-2 gap-8 md:gap-10">

{/* LEFT */}

<div>

{/* ADDRESS */}

<div className="border rounded-xl p-5 mb-6 shadow-sm">

<h2 className="font-semibold mb-3">Deliver To</h2>

{address && (
<div className="text-sm leading-relaxed">
<p className="font-medium">{address.name}</p>
<p>{address.house}, {address.area}</p>
<p>{address.city}, {address.state}</p>
<p>{address.pincode}</p>
<p className="mt-1">📞 {address.phone}</p>
</div>
)}

<p className="text-xs text-gray-400 mt-2">
📵 Ensure address is correct for smooth delivery
</p>

<button
onClick={()=>router.push("/checkout/address")}
className="text-blue-600 mt-3 text-sm hover:underline"
>
Change Address
</button>

</div>

{/* PRODUCTS */}

{cart.map((item:any,index:number)=>(

<div key={index} className="flex gap-4 border-b py-4">

<img
src={item.image}
className="w-20 h-20 object-cover rounded-lg"
/>

<div className="flex-1">

<p className="font-medium">{item.name}</p>

<p className="text-sm text-gray-500">
Qty: {item.quantity}
</p>

<p className="text-green-600 text-sm">
Delivery by {getDeliveryDate()}
</p>

<p className="text-gray-400 text-xs mt-1">
2 Day Return • ₹70 pickup fee
</p>

</div>

<div className="text-right">

<p className="font-semibold">
₹{(Number(item.price)||0) * (Number(item.quantity || item.qty)||1)}
</p>

{item.oldPrice && (
<p className="text-gray-400 line-through text-sm">
₹{item.oldPrice}
</p>
)}

</div>

</div>

))}

</div>

{/* RIGHT */}

<div className="border rounded-xl p-6 h-fit shadow-sm sticky top-20">

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
<p>Delivery</p>
<p className="text-green-600">FREE</p>
</div>

<hr className="my-4"/>

<div className="flex justify-between font-bold text-lg">
<p>Total</p>
<p>₹{total}</p>
</div>

<p className="text-green-600 text-sm mt-2">
You saved ₹{discount} ({discountPercent}% OFF)
</p>

{/* BUTTON */}

<button
onClick={handleContinue}
disabled={continueLoading}
className={`mt-6 w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition
${continueLoading 
? "bg-gray-400"
: "bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 hover:scale-[1.02] active:scale-95 shadow-lg"
}
`}
>

{continueLoading ? (
<>
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
Processing...
</>
) : "Continue to Payment"}

</button>

</div>

</div>

{/* SHIMMER */}

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
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.6),
transparent
);
animation:shimmer 1.2s infinite;
}

@keyframes shimmer{
100%{left:100%;}
}
`}</style>

</main>

);
}