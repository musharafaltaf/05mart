"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {

const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
const router = useRouter();

/* FIX NaN ISSUE */

const subtotal = cart.reduce(
(sum:any,item:any)=> sum + Number(item.price) * Number(item.qty),
0
);

const handleCheckout = () => {

const user = localStorage.getItem("user");

if(!user){
router.push("/login?redirect=/checkout/address");
return;
}

router.push("/checkout/address");

};

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-3xl font-bold mb-8">
Your Cart
</h1>

{cart.length === 0 && (
<div className="text-center py-20">

<p className="text-gray-500 mb-6">
Your cart is empty
</p>

<button
onClick={()=>router.push("/")}
className="bg-black text-white px-6 py-3 rounded"
>
Continue Shopping
</button>

</div>
)}

{cart.length > 0 && (

<div className="grid md:grid-cols-3 gap-10">

{/* CART ITEMS */}

<div className="md:col-span-2 space-y-6">

{cart.map((item:any)=>(

<div key={item._id} className="flex gap-4 border-b pb-6">

<img
src={item.image}
className="w-24 h-24 object-cover rounded"
/>

<div className="flex-1">

<h2 className="font-semibold">
{item.name}
</h2>

<p className="text-gray-500">
₹{item.price}
</p>

<p className="text-sm text-gray-400 mt-1">
Size: {item.size || "Standard"}
</p>

<div className="flex items-center gap-3 mt-3">

<button
onClick={()=> decreaseQty(item._id)}
className="border px-2"
>
-
</button>

<span>{item.qty}</span>

<button
onClick={()=> increaseQty(item._id)}
className="border px-2"
>
+
</button>

</div>

</div>

<button
onClick={()=>removeFromCart(item._id)}
className="text-red-500 text-sm"
>
Remove
</button>

</div>

))}

</div>

{/* PRICE SUMMARY */}

<div className="border p-6 rounded h-fit">

<h2 className="font-semibold mb-4">
Price Details
</h2>

<div className="flex justify-between mb-2">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="flex justify-between mb-2">
<span>Delivery</span>
<span className="text-green-600">FREE</span>
</div>

<hr className="my-4"/>

<div className="flex justify-between font-bold text-lg">
<span>Total</span>
<span>₹{subtotal}</span>
</div>

<button
onClick={handleCheckout}
className="mt-6 bg-black text-white w-full py-3 rounded"
>
Proceed to Checkout
</button>

</div>

</div>

)}

</main>

);

}