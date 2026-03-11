"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum:any,item:any)=>sum + item.price * item.qty,0);

  if(cart.length===0){
    return(
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Your cart is empty</h1>
      </div>
    )
  }

  return(

<main className="max-w-6xl mx-auto px-6 py-16">

<h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

<div className="grid md:grid-cols-3 gap-10">

<div className="md:col-span-2 space-y-6">

{cart.map((item:any)=>(

<div key={item.id} className="flex gap-6 bg-white p-6 rounded-xl border">

<img
src={item.image}
className="w-24 h-24 object-cover rounded"
/>

<div className="flex-1">

<h3 className="font-semibold">{item.name}</h3>

<p className="text-gray-500">₹{item.price}</p>

<div className="flex items-center gap-3 mt-3">

<button
onClick={()=>decreaseQty(item.id)}
className="border px-3"
>
-
</button>

<p>{item.qty}</p>

<button
onClick={()=>increaseQty(item.id)}
className="border px-3"
>
+
</button>

</div>

<button
onClick={()=>removeFromCart(item.id)}
className="text-red-500 text-sm mt-3"
>
Remove
</button>

</div>

</div>

))}

</div>

<div className="bg-white p-6 rounded-xl border h-fit">

<h2 className="text-xl font-semibold mb-6">
Order Summary
</h2>

<div className="flex justify-between mb-4">
<p>Total</p>
<p className="font-semibold">₹{total}</p>
</div>

<a href="/checkout">

<button className="w-full bg-black text-white py-3 rounded-lg">
Checkout
</button>

</a>

</div>

</div>

</main>

  )
}