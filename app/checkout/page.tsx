"use client";

export default function CheckoutPage(){

return(

<main className="max-w-4xl mx-auto px-6 py-16">

<h1 className="text-3xl font-semibold mb-10">
Checkout
</h1>

<form className="space-y-6">

<input
placeholder="Full Name"
className="border p-4 w-full rounded"
/>

<input
placeholder="Address"
className="border p-4 w-full rounded"
/>

<input
placeholder="Phone"
className="border p-4 w-full rounded"
/>

<a href="/success">

<button
type="button"
className="bg-black text-white px-6 py-3 rounded-lg"
>
Place Order
</button>

</a>

</form>

</main>

)

}