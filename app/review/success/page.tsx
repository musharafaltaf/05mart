"use client";

import Link from "next/link";

export default function ReviewSuccess(){

return(

<main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

<div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full">

<img
src="/logo.png"
className="w-16 mx-auto mb-4"
/>

<h1 className="text-2xl font-semibold mb-2">
Thank You for Your Review ⭐
</h1>

<p className="text-gray-500 mb-6">
Your feedback helps other customers make better decisions.
</p>

<Link
href="/"
className="bg-black text-white px-6 py-3 rounded hover:scale-105 transition"
>
Continue Shopping
</Link>

</div>

</main>

);

}