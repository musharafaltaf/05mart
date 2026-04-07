"use client";

import { useRouter,useSearchParams } from "next/navigation";

export default function Page(){

const router=useRouter();
const params=useSearchParams();
const id=params.get("id");

return(

<main className="max-w-md mx-auto text-center p-10 space-y-6">

<div className="text-5xl">✅</div>

<h1 className="text-2xl font-bold">
Exchange Request Successful
</h1>

<p className="text-gray-500">
Your exchange request has been submitted successfully.
</p>

<button
onClick={()=>router.push(`/exchange/${id}`)}
className="bg-black text-white px-6 py-3 rounded"
>
Track Exchange
</button>

<button
onClick={()=>router.push("/")}
className="border px-6 py-3 rounded"
>
Continue Shopping
</button>

</main>

);

}