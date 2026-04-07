"use client";

import { useRouter,useSearchParams } from "next/navigation";

export default function Failed(){

const router = useRouter();
const params = useSearchParams();

const id = params.get("id");

return(

<main className="min-h-screen flex items-center justify-center">

<div className="text-center space-y-4">

<h1 className="text-red-600 text-2xl font-bold">
Payment Failed
</h1>

<div className="flex gap-4 justify-center">

<button
onClick={()=>router.push(`/orders/${id}/return`)}
className="bg-black text-white px-5 py-2 rounded"
>
Try Again
</button>

<button
onClick={()=>router.back()}
className="border px-5 py-2 rounded"
>
Try Later
</button>

</div>

</div>

</main>

);

}