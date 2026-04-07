"use client";

import { useRouter,useSearchParams } from "next/navigation";

export default function ReturnPaymentSuccess(){

const router = useRouter();
const params = useSearchParams();

const id = params.get("id");

const submitReturnDirect = async()=>{

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
status:"return_requested",
returnRequest:{
paymentStatus:"paid"
}
})
});

router.push(`/returns/${id}`);

};

return(

<main className="min-h-screen flex items-center justify-center px-4">

<div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">

<h1 className="text-2xl font-bold text-green-600">
Payment Successful
</h1>

<p className="text-gray-500">
Return fee submitted successfully
</p>

<div className="space-y-3">

{/* CONTINUE RETURN */}

<button
onClick={()=>router.push(`/orders/${id}/return?paid=true`)}
className="w-full bg-black text-white py-3 rounded-lg font-semibold"
>
Continue Return
</button>

{/* DIRECT SUBMIT */}

<button
onClick={submitReturnDirect}
className="w-full border py-3 rounded-lg font-semibold"
>
Submit Return Now
</button>

{/* BACK */}

<button
onClick={()=>router.push(`/orders/${id}`)}
className="w-full text-gray-500 text-sm"
>
Back to Order
</button>

</div>

</div>

</main>

);

}