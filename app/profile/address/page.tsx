"use client";

import { useState, useEffect } from "react";

export default function AddressPage(){

const [address,setAddress] = useState("");

useEffect(()=>{

const saved = localStorage.getItem("savedAddress");

if(saved){
setAddress(saved);
}

},[]);

const saveAddress = ()=>{

localStorage.setItem("savedAddress",address);

alert("Address saved");

};

return(

<main className="max-w-3xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Saved Address
</h1>

<textarea
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="border p-3 w-full rounded"
rows={4}
/>

<button
onClick={saveAddress}
className="mt-4 bg-black text-white px-6 py-2 rounded"
>
Save Address
</button>

</main>

)

}