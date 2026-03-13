// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddressPage(){

// const router = useRouter();

// const [form,setForm] = useState({
// name:"",
// phone:"",
// pincode:"",
// state:"",
// city:"",
// house:"",
// area:"",
// });

// const handleChange = (e:any)=>{
// setForm({...form,[e.target.name]:e.target.value});
// };

// const saveAddress = ()=>{

// if(!form.name || !form.phone || !form.pincode || !form.state || !form.city || !form.house || !form.area){
// alert("Fill all fields");
// return;
// }

// localStorage.setItem("address",JSON.stringify(form));

// router.push("/checkout/summary");

// };

// return(

// <main className="max-w-4xl mx-auto p-10">

// <h1 className="text-2xl font-bold mb-6">
// Add Delivery Address
// </h1>

// <div className="grid gap-4">

// <input name="name" placeholder="Full Name" className="border p-3 rounded" onChange={handleChange}/>
// <input name="phone" placeholder="Phone Number" className="border p-3 rounded" onChange={handleChange}/>

// <div className="grid grid-cols-2 gap-4">
// <input name="pincode" placeholder="Pincode" className="border p-3 rounded" onChange={handleChange}/>
// <input name="city" placeholder="City" className="border p-3 rounded" onChange={handleChange}/>
// </div>

// <input name="state" placeholder="State" className="border p-3 rounded" onChange={handleChange}/>
// <input name="house" placeholder="House / Building" className="border p-3 rounded" onChange={handleChange}/>
// <input name="area" placeholder="Area / Road / Colony" className="border p-3 rounded" onChange={handleChange}/>

// <button
// onClick={saveAddress}
// className="bg-orange-500 text-white py-3 rounded mt-4"
// >
// Continue
// </button>

// </div>

// </main>

// );

// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function AddressPage(){

const router = useRouter();

const [form,setForm] = useState({
name:"",
phone:"",
pincode:"",
state:"",
city:"",
house:"",
area:"",
});

const handleChange = (e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const saveAddress = ()=>{

if(!form.name || !form.phone || !form.pincode || !form.state || !form.city || !form.house || !form.area){
alert("Fill all fields");
return;
}

localStorage.setItem("address",JSON.stringify(form));

router.push("/checkout/summary");

};

return(

<main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

    <CheckoutSteps step={1} />

<h1 className="text-xl md:text-2xl font-bold mb-6">
Add Delivery Address
</h1>

<div className="grid gap-4 max-w-xl">

<input
name="name"
placeholder="Full Name"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

<input
name="phone"
placeholder="Phone Number"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

{/* PINCODE + CITY */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<input
name="pincode"
placeholder="Pincode"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

<input
name="city"
placeholder="City"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

</div>

<input
name="state"
placeholder="State"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

<input
name="house"
placeholder="House / Building"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

<input
name="area"
placeholder="Area / Road / Colony"
className="border p-3 rounded w-full text-sm md:text-base"
onChange={handleChange}
/>

<button
onClick={saveAddress}
className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded mt-4 w-full md:w-auto px-6"
>
Continue
</button>

</div>

</main>

);

}