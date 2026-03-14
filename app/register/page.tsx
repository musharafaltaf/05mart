"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage(){

const router = useRouter();
const searchParams = useSearchParams();

/* redirect target */
const redirect = searchParams.get("redirect");

const [form,setForm] = useState({
name:"",
email:"",
password:""
});

const handleChange = (e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleRegister = async()=>{

if(!form.name || !form.email || !form.password){
alert("Fill all fields");
return;
}

const res = await fetch("/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(form)
});

const data = await res.json();

if(!res.ok){
alert(data.error || "Registration failed");
return;
}

/* AUTO LOGIN */

localStorage.setItem("user",JSON.stringify(data.user));

/* REDIRECT */

if(redirect){
router.push(redirect);
}else{
router.push("/");
}

};

return(

<main className="max-w-md mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Create Account
</h1>

<div className="grid gap-4">

<input
name="name"
placeholder="Full Name"
className="border p-3 rounded"
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
className="border p-3 rounded"
onChange={handleChange}
/>

<input
name="password"
type="password"
placeholder="Password"
className="border p-3 rounded"
onChange={handleChange}
/>

<button
onClick={handleRegister}
className="bg-black text-white py-3 rounded mt-2"
>
Register
</button>

</div>

</main>

);

}