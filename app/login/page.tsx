"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage(){

const router = useRouter();

const [form,setForm] = useState({
email:"",
password:""
});

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const login = async()=>{

if(!form.email || !form.password){
alert("Enter email and password");
return;
}

try{

const res = await fetch("/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
});

const data = await res.json();

/* ❌ ERROR CASE */
if(!res.ok){
alert(data.error || "Login failed");
return;
}

/* ✅ SUCCESS CASE */
localStorage.setItem("user", JSON.stringify(data.user));

/* 🔥 IMPORTANT: REFRESH NAVBAR */
window.dispatchEvent(new Event("userChanged"));

/* 🔥 GO TO SUCCESS PAGE */
router.push("/auth-success");

}catch(err){
console.log(err);
alert("Something went wrong");
}

};

return(

<main className="max-w-md mx-auto py-16 px-4">

<h1 className="text-2xl font-bold mb-6">
Login
</h1>

<div className="space-y-4">

<input
name="email"
placeholder="Email"
className="border p-3 w-full rounded"
onChange={handleChange}
/>

<input
name="password"
type="password"
placeholder="Password"
className="border p-3 w-full rounded"
onChange={handleChange}
/>

<button
onClick={login}
className="bg-black text-white w-full py-3 rounded"
>
Login
</button>

<p className="text-center text-sm">

Don't have an account?{" "}

<Link href="/register" className="text-blue-600">
Register
</Link>

</p>

</div>

</main>

);

}