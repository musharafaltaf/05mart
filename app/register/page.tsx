"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){

const router = useRouter();

const [form,setForm] = useState({
name:"",
email:"",
password:"",
confirmPassword:""
});

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const register = async()=>{

if(!form.name || !form.email || !form.password || !form.confirmPassword){
alert("Fill all fields");
return;
}

if(form.password !== form.confirmPassword){
alert("Passwords do not match");
return;
}

const res = await fetch("/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:form.name,
email:form.email,
password:form.password
})
});

const data = await res.json();

if(!res.ok){
alert(data.error);
return;
}

localStorage.setItem("user",JSON.stringify(data.user));

alert("Account created successfully");

router.push("/");

};

return(

<main className="max-w-md mx-auto py-16 px-4">

<h1 className="text-2xl font-bold mb-6">
Create Account
</h1>

<div className="space-y-4">

<input
name="name"
placeholder="Full Name"
className="border p-3 w-full rounded"
onChange={handleChange}
/>

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

<input
name="confirmPassword"
type="password"
placeholder="Confirm Password"
className="border p-3 w-full rounded"
onChange={handleChange}
/>

<button
onClick={register}
className="bg-black text-white w-full py-3 rounded"
>
Register
</button>

<p className="text-center text-sm">

Already have an account?{" "}

<Link href="/login" className="text-blue-600">
Login
</Link>

</p>

</div>

</main>

);

}