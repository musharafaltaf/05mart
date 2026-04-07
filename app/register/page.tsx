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

const [loading,setLoading] = useState(false);
const [showPassword,setShowPassword] = useState(false);
const [showConfirm,setShowConfirm] = useState(false);

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const register = async()=>{

const name = form.name.trim();
const email = form.email.trim().toLowerCase();
const password = form.password.trim();
const confirmPassword = form.confirmPassword.trim();

/* VALIDATION */

if(!name || !email || !password || !confirmPassword){
alert("Please fill all fields");
return;
}

/* PASSWORD MATCH */

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

if(password.length < 6){
alert("Password must be at least 6 characters");
return;
}

try{

setLoading(true);

const res = await fetch("/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password
})
});

const data = await res.json();

/* ERROR */

if(!res.ok){
alert(data.error || "Registration failed");
setLoading(false);
return;
}

/* SAFETY CHECK */

if(!data.user || !data.user._id){
alert("Registration error. Please try again.");
setLoading(false);
return;
}

/* SAVE USER */

localStorage.removeItem("user");

localStorage.setItem("user", JSON.stringify(data.user));

/* REFRESH NAVBAR */

window.dispatchEvent(new Event("userChanged"));

/* REDIRECT */

router.push("/auth-success");

}catch(err){

console.log("REGISTER ERROR:",err);
alert("Something went wrong");

}
finally{
setLoading(false);
}

};

return(

<main className="max-w-md mx-auto py-16 px-4">

<h1 className="text-3xl font-bold mb-6 text-center">
Create 05Mart Account
</h1>

<div className="space-y-4">

{/* NAME */}

<input
name="name"
placeholder="Full Name"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

{/* EMAIL */}

<input
name="email"
placeholder="Email"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

{/* PASSWORD */}

<div className="relative">

<input
name="password"
type={showPassword ? "text" : "password"}
placeholder="Password"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-3 text-sm text-gray-500"
>
{showPassword ? "Hide" : "Show"}
</button>

</div>

{/* CONFIRM PASSWORD */}

<div className="relative">

<input
name="confirmPassword"
type={showConfirm ? "text" : "password"}
placeholder="Confirm Password"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

<button
type="button"
onClick={()=>setShowConfirm(!showConfirm)}
className="absolute right-3 top-3 text-sm text-gray-500"
>
{showConfirm ? "Hide" : "Show"}
</button>

</div>

{/* REGISTER BUTTON */}

<button
onClick={register}
disabled={loading}
className={`w-full py-3 rounded text-white transition
${loading ? "bg-gray-400" : "bg-black hover:opacity-90"}`}
>

{loading ? (
<span className="flex items-center justify-center gap-2">
<span className="loader"></span>
Creating account...
</span>
) : "Register"}

</button>

{/* LOGIN LINK */}

<p className="text-center text-sm">

Already have an account?{" "}

<Link href="/login" className="text-blue-600 font-medium">
Login
</Link>

</p>

</div>

<style jsx>{`
.loader{
width:16px;
height:16px;
border:2px solid white;
border-top:2px solid transparent;
border-radius:50%;
animation:spin 0.6s linear infinite;
}

@keyframes spin{
to{ transform:rotate(360deg); }
}
`}</style>

</main>

);
}