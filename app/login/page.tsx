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

const [loading,setLoading] = useState(false);

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const login = async()=>{

if(!form.email.trim() || !form.password.trim()){
alert("Enter email and password");
return;
}

try{

setLoading(true);

const res = await fetch("/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:form.email.trim(),
password:form.password
})
});

const data = await res.json();

/* ERROR */

if(!res.ok){
alert(data.error || "Login failed");
setLoading(false);
return;
}

/* IMPORTANT CHECK */

if(!data.user || !data.user._id){
alert("Login error. Please try again.");
setLoading(false);
return;
}

/* SAVE USER */

localStorage.setItem("user", JSON.stringify(data.user));

/* NAVBAR UPDATE */

window.dispatchEvent(new Event("userChanged"));

/* REDIRECT */

router.push("/auth-success");

}catch(err){

console.log("LOGIN ERROR:",err);
alert("Something went wrong");

}finally{
setLoading(false);
}

};

return(

<main className="max-w-md mx-auto py-16 px-4">

<h1 className="text-2xl font-bold mb-6 text-center">
Login
</h1>

<div className="space-y-4">

{/* EMAIL */}

<input
name="email"
placeholder="Email"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

{/* PASSWORD */}

<input
name="password"
type="password"
placeholder="Password"
className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black"
onChange={handleChange}
/>

{/* LOGIN BUTTON */}

<button
onClick={login}
disabled={loading}
className={`w-full py-3 rounded text-white ${
loading ? "bg-gray-400" : "bg-black hover:opacity-90"
}`}
>
{loading ? "Logging in..." : "Login"}
</button>

<p className="text-center text-sm">

Don't have an account?{" "}

<Link href="/register" className="text-blue-600 font-medium">
Register
</Link>

</p>

</div>

</main>

);

}