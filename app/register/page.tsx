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
const [showPassword,setShowPassword] = useState(false);

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const login = async()=>{

if(!form.email || !form.password){
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
body:JSON.stringify(form)
});

const data = await res.json();

/* ERROR */
if(!res.ok){
alert(data.error || "Login failed");
setLoading(false);
return;
}

/* SUCCESS */
localStorage.setItem("user", JSON.stringify(data.user));

window.dispatchEvent(new Event("userChanged"));

router.push("/auth-success");

}catch(err){
console.log(err);
alert("Something went wrong");
}finally{
setLoading(false);
}

};

return(

<main className="max-w-md mx-auto py-16 px-4">

<h1 className="text-3xl font-bold mb-6 text-center">
Login to 05Mart
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

{/* BUTTON */}
<button
onClick={login}
disabled={loading}
className={`w-full py-3 rounded text-white transition
${loading ? "bg-gray-400" : "bg-black hover:opacity-90"}`}
>

{loading ? (
<span className="flex items-center justify-center gap-2">
<span className="loader"></span>
Logging in...
</span>
) : "Login"}

</button>

{/* LINK */}
<p className="text-center text-sm">

Don't have an account?{" "}

<Link href="/register" className="text-blue-600 font-medium">
Register
</Link>

</p>

</div>

{/* LOADER STYLE */}
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