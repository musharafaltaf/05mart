"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function LoginPage(){

const router = useRouter();

const [form,setForm] = useState({
  email:"",
  password:""
});

const [loading,setLoading] = useState(false);
const [toast,setToast] = useState("");

/* ================= TOAST AUTO CLOSE ================= */
useEffect(()=>{
  if(!toast) return;

  const timer = setTimeout(()=>{
    setToast("");
  },3000);

  return ()=>clearTimeout(timer);

},[toast]);

/* ================= INPUT ================= */
const handleChange=(e:any)=>{
  setForm({...form,[e.target.name]:e.target.value});
  setToast("");
};

/* ================= LOGIN ================= */
const login = async()=>{

  setToast("");

  if(!form.email.includes("@gmail.com")){
    return setToast("Enter valid email");
  }

  if(!form.password){
    return setToast("Enter password");
  }

  setLoading(true);

  try{

    const res = await fetch("/api/auth/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        email:form.email,
        password:form.password
      })
    });

    const data = await res.json();

    if(!res.ok){

  setToast(data.error || "Login failed");

  /* SMART REDIRECT */
  if(data.suggestReset){
    setTimeout(()=>{
      router.push("/forgot");
    },1500);
  }

  setLoading(false);
  return;
}

    /* SAVE USER */
    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("userChanged"));

    router.push("/");

  }catch(err){
    setToast("Network error");
    setLoading(false);
  }

};

/* ================= UI ================= */

return(

<div className="wrapper">

{/* TOAST */}
{toast && (
  <div className="toast">
    {toast}
  </div>
)}

<img src="/login.png" className="topImg"/>

<div className="card">

<h2 className="title">Login</h2>
<p className="subtitle">Welcome back to 05mart👋</p>

{/* EMAIL */}
<div className="inputBox">
  <Mail size={18}/>
  <input
    name="email"
    placeholder="Email"
    onChange={handleChange}
  />
</div>

{/* PASSWORD */}
<div className="inputBox">
  <Lock size={18}/>
  <input
    type="password"
    name="password"
    placeholder="Password"
    onChange={handleChange}
  />
</div>

{/* BUTTON */}
<button onClick={login} className="btn">
  {loading ? "Logging in..." : "Login"}
</button>

{/* LINKS */}
<p className="links">
  <span onClick={()=>router.push("/forgot")}>
    Forgot Password?
  </span>
</p>

<p className="links">
  Don’t have an account?{" "}
  <span onClick={()=>router.push("/register")}>
    Register
  </span>
</p>

</div>

<style jsx>{`

.wrapper{
min-height:100vh;
background:#f3f4f6;
display:flex;
flex-direction:column;
align-items:center;
}

/* TOAST */
.toast{
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:red;
color:white;
padding:10px 16px;
border-radius:20px;
font-size:14px;
z-index:9999;
animation:slideDown .3s ease;
}

@keyframes slideDown{
from{opacity:0; transform:translate(-50%,-20px)}
to{opacity:1; transform:translate(-50%,0)}
}

.topImg{
width:100%;
max-width:500px;
height:240px;
object-fit:cover;
}

.card{
background:white;
border-radius:30px 30px 0 0;
padding:20px;
margin-top:-20px;
width:100%;
max-width:400px;
display:flex;
flex-direction:column;
gap:14px;
}

.title{
font-size:24px;
font-weight:800;
}

.subtitle{
font-size:12px;
color:#9ca3af;
}

.inputBox{
display:flex;
align-items:center;
gap:8px;
background:#f3f4f6;
padding:12px;
border-radius:20px;
}

input{
flex:1;
border:none;
background:transparent;
outline:none;
}

.btn{
padding:14px;
border-radius:25px;
background:black;
color:white;
margin-top:10px;
}

.links{
text-align:center;
font-size:12px;
color:#555;
}

.links span{
color:blue;
font-weight:600;
cursor:pointer;
}

`}</style>

</div>

);

}