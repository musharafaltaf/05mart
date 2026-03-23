"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess(){

const router = useRouter();

const messages = [
  "Welcome to 05Mart 🎉",
  "Login Successful 🚀",
  "Ready to shop 🛍️",
  "Enjoy best deals 💎"
];

const [msg,setMsg] = useState(messages[0]);

useEffect(()=>{

let i = 0;

const interval = setInterval(()=>{
  i = (i + 1) % messages.length;
  setMsg(messages[i]);
},1500);

return ()=>clearInterval(interval);

},[]);

/* 🔥 AUTO REDIRECT */
useEffect(()=>{

/* 🔥 IMPORTANT: REFRESH NAVBAR */
window.dispatchEvent(new Event("userChanged"));

setTimeout(()=>{
  router.push("/");
},2500);

},[]);

return(

<div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">

<img src="/logo.png" className="w-20 h-20 mb-6 animate-bounce"/>

<div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-scale">
<span className="text-3xl">✔</span>
</div>

<h1 className="text-2xl font-bold mb-2">
Success
</h1>

<p className="text-gray-500 text-sm animate-fade">
{msg}
</p>

<div className="flex gap-2 mt-6">
<span className="dot"></span>
<span className="dot delay1"></span>
<span className="dot delay2"></span>
</div>

<style jsx>{`

.dot{
width:10px;
height:10px;
background:black;
border-radius:50%;
animation:bounce 1s infinite;
}

.delay1{ animation-delay:0.2s }
.delay2{ animation-delay:0.4s }

@keyframes bounce{
0%,100%{ transform:translateY(0) }
50%{ transform:translateY(-8px) }
}

@keyframes fade{
from{opacity:0}
to{opacity:1}
}

.animate-fade{
animation:fade 0.5s ease;
}

@keyframes scale{
0%{ transform:scale(0.5); opacity:0 }
100%{ transform:scale(1); opacity:1 }
}

.animate-scale{
animation:scale 0.5s ease;
}

`}</style>

</div>
);
}