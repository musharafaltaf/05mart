"use client";

import { useEffect, useState } from "react";

export default function Loading(){

const quotes = [
  "Shop smarter, live better 🛍️",
  "Your style, your store ✨",
  "Best deals, everyday 🔥",
  "Fast delivery, happy life 🚚",
  "Everything you need, in one place 💎"
];

const [quote,setQuote] = useState(quotes[0]);

/* AUTO CHANGE QUOTES */
useEffect(()=>{

let i = 0;

const interval = setInterval(()=>{
  i = (i + 1) % quotes.length;
  setQuote(quotes[i]);
},2000);

return ()=>clearInterval(interval);

},[]);

return(
<div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">

{/* LOGO */}
<img 
  src="/logo.png" 
  className="w-20 h-20 mb-6 animate-float"
/>

{/* TITLE */}
<h1 className="text-2xl font-bold mb-2">
  Welcome to 05Mart
</h1>

{/* QUOTE */}
<p className="text-gray-500 text-sm animate-fadeIn">
  {quote}
</p>

{/* 🔥 PREMIUM LOADER */}
<div className="flex gap-2 mt-6 items-center">

<span className="dot"></span>
<span className="dot delay1"></span>
<span className="dot delay2"></span>

</div>

<style jsx>{`

/* FLOAT LOGO */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

/* TEXT FADE */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease;
}

/* 🔥 DOT ANIMATION (WAVE STYLE) */
.dot{
  width:10px;
  height:10px;
  background:black;
  border-radius:50%;
  animation: wave 1.4s infinite ease-in-out;
}

.delay1{ animation-delay:0.2s; }
.delay2{ animation-delay:0.4s; }

@keyframes wave{
  0%, 80%, 100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

`}</style>

</div>
);
}



// "use client";

// import { useEffect, useState } from "react";

// export default function Loading(){

// const quotes = [
//   "Shop smarter, live better 🛍️",
//   "Premium deals curated for you ✨",
//   "Fast delivery. Zero stress 🚚",
//   "Your style starts here 👕",
//   "Trusted by thousands every day 💎"
// ];

// const [quote,setQuote] = useState(quotes[0]);
// const [show,setShow] = useState(false);

// /* ROTATE QUOTES */
// useEffect(()=>{
// let i = 0;

// const interval = setInterval(()=>{
//   i = (i + 1) % quotes.length;
//   setQuote(quotes[i]);
// },2000);

// return ()=>clearInterval(interval);
// },[]);

// /* ENTRY ANIMATION */
// useEffect(()=>{
// setTimeout(()=>setShow(true),200);
// },[]);

// return(
// <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">

// {/* SOFT GLOW BACKGROUND */}
// <div className="absolute w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse"></div>

// {/* MAIN CONTENT */}
// <div className={`relative flex flex-col items-center text-center transition-all duration-700 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>

// {/* LOGO */}
// <div className="relative mb-6">

// <img 
//   src="/logo.png" 
//   className="w-20 h-20 animate-float z-10 relative"
// />

// {/* glow ring */}
// <div className="absolute inset-0 rounded-full border border-black/10 animate-ping"></div>

// </div>

// {/* TITLE */}
// <h1 className="text-2xl font-bold tracking-wide mb-2">
//   Welcome to 05Mart
// </h1>

// {/* QUOTE */}
// <p className="text-gray-500 text-sm min-h-[20px] transition-all duration-300">
//   {quote}
// </p>

// {/* LOADER */}
// <div className="mt-8 flex items-center gap-2">

// <span className="loader-dot"></span>
// <span className="loader-dot delay1"></span>
// <span className="loader-dot delay2"></span>

// </div>

// </div>

// {/* STYLES */}
// <style jsx>{`

// .loader-dot{
// width:8px;
// height:8px;
// background:black;
// border-radius:50%;
// animation:bounce 1.4s infinite ease-in-out;
// }

// .delay1{ animation-delay:0.2s; }
// .delay2{ animation-delay:0.4s; }

// @keyframes bounce{
// 0%,80%,100%{ transform:scale(0); }
// 40%{ transform:scale(1); }
// }

// @keyframes float{
// 0%{ transform:translateY(0px); }
// 50%{ transform:translateY(-10px); }
// 100%{ transform:translateY(0px); }
// }

// .animate-float{
// animation:float 2.5s ease-in-out infinite;
// }

// `}</style>

// </div>
// );
// }