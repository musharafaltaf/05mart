"use client";

export default function Loading(){

return(

<div className="h-screen flex flex-col justify-between bg-white">

{/* CENTER */}
<div className="flex flex-col items-center justify-center flex-1">

  {/* CIRCLE */}
  <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-md mb-5 overflow-hidden">

    <img 
  src="/logo.png" 
  className="w-[100px] h-[100px] rounded-full object-cover"
/>

  </div>

  {/* LINE LOADER */}
  <div className="w-[140px] h-[4px] bg-gray-200 rounded-full overflow-hidden">
    <div className="w-[40%] h-full bg-black animate-[loading_1.2s_infinite]" />
  </div>

</div>

{/* BOTTOM TEXT */}
<div className="text-center pb-6 text-sm text-gray-600">
  ❤️ <span className="font-bold ml-1">05Mart</span>
</div>

<style jsx>{`

@keyframes loading{
  0%{transform:translateX(-100%)}
  100%{transform:translateX(300%)}
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