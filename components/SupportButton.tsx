"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SupportButton(){

const pathname = usePathname();

/* ❌ HIDE ON SOME PAGES */
if(
  pathname?.includes("payment") ||
  pathname?.includes("loading")
){
  return null;
}

const [open,setOpen] = useState(false);
const [loading,setLoading] = useState(false);

/* 🔊 SOUND */
const playSound = ()=>{
  const audio = new Audio("/click.mp3");
  audio.play();
};

/* 📳 VIBRATION */
const vibrate = ()=>{
  if(navigator.vibrate){
    navigator.vibrate(40);
  }
};

/* 👤 USER NAME */
const getUserName = ()=>{
  try{
    const u = JSON.parse(localStorage.getItem("user") || "null");
    return u?.name || "User";
  }catch{
    return "User";
  }
};

/* 🧠 SMART MESSAGE */
const getMessage = ()=>{

const name = getUserName();

if(pathname?.includes("cart")){
return `Hello 05Mart 👋

I am ${name}

I need help with my cart.

Please assist me.`;
}

if(pathname?.includes("product")){
return `Hello 05Mart 👋

I am ${name}

I have a question about a product.

Please help me.`;
}

return `Hello 05Mart 👋

I am ${name}

I need help.

Thank you.`;

};

/* TEXT ANIMATION */
const messages = [
"Hi 👋 Need help?",
"Fast support available ⚡",
"Chat with us anytime 💬",
"05Mart Support 🤝"
];

const [text,setText] = useState("");
const [index,setIndex] = useState(0);

/* FLOAT MESSAGE */
const floatingMsgs = [
"How may I help you?",
"Need help with your order?",
"Quick support available",
"Tap here for assistance"
];

const [floatText,setFloatText] = useState("");
const [floatIndex,setFloatIndex] = useState(0);
const [showFloat,setShowFloat] = useState(true);

/* TYPE EFFECT */
useEffect(()=>{

let char = 0;
const current = messages[index];

const typing = setInterval(()=>{
setText(current.slice(0,char));
char++;

if(char > current.length){
clearInterval(typing);

setTimeout(()=>{
setIndex((prev)=>(prev+1)%messages.length);
},1500);
}

},40);

return ()=>clearInterval(typing);

},[index]);

/* FLOAT LOOP */
useEffect(()=>{

setFloatText(floatingMsgs[floatIndex]);

const interval = setInterval(()=>{
setFloatIndex(prev => (prev+1)%floatingMsgs.length);
setShowFloat(true);

setTimeout(()=>setShowFloat(false),4000);

},5000);

return ()=>clearInterval(interval);

},[floatIndex]);

/* OUTSIDE CLICK CLOSE */
useEffect(()=>{

const handleClick = (e:any)=>{
if(!e.target.closest(".supportWrapper")){
setOpen(false);
}
};

document.addEventListener("click",handleClick);

return ()=>document.removeEventListener("click",handleClick);

},[]);

/* CLICK BUTTON */
const handleClickBtn = ()=>{
playSound();
vibrate();
setOpen(!open);
};

/* REDIRECT */
const handleStart = ()=>{

if(loading) return;

playSound();
vibrate();

setLoading(true);

setTimeout(()=>{

const msg = encodeURIComponent(getMessage());

window.open(
`https://wa.me/919103316778?text=${msg}`,
"_blank"
);

setLoading(false);
setOpen(false);

},2000);

};

return(

<div className="supportWrapper">

{/* FLOAT MSG */}
{showFloat && !open && (
<div className="floatMsg">
{floatText}
</div>
)}

{/* POPUP */}
{open && (
<div className="popup">

<div className="header">
<span className="dot"></span>
Customer Support
</div>

<p className="msg">{text}</p>

<button
onClick={handleStart}
className="startBtn"
>

{loading ? (
<>
<div className="loader"></div>
Redirecting...
</>
) : "Start Chat"}

</button>

<p className="note">
✨ Avg response time: 1–2 min
</p>

</div>
)}

{/* BUTTON */}
<button
onClick={handleClickBtn}
className="btn"
>

<img src="/support-logo.png" className="icon"/>

<span className="online"></span>

</button>

<style jsx>{`

.supportWrapper{
position:fixed;
right:16px;
bottom:100px;
z-index:9999;
display:flex;
align-items:center;
gap:10px;
}

/* FLOAT MSG */

.floatMsg{
background:#f3f4f6;
color:#555;
font-size:12px;
padding:6px 10px;
border-radius:10px;
white-space:nowrap;
animation:fadeIn .3s ease;
}

/* BUTTON */

.btn{
width:58px;
height:58px;
border-radius:50%;

background:transparent; /* ❌ remove color */
padding:0;

display:flex;
align-items:center;
justify-content:center;

box-shadow:0 10px 25px rgba(0,0,0,0.25);

cursor:pointer;
animation:pulse 2.5s infinite;
}

/* ICON */

.icon{
width:100%;
height:100%;
object-fit:cover;
border-radius:50%; /* ✅ makes image perfectly circular */
}

/* ONLINE DOT */

.online{
position:absolute;
bottom:6px;
right:6px;

width:10px;
height:10px;

background:#22c55e;
border-radius:50%;
border:2px solid white;

animation:blink 1.5s infinite;
}

/* POPUP */

.popup{
position:absolute;
right:70px;
bottom:0;

width:240px;

background:white;
border-radius:16px;
padding:14px;

box-shadow:0 20px 40px rgba(0,0,0,.2);

animation:fade .3s ease;
}

.header{
font-size:12px;
font-weight:600;
display:flex;
align-items:center;
gap:6px;
}

.dot{
width:8px;
height:8px;
background:#22c55e;
border-radius:50%;
}

.msg{
font-size:13px;
margin:10px 0;
min-height:36px;
}

/* BUTTON */

.startBtn{
width:100%;
background:black;
color:white;
padding:10px;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
gap:6px;
}

/* LOADER */

.loader{
width:14px;
height:14px;
border:2px solid white;
border-top:transparent;
border-radius:50%;
animation:spin .8s linear infinite;
}

/* NOTE */

.note{
font-size:10px;
color:#777;
margin-top:6px;
text-align:center;
}

/* ANIMATIONS */

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.08)}
100%{transform:scale(1)}
}

@keyframes blink{
0%,100%{opacity:1}
50%{opacity:0.4}
}

@keyframes spin{
to{transform:rotate(360deg)}
}

@keyframes fade{
from{opacity:0; transform:translateY(10px)}
to{opacity:1}
}

@keyframes fadeIn{
from{opacity:0; transform:translateY(5px)}
to{opacity:1}
}

`}</style>

</div>

);

}