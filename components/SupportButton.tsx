"use client";

import { useEffect, useState } from "react";

export default function SupportButton(){

const [showText,setShowText] = useState(true);

useEffect(()=>{
const timer = setTimeout(()=>{
setShowText(false);
},5000);

return ()=>clearTimeout(timer);
},[]);

return(

<div className="supportWrapper">

{showText && (
<div className="supportText">
How may I assist you?
</div>
)}

<a
href={`https://wa.me/919103316778?text=${encodeURIComponent(
`Hello 05Mart 👋

I need help with my order.

Please assist me.

Thank you.`
)}`}
target="_blank"
rel="noopener noreferrer"
title="How may I assist you?"
className="supportBtn"
>

<img
src="/support-logo.png"
className="supportIcon"
/>

</a>

<style jsx>{`

.supportWrapper{
position:fixed;
right:18px;
bottom:110px;
display:flex;
align-items:center;
gap:10px;
z-index:999999;
}

.supportText{
background:white;
padding:8px 12px;
border-radius:10px;
box-shadow:0 5px 15px rgba(0,0,0,0.15);
font-size:13px;
font-weight:500;
white-space:nowrap;
animation:fadeIn 0.3s ease;
}

.supportBtn{
width:60px;
height:60px;
background:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
box-shadow:0 10px 25px rgba(0,0,0,0.25);
cursor:pointer;
animation:pulse 2s infinite;
}

.supportIcon{
width:36px;
height:36px;
object-fit:contain;
}

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.1)}
100%{transform:scale(1)}
}

@keyframes fadeIn{
from{opacity:0; transform:translateX(10px)}
to{opacity:1; transform:translateX(0)}
}

`}</style>

</div>

);

}