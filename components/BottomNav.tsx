"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Home, Package, Search, Bell, User , UserPlus} from "lucide-react"

export default function BottomNav(){

const router = useRouter()
const pathname = usePathname()

const tabs = [
{ label:"Home", icon:<Home size={20}/>, url:"/" },
{ label:"Orders", icon:<Package size={20}/>, url:"/orders" },
{ label:"Search", icon:<Search size={20}/>, url:"/search" },
{ label:"Alerts", icon:<Bell size={20}/>, url:"/notifications" },
{ label:"Profile", icon:<User size={20}/>, url:"/profile" }
]

/* 🚀 PREFETCH (INSTANT NAV) */
useEffect(()=>{
tabs.forEach(tab=>router.prefetch(tab.url))
},[])

/* ACTIVE INDEX */
const index = tabs.findIndex(t=>t.url===pathname) === -1 ? 0 : tabs.findIndex(t=>t.url===pathname)

return(

<div className="wrapper">

<div className="nav">

{/* 🔥 INDICATOR */}
<div
className="indicator"
style={{
transform:`translateX(${index * 100}%)`
}}
/>

{tabs.map((tab,i)=>{

const active = pathname===tab.url

return(

<button
key={i}
onClick={()=>router.push(tab.url)}
className={active ? "active" : ""}
>

<div className="icon">
{tab.icon}
</div>

<span>{tab.label}</span>

</button>

)

})}

</div>

<style jsx>{`

.wrapper{
position:fixed;
bottom:10px;
left:0;
right:0;

display:flex;
justify-content:center;

padding:0 12px;
padding-bottom:env(safe-area-inset-bottom);

z-index:1000;
}

/* 🔥 NAV CONTAINER */

.nav{
position:relative;

display:flex;
align-items:center;

width:100%;
max-width:480px;

background:rgba(255,255,255,0.85);
backdrop-filter:blur(20px);

border-radius:999px;

padding:6px;

box-shadow:
0 15px 40px rgba(0,0,0,0.12),
0 4px 12px rgba(0,0,0,0.08);
}

/* BUTTON */

button{
flex:1;

border:none;
background:transparent;

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

gap:3px;

padding:7px 4px;

font-size:10.5px;
font-weight:500;

color:#666;

cursor:pointer;

z-index:2;

transition:.25s ease;
}

button span{
white-space:nowrap;
line-height:1;
}

/* ICON ANIMATION */

.icon{
transition:.3s;
}

/* ACTIVE */

button.active{
color:white;
font-weight:600;
}

button.active .icon{
transform:translateY(-2px) scale(1.1);
}

/* 🔥 INDICATOR (PREMIUM) */

.indicator{
position:absolute;

top:4px;
bottom:4px;
left:4px;

width:calc((100% - 8px)/5);

/* 🔥 ORANGE GOLD GRADIENT */
background:linear-gradient(135deg,#ff7a00,#ffb300,#ff7a00);

border-radius:999px;

/* GLOW */
box-shadow:
0 6px 18px rgba(0, 0, 0, 0.5),
inset 0 0 10px rgba(255,255,255,0.4);

transition:
transform .45s cubic-bezier(.4,.8,.2,1);

z-index:1;
}

/* TAP FEEDBACK */

button:active{
transform:scale(.9);
}

/* 🔥 SMOOTH FADE */

button{
transition:transform .2s, color .2s;
}

`}</style>

</div>

)
}