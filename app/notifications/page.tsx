"use client";

import { useEffect,useState } from "react";

export default function NotificationsPage(){

const [data,setData] = useState<any[]>([]);
const [user,setUser] = useState<any>(null);
const [active,setActive] = useState<any>(null);
const [menuOpen,setMenuOpen] = useState<string | null>(null);
const [loading,setLoading] = useState(true);

/* ================= LOAD ================= */

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);

if(!u?._id){
setLoading(false);
return;
}

const load = async()=>{

try{

const res = await fetch(`/api/notifications?userId=${u._id}`);
const result = await res.json();

setData(Array.isArray(result)?result:[]);
localStorage.setItem(
  "notifCount",
  JSON.stringify((result || []).filter((n:any)=>!n.read).length)
);

}catch(err){
console.log(err);
}

setLoading(false);

};

load();

const interval = setInterval(load,4000);

const onFocus = ()=>load();
window.addEventListener("focus",onFocus);

return ()=>{
clearInterval(interval);
window.removeEventListener("focus",onFocus);
};

},[]);

/* ================= OPEN ================= */

const openNotification = async(n:any)=>{

setActive(n);

if(!n.read){

await fetch("/api/notifications",{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id:n._id})
});

setData(prev =>
prev.map(i =>
i._id===n._id ? {...i,read:true}:i
)
);

}

};

/* ================= DELETE ================= */

const remove = async(id:string)=>{

await fetch("/api/notifications",{
method:"DELETE",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id})
});

setData(prev=>prev.filter(n=>n._id!==id));

};

/* ================= MARK READ ================= */

const markRead = async(id:string)=>{

await fetch("/api/notifications",{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id})
});

setData(prev =>
prev.map(n=>n._id===id ? {...n,read:true}:n)
);

};

/* ================= SKELETON ================= */

if(loading){
return(

<main className="container">

<h1 className="title">Notifications</h1>

<div className="list">

{[1,2,3,4].map(i=>(
<div key={i} className="card">

<div className="flex-1 space-y-2">
<div className="h-4 w-40 bg-gray-200 shimmer rounded"></div>
<div className="h-3 w-28 bg-gray-200 shimmer rounded"></div>
</div>

<div className="w-6 h-6 bg-gray-200 shimmer rounded-full"></div>

</div>
))}

</div>

<style jsx>{`
.shimmer{
position:relative;
overflow:hidden;
}
.shimmer::after{
content:"";
position:absolute;
top:0;
left:-100%;
width:100%;
height:100%;
background:linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent);
animation:shimmer 1.2s infinite;
}
@keyframes shimmer{
100%{left:100%;}
}
`}</style>

</main>

)
}

/* ================= EMPTY ================= */

if(!loading && data.length === 0){
return(

<main className="container text-center">

<h1 className="title">Notifications</h1>

<div className="text-6xl animate-bounceSlow mb-4">🔔</div>

<h2 className="text-lg font-semibold animate-fadeUp">
You're all caught up 🎉
</h2>

<p className="text-gray-500 mt-2 text-sm animate-fadeUp delay-100">
No new notifications right now
</p>

<p className="text-gray-400 text-sm mt-1 animate-fadeUp delay-200">
We’ll notify you when something exciting happens 😉
</p>

<div className="mt-6 animate-fadeUp delay-300">

<button
onClick={()=>window.location.href="/"}
className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-medium shadow hover:scale-105 active:scale-95 transition"
>
Explore Deals 🔥
</button>

</div>

<div className="mt-6 text-sm text-gray-400 animate-fadeUp delay-500">

<p>💥 Flash sale is live</p>
<p>🎁 New combos just dropped</p>

</div>

<style jsx>{`

@keyframes fadeUp{
from{opacity:0;transform:translateY(15px);}
to{opacity:1;transform:translateY(0);}
}

.animate-fadeUp{
animation:fadeUp .6s ease forwards;
opacity:0;
}

.delay-100{animation-delay:.1s}
.delay-200{animation-delay:.2s}
.delay-300{animation-delay:.3s}
.delay-500{animation-delay:.5s}

@keyframes bounceSlow{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-10px)}
}

.animate-bounceSlow{
animation:bounceSlow 2s infinite;
}

`}</style>

</main>

)
}

/* ================= UI ================= */

return(

<main className="container">

<h1 className="title">Notifications</h1>

<div className="list">

{data.map((n:any)=>(

<div
key={n._id}
className={`card ${n.read?"read":"unread"}`}
>

<div
className="cardContent"
onClick={()=>openNotification(n)}
>

<p className="message">{n.message}</p>

<p className="time">
{new Date(n.createdAt).toLocaleString()}
</p>

</div>

<div className="menuWrap">

<button
onClick={()=>setMenuOpen(menuOpen===n._id?null:n._id)}
className="menuBtn"
>
⋮
</button>

{menuOpen===n._id &&(

<div className="menu">

<button onClick={()=>markRead(n._id)}>
Mark as read
</button>

<button
onClick={()=>remove(n._id)}
className="delete"
>
Delete
</button>

</div>

)}

</div>

</div>

))}

</div>

{/* POPUP (UNCHANGED) */}

{active &&(

<div className="modal" onClick={()=>setActive(null)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<button className="closeBtn" onClick={()=>setActive(null)}>✕</button>

<h2 className="hello">Hello {user?.name}</h2>

{active.productImage &&(
<img src={active.productImage} className="productImage"/>
)}

{active.productName && (
  <h3 className="productName">{active.productName}</h3>
)}

<p className="modalMessage">{active.message}</p>

<p className="modalTime">
{new Date(active.createdAt).toLocaleString()}
</p>

{active.link && (
<a href={active.link} className="trackBtn">

{active.message?.toLowerCase().includes("return")
? "Track Return"
: active.message?.toLowerCase().includes("exchange")
? "Track Exchange"
: active.message?.toLowerCase().includes("replacement")
? "Track Replacement"
: "Track Order"}

</a>
)}

</div>

</div>

)}

<style jsx>{`

.container{
max-width:850px;
margin:auto;
padding:40px 20px;
}

.title{
font-size:28px;
font-weight:700;
margin-bottom:25px;
}

.list{
display:flex;
flex-direction:column;
gap:14px;
}

/* CARD */

.card{
display:flex;
justify-content:space-between;
align-items:center;
padding:16px;
border-radius:14px;
border:1px solid #eee;
background:white;
transition:.25s;
animation:fadeIn .4s ease;
}

.card:hover{
transform:translateY(-2px);
box-shadow:0 10px 20px rgba(0,0,0,.06);
}

.unread{
background:#f9fafb;
}

.message{
font-weight:500;
}

.time{
font-size:12px;
color:#6b7280;
margin-top:4px;
}

/* MENU */

.menuWrap{
position:relative;
}

.menuBtn{
font-size:20px;
padding:4px;
transition:.2s;
}

.menuBtn:active{
transform:scale(.9);
}

.menu{
position:absolute;
right:0;
top:28px;
background:white;
border:1px solid #eee;
border-radius:10px;
box-shadow:0 10px 25px rgba(0,0,0,.1);
display:flex;
flex-direction:column;
}

.menu button{
padding:8px 12px;
text-align:left;
font-size:13px;
transition:.2s;
}

.menu button:hover{
background:#f5f5f5;
}

.menu button:active{
transform:scale(.95);
}

.delete{
color:#dc2626;
}

/* POPUP (UNCHANGED) */

.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.55);
display:flex;
align-items:center;
justify-content:center;
padding:20px;
padding-top:80px;
z-index:9999;
}

.modalBox{
background:white;
border-radius:16px;
padding:24px;
width:100%;
max-width:420px;
position:relative;
animation:popup .25s ease;
}

@keyframes popup{
from{transform:scale(.9);opacity:0;}
to{transform:scale(1);opacity:1;}
}

.closeBtn{
position:absolute;
top:12px;
right:12px;
font-size:18px;
cursor:pointer;
}

.hello{
font-size:18px;
font-weight:600;
margin-bottom:10px;
}

.productImage{
width:100%;
height:200px;
object-fit:cover;
border-radius:10px;
margin:10px 0;
}

.productName{
font-weight:600;
font-size:16px;
}

.modalMessage{
margin-top:8px;
color:#444;
}

.modalTime{
font-size:12px;
color:#888;
margin-top:6px;
}

.trackBtn{
display:inline-block;
margin-top:14px;
background:#2563eb;
color:white;
padding:10px 16px;
border-radius:10px;
font-size:14px;
}

.trackBtn:hover{
background:#1e40af;
}

@keyframes fadeIn{
from{opacity:0;transform:translateY(10px);}
to{opacity:1;transform:translateY(0);}
}

`}</style>

</main>

)
}