"use client";

import { useEffect,useState } from "react";

export default function NotificationsPage(){

const [data,setData] = useState<any[]>([]);
const [user,setUser] = useState<any>(null);
const [active,setActive] = useState<any>(null);
const [menuOpen,setMenuOpen] = useState<string | null>(null);

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);

if(!u?._id) return;

const load = async()=>{

const res = await fetch(`/api/notifications?userId=${u._id}`);
const result = await res.json();

setData(Array.isArray(result)?result:[]);

};

load();

const interval = setInterval(load,4000);

return ()=>clearInterval(interval);

},[]);


/* OPEN NOTIFICATION */

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


/* DELETE */

const remove = async(id:string)=>{

await fetch("/api/notifications",{
method:"DELETE",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id})
});

setData(prev=>prev.filter(n=>n._id!==id));

};


/* MARK READ */

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


return(

<main className="container">

<h1 className="title">
Notifications
</h1>

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

<p className="message">
{n.message}
</p>

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


{/* POPUP */}

{active &&(

<div
className="modal"
onClick={()=>setActive(null)}
>

<div
className="modalBox"
onClick={(e)=>e.stopPropagation()}
>

<button
className="closeBtn"
onClick={()=>setActive(null)}
>
✕
</button>

<h2 className="hello">
Hello {user?.name}
</h2>

{active.productImage &&(

<img
src={active.productImage}
className="productImage"
/>

)}

<h3 className="productName">
{active.productName}
</h3>

<p className="modalMessage">
{active.message}
</p>

<p className="modalTime">
{new Date(active.createdAt).toLocaleString()}
</p>

{active.link && (

<a
href={active.link}
className="trackBtn"
>

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
}

.menu button:hover{
background:#f5f5f5;
}

.delete{
color:#dc2626;
}

/* POPUP */

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

`}</style>

</main>

);

}