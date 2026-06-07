"use client"

import { useEffect,useState } from "react"

export default function ComboSection(){

const [combos,setCombos] = useState<any[]>([])
const [loading,setLoading] = useState(true)
const [timeLeft,setTimeLeft] = useState("")

/* LOAD COMBOS */

useEffect(()=>{

const load = async()=>{

try{

const res = await fetch(`/api/combos?t=${Date.now()}`)
const data = await res.json()

setCombos(data)

}catch(err){
console.log(err)
}

setTimeout(()=>setLoading(false),300)

}

load()

},[])

/* TIMER */

useEffect(()=>{

const updateTimer = ()=>{

const now = new Date()

const midnight = new Date()
midnight.setHours(24,0,0,0)

const diff = midnight.getTime() - now.getTime()

const h = Math.floor(diff/1000/60/60)
const m = Math.floor(diff/1000/60)%60
const s = Math.floor(diff/1000)%60

setTimeLeft(`${h}h ${m}m ${s}s`)

}

updateTimer()

const interval = setInterval(updateTimer,1000)

return ()=>clearInterval(interval)

},[])

/* ========================= */
/* 🔥 SKELETON */
/* ========================= */

if(loading){

return(
<section className="wrapper">

<h2 className="title">
🔥 Combo Deals
</h2>

<div className="comboList">

{Array.from({length:3}).map((_,i)=>(

<div key={i} className="comboCard">

<div className="timer shimmer small"/>

<div className="imageRow">
<div className="img shimmer"/>
<div className="img shimmer"/>
<div className="img shimmer"/>
</div>

<div className="comboName shimmer name"/>

<div className="priceRow">
<span className="price shimmer priceSkel"/>
<span className="old shimmer smallLine"/>
<span className="save shimmer smallLine"/>
</div>

<button className="btn shimmer"/>

</div>

))}

</div>

</section>
)

}

/* ========================= */

if(!combos.length){

return(
<section className="wrapper">

<h2 className="title">
🔥 Combo Deals
</h2>

<p className="empty">
No combo deals available
</p>

</section>
)

}

return(

<section className="wrapper">

<h2 className="title">
🔥 Combo Deals
</h2>

<div className="comboList">

{combos.map((combo:any)=>(

<div
key={combo._id}
className="comboCard"
onClick={()=>window.location.href=`/combo/${combo._id}`}
>

<div className="timer">
⏱ {timeLeft}
</div>

<div className="imageRow">

{combo.products?.map((p:any,i:number)=>(
<img key={i} src={p.image}/>
))}

</div>

<h3 className="comboName">
{combo.name}
</h3>

<div className="priceRow">

<span className="price">
₹{combo.comboPrice}
</span>

<span className="old">
₹{combo.originalPrice}
</span>

<span className="save">
Save ₹{combo.originalPrice - combo.comboPrice}
</span>

</div>

<button className="btn">
View Details →
</button>

</div>

))}

</div>

<style jsx>{`

.wrapper{
padding:25px 14px;
}

.title{
font-size:22px;
font-weight:700;
margin-bottom:18px;
}

.comboList{
display:flex;
flex-direction:column;
gap:22px;
}

/* CARD */

.comboCard{
position:relative;
background:white;
border-radius:22px;
padding:18px;
box-shadow:0 15px 35px rgba(0,0,0,0.08);
cursor:pointer;
transition:.25s;
}

.comboCard:hover{
transform:translateY(-4px);
}

/* TIMER */

.timer{
position:absolute;
top:12px;
right:12px;
background:black;
color:white;
padding:6px 10px;
font-size:12px;
border-radius:20px;
animation:pulse 1.5s infinite;
}

/* IMAGE ROW */

.imageRow{
display:flex;
justify-content:center;
gap:12px;
margin-top:10px;
}

.imageRow img{
width:120px;
height:120px;
object-fit:cover;
border-radius:14px;
background:#f3f3f3;
}

/* NAME */

.comboName{
font-size:18px;
font-weight:700;
margin-top:14px;
text-align:center;
}

/* PRICE */

.priceRow{
display:flex;
justify-content:center;
align-items:center;
gap:10px;
margin-top:8px;
}

.price{
font-size:22px;
font-weight:700;
}

.old{
text-decoration:line-through;
color:#999;
}

.save{
background:#16a34a;
color:white;
padding:4px 10px;
border-radius:16px;
font-size:12px;
animation:pop 0.6s ease;
}

/* BUTTON */

.btn{
margin-top:14px;
width:100%;
background:black;
color:white;
border:none;
padding:12px;
border-radius:10px;
font-weight:600;
cursor:pointer;
transition:.25s;
}

.btn:hover{
background:#111;
}

.empty{
color:#777;
}

/* 🔥 SHIMMER */

.shimmer{
position:relative;
overflow:hidden;
background:#e5e7eb;
border-radius:10px;
}

.shimmer::after{
content:"";
position:absolute;
top:0;
left:-150%;
width:150%;
height:100%;
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.6),
transparent
);
animation:shimmer 1.2s infinite;
}

@keyframes shimmer{
100%{left:150%}
}

/* SKELETON SIZES */

.img{
width:120px;
height:120px;
}

.name{
height:16px;
width:60%;
margin:14px auto;
}

.priceSkel{
width:60px;
height:18px;
}

.smallLine{
width:50px;
height:12px;
}

.small{
width:70px;
height:20px;
}

@keyframes pulse{
0%{opacity:.6}
50%{opacity:1}
100%{opacity:.6}
}

@keyframes pop{
0%{transform:scale(.8)}
100%{transform:scale(1)}
}

`}</style>

</section>

)

}