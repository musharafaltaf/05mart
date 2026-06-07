"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, IndianRupee, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WalletPage(){

const router = useRouter();

const [wallet,setWallet] = useState(0);
const [coupons,setCoupons] = useState<any[]>([]);
const [selected,setSelected] = useState<any>(null);
const [toast,setToast] = useState("");
const [tab,setTab] = useState("active");
const [loading,setLoading] = useState(true);

/* ================= LOAD ================= */
useEffect(()=>{
  setTimeout(()=>{
    setWallet(JSON.parse(localStorage.getItem("wallet") || "0"));
    setCoupons(JSON.parse(localStorage.getItem("coupons") || "[]"));
    setLoading(false);
  },800); // skeleton feel
},[]);

/* ================= TOAST ================= */
useEffect(()=>{
  if(!toast) return;
  const t = setTimeout(()=>setToast(""),2000);
  return ()=>clearTimeout(t);
},[toast]);

/* ================= FILTER ================= */
const active = coupons.filter(c => !c.used && Date.now() < c.expiresAt);
const used = coupons.filter(c => c.used);
const invalid = coupons.filter(c => Date.now() > c.expiresAt);

/* ================= TIMER ================= */
const getTimeLeft = (time:number)=>{
  const diff = time - Date.now();
  if(diff <= 0) return "Expired";
  const d = Math.floor(diff/(1000*60*60*24));
  return `${d} days left`;
};

/* ================= UI ================= */

if(loading){
  return(
    <div className="wrap">
      <div className="skeleton header"/>
      <div className="skeleton big"/>
      <div className="skeleton line"/>
      <div className="skeleton line"/>
    </div>
  );
}

return(

<div className="wrap">

{/* TOAST */}
{toast && <div className="toast">{toast}</div>}

{/* HEADER */}
<div className="header">
  <ArrowLeft onClick={()=>router.back()} />
  <h2>Wallet</h2>
</div>

{/* BALANCE */}
<div className="balanceCard">
  <p>Available Balance</p>
  <h1>
    <IndianRupee size={22}/> {wallet}
  </h1>
  <small>Use this balance in your orders</small>
</div>

{/* ACTIONS */}
<div className="actions">
  <button onClick={()=> wallet<=0 ? setToast("⚠️ Empty wallet") : setToast("Use in checkout")}>
    Use Balance
  </button>
  <button onClick={()=> wallet<=0 ? setToast("⚠️ Nothing to combine") : setToast("Combined ✔")}>
    New Coupon
  </button>
</div>

{/* MY COUPONS TITLE */}
<h3 className="section">My Coupons</h3>

{/* TABS */}
<div className="tabs">
  <div className={tab==="active"?"active":""} onClick={()=>setTab("active")}>Active</div>
  <div className={tab==="used"?"active":""} onClick={()=>setTab("used")}>Used</div>
  <div className={tab==="invalid"?"active":""} onClick={()=>setTab("invalid")}>Invalid</div>
</div>

{/* LIST */}
<div className="list">

{tab==="active" && active.map((c,i)=>(
<div key={i} className="item" onClick={()=>setSelected(c)}>
<div>
<p>{c.code}</p>
<small>{getTimeLeft(c.expiresAt)}</small>
</div>
<b>₹{c.amount}</b>
</div>
))}

{tab==="used" && used.map((c,i)=>(
<div key={i} className="item disabled" onClick={()=>setToast("Already used")}>
<p>{c.code}</p>
</div>
))}

{tab==="invalid" && invalid.map((c,i)=>(
<div key={i} className="item disabled" onClick={()=>setToast("Expired coupon")}>
<p>{c.code}</p>
</div>
))}

{/* EMPTY */}
{(
(tab==="active" && active.length===0) ||
(tab==="used" && used.length===0) ||
(tab==="invalid" && invalid.length===0)
) && (
<div className="emptyCard">
<h3>😶 Ooh ohh...</h3>
<p>No {tab} coupons yet</p>
<button onClick={()=>router.push("/invite")}>Invite & Earn</button>
</div>
)}

</div>

{/* PREMIUM POPUP */}
{selected && (
<div className="modal" onClick={()=>setSelected(null)}>

  <div className="popup premium" onClick={(e)=>e.stopPropagation()}>

    {/* CLOSE */}
    <div className="close" onClick={()=>setSelected(null)}>✕</div>

    {/* HEADER */}
    <div className="brandHeader">
      <h2>05Mart Coupon</h2>
      <p>Use this code at checkout</p>
    </div>

    {/* CODE */}
    <div className="codeBox">
      <span>{selected.code}</span>

      <button onClick={()=>{
        navigator.clipboard.writeText(selected.code);
        setToast("Copied ✔");
      }}>
        Copy
      </button>
    </div>

    {/* AMOUNT */}
    <h1 className="amount">₹{selected.amount}</h1>

    {/* INFO */}
    <p className="valid">
      Valid: {getTimeLeft(selected.expiresAt)}
    </p>

    {/* ACTIONS */}
    <div className="actionsPop">

      <button
        className="deleteBtn"
        onClick={()=>{
          const updated = coupons.filter(c=>c.code !== selected.code);
          setCoupons(updated);
          localStorage.setItem("coupons", JSON.stringify(updated));
          setSelected(null);
          setToast("Deleted");
        }}
      >
        Delete
      </button>

      <button
        className="orderBtn"
        onClick={()=>window.location.href="/"}
      >
        Order Now
      </button>

    </div>

  </div>

</div>
)}
<style jsx>{`

.wrap{
padding:20px;
background:#f6f7fb;
min-height:100vh;
font-family:sans-serif;
}

/* HEADER */
.header{
display:flex;
align-items:center;
gap:10px;
font-weight:800;
margin-bottom:10px;
}

/* BALANCE */
.balanceCard{
background:linear-gradient(135deg,#000,#111);
color:white;
padding:20px;
border-radius:20px;
text-align:center;
box-shadow:0 8px 20px rgba(0,0,0,.3);
}

.balanceCard h1{
font-size:32px;
font-weight:900;
}

/* ACTIONS */
.actions{
display:flex;
gap:10px;
margin:15px 0;
}
.actions button{
flex:1;
padding:12px;
border-radius:15px;
background:linear-gradient(#ff7a00,#ffd54a);
color:white;
font-weight:700;
}

/* SECTION */
.section{
margin-top:10px;
font-weight:700;
}

/* TABS */
.tabs{
display:flex;
background:#eee;
border-radius:20px;
overflow:hidden;
margin-top:10px;
}
.tabs div{
flex:1;
text-align:center;
padding:10px;
font-size:13px;
}
.tabs .active{
background:black;
color:white;
}

/* LIST */
.item{
background:white;
padding:14px;
border-radius:14px;
margin-top:10px;
display:flex;
justify-content:space-between;
cursor:pointer;
transition:.2s;
}
.item:hover{transform:scale(1.02);}

.disabled{
opacity:.4;
}

/* EMPTY */
.emptyCard{
background:white;
padding:25px;
border-radius:20px;
text-align:center;
margin-top:15px;
}
.emptyCard button{
margin-top:10px;
padding:10px 20px;
border-radius:20px;
background:linear-gradient(#ff7a00,#ffd54a);
color:white;
}

/* POPUP */
.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.5);
display:flex;
justify-content:center;
align-items:center;
}

.popup{
background:white;
padding:20px;
border-radius:20px;
width:90%;
max-width:300px;
text-align:center;
}

.premium{
animation:pop .3s ease;
}

@keyframes pop{
from{transform:scale(.8);opacity:0}
to{transform:scale(1);opacity:1}
}

.code{
display:flex;
justify-content:space-between;
background:#f3f4f6;
padding:10px;
border-radius:10px;
margin:10px 0;
}

/* TOAST */
.toast{
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:black;
color:white;
padding:10px 18px;
border-radius:20px;
}

/* SKELETON */
.skeleton{
background:#ddd;
border-radius:10px;
margin:10px 0;
animation:pulse 1.2s infinite;
}
.header{height:30px;}
.big{height:120px;}
.line{height:40px;}

@keyframes pulse{
0%{opacity:.5}
50%{opacity:1}
100%{opacity:.5}
}
  

/* POPUP PREMIUM */
.premium{
background:white;
border-radius:24px;
padding:20px;
width:90%;
max-width:320px;
text-align:center;
position:relative;
animation:popUp .3s ease;
box-shadow:0 20px 40px rgba(0,0,0,.25);
}

@keyframes popUp{
from{transform:scale(.8); opacity:0}
to{transform:scale(1); opacity:1}
}

/* CLOSE */
.close{
position:absolute;
top:12px;
right:12px;
font-size:18px;
cursor:pointer;
color:#666;
}

/* HEADER */
.brandHeader h2{
font-size:18px;
font-weight:800;
margin-bottom:4px;
}

.brandHeader p{
font-size:12px;
color:#777;
}

/* CODE BOX */
.codeBox{
display:flex;
justify-content:space-between;
align-items:center;
background:linear-gradient(135deg,#111,#000);
color:white;
padding:12px;
border-radius:12px;
margin:14px 0;
font-weight:600;
letter-spacing:1px;
}

.codeBox button{
background:#ff7a00;
border:none;
color:white;
padding:6px 12px;
border-radius:10px;
}

/* AMOUNT */
.amount{
font-size:34px;
font-weight:900;
margin:10px 0;
color:#ff7a00;
}

/* VALID */
.valid{
font-size:12px;
color:#777;
}

/* BUTTONS */
.actionsPop{
display:flex;
gap:10px;
margin-top:16px;
}

.deleteBtn{
flex:1;
background:#fee2e2;
color:#991b1b;
padding:12px;
border-radius:14px;
border:none;
font-weight:600;
}

.orderBtn{
flex:1;
background:linear-gradient(135deg,#ff7a00,#ffd54a);
color:white;
padding:12px;
border-radius:14px;
border:none;
font-weight:700;
box-shadow:0 6px 15px rgba(255,122,0,0.4);
}
`}</style>

</div>
);
}