"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Gift, IndianRupee, Send, Facebook, Instagram,MessageCircle,ArrowLeft} from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function InvitePage(){

const router = useRouter();

const [user,setUser] = useState<any>(null);
const [copied,setCopied] = useState(false);

const [tab,setTab] = useState("ref");

const [bottomTab,setBottomTab] = useState("how");

const [scratchCards,setScratchCards] = useState<any[]>([]);
const [showScratch,setShowScratch] = useState(false);
const [reward,setReward] = useState<number | null>(null);
const [refs,setRefs] = useState<any[]>([]);

const [wallet,setWallet] = useState(0);

const canvasRef = useRef<HTMLCanvasElement>(null);

const [selectedRef,setSelectedRef] = useState<any>(null);

const [goalUnlocked,setGoalUnlocked] = useState(false);
const [loading,setLoading] = useState(true);
const [notifications, setNotifications] = useState<any[]>([]);

useEffect(()=>{
  if(refs.length >= 10 && !goalUnlocked){
    setGoalUnlocked(true);

    // 🎉 blast animation
    confetti({
      particleCount:150,
      spread:90,
      origin:{ y:0.6 }
    });
  }
},[refs]);

const fetchNotifications = async (uid:any) => {
  const res = await fetch(`/api/notifications?userId=${uid}`);
  const data = await res.json();
  setNotifications(data);
};
const unread = notifications.filter(n => !(n.read ?? n.Read)).length;

/* ================= INIT ================= */
useEffect(()=>{
  const loadData = async () => {

    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);

    if(!u?._id) return;

    try{

      await fetchNotifications(u._id);

      console.log("USER:", user);
console.log("REFS:", refs);

      /* 1. GET REFERRALS */
      const refRes = await fetch(`/api/referrals?userId=${u._id}`);
      const refData = await refRes.json();
      setRefs(refData || []);

      /* 2. GET WALLET */
      const walletRes = await fetch(`/api/wallet?userId=${u._id}`);
      const walletData = await walletRes.json();
      setWallet(walletData.wallet || 0);

      /* 3. GET SCRATCH CARDS */
      const scratchRes = await fetch(`/api/scratch?userId=${u._id}`);
      const scratchData = await scratchRes.json();
      setScratchCards(scratchData || []);

    }catch(err){
      console.log("LOAD ERROR", err);
    }

    setLoading(false);
  };

  loadData();

},[]);
/* ================= COPY ================= */
const copy = ()=>{
  navigator.clipboard.writeText(user?.referralCode);
  setCopied(true);
  setTimeout(()=>setCopied(false),1500);
};

/* ================= SHARE ================= */
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

const referralLink = `${BASE_URL}/register?ref=${user?.referralCode}`;

const shareText = user?.referralCode
  ? `Hey! I'm shopping on 05Mart 🛍️
Get amazing deals & rewards 🎁
Join using my link: ${referralLink}`
  : "Join 05Mart!";

const shareWhatsApp = () => {
  window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
};

const shareTelegram = () => {
  window.open(`https://t.me/share/url?text=${encodeURIComponent(shareText)}`);
};

const shareFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`);
};

const shareInstagram = () => {
  alert("Instagram sharing works via story 😄");
};

/* ================= SCRATCH ================= */
useEffect(()=>{
if(!showScratch || !canvasRef.current) return;

const canvas = canvasRef.current;
const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "#bbb";
ctx.fillRect(0,0,300,120);

const scratch = (x:number,y:number)=>{
ctx.globalCompositeOperation = "destination-out";
ctx.beginPath();
ctx.arc(x,y,20,0,Math.PI*2);
ctx.fill();
};

const move = (e:any)=>{
const rect = canvas.getBoundingClientRect();
const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left;
const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top;
scratch(x,y);
};

canvas.addEventListener("mousemove",move);
canvas.addEventListener("touchmove",move);

return ()=>{
canvas.removeEventListener("mousemove",move);
canvas.removeEventListener("touchmove",move);
};

},[showScratch]);

const revealReward = async ()=>{
  if(reward) return;

  const res = await fetch("/api/scratch/reveal", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      userId: user._id
    })
  });

  const data = await res.json();

  if(!res.ok){
    alert(data.error);
    return;
  }

  setReward(data.reward);
  setWallet(prev => prev + data.reward);

  /* remove first card */
  const updated = scratchCards.slice(1);
  setScratchCards(updated);

  confetti({ particleCount:120, spread:70 });
};

/* ================= UI ================= */

<div className="notifIcon">
  🔔 {unread > 0 && <span>{unread}</span>}
</div>


if(!user) return null;

return(

<div className="wrap">

{/* TOP */}
<div className="topBar">

  <div className="left">
    <ArrowLeft size={20} onClick={()=>router.back()} />
    <h2 className="logo">05Mart</h2>
  </div>

  <div style={{display:"flex", gap:10, alignItems:"center"}}>

    {/* 🔔 Notification */}
    <div className="notifIcon">
      🔔
      {unread > 0 && <span>{unread}</span>}
    </div>

    <div className="walletBtn" onClick={()=>router.push("/wallet")}>
      <IndianRupee size={14}/> {wallet}
    </div>

  </div>

</div>

{/* HERO */}
<div className="hero">
  <h1>Invite & Earn</h1>
  <p className="highlight">Earn upto ₹50 on every referral</p>
</div>

{loading && (
<>
  {/* GOAL SKELETON */}
  <div className="goalBox">
    <div className="skeleton block" style={{height:20,width:"60%",margin:"auto"}}></div>
    <div className="skeleton block" style={{height:10,width:"80%",margin:"10px auto"}}></div>
    <div className="skeleton block" style={{height:8,width:"100%",marginTop:10}}></div>
  </div>

  {/* SHARE SKELETON */}
  <div className="shareBox">
    <div className="skeleton block" style={{height:40}}></div>
    <div className="skeleton block" style={{height:40,marginTop:10}}></div>
    <div className="socials">
      <div className="skeleton avatar"></div>
      <div className="skeleton avatar"></div>
      <div className="skeleton avatar"></div>
      <div className="skeleton avatar"></div>
    </div>
  </div>
</>
)}

{!loading && (
<>
  {/* your existing goalBox */}
</>
)}
{/* INVITE GOAL */}
<div className={`goalBox ${goalUnlocked ? "unlocked" : ""}`}>

  <div className="goalHeader">
    {goalUnlocked ? "🏆 Reward Unlocked!" : "🎯 Invite 10 Friends"}
  </div>

  <p className="goalText">
    {goalUnlocked 
      ? "You earned ₹500 + T-shirt 👕"
      : <>Earn <b>₹500 + Branded T-shirt 👕</b></>
    }
  </p>

  {!goalUnlocked && (
    <>
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${Math.min((refs.length / 10) * 100, 100)}%` }}
        />
      </div>

      <div className="goalFooter">
        {refs.length}/10 Completed
      </div>
    </>
  )}

  {goalUnlocked && (
    <button className="claimBtn">
      🎁 Claim Reward
    </button>
  )}

</div>

{/* SHARE */}
<div className="shareBox">

  <div className="codeRow">
    <span>{user?.referralCode || "Loading..."}</span>
    <button onClick={copy}>
      {copied ? "✔" : <Copy size={14}/>}
    </button>
  </div>

  <button className="shareBtn" onClick={shareWhatsApp}>
    Share Now 🚀
  </button>

  <div className="socials">
    <MessageCircle onClick={shareWhatsApp}/>
    <Send onClick={shareTelegram}/>
    <Facebook onClick={shareFacebook}/>
    <Instagram onClick={shareInstagram}/>
  </div>

</div>

{/* TOP TABS */}
<div className="tabs">
  <div className={tab==="ref"?"active":""} onClick={()=>setTab("ref")}>Referrals</div>
  <div className={tab==="scratch"?"active":""} onClick={()=>setTab("scratch")}>Scratch Cards</div>
</div>

{/* REFERRALS */}
{tab==="ref" && (
<>
{loading ? (
<div className="stories">
  {[1,2,3,4].map((_,i)=>(
    <div key={i} className="story">
      <div className="skeleton avatar"></div>
      <div className="skeleton text"></div>
    </div>
  ))}
</div>
) : refs.length === 0 ? (
<div className="emptyCard simpleEmpty">
  <h3>No referrals yet</h3>
  <p>Invite friends and start earning rewards</p>
  <button className="inviteBtn" onClick={shareWhatsApp}>
    Invite Now
  </button>
</div>
) : (
<div className="stories">
{refs.map((r,i)=>(
<div key={i} className="story" onClick={()=>setSelectedRef(r)}>
<img
  src={
    r.referredUser?.img ||
    `https://randomuser.me/api/portraits/men/${(i % 90) + 1}.jpg`
  }
  style={{
    width: 60,
    height: 60,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ff7a00"
  }}
/>

<p>{r.referredUser?.name}</p>
</div>
))}
</div>
)}
</>
)}
{tab==="scratch" && (
<>
{loading ? (
<div className="emptyCard">
  <div className="skeleton block"></div>
</div>
) : scratchCards.filter(c => !c.isScratched).length === 0 ? (
<div className="emptyCard simpleEmpty">
  <h3>No scratch cards yet</h3>
  <p>Invite friends to unlock rewards</p>
  <button className="inviteBtn" onClick={shareWhatsApp}>
    Invite Now
  </button>
</div>
) : (
<div className="scratchCard" onClick={()=>setShowScratch(true)}>
  <Gift size={18}/> Scratch & Win
</div>
)}
</>
)}

{/* SCRATCH MODAL */}
{showScratch && (
<div className="modal" onClick={()=>setShowScratch(false)}>
<div className="popup" onClick={(e)=>e.stopPropagation()}>
<h3>Scratch Card</h3>

<div className="scratchBox" onClick={revealReward}>
{reward && <h1 className="reward">₹{reward}</h1>}
<canvas ref={canvasRef} width={300} height={120}/>
</div>

</div>
</div>
)}

{/* REFERRAL PROGRESS MODAL */}
{selectedRef && (
<div className="modal" onClick={()=>setSelectedRef(null)}>
<div className="popup" onClick={(e)=>e.stopPropagation()}>

<h3>{selectedRef.referredUser?.name}</h3>

<div className="progressSteps">

<div className="pStep done">✔ Registered</div>
<div className={`pStep ${selectedRef.status.ordered ? "done" : ""}`}>
{selectedRef.status.ordered ? "✔" : "⏳"} Order Placed
</div>

<div className={`pStep ${selectedRef.status.delivered ? "done" : ""}`}>
{selectedRef.status.delivered ? "✔" : "⏳"} Delivered
</div>

<div className={`pStep ${selectedRef.status.rewardGiven? "done" : ""}`}>
{selectedRef.status.rewardGiven ? "🎁" : "🔒"} Reward
</div>

</div>

</div>
</div>
)}

{/* ================= BOTTOM SECTION ================= */}

<div className="tabs bottomTabs">
  <div className={bottomTab==="how"?"active":""} onClick={()=>setBottomTab("how")}>How It Works</div>
  <div className={bottomTab==="leader"?"active":""} onClick={()=>setBottomTab("leader")}>Leaderboard</div>
</div>

{/* HOW IT WORKS */}
{bottomTab==="how" && (
<div className="howCard">

<div className="step">
<span>1</span>
<p>Share your referral code</p>
</div>

<div className="step">
<span>2</span>
<p>Your friend signs up</p>
</div>

<div className="step">
<span>3</span>
<p>They place their first order</p>
</div>

<div className="step">
<span>4</span>
<p>You earn rewards 💸</p>
</div>

</div>
)}

{/* LEADERBOARD */}
{bottomTab==="leader" && (
<div className="leader">
{refs.length === 0 ? (
<p className="emptyText">No leaderboard data yet😒</p>
) : (
refs.map((r,i)=>(
<div key={i} className="leaderRow">
<span>{r.referredUser?.name}</span>
<b>{r.status.delivered ? "Reward Earned" : "In Progress"}</b>
</div>
))
)}
</div>
)}

<style jsx>{`

.wrap{
padding:16px;
background:#f6f7fb;
min-height:100vh;
}

.topBar{
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{font-weight:900;font-size:20px;}

.walletBtn{
background:black;
color:white;
padding:6px 12px;
border-radius:20px;
display:flex;
align-items:center;
gap:4px;
}

.hero{text-align:center;margin:20px 0;}
.hero h1{
font-size:35px;
font-weight:900;
background:linear-gradient(#ff7a00,#ffd54a);
-webkit-background-clip:text;
color:transparent;
}
.highlight{color:#ff7a00;font-weight:900;}

.tabs{
display:flex;
background:#eee;
border-radius:20px;
overflow:hidden;
margin-bottom:15px;
}
.tabs div{
flex:1;
padding:10px;
text-align:center;
}
.active{
background:black;
color:white;
}

.bottomTabs{
margin-top:20px;
}

/* HOW CARD */
.howCard{
background:white;
padding:20px;
border-radius:20px;
}

.step{
display:flex;
align-items:center;
gap:12px;
margin-bottom:15px;
}

.step span{
background:linear-gradient(#ff7a00,#ffd54a);
color:white;
width:28px;
height:28px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
font-weight:700;
}

/* STORIES */
.stories{display:flex;gap:10px;overflow:auto;}
.story{text-align:center;}
.story img{width:60px;height:60px;border-radius:50%;}

.emptyCard{
background:white;
padding:20px;
border-radius:20px;
text-align:center;
}

.emptyCard button{
margin-top:10px;
background:linear-gradient(#ff7a00,#ffd54a);
padding:10px;
border-radius:20px;
color:white;
}

.scratchCard{
background:linear-gradient(#ff7a00,#ffd54a);
padding:15px;
border-radius:15px;
text-align:center;
color:white;
}

.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.4);
display:flex;
justify-content:center;
align-items:center;
}
.popup{
background:white;
padding:20px;
border-radius:20px;
}

.scratchBox{position:relative;}
.reward{
position:absolute;
top:40px;
left:50%;
transform:translateX(-50%);
font-size:26px;
font-weight:900;
}

.leader{
background:white;
padding:15px;
border-radius:15px;
}

.leaderRow{
display:flex;
justify-content:space-between;
padding:10px 0;
}

.emptyText{
text-align:center;
color:#777;
}
.shareBox{
background:linear-gradient(#ff7a00,#ffd54a);
padding:45px;
margin-top:20px;
border-radius:15px;
margin-bottom:45px;
text-align:center;
color:white;
}

.codeRow{
display:flex;
justify-content:space-between;
background:white;
color:black;
padding:8px;
border-radius:10px;
}

.shareBtn{
width:100%;
margin-top:10px;
padding:10px;
border-radius:20px;
background:black;
color:white;
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{transform:scale(1);}
50%{transform:scale(1.05);}
100%{transform:scale(1);}
}

.socials{
display:flex;
justify-content:space-around;
margin-top:10px;
}

.goalBox{
background:linear-gradient(135deg,#000,#ff7a00,#ffd54a);
color:white;
padding:18px;
border-radius:20px;
margin-bottom:15px;
box-shadow:0 8px 25px rgba(255,122,0,0.4);
text-align:center;
}

.goalHeader{
font-size:18px;
font-weight:800;
}

.goalText{
margin-top:6px;
font-size:14px;
}

.progressBar{
background:rgba(255,255,255,0.3);
height:8px;
border-radius:10px;
margin-top:12px;
overflow:hidden;
}

.progressFill{
height:100%;
background:white;
transition:0.4s;
}

.goalFooter{
margin-top:8px;
font-size:12px;
opacity:0.9;
}
.goalBox.unlocked{
background:linear-gradient(135deg,#00c853,#64dd17);
box-shadow:0 10px 30px rgba(0,200,83,0.5);
animation:pop 0.4s ease;
}

@keyframes pop{
0%{transform:scale(0.9);}
100%{transform:scale(1);}
}

.claimBtn{
margin-top:15px;
padding:12px;
width:100%;
border-radius:25px;
background:black;
color:white;
font-weight:700;
}

.left{
display:flex;
align-items:center;
gap:8px;
}

.left svg{
background:#eee;
padding:5px;
border-radius:50%;
}

.progressSteps{
margin-top:15px;
}

.pStep{
padding:10px;
border-radius:10px;
background:#eee;
margin-bottom:8px;
}

.pStep.done{
background:#d4edda;
color:#155724;
}

.simpleEmpty{
background:#ffffff;
border:1px solid #eee;
color:#333;
}

.simpleEmpty h3{
font-size:16px;
font-weight:600;
margin-bottom:6px;
}

.simpleEmpty p{
font-size:13px;
color:#777;
}

.inviteBtn{
margin-top:12px;
padding:10px;
width:100%;
border-radius:20px;
background:#f1f1f1;
color:#333;
font-weight:600;
border:none;
}

.inviteBtn:active{
transform:scale(0.98);
}

.skeleton{
position:relative;
overflow:hidden;
background:#eee;
border-radius:10px;
}

.skeleton::after{
content:"";
position:absolute;
top:0;
left:-150%;
height:100%;
width:150%;
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.6),
transparent
);
animation:shimmer 1.2s infinite;
}

@keyframes shimmer{
100%{
left:100%;
}
}

.avatar{
width:50px;
height:50px;
border-radius:50%;
}

.block{
width:100%;
border-radius:8px;
}
.story:nth-child(1) .skeleton::after{animation-delay:0s;}
.story:nth-child(2) .skeleton::after{animation-delay:0.1s;}
.story:nth-child(3) .skeleton::after{animation-delay:0.2s;}
.story:nth-child(4) .skeleton::after{animation-delay:0.3s;}

.notifIcon{
  position:relative;
  font-size:20px;
  cursor:pointer;
}

.notifIcon span{
  position:absolute;
  top:-6px;
  right:-6px;
  background:red;
  color:white;
  font-size:10px;
  padding:2px 6px;
  border-radius:50%;
}
`}</style>

</div>
);
}