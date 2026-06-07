"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, LogOut, Pencil, ImageIcon, UserPlus } from "lucide-react";

export default function ProfilePage(){

const router = useRouter();

const [user,setUser] = useState<any>(null);
const [loading,setLoading] = useState(true);

/* MODALS */
const [showProfile,setShowProfile] = useState(false);
const [showLogout,setShowLogout] = useState(false);
const [showAvatar,setShowAvatar] = useState(false);

/* UPLOAD STATE */
const [uploading,setUploading] = useState(false);

/* ================= LOAD ================= */

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");

if(!u){
router.push("/login");
return;
}

setUser(u);
setLoading(false);

},[]);

/* ================= IMAGE UPLOAD ================= */

const uploadImage = (e:any,type:"avatar"|"cover")=>{

const file = e.target.files[0];
if(!file) return;

setUploading(true);

const reader = new FileReader();

reader.onload = ()=>{
const updated = {
...user,
[type === "avatar" ? "image" : "cover"]: reader.result
};

localStorage.setItem("user",JSON.stringify(updated));
setUser(updated);

setTimeout(()=>setUploading(false),600);
};

reader.readAsDataURL(file);

};

/* ================= LOGOUT ================= */

const logout = ()=>{
localStorage.clear();
router.push("/");
};

/* ================= LOADING ================= */

if(loading){
return <div className="p-10 animate-pulse">Loading...</div>
}

/* ================= UI ================= */

return(

<main className="pb-24">

{/* ================= COVER ================= */}

<div className="relative h-44 w-full">

<img
src={user.cover || "/default-cover.jpg"}
className="w-full h-full object-cover"
/>

{/* EDIT COVER */}
<label className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full cursor-pointer">
<ImageIcon size={16}/>
<input type="file" hidden onChange={(e)=>uploadImage(e,"cover")}/>
</label>

</div>

{/* ================= AVATAR ================= */}

<div className="relative flex justify-center">

<div className="relative -mt-16">

<img
onClick={()=>setShowAvatar(true)}
src={user.image || "/avatar.png"}
className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl cursor-pointer"
/>

{/* EDIT ICON */}
<label className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer">
<Pencil size={14}/>
<input type="file" hidden onChange={(e)=>uploadImage(e,"avatar")}/>
</label>

</div>

</div>

{/* ================= NAME ================= */}

<div className="text-center mt-4">

<h2 className="text-xl font-bold">
{user.name}
</h2>

</div>

{/* ================= BUTTONS ================= */}

<div className="mt-8 px-4 space-y-3">

<button onClick={()=>setShowProfile(true)} className="btn">
<User size={16}/> Profile Details
</button>

{/* ✅ REDIRECT TO ADDRESS PAGE */}
<button
onClick={()=>router.push("/profile/address")}
className="btn"
>
<MapPin size={16}/> Saved Address
</button>

{/* <button
onClick={()=>router.push("/invite")}
className="btn"
>
<UserPlus size={16}/> Invite & Earn
</button> */}

<button onClick={()=>setShowLogout(true)} className="btn logout">
<LogOut size={16}/> Logout
</button>

</div>

{/* ================= PROFILE MODAL ================= */}

{showProfile && (

<div className="modal" onClick={()=>setShowProfile(false)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<h2 className="font-semibold mb-4">Profile Details</h2>

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>
<p><b>Phone:</b> {user.phone || "Not added"}</p>
<p><b>Password:</b> ••••••••</p>

<button className="close" onClick={()=>setShowProfile(false)}>
Close
</button>

</div>

</div>

)}

{/* ================= AVATAR VIEW ================= */}

{showAvatar && (

<div className="modal" onClick={()=>setShowAvatar(false)}>

<div className="modalBox center" onClick={(e)=>e.stopPropagation()}>

<img
src={user.image}
className="w-64 h-64 rounded-full object-cover"
/>

<button className="close" onClick={()=>setShowAvatar(false)}>
Close
</button>

</div>

</div>

)}

{/* ================= LOGOUT MODAL ================= */}

{showLogout && (

<div className="modal" onClick={()=>setShowLogout(false)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<h2 className="font-semibold mb-3">
Are you sure you want to logout?
</h2>

<div className="flex gap-3 mt-4">

<button
className="btnSmall"
onClick={()=>setShowLogout(false)}
>
Cancel
</button>

<button
className="btnDanger"
onClick={logout}
>
Yes Logout
</button>

</div>

</div>

</div>

)}

{/* ================= STYLES ================= */}

<style jsx>{`

.btn{
display:flex;
align-items:center;
gap:8px;
padding:14px;
border-radius:14px;
background:white;
border:1px solid #eee;
transition:.2s;
}

.btn:hover{
transform:translateY(-2px);
box-shadow:0 10px 20px rgba(0,0,0,.08);
}

.btn:active{
transform:scale(.96);
}

.logout{
background:#ffe5e5;
color:#d32f2f;
}

.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.5);
display:flex;
align-items:center;
justify-content:center;
z-index:999;
}

.modalBox{
background:white;
padding:20px;
border-radius:16px;
width:90%;
max-width:350px;
animation:pop .25s ease;
}

.center{
display:flex;
flex-direction:column;
align-items:center;
}

@keyframes pop{
from{transform:scale(.9);opacity:0;}
to{transform:scale(1);opacity:1;}
}

.close{
margin-top:15px;
width:100%;
background:black;
color:white;
padding:10px;
border-radius:10px;
}

.btnSmall{
background:#f3f4f6;
padding:10px;
border-radius:10px;
}

.btnDanger{
background:#ff4d4f;
color:white;
padding:10px;
border-radius:10px;
}

`}</style>

</main>

);
}