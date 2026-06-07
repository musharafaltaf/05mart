"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function ForgotPage(){

const router = useRouter();

/* ================= STATES ================= */

const [email,setEmail] = useState("");
const [otp,setOtp] = useState(["","","",""]);
const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");

const [step,setStep] = useState(1);
const [showOtp,setShowOtp] = useState(false);

const [loading,setLoading] = useState(false);
const [verifyLoading,setVerifyLoading] = useState(false);

const [toast,setToast] = useState("");
const [timer,setTimer] = useState(30);

/* ================= TOAST ================= */

useEffect(()=>{
if(!toast) return;

const t=setTimeout(()=>setToast(""),3000);
return ()=>clearTimeout(t);

},[toast]);

/* ================= TIMER ================= */

useEffect(()=>{
if(!showOtp) return;

setTimer(30);

const interval=setInterval(()=>{
setTimer(t=>{
if(t<=1){
clearInterval(interval);
return 0;
}
return t-1;
});
},1000);

return ()=>clearInterval(interval);

},[showOtp]);

/* ================= OTP INPUT ================= */

const handleOtp=(val:string,i:number)=>{
if(!/^[0-9]?$/.test(val)) return;

let newOtp=[...otp];
newOtp[i]=val;
setOtp(newOtp);

if(val && i<3){
document.getElementById(`otp-${i+1}`)?.focus();
}
};

const handleKeyDown=(e:any,i:number)=>{
if(e.key==="Backspace"){
if(otp[i]){
let newOtp=[...otp];
newOtp[i]="";
setOtp(newOtp);
}else if(i>0){
document.getElementById(`otp-${i-1}`)?.focus();
let newOtp=[...otp];
newOtp[i-1]="";
setOtp(newOtp);
}
}
};

/* ================= SEND OTP ================= */

const sendOtp = async()=>{

setToast("");

if(!email.includes("@gmail.com")){
return setToast("Enter valid email");
}

setLoading(true);

await fetch("/api/auth/send-otp",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ email }),
cache:"no-store"
});

setLoading(false);
setShowOtp(true);

setToast("OTP sent successfully");

};

/* ================= VERIFY OTP ================= */

const verifyOtp = ()=>{

setToast("");

if(otp.join("").length !== 4){
return setToast("Enter full OTP");
}

setShowOtp(false);
setStep(2);

setToast("OTP verified");

};

/* ================= RESET PASSWORD ================= */

const resetPassword = async()=>{

setToast("");

if(password.length < 6){
return setToast("Password too weak");
}

if(password !== confirm){
return setToast("Passwords not match");
}

setLoading(true);

const res = await fetch("/api/auth/reset-password",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
email,
password
}),
cache:"no-store"
});

const data = await res.json();

if(!res.ok){
setToast(data.error || "Something went wrong");
setLoading(false);
return;
}

setToast("Password updated successfully");

setTimeout(()=>{
router.push("/login");
},1500);

};

/* ================= UI ================= */

return(

<div className="wrapper">

{/* TOAST */}
{toast && (
<div className="toast">
{toast}
</div>
)}

<img src="/register.png" className="topImg"/>

<div className="card">

<h2 className="title">Forgot Password</h2>
<p className="subtitle">Recover your account</p>

{/* STEP 1 EMAIL */}
{step===1 && (
<>
<div className="inputBox">
<Mail size={18}/>
<input
placeholder="Enter Email"
onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<button onClick={sendOtp} className="btn">
{loading ? "Sending..." : "Send OTP"}
</button>
</>
)}

{/* STEP 2 PASSWORD */}
{step===2 && (
<>
<div className="inputBox">
<Lock size={18}/>
<input
type="password"
placeholder="New Password"
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<div className="inputBox">
<Lock size={18}/>
<input
type="password"
placeholder="Confirm Password"
onChange={(e)=>setConfirm(e.target.value)}
/>
</div>

<button onClick={resetPassword} className="btn">
{loading ? "Updating..." : "Update Password"}
</button>
</>
)}

<p className="links">
Back to <span onClick={()=>router.push("/login")}>Login</span>
</p>

</div>

{/* OTP POPUP (SAME AS REGISTER) */}
{showOtp && (
<div className="modal">

<div className="otpBox">

<img src="/otp.png" className="otpImg"/>

<h3>Email Verification</h3>
<p className="otpSub">OTP sent to {email}</p>

<div className="otpInputs">
{otp.map((d,i)=>(
<input
key={i}
id={`otp-${i}`}
value={d}
onChange={(e)=>handleOtp(e.target.value,i)}
onKeyDown={(e)=>handleKeyDown(e,i)}
maxLength={1}
/>
))}
</div>

{timer>0 ? (
<p className="timer">{timer}s</p>
) : (
<button onClick={sendOtp} className="resend">
Resend OTP
</button>
)}

<div className="otpBtns">
<button onClick={verifyOtp} className="verifyMain">
Verify
</button>

<button onClick={()=>setShowOtp(false)} className="cancel">
Cancel
</button>
</div>

</div>

</div>
)}

<style jsx>{`

.wrapper{
min-height:100vh;
background:#f3f4f6;
display:flex;
flex-direction:column;
align-items:center;
}

/* TOAST */
.toast{
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:red;
color:white;
padding:10px 16px;
border-radius:20px;
font-size:14px;
z-index:9999;
animation:slideDown .3s ease;
}

@keyframes slideDown{
from{opacity:0; transform:translate(-50%,-20px)}
to{opacity:1; transform:translate(-50%,0)}
}

.topImg{
width:100%;
max-width:500px;
height:220px;
object-fit:cover;
}

.card{
background:white;
border-radius:30px 30px 0 0;
padding:20px;
margin-top:-20px;
width:100%;
max-width:400px;
display:flex;
flex-direction:column;
gap:14px;
}

.title{
font-size:24px;
font-weight:800;
}

.subtitle{
font-size:12px;
color:#9ca3af;
}

.inputBox{
display:flex;
align-items:center;
gap:8px;
background:#f3f4f6;
padding:12px;
border-radius:20px;
}

input{
flex:1;
border:none;
background:transparent;
outline:none;
}

.btn{
padding:14px;
border-radius:25px;
background:black;
color:white;
margin-top:10px;
}

/* OTP */
.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.6);
display:flex;
justify-content:center;
align-items:center;
}

.otpBox{
background:white;
padding:20px;
border-radius:20px;
width:90%;
max-width:320px;
text-align:center;
}

.otpImg{
width:80px;
margin:auto;
}

.otpSub{
color:#9ca3af;
font-size:12px;
}

.otpInputs{
display:flex;
gap:10px;
justify-content:center;
margin:15px 0;
}

.otpInputs input{
width:50px;
height:55px;
border-radius:12px;
border:2px solid #e5e7eb;
text-align:center;
font-size:20px;
}

.otpBtns{
display:flex;
gap:10px;
margin-top:10px;
}

.verifyMain{
flex:1;
padding:10px;
background:black;
color:white;
border-radius:10px;
}

.cancel{
flex:1;
padding:10px;
border-radius:10px;
border:1px solid #ddd;
background:white;
}

.timer{
font-size:12px;
color:#666;
}

.resend{
font-size:12px;
color:black;
}

.links{
text-align:center;
font-size:12px;
}

.links span{
font-weight:600;
cursor:pointer;
color:blue;
}

`}</style>

</div>
);
}