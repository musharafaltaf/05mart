"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";

export default function RegisterPage(){

const router = useRouter();

const [form,setForm] = useState({
  name:"",
  email:"",
  password:"",
  confirm:""
});

const [otp,setOtp] = useState(["","","",""]);
const [showOtp,setShowOtp] = useState(false);
const [verified,setVerified] = useState(false);

const [verifyLoading,setVerifyLoading] = useState(false);
const [signupLoading,setSignupLoading] = useState(false);

const [toast,setToast] = useState("");
const [timer,setTimer] = useState(30);

const [accept,setAccept] = useState(false);
const [showTerms,setShowTerms] = useState(false);
const [referral,setReferral] = useState("");

useEffect(()=>{
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if(ref){
    setReferral(ref);
    localStorage.setItem("referral", ref);
  }else{
    const stored = localStorage.getItem("referral");
    if(stored){
      setReferral(stored);
    }
  }
},[]);

useEffect(() => {
  const url = new URL(window.location.href);
  const ref = url.searchParams.get("ref");

  if (ref) {
    localStorage.setItem("refCode", ref);
  }
}, []);

/* ================= TIMER ================= */
useEffect(()=>{
if(!showOtp) return;

setTimer(30);

const interval = setInterval(()=>{
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


useEffect(()=>{
  if(!toast) return;

  const t = setTimeout(()=>{
    setToast("");
  },3000);

  return ()=>clearTimeout(t);

},[toast]);

/* ================= INPUT ================= */
const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
setToast("");
};

/* ================= OTP ================= */
const handleOtp=(val:string,i:number)=>{
if(!/^[0-9]?$/.test(val)) return;

const newOtp=[...otp];
newOtp[i]=val;
setOtp(newOtp);

if(val && i<3){
document.getElementById(`otp-${i+1}`)?.focus();
}
};

const handleKeyDown=(e:any,i:number)=>{
if(e.key==="Backspace"){
if(otp[i]){
const newOtp=[...otp];
newOtp[i]="";
setOtp(newOtp);
}else if(i>0){
document.getElementById(`otp-${i-1}`)?.focus();
const newOtp=[...otp];
newOtp[i-1]="";
setOtp(newOtp);
}
}
};

/* ================= SEND OTP ================= */
const sendOtp = async () => {

  if (!form.email.includes("@gmail.com")) {
    return setToast("Enter valid email");
  }

  setShowOtp(true); // Open modal immediately
  setVerifyLoading(true);

  try {

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setToast(data.error || "Failed to send OTP");
      setShowOtp(false);
      return;
    }

    setToast("OTP sent successfully ✅");

  } catch (err) {
    console.error(err);
    setToast("Network error");
    setShowOtp(false);
  } finally {
    setVerifyLoading(false);
  }
};
/* ================= VERIFY ================= */
const manualVerify=()=>{
if(otp.join("").length!==4){
return setToast("Enter full OTP");
}
setVerified(true);
setShowOtp(false);
};

/* ================= REGISTER ================= */
const register=async()=>{

if(!accept) return setToast("Please accept Terms & Conditions");

if(!form.name) return setToast("Enter username");
if(!/^[A-Za-z ]+$/.test(form.name))
return setToast("Only alphabets allowed");

if(!form.email.includes("@gmail.com"))
return setToast("Invalid email");

if(form.password.length<6)
return setToast("Weak password");

if(form.password!==form.confirm)
return setToast("Passwords not match");

if(!verified)
return setToast("Verify email first");

const deviceId =
localStorage.getItem("deviceId") || crypto.randomUUID();

localStorage.setItem("deviceId",deviceId);

setSignupLoading(true);

const refCode = localStorage.getItem("refCode") ;

const res = await fetch(`/api/auth/register?ref=${refCode || ""}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: form.name,
    email: form.email,
    password: form.password,
    otp: otp.join(""),
    deviceId
  })
});

const data=await res.json();

if(!res.ok){
setToast(data.error || "Something went wrong");
setSignupLoading(false);
return;
}

localStorage.setItem("user",JSON.stringify(data.user));
router.push("/");
};

/* ================= UI ================= */

return(

<div className="wrapper">

<img src="/register.png" className="topImg"/>

<div className="card">

<h2 className="title">Register</h2>
<p className="subtitle">Please register to continue</p>

{/* NAME */}
<div className="inputBox">
<User size={18}/>
<input name="name" placeholder="Username" onChange={handleChange}/>
</div>

{/* EMAIL */}
<div className="inputBox">
<Mail size={18}/>
<input name="email" placeholder="Email" onChange={handleChange}/>

{!verified ? (
<button onClick={sendOtp} className="verifyBtn">
{verifyLoading ? <span className="dots"/> : "Verify"}
</button>
) : <span className="tick">✔</span>}
</div>

{/* PASSWORD */}
<div className="inputBox">
<Lock size={18}/>
<input type="password" name="password" placeholder="Password" onChange={handleChange}/>
</div>

{/* CONFIRM */}
<div className="inputBox">
<Lock size={18}/>
<input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange}/>
</div>
{/* REFERRAL */}
{/* <div className="inputBox">
  <User size={18}/>
  <input
    placeholder="Referral Code (Optional)"
    value={referral}
    disabled={!!new URLSearchParams(window.location.search).get("ref")}
    onChange={(e)=>setReferral(e.target.value)}
  />
</div> */}

{/* TERMS */}
<div className="terms">
<input type="checkbox" onChange={()=>setAccept(!accept)}/>
<p>
I agree to{" "}
<span onClick={()=>setShowTerms(true)}>
Terms & Conditions
</span>
</p>
</div>

{/* ERROR */}
{toast && (
  <div className="toast">
    {toast}
  </div>
)}

{/* BUTTON */}
<button onClick={register} className="btn">
{signupLoading ? "Creating..." : "Sign Up"}
</button>

<p className="login">
<h1>Already registered?{" "}</h1>
<span onClick={()=>router.push("/login")}>Login</span>
</p>

</div>

{/* OTP MODAL */}
{showOtp && (
<div className="modal">

<div className="otpBox">

<img src="/otp.png" className="otpImg"/>

<h3>Email Verification</h3>
<p className="otpSub">OTP sent to {form.email}</p>
{verifyLoading && (
  <p className="sendingOtp">
    Sending OTP...
  </p>
)}

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
<button onClick={sendOtp} className="resend">Resend</button>
)}

<div className="otpBtns">
<button onClick={manualVerify} className="verifyMain">
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

.topImg{
width:100%;
max-width:500px;
height:200px;
object-fit:cover;
padding-top:10px;
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

.sendingOtp{
  color:#2563eb;
  font-size:12px;
  margin-top:8px;
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

.verifyBtn{
background:black;
color:white;
padding:6px 10px;
border-radius:12px;
font-size:12px;
}

.tick{color:#22c55e;}

.dots{
width:16px;height:16px;
border-radius:50%;
background:white;
animation:bounce 1s infinite;
}

@keyframes bounce{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-4px)}
}

.terms{
color:gray;
display:flex;
align-items:center;
gap:6px;
font-size:11px;
}

.terms span{
padding-right:150px ;
color:gray;
font-weight:600;
cursor:pointer;
}

.btn{
padding:14px;
border-radius:25px;
background:black;
color:white;
}

.login{
display:flex;
justify-content:center;
}
.login span{
text-align:center;
font-size:14px;
color:blue;
}

h1{
font-size:14px;
}

.toast{
background:#fee2e2;
padding:10px;
border-radius:10px;
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
width:50px;height:55px;
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

`}</style>

</div>
);
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
