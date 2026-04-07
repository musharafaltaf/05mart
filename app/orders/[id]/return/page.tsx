"use client";

import { useParams,useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReturnPage(){

/* ========================= */
/* TEST MODE */
/* ========================= */

const TEST_MODE = true; 
const RETURN_FEE = TEST_MODE ? 1 : 70;

/* ========================= */

const params = useSearchParams();
const { id } = useParams();
const router = useRouter();

const STORE_UPI="daraamir369369@okhdfcbank";

/* ========================= */

const [order,setOrder]=useState<any>(null);

const [reason,setReason]=useState("");
const [refundMethod,setRefundMethod]=useState("upi");
const [chargeOption,setChargeOption]=useState("deduct");

const [upi,setUpi]=useState("");

const [bank,setBank]=useState({
holder:"",
bankName:"",
account:"",
confirm:"",
ifsc:""
});

/* ========================= */
/* BUTTON STATES */
/* ========================= */

const [payLoading,setPayLoading]=useState(false);
const [submitLoading,setSubmitLoading]=useState(false);
const [cancelLoading,setCancelLoading]=useState(false);

/* ========================= */
/* IMAGES */
/* ========================= */

const [front,setFront]=useState("");
const [side,setSide]=useState("");
const [defect,setDefect]=useState("");
const [packageImg,setPackageImg]=useState("");

/* ========================= */
/* PAYMENT */
/* ========================= */

const [paid,setPaid]=useState(false);

useEffect(()=>{

if(params.get("paid")==="true"){
setPaid(true);
setChargeOption("pay");
}

},[]);

const [paymentPending,setPaymentPending]=useState(false);
const [paymentSuccess,setPaymentSuccess]=useState(false);
const [paymentFailed,setPaymentFailed]=useState(false);

/* ========================= */
/* DEVICE CHECK */
/* ========================= */

const isMobile=()=>{
return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

/* ========================= */
/* LOAD ORDER */
/* ========================= */

useEffect(()=>{

const load=async()=>{

const res = await fetch(`/api/orders/${id}`);

if(!res.ok){
console.log("API ERROR", await res.text());
return;
}

const data = await res.json();
setOrder(data);

};

load();

},[]);

/* ========================= */
/* LOAD RAZORPAY SCRIPT */
/* ========================= */

useEffect(()=>{

if((window as any).Razorpay) return;

const script=document.createElement("script");
script.src="https://checkout.razorpay.com/v1/checkout.js";
document.body.appendChild(script);

},[]);

/* ========================= */
/* IMAGE UPLOAD */
/* ========================= */

const readImage=(file:any,setter:any)=>{

if(!file) return;

const reader=new FileReader();

reader.onload=(e:any)=>{
setter(e.target.result);
};

reader.readAsDataURL(file);

};

/* ========================= */
/* PAYMENT */
/* ========================= */

const payReturnCharge=async()=>{

setPayLoading(true);

try{

/* MOBILE UPI */

if(isMobile()){

const link=`upi://pay?pa=${STORE_UPI}&pn=05Mart&am=${RETURN_FEE}&cu=INR`;

window.location.href=link;

setTimeout(()=>{
setPaymentPending(true);
setPayLoading(false);
},1500);

return;

}

/* DESKTOP RAZORPAY */

const res=await fetch("/api/return-payment",{method:"POST"});
const data=await res.json();

const rzp=new (window as any).Razorpay({

key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

amount:data.amount,
currency:"INR",
order_id:data.id,

name:"05Mart",
description:"Return Fee",

handler:function(){

router.push(`/return-payment-success?id=${id}`);

},

modal:{
ondismiss:function(){
router.push(`/return-payment-failed?id=${id}`);
}
}

});

rzp.open();

}catch(err){

console.log(err);

}

setPayLoading(false);

};

/* ========================= */
/* SUBMIT RETURN */
/* ========================= */

const submitReturn=async()=>{

setSubmitLoading(true);

if(!reason){
alert("Select reason");
setSubmitLoading(false);
return;
}

if(refundMethod==="upi"&&!upi){
alert("Enter UPI ID");
setSubmitLoading(false);
return;
}

if(refundMethod==="bank"){

if(!bank.holder||!bank.bankName||!bank.account||!bank.confirm||!bank.ifsc){
alert("Fill bank details");
setSubmitLoading(false);
return;
}

if(bank.account!==bank.confirm){
alert("Account mismatch");
setSubmitLoading(false);
return;
}

}

await fetch(`/api/orders/${id}`,{

method:"PATCH",
headers:{ "Content-Type":"application/json"},

body:JSON.stringify({

status:"return_requested",

returnRequest:{
requested:true,
reason,

images:[front,side,defect,packageImg].filter(Boolean),

refundMethod,

charge:RETURN_FEE,

refundDetails:{
accountHolder:bank.holder,
bankName:bank.bankName,
accountNumber:bank.account,
ifsc:bank.ifsc,
upiId:upi
},

status:"requested"
}

})

});

router.push(`/returns/${id}`);

};

/* ========================= */

if(!order){
return <p className="p-10 text-center">Loading...</p>
}

const item=order.items[0];

/* ========================= */
/* RETURN TIMER */
/* ========================= */

const deliveryTime = new Date(order.deliveredAt || order.createdAt).getTime();
const now = Date.now();

const returnDeadline = deliveryTime + (48 * 60 * 60 * 1000);

const remaining = returnDeadline - now;
const returnAllowed = remaining > 0;

/* ========================= */
/* REFUND */
/* ========================= */

const refundAmount =
chargeOption==="deduct"
? item.price-RETURN_FEE
: item.price;
return(

<main className="max-w-3xl mx-auto p-4 space-y-8">

{/* PRODUCT SUMMARY */}

<div className="border rounded-xl p-5 bg-gray-50 shadow-sm">

<h2 className="font-semibold mb-3 text-lg">
Return Summary
</h2>

<div className="flex justify-between text-sm">
<span>Product Price</span>
<span>₹{item.price}</span>
</div>

<div className="flex justify-between text-sm">
<span>Return Fee</span>
<span>₹{RETURN_FEE}</span>
</div>

<hr className="my-2"/>

<div className="flex justify-between font-bold text-lg">

<span>Expected Refund</span>

<span>

₹{chargeOption==="deduct"
? item.price - RETURN_FEE
: item.price}

</span>

</div>

</div>

{/* RETURN REASON */}

<div>

<h2 className="font-semibold mb-3">
Select Return Reason
</h2>

<div className="grid gap-3">

{[
["wrong_size","Wrong Size"],
["damaged","Damaged Product"],
["quality","Quality Issue"],
["wrong_item","Wrong Item Received"],
["mistake","Ordered by Mistake"]
].map((r)=>(
<label
key={r[0]}
className={`reasonCard ${reason===r[0]?"active":""}`}
>

<input
hidden
type="radio"
value={r[0]}
checked={reason===r[0]}
onChange={(e)=>setReason(e.target.value)}
/>

<div className="flex justify-between items-center">

<span>{r[1]}</span>

{reason===r[0] && (
<span className="text-green-600 font-semibold">✓</span>
)}

</div>

</label>
))}

</div>

</div>

{/* IMAGE UPLOAD */}

{reason!=="mistake" &&(

<div>

<h2 className="font-semibold mb-3">
Upload Images
</h2>

<div className="grid grid-cols-2 gap-4">

<label className="uploadBox">
Front View
<input type="file" hidden
onChange={(e:any)=>readImage(e.target.files?.[0],setFront)}
/>
</label>

<label className="uploadBox">
Side View
<input type="file" hidden
onChange={(e:any)=>readImage(e.target.files?.[0],setSide)}
/>
</label>

</div>

<div className="flex gap-3 mt-3">

{front && <img src={front} className="previewImg"/>}
{side && <img src={side} className="previewImg"/>}

</div>

</div>

)}

{/* REFUND METHOD */}

<div>

<h2 className="font-semibold mb-3">
Refund Method
</h2>

<label className="flex gap-2 mb-2">
<input type="radio"
checked={refundMethod==="upi"}
onChange={()=>setRefundMethod("upi")}
/>
UPI Refund
</label>

<label className="flex gap-2">
<input type="radio"
checked={refundMethod==="bank"}
onChange={()=>setRefundMethod("bank")}
/>
Bank Refund
</label>

{refundMethod==="upi" &&(

<input
placeholder="Enter UPI ID"
className="border p-2 w-full mt-3 rounded"
value={upi}
onChange={(e)=>setUpi(e.target.value)}
/>

)}

{refundMethod==="bank" &&(

<div className="space-y-2 mt-3">

<input placeholder="Account Holder"
className="border p-2 w-full rounded"
onChange={(e)=>setBank({...bank,holder:e.target.value})}
/>

<input placeholder="Bank Name"
className="border p-2 w-full rounded"
onChange={(e)=>setBank({...bank,bankName:e.target.value})}
/>

<input placeholder="Account Number"
className="border p-2 w-full rounded"
onChange={(e)=>setBank({...bank,account:e.target.value})}
/>

<input placeholder="Confirm Account"
className="border p-2 w-full rounded"
onChange={(e)=>setBank({...bank,confirm:e.target.value})}
/>

<input placeholder="IFSC Code"
className="border p-2 w-full rounded"
onChange={(e)=>setBank({...bank,ifsc:e.target.value})}
/>

</div>

)}

</div>

{/* RETURN FEE */}

<div className="border rounded-xl p-5 shadow-sm">

<h2 className="font-semibold mb-3">
Return Fee
</h2>

{!paid &&(

<div className="space-y-3">

<label className="flex gap-2">
<input
type="radio"
checked={chargeOption==="pay"}
onChange={()=>setChargeOption("pay")}
/>
Pay ₹{RETURN_FEE} Now
</label>

<label className="flex gap-2">
<input
type="radio"
checked={chargeOption==="deduct"}
onChange={()=>setChargeOption("deduct")}
/>
Deduct ₹{RETURN_FEE} From Refund
</label>

</div>

)}

{chargeOption==="pay" && !paid &&(

<button
onClick={payReturnCharge}
disabled={payLoading}
className="payBtn"
>
{payLoading ? "Processing Payment..." : `Pay ₹${RETURN_FEE}`}
</button>

)}

{paid && (

<div className="bg-green-100 text-green-700 p-3 rounded mt-3 text-sm">

✔ Return fee already paid.  
You can now submit your return.

</div>

)}

</div>

{/* ACTION BUTTONS */}

<div className="flex gap-3">

<button
onClick={()=>{
setCancelLoading(true)
router.back()
}}
className="cancelBtn"
>
{cancelLoading ? "Cancelling..." : "Cancel"}
</button>

<button
onClick={submitReturn}
disabled={!returnAllowed || (chargeOption==="pay" && !paid)}
className="submitBtn"
>
{submitLoading ? "Submitting Return..." : "Submit Return"}
</button>

</div>

{/* RETURN WINDOW */}

{returnAllowed ? (

<div className="bg-yellow-50 border p-3 rounded text-sm">

Return available for  
<b> {Math.floor(remaining/3600000)} hours </b>

</div>

) : (

<div className="bg-red-100 text-red-600 p-3 rounded">

Return window closed

</div>

)}

<style jsx>{`

.reasonCard{
border:1px solid #ddd;
padding:14px;
border-radius:12px;
cursor:pointer;
transition:.2s;
}

.reasonCard:hover{
background:#fafafa;
transform:scale(1.02);
}

.reasonCard.active{
border:2px solid black;
background:#fafafa;
}

.uploadBox{
border:2px dashed #ccc;
padding:22px;
text-align:center;
border-radius:12px;
cursor:pointer;
transition:.2s;
}

.uploadBox:hover{
border-color:black;
transform:scale(1.02);
}

.previewImg{
width:90px;
border-radius:8px;
}

/* PAY BUTTON */

.payBtn{
width:100%;
margin-top:16px;
padding:16px;
border-radius:12px;
background:linear-gradient(135deg,#16a34a,#22c55e);
color:white;
font-weight:600;
font-size:16px;
transition:.25s;
box-shadow:0 6px 20px rgba(0,0,0,.15);
}

.payBtn:hover{
transform:translateY(-2px);
box-shadow:0 10px 25px rgba(0,0,0,.2);
}

/* SUBMIT */

.submitBtn{
width:100%;
padding:16px;
border-radius:12px;
background:black;
color:white;
font-weight:600;
transition:.25s;
}

.submitBtn:hover{
background:#111;
transform:translateY(-2px);
}

/* CANCEL */

.cancelBtn{
width:100%;
padding:16px;
border-radius:12px;
border:1px solid #ddd;
background:white;
font-weight:600;
transition:.25s;
}

.cancelBtn:hover{
background:#f3f4f6;
}

`}</style>

</main>

);
}