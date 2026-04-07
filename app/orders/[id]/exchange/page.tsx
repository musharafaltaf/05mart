"use client";

import { TEST_MODE } from "@/app/lib/testMode";
import { useParams,useRouter } from "next/navigation";
import { useEffect,useState } from "react";

export default function ExchangePage(){

const { id } = useParams();
const router = useRouter();

const STORE_UPI="daraamir369369@okhdfcbank";

const [order,setOrder]=useState<any>(null);
const [products,setProducts]=useState<any[]>([]);

const [step,setStep]=useState(1);
const [reason,setReason]=useState("");

const [front,setFront]=useState("");
const [side,setSide]=useState("");
const [defect,setDefect]=useState("");

const [selectedProduct,setSelectedProduct]=useState<any>(null);
const [newSize,setNewSize]=useState("");

const [loading,setLoading]=useState(false);

const [paymentStep,setPaymentStep] = useState("Preparing Payment");

/* LOAD DATA */

/* LOAD DATA */

useEffect(()=>{

const load=async()=>{

const res=await fetch(`/api/orders/${id}`);
const data=await res.json();
setOrder(data);

const p=await fetch("/api/products");
const pdata=await p.json();
setProducts(pdata);

};

load();

},[]);

/* ========================= */
/* LOAD RAZORPAY SCRIPT */
/* ========================= */

useEffect(() => {

if ((window as any).Razorpay) return;

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.async = true;

document.body.appendChild(script);

}, []);

/* IMAGE READER */

const readImage=(file:any,setter:any)=>{

if(!file) return;

const reader=new FileReader();

reader.onload=(e:any)=>{
setter(e.target.result);
};

reader.readAsDataURL(file);

};

/* NAVIGATION */

const goBack=()=>{
if(step>1) setStep(step-1);
};

const cancelExchange=()=>{
router.push("/");
};

if(!order) return <p className="p-10 text-center">Loading...</p>;

const item=order.items[0];

/* FILTER PRODUCTS */

const suggestions=products.filter((p:any)=>{

if(p.price < item.price) return false;

if(item.category && p.category!==item.category) return false;

if(!p.sizeStock) return false;

const totalStock = (Object.values(p.sizeStock) as number[]).reduce((a:number,b:number)=>a+b,0);

if(totalStock<=0) return false;

return true;

});

/* PRICE */

const originalPrice=item.price;
const replacementPrice=selectedProduct?.price || originalPrice;

const difference=Math.max(0,replacementPrice-originalPrice);

const exchangeFee = TEST_MODE ? 0 : 70;

const totalPayable=difference+exchangeFee;

/* MOBILE CHECK */

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
};

/* PAYMENT */





// const payExchange = async () => {

// setLoading(true);




const payExchange = async () => {

if(!selectedProduct || !newSize){
alert("Please select replacement product and size");
return;
}

setLoading(true);
setPaymentStep("Creating Exchange Request");

if(TEST_MODE){

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
exchangeRequest:{
requested:true,
reason,
images:[front,side,defect].filter(Boolean),

originalProduct:{
id:item._id,
name:item.name,
image:item.image,
size:item.size,
price:item.price
},

replacementProduct:{
id:selectedProduct._id,
name:selectedProduct.name,
image:selectedProduct.image,
price:selectedProduct.price,
size:newSize
},

newSize,
charge:0,
paymentMethod:"test",
paymentProof:"TEST_PAYMENT",
status:"payment_done"
}
})
});
setPaymentStep("Confirming Exchange");

router.replace(`/exchange-payment-success?id=${id}`);
return;
}
setLoading(true);






/* ================= MOBILE ================= */

if(isMobile()){

const link = `upi://pay?pa=${STORE_UPI}&pn=05Mart&am=${totalPayable}&cu=INR`;

window.location.href = link;

setTimeout(()=>{

const confirmPayment = confirm(
"After completing payment in your UPI app, click OK to confirm."
);

if(confirmPayment){
router.push(`/exchange-payment-success?id=${id}`);
}else{
router.push(`/exchange-payment-failed?id=${id}`);
}

},1500);

return;

}

/* ================= DESKTOP ================= */

try{

const res = await fetch("/api/exchange-payment",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({ amount: totalPayable })
});

const data = await res.json();

if(!data?.id){
alert("Payment gateway error");
setLoading(false);
return;
}

const Razorpay = (window as any).Razorpay;

const rzp = new Razorpay({

key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

amount: data.amount,

currency:"INR",

order_id:data.id,

name:"05Mart",

description:"Exchange Payment",

handler: async function (response) {
setPaymentStep("Verifying Payment");

const verify = await fetch("/api/verify-exchange-payment",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({
razorpay_order_id: response.razorpay_order_id,
razorpay_payment_id: response.razorpay_payment_id,
razorpay_signature: response.razorpay_signature
})
});

const data = await verify.json();

if(data.success){

await fetch(`/api/orders/${id}`,{
method:"PATCH",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
exchangeRequest:{
requested:true,
reason,
images:[front,side,defect].filter(Boolean),

originalProduct:{
id:item._id,
name:item.name,
image:item.image,
size:item.size,
price:item.price
},

replacementProduct:{
id:selectedProduct._id,
name:selectedProduct.name,
image:selectedProduct.image,
price:selectedProduct.price,
size:newSize
},

charge:exchangeFee,
paymentMethod :"Razorpay",
paymentProof:"",
status:"payment_done"
}
})
});

setPaymentStep("Confirming Exchange");

router.push(`/exchange-payment-success?id=${id}`);

}else{
router.push(`/exchange-payment-failed?id=${id}`);
}

},

modal:{
ondismiss:function(){
router.push(`/exchange-payment-failed?id=${id}`);
}
}

});

rzp.open();

}catch(err){

console.log("Payment error:",err);
router.push(`/exchange-payment-failed?id=${id}`);

}

};


return(

<main className="max-w-3xl mx-auto p-4 space-y-8">

<button
onClick={goBack}
className="text-sm text-gray-500"
>
← Back
</button>

{/* STEP BAR */}

<div className="flex justify-between text-xs">

{["Reason","Replacement","Pickup","Payment"].map((s,i)=>{

const active=step>=i+1;

return(

<div key={s} className="flex-1 text-center">

<div className={`h-2 rounded-full mb-1 ${active ? "bg-black":"bg-gray-200"}`}></div>

<span className={active?"font-semibold":""}>
{s}
</span>

</div>

);

})}

</div>

{/* STEP 1 */}

{step===1 && (

<div className="space-y-4">

<h2 className="font-semibold text-lg">
Why do you want to exchange?
</h2>

<div className="grid gap-3">

<button
onClick={()=>setReason("size")}
className={`reasonCard ${reason==="size"?"active":""}`}
>
Wrong Size
</button>

<button
onClick={()=>setReason("quality")}
className={`reasonCard ${reason==="quality"?"active":""}`}
>
Quality Issue
</button>

<button
onClick={()=>setReason("damage")}
className={`reasonCard ${reason==="damage"?"active":""}`}
>
Damaged Product
</button>

</div>

{/* IMAGE UPLOAD */}

<div className="uploadGrid">

<label className="uploadBox">

{front
? <img src={front} className="preview"/>
: <span>Front Image</span>
}

<input
type="file"
hidden
onChange={(e)=>readImage(e.target.files?.[0],setFront)}
/>

</label>

<label className="uploadBox">

{side
? <img src={side} className="preview"/>
: <span>Side Image</span>
}

<input
type="file"
hidden
onChange={(e)=>readImage(e.target.files?.[0],setSide)}
/>

</label>

{reason==="damage" && (

<label className="uploadBox">

{defect
? <img src={defect} className="preview"/>
: <span>Defect Image</span>
}

<input
type="file"
hidden
onChange={(e)=>readImage(e.target.files?.[0],setDefect)}
/>

</label>

)}

</div>

<button
disabled={!reason}
onClick={()=>setStep(2)}
className="bg-black text-white w-full py-3 rounded"
>
Continue
</button>

</div>

)}

{/* STEP 2 */}

{step===2 && (

<div className="space-y-6">

<h2 className="font-semibold text-lg">
Select Replacement Product
</h2>

<div className="grid grid-cols-2 gap-4">

{suggestions.slice(0,6).map((p:any)=>(

<div
key={p._id}
onClick={()=>setSelectedProduct(p)}
className={`productCard ${selectedProduct?._id===p._id?"selected":""}`}
>

<img src={p.image} className="h-28 w-full object-cover rounded"/>

<p className="text-sm mt-1">{p.name}</p>

<p className="font-semibold">₹{p.price}</p>

</div>

))}

</div>

{selectedProduct && (

<div className="space-y-3">

<h3 className="font-medium">Select Size</h3>

<div className="flex gap-3 flex-wrap">

{Object.entries(selectedProduct.sizeStock || {}).map(([size,qty]:any)=>{

const out=qty<=0;

return(

<div key={size} className="text-center">

<button
disabled={out}
onClick={()=>setNewSize(size)}
className={`sizeBtn ${newSize===size?"active":""}`}
>
{size}
</button>

<p className={`text-xs mt-1 ${out?"text-red-500":"text-green-600"}`}>
{out ? "Out of stock" : `Only ${qty} left`}
</p>

</div>

);

})}

</div>

<button
disabled={!newSize}
onClick={()=>setStep(3)}
className="bg-black text-white w-full py-3 rounded"
>
Continue
</button>

</div>

)}

</div>

)}

{/* STEP 3 */}

{step===3 && (

<div className="space-y-4">

<h2 className="font-semibold text-lg">
Pickup Scheduled
</h2>

<div className="pickupCard">

<p className="font-medium">
Pickup will happen within 24–48 hours
</p>

<p className="text-sm text-gray-500">
Our delivery partner will contact you.
Please keep the product packed.
</p>

</div>

<button
onClick={()=>setStep(4)}
className="bg-black text-white w-full py-3 rounded"
>
Continue to Payment
</button>

</div>

)}

{/* STEP 4 */}

{step===4 && (

<div className="space-y-4">

<h2 className="font-semibold text-lg">
Payment Summary
</h2>

<div className="border rounded-lg p-4 bg-gray-50 space-y-2">

<div className="flex justify-between">
<span>Original Product</span>
<span>₹{originalPrice}</span>
</div>

<div className="flex justify-between">
<span>Replacement Product</span>
<span>₹{replacementPrice}</span>
</div>

<div className="flex justify-between">
<span>Exchange Fee</span>
<span>₹{exchangeFee}</span>
</div>

<div className="flex justify-between">
<span>Price Difference</span>
<span>₹{difference}</span>
</div>

<hr/>

<div className="flex justify-between font-bold">
<span>Total Payable</span>
<span>₹{totalPayable}</span>
</div>

</div>

<button
disabled={loading}
onClick={payExchange}
className={`w-full py-3 rounded flex items-center justify-center gap-2 transition
${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900 text-white"}
`}
>

{loading && (
<span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
)}

{loading ? "Processing Payment..." : `Pay ₹${totalPayable} & Confirm Exchange`}

</button>

<button
onClick={cancelExchange}
className="border w-full py-3 rounded"
>
Cancel Exchange
</button>

</div>

)}

<style jsx>{`

.reasonCard{
border:1px solid #ddd;
padding:14px;
border-radius:10px;
cursor:pointer;
}

.reasonCard.active{
border:2px solid black;
background:#f6f6f6;
}

.uploadGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
gap:12px;
}

.uploadBox{
border:2px dashed #ddd;
padding:20px;
border-radius:10px;
text-align:center;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
height:120px;
background:#fafafa;
}

.preview{
width:100%;
height:100%;
object-fit:cover;
border-radius:8px;
}

.productCard{
border:1px solid #ddd;
padding:10px;
border-radius:10px;
cursor:pointer;
}

.productCard.selected{
border:2px solid black;
}

.sizeBtn{
border:1px solid #ddd;
padding:6px 10px;
border-radius:6px;
}

.sizeBtn.active{
background:black;
color:white;
}

.pickupCard{
border:1px solid #eee;
padding:16px;
border-radius:10px;
background:#fafafa;
}

`}</style>

</main>

);

}