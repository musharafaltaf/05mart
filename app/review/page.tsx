"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { main } from "framer-motion/client";

export default function ReviewPage(){

const router = useRouter();
const fileRef = useRef<HTMLInputElement>(null);

const [product,setProduct] = useState<any>(null);
const [rating,setRating] = useState(0);
const [hover,setHover] = useState(0);
const [comment,setComment] = useState("");
const [images,setImages] = useState<string[]>([]);
const [loading,setLoading] = useState(false);

const [fit,setFit] = useState("");
const [preview,setPreview] = useState<string | null>(null);
const [success,setSuccess] = useState(false);
const [drag,setDrag] = useState(false);

const suggestions=[
"Great quality",
"Fast delivery",
"Good packaging",
"Value for money",
"Perfect fit"
];

const ratingLabels=["","Very Bad","Poor","Average","Good","Excellent"];

useEffect(()=>{

const load = async()=>{

/* GET PRODUCT ID FROM URL FIRST */

const params = new URLSearchParams(window.location.search)
let productId = params.get("productId")

/* FALLBACK TO LOCAL STORAGE */

if(!productId){
productId = localStorage.getItem("reviewProduct")
}

if(!productId){
setProduct(null)
return
}

/* CHECK IF USER ALREADY REVIEWED */

const user = JSON.parse(localStorage.getItem("user") || "{}")

if(user?._id){

try{

const check = await fetch(
`/api/reviews/check?productId=${productId}&userId=${user._id}`
)

const result = await check.json()

if(result.exists){
setProduct(null)
return
}

}catch(err){
console.log("Review check error",err)
}

}

/* LOAD PRODUCT */

try{

const res = await fetch(`/api/products/${productId}`)

if(!res.ok){
setProduct(null)
return
}

const data = await res.json()
setProduct(data)

}catch(err){
console.log(err)
setProduct(null)
}

}

load()

},[])
/* ========================= */
/* IMAGE PROCESS */
/* ========================= */

const processFiles=(files:any)=>{

if(!files) return;

const arr=[...images];

for(let file of files){

if(arr.length>=5) break;

const reader=new FileReader();

reader.onload=(e:any)=>{

arr.push(e.target.result);
setImages([...arr]);

};

reader.readAsDataURL(file);

}

};

/* ========================= */

const handleDrop=(e:any)=>{
e.preventDefault();
setDrag(false);
processFiles(e.dataTransfer.files);
};

const openPicker=()=>{
fileRef.current?.click();
};

const removeImage=(i:number)=>{
const arr=[...images];
arr.splice(i,1);
setImages(arr);
};

const addSuggestion=(text:string)=>{
setComment((prev)=>prev+" "+text);
};

/* ========================= */
/* SUBMIT REVIEW */
/* ========================= */

const submitReview=async()=>{

const user=JSON.parse(localStorage.getItem("user")||"{}");

if(!rating){
alert("Please select rating");
return;
}

setLoading(true);

await fetch("/api/reviews",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

productId:product?._id,
userId:user._id,
userName:user.name,
rating,
comment,
images

})

});

localStorage.removeItem("reviewProduct");

setSuccess(true);

setTimeout(()=>{
router.push("/review/success");
},1500);

};

/* ========================= */
/* ALREADY REVIEWED UI */
/* ========================= */

if(product === null){

return(

<main className="p-10 text-center">

<h2 className="text-xl font-semibold">
Product not found
</h2>

<p className="text-gray-500 mt-2">
This review link may be invalid.
</p>

<button
onClick={()=>router.push("/")}
className="mt-6 bg-black text-white px-6 py-2 rounded"
>
Continue Shopping
</button>

</main>

);

}

/* ========================= */
/* MAIN UI */
/* ========================= */

return(

<main className="container">

<h1 className="title">Write a Review</h1>

<div className="productCard">

<img src={product.image} className="productImg"/>

<div>

<p className="name">{product.name}</p>

<p className="price">₹{product.price}</p>

<span className="verified">✔ Verified Purchase</span>

</div>

</div>

{/* RATING */}

<div>

<p className="label">Overall Rating</p>

<div className="stars">

{[1,2,3,4,5].map((n)=>(
<button
key={n}
onMouseEnter={()=>setHover(n)}
onMouseLeave={()=>setHover(0)}
onClick={()=>setRating(n)}
className={`star ${(hover||rating)>=n?"active":""}`}
>
★
</button>
))}

</div>

<p className="ratingLabel">{ratingLabels[rating]}</p>

</div>

{/* FIT */}

<select value={fit} onChange={(e)=>setFit(e.target.value)} className="select">

<option value="">Select Fit</option>
<option>Too Small</option>
<option>Perfect Fit</option>
<option>Too Large</option>

</select>

{/* COMMENT */}

<textarea
placeholder="Share your experience..."
value={comment}
maxLength={500}
onChange={(e)=>setComment(e.target.value)}
className="comment"
/>

<p className="counter">{comment.length} / 500</p>

{/* SUGGESTIONS */}

<div className="suggestions">

{suggestions.map((s,i)=>(
<button key={i} onClick={()=>addSuggestion(s)} className="chip">
{s}
</button>
))}

</div>

{/* IMAGE UPLOAD */}

<div
className={`drop ${drag?"drag":""}`}
onDragOver={(e)=>{e.preventDefault();setDrag(true)}}
onDragLeave={()=>setDrag(false)}
onDrop={handleDrop}
onClick={openPicker}
>

<input
ref={fileRef}
type="file"
accept="image/*"
multiple
hidden
onChange={(e)=>processFiles(e.target.files)}
/>

<p>📸 Tap to upload or drag photos</p>
<p className="small">Max 5 images</p>

</div>

{/* PREVIEW */}

<div className="grid">

{images.map((img,i)=>(
<div key={i} className="imgWrap">

<img
src={img}
className="preview"
onClick={()=>setPreview(img)}
/>

<button onClick={()=>removeImage(i)} className="remove">✕</button>

</div>
))}

</div>

{/* IMAGE VIEWER */}

{preview &&(

<div className="modal" onClick={()=>setPreview(null)}>
<img src={preview} className="modalImg"/>
</div>

)}

{/* SUCCESS */}

{success &&(
<div className="success">
🎉 Thank you for your review!
</div>
)}

<button
onClick={submitReview}
disabled={loading}
className="submit"
>

{loading?"Submitting...":"Submit Review"}

</button>




<style jsx>{`

.container{
max-width:650px;
margin:auto;
padding:20px;
display:flex;
flex-direction:column;
gap:22px;
}

.productCard{
display:flex;
gap:16px;
border:1px solid #eee;
padding:16px;
border-radius:12px;
}

.productImg{
width:90px;
height:90px;
object-fit:cover;
border-radius:10px;
}

.price{
color:#16a34a;
font-weight:600;
}

.verified{
font-size:12px;
color:#16a34a;
}

.stars{
display:flex;
gap:6px;
}

.star{
font-size:34px;
color:#ddd;
transition:.2s;
}

.star:hover{
transform:scale(1.1);
}

.star.active{
color:#fbbf24;
}

.comment{
width:100%;
border:1px solid #ddd;
padding:12px;
border-radius:8px;
min-height:100px;
}

.counter{
font-size:12px;
color:#777;
text-align:right;
}

.suggestions{
display:flex;
flex-wrap:wrap;
gap:8px;
}

.chip{
border:1px solid #ddd;
padding:6px 12px;
border-radius:20px;
font-size:12px;
background:#f9f9f9;
cursor:pointer;
}

.chip:hover{
background:#eee;
}

.drop{
border:2px dashed #ccc;
padding:30px;
text-align:center;
border-radius:12px;
cursor:pointer;
}

.drop.drag{
background:#fafafa;
border-color:black;
}

.small{
font-size:12px;
color:#777;
}

.grid{
display:flex;
flex-wrap:wrap;
gap:10px;
}

.imgWrap{
position:relative;
}

.preview{
width:80px;
height:80px;
object-fit:cover;
border-radius:8px;
cursor:pointer;
}

.remove{
position:absolute;
top:-6px;
right:-6px;
background:black;
color:white;
border:none;
border-radius:50%;
width:18px;
height:18px;
font-size:12px;
}

.modal{
position:fixed;
inset:0;
background:rgba(0,0,0,.8);
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
}

.modalImg{
max-width:90%;
max-height:90%;
border-radius:12px;
}

.success{
background:#dcfce7;
padding:14px;
border-radius:10px;
text-align:center;
font-weight:600;
}

.submit{
background:black;
color:white;
padding:16px;
border-radius:10px;
font-weight:600;
cursor:pointer;
}

.submit:hover{
opacity:.9;
}

`}
</style>
</main>
);
}