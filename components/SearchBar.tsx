"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar(){

const [query,setQuery] = useState("");
const [results,setResults] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const router = useRouter();

useEffect(()=>{

if(query.trim().length < 2){
setResults([]);
setLoading(false);
return;
}

setLoading(true);

const timer = setTimeout(async()=>{

try{

const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);

if(!res.ok) return;

const data = await res.json();

setResults(data || []);

}catch(err){
console.log(err);
}

setLoading(false);

},300);

return ()=>clearTimeout(timer);

},[query]);

const goProduct=(id:string)=>{
router.push(`/product/${id}`);
};

return(

<div className="searchContainer">

{/* INPUT */}
<div className="inputWrap">

<input
autoFocus
type="text"
placeholder="Search for products..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="searchInput"
/>

</div>

{/* RESULTS */}
{(loading || results.length>0) && (

<div className="results">

{/* 🔥 SKELETON */}
{loading && (
<>
{[1,2,3].map(i=>(
<div key={i} className="resultItem">

<div className="img shimmer"></div>

<div className="flex-1 space-y-2">
<div className="line shimmer"></div>
<div className="line small shimmer"></div>
</div>

</div>
))}
</>
)}

{/* REAL DATA */}
{!loading && results.map((p:any)=>(

<div
key={p._id}
className="resultItem real"
onClick={()=>goProduct(p._id)}
>

<img src={p.image || "/placeholder.png"} />

<div className="info">
<p>{p.name}</p>
<span>₹{p.price}</span>
</div>

</div>

))}

</div>

)}

<style jsx>{`

.searchContainer{
width:100%;
position:relative;
}

/* INPUT WRAP */

.inputWrap{
position:relative;
}

/* INPUT */

.searchInput{
width:100%;
padding:14px 16px;
border:1px solid #e5e7eb;
border-radius:14px;
font-size:15px;
outline:none;

transition:.25s;

background:#fafafa;
}

.searchInput:focus{
border-color:#ff7a00;
box-shadow:0 0 0 3px rgba(255,122,0,0.15);
background:white;
}

/* RESULTS */

.results{
position:absolute;
top:55px;
left:0;
right:0;

background:rgba(255,255,255,0.95);
backdrop-filter:blur(12px);

border-radius:14px;

box-shadow:
0 20px 40px rgba(0,0,0,.12),
0 6px 12px rgba(0,0,0,.08);

overflow:hidden;

animation:fadeIn .25s ease;
z-index:100;
}

/* ITEM */

.resultItem{
display:flex;
gap:12px;
padding:12px;
align-items:center;
}

.resultItem.real{
cursor:pointer;
transition:.2s;
}

.resultItem.real:hover{
background:#f9fafb;
}

/* IMAGE */

.resultItem img,
.img{
width:48px;
height:48px;
border-radius:10px;
object-fit:cover;
background:#eee;
}

/* TEXT */

.info p{
font-size:14px;
font-weight:500;
line-height:1.2;
}

.info span{
font-size:12px;
color:#666;
}

/* SKELETON */

.line{
height:10px;
background:#e5e7eb;
border-radius:6px;
width:120px;
}

.line.small{
width:60px;
}

/* SHIMMER */

.shimmer{
position:relative;
overflow:hidden;
}

.shimmer::after{
content:"";
position:absolute;
top:0;
left:-100%;
width:100%;
height:100%;
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.6),
transparent
);
animation:shimmer 1.2s infinite;
}

/* ANIMATION */

@keyframes shimmer{
100%{left:100%;}
}

@keyframes fadeIn{
from{
opacity:0;
transform:translateY(10px);
}
to{
opacity:1;
transform:translateY(0);
}
}

`}</style>

</div>

);
}