"use client";

import { useState,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar(){

const [query,setQuery] = useState("");
const [results,setResults] = useState<any[]>([]);
const [show,setShow] = useState(false);

const router = useRouter();
const boxRef = useRef<HTMLDivElement>(null);

/* LIVE SEARCH */

useEffect(()=>{

if(query.trim().length < 2){
setResults([]);
setShow(false);
return;
}

const timer = setTimeout(async()=>{

try{

const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);

if(!res.ok) return;

const data = await res.json();

setResults(data || []);
setShow(true);

}catch(err){
console.log("Search error:",err);
}

},300);

return ()=> clearTimeout(timer);

},[query]);

/* CLOSE POPUP WHEN CLICK OUTSIDE */

useEffect(()=>{

const handleClick = (e:any)=>{

if(!boxRef.current?.contains(e.target)){
setShow(false);
}

};

document.addEventListener("mousedown",handleClick);

return ()=> document.removeEventListener("mousedown",handleClick);

},[]);

/* OPEN PRODUCT */

const goProduct = (id:string)=>{

setShow(false);
router.push(`/product/${id}`);

};

return(

<div ref={boxRef} className="relative w-full max-w-xl">

<input
type="text"
placeholder="Search products..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="w-full border rounded px-4 py-2 outline-none"
/>

{/* RESULTS POPUP */}

{show && results.length > 0 && (

<div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">

{results.map((p:any)=>(
<div
key={p._id}
onClick={()=>goProduct(p._id)}
className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
>

<img
src={p.image || "/placeholder.png"}
className="w-10 h-10 object-cover rounded"
/>

<div className="flex-1">

<p className="text-sm font-medium line-clamp-1">
{p.name}
</p>

<p className="text-xs text-gray-500">
₹{p.price}
</p>

</div>

</div>
))}

</div>

)}

</div>

);

}