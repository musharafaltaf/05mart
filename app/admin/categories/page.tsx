"use client";

import { useState,useEffect } from "react";

export default function CategoryAdmin(){

const [name,setName] = useState("");
const [image,setImage] = useState("");
const [categories,setCategories] = useState<any[]>([]);

const load = async()=>{
const res = await fetch("/api/categories");
const data = await res.json();
setCategories(data);
};

useEffect(()=>{load();},[]);

const upload = async(e:any)=>{

const file = e.target.files[0];

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:formData});
const data = await res.json();

setImage(data.url);

};

const add = async()=>{

await fetch("/api/categories",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,image})
});

setName("");
setImage("");
load();

};

return(

<main className="max-w-6xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Categories
</h1>

<input
placeholder="Category name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2"
/>

<input type="file" onChange={upload}/>

<button
onClick={add}
className="bg-black text-white px-4 py-2"
>
Add Category
</button>

<div className="grid grid-cols-4 gap-6 mt-10">

{categories.map((c:any)=>(
<div key={c._id}>
<img src={c.image} className="rounded"/>
<p>{c.name}</p>
</div>
))}

</div>

</main>

);

}