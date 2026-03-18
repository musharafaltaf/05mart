"use client";

import { useEffect, useState } from "react";

export default function AdminBannerPage(){

const [banners,setBanners] = useState<any[]>([]);
const [form,setForm] = useState({
title:"",
subtitle:"",
image:"",
link:""
});

const [editingId,setEditingId] = useState<string | null>(null);

/* ========================= */
/* LOAD BANNERS */
/* ========================= */

const loadBanners = async()=>{

try{

const res = await fetch("/api/banners");
const data = await res.json();
setBanners(data || []);

}catch(err){
console.log(err);
}

};

useEffect(()=>{
loadBanners();
},[]);

/* ========================= */
/* IMAGE UPLOAD */
/* ========================= */

const uploadImage = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{
method:"POST",
body:formData
});

const data = await res.json();

setForm(prev=>({
...prev,
image:data.url
}));

};

/* ========================= */
/* ADD / UPDATE */
/* ========================= */

const saveBanner = async()=>{

if(editingId){

/* UPDATE */

await fetch(`/api/banners/${editingId}`,{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(form)
});

}else{

/* ADD */

await fetch("/api/banners",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(form)
});

}

/* RESET */

setForm({
title:"",
subtitle:"",
image:"",
link:""
});

setEditingId(null);

loadBanners();

};

/* ========================= */
/* DELETE */
/* ========================= */

const deleteBanner = async(id:string)=>{

await fetch(`/api/banners/${id}`,{
method:"DELETE"
});

loadBanners();

};

/* ========================= */
/* EDIT */
/* ========================= */

const editBanner = (b:any)=>{

setForm({
title:b.title,
subtitle:b.subtitle,
image:b.image,
link:b.link || ""
});

setEditingId(b._id);

};

/* ========================= */
/* UI */
/* ========================= */

return(

<main className="max-w-5xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Banner Management
</h1>

{/* FORM */}

<div className="border p-6 rounded mb-10">

<input
placeholder="Title"
className="border p-2 w-full mb-3"
value={form.title}
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

<input
placeholder="Subtitle"
className="border p-2 w-full mb-3"
value={form.subtitle}
onChange={(e)=>setForm({...form,subtitle:e.target.value})}
/>

<input
placeholder="Link (/category/tshirts)"
className="border p-2 w-full mb-3"
value={form.link}
onChange={(e)=>setForm({...form,link:e.target.value})}
/>

<input
type="file"
className="mb-3"
onChange={(e:any)=>{
const file = e.target.files?.[0];
if(file) uploadImage(file);
}}
/>

{form.image && (
<img src={form.image} className="w-40 rounded mb-3"/>
)}

<button
onClick={saveBanner}
className="bg-black text-white px-6 py-2 rounded"
>
{editingId ? "Update Banner" : "Add Banner"}
</button>

</div>

{/* LIST */}

<div className="space-y-4">

{banners.map((b:any)=>(

<div key={b._id} className="border p-4 rounded flex gap-4 items-center">

<img src={b.image} className="w-24 h-16 object-cover rounded"/>

<div className="flex-1">

<p className="font-semibold">{b.title}</p>
<p className="text-sm text-gray-500">{b.subtitle}</p>
<p className="text-xs text-blue-600">{b.link}</p>

</div>

<button
onClick={()=>editBanner(b)}
className="px-3 py-1 border rounded"
>
Edit
</button>

<button
onClick={()=>deleteBanner(b._id)}
className="px-3 py-1 bg-red-500 text-white rounded"
>
Delete
</button>

</div>

))}

</div>

</main>

);

}