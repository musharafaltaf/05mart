"use client";

import { useState,useEffect } from "react";

export default function BannerAdmin(){

const [form,setForm] = useState({
title:"",
subtitle:"",
buttonText:"",
buttonLink:"",
image:""
});

const [banners,setBanners] = useState<any[]>([]);

const load = async()=>{
const res = await fetch("/api/banners");
const data = await res.json();
setBanners(data);
};

useEffect(()=>{load();},[]);

const upload = async(e:any)=>{

const file = e.target.files[0];

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:formData});
const data = await res.json();

setForm({...form,image:data.url});

};

const handleChange=(e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const addBanner = async()=>{

await fetch("/api/banners",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
});

setForm({
title:"",
subtitle:"",
buttonText:"",
buttonLink:"",
image:""
});

load();

};

return(

<main className="max-w-6xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Hero Banner Panel
</h1>

<div className="grid gap-4 max-w-md">

<input
name="title"
placeholder="Banner Title"
value={form.title}
onChange={handleChange}
className="border p-2"
/>

<input
name="subtitle"
placeholder="Subtitle"
value={form.subtitle}
onChange={handleChange}
className="border p-2"
/>

<input
name="buttonText"
placeholder="Button Text"
value={form.buttonText}
onChange={handleChange}
className="border p-2"
/>

<input
name="buttonLink"
placeholder="Button Link"
value={form.buttonLink}
onChange={handleChange}
className="border p-2"
/>

<input type="file" onChange={upload}/>

<button
onClick={addBanner}
className="bg-black text-white px-6 py-2 rounded"
>
Add Banner
</button>

</div>

<div className="grid grid-cols-3 gap-6 mt-10">

{banners.map((b:any)=>(
<img key={b._id} src={b.image} className="rounded"/>
))}

</div>

</main>

);

}