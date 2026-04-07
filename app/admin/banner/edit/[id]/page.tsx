"use client";

import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";

export default function EditBanner(){

const router = useRouter();
const params = useParams();

const id = Array.isArray(params.id) ? params.id[0] : params.id;

const [banner,setBanner] = useState<any>(null);
const [loading,setLoading] = useState(true);
const [confirmDelete,setConfirmDelete] = useState(false);

/* LOAD BANNER */

useEffect(()=>{

if(!id) return;

const loadBanner = async()=>{

try{

const res = await fetch("/api/banners");
const banners = await res.json();

const found = banners.find((b:any)=>b._id === id);

if(found){
setBanner(found);
}

}catch(err){
console.log(err);
}

setLoading(false);

};

loadBanner();

},[id]);

/* IMAGE UPLOAD */

const uploadImage = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:formData});
const data = await res.json();

setBanner({...banner,image:data.url});

};

/* UPDATE */

const updateBanner = async()=>{

await fetch(`/api/banners/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(banner)

});

alert("Banner updated");

router.push("/admin/banner/edit");

};

/* DELETE */

const deleteBanner = async()=>{

await fetch(`/api/banner/${id}`,{
method:"DELETE"
});

router.push("/admin/banner/edit");

};

if(loading){
return <p style={{padding:40}}>Loading banner...</p>;
}

if(!banner){
return <p style={{padding:40}}>Banner not found</p>;
}

return(

<main className="container">

<h1>Edit Banner</h1>

<label className="upload">

{banner.image ? (
<img src={banner.image}/>
):(
<p>Upload banner image</p>
)}

<input
type="file"
hidden
onChange={(e)=>uploadImage(e.target.files?.[0])}
/>

</label>

<input
value={banner.title || ""}
placeholder="Banner title"
onChange={(e)=>setBanner({...banner,title:e.target.value})}
/>

<div className="buttons">

<button onClick={updateBanner} className="update">
Update Banner
</button>

<button onClick={()=>setConfirmDelete(true)} className="delete">
Delete Banner
</button>

</div>

{confirmDelete &&(

<div className="overlay">

<div className="popup">

<p>Delete this banner?</p>

<div className="popupButtons">

<button onClick={()=>setConfirmDelete(false)}>
Cancel
</button>

<button onClick={deleteBanner} className="delete">
Delete
</button>

</div>

</div>

</div>

)}

<style jsx>{`

.container{
max-width:700px;
margin:auto;
padding:40px 20px;
}

.upload{
border:2px dashed #ddd;
height:220px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
margin-bottom:20px;
border-radius:10px;
}

.upload img{
width:100%;
height:100%;
object-fit:cover;
border-radius:10px;
}

input{
width:100%;
padding:12px;
border:1px solid #ddd;
border-radius:6px;
margin-bottom:20px;
}

.buttons{
display:flex;
gap:10px;
}

.update{
background:black;
color:white;
padding:12px 18px;
border-radius:6px;
}

.delete{
background:red;
color:white;
padding:12px 18px;
border-radius:6px;
}

.overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.4);
display:flex;
align-items:center;
justify-content:center;
}

.popup{
background:white;
padding:25px;
border-radius:10px;
text-align:center;
}

.popupButtons{
display:flex;
gap:10px;
justify-content:center;
margin-top:10px;
}

`}</style>

</main>

);

}