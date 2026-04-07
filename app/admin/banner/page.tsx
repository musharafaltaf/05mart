"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddBanner(){

const router = useRouter()

const [image,setImage] = useState("")
const [title,setTitle] = useState("")
const [link,setLink] = useState("")
const [active,setActive] = useState(true)

const [popup,setPopup] = useState({
show:false,
message:""
})

/* UPLOAD IMAGE */

const uploadImage = async(file:any)=>{

const formData = new FormData()
formData.append("file",file)

const res = await fetch("/api/upload",{method:"POST",body:formData})
const data = await res.json()

setImage(data.url)

}

/* ADD BANNER */

const addBanner = async()=>{

if(!image){
return setPopup({show:true,message:"Banner image required"})
}

await fetch("/api/banners",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({title,image,link,active})
})

setPopup({show:true,message:"Banner added successfully"})

setTimeout(()=>{
router.push("/admin/banner/edit")
},1000)

}

return(

<main className="container">

<h1>Add Banner</h1>

<div className="card">

<label className="upload">

{image ? (
<img src={image}/>
):(
<p>Upload Banner</p>
)}

<input
type="file"
hidden
onChange={(e)=>uploadImage(e.target.files?.[0])}
/>

</label>

<input
placeholder="Banner Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Banner Link (Example: /product/123)"
value={link}
onChange={(e)=>setLink(e.target.value)}
/>

<label className="check">

<input
type="checkbox"
checked={active}
onChange={(e)=>setActive(e.target.checked)}
/>

Active Banner

</label>

<button onClick={addBanner} className="submit">
Add Banner
</button>

</div>

{popup.show && (

<div className="overlay">

<div className="popup">

<p>{popup.message}</p>

<button onClick={()=>setPopup({show:false,message:""})}>
OK
</button>

</div>

</div>

)}

<style jsx>{`

.container{
max-width:600px;
margin:auto;
padding:40px 20px;
}

.card{
background:white;
border:1px solid #eee;
padding:20px;
border-radius:10px;
}

.upload{
border:2px dashed #ddd;
height:220px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
margin-bottom:20px;
}

.upload img{
width:100%;
height:100%;
object-fit:cover;
}

input{
width:100%;
padding:10px;
margin-top:10px;
border:1px solid #ddd;
border-radius:6px;
}

.check{
display:flex;
gap:10px;
margin-top:10px;
}

.submit{
background:black;
color:white;
padding:12px;
border-radius:6px;
width:100%;
margin-top:20px;
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
border-radius:8px;
text-align:center;
}

`}</style>

</main>

)

}