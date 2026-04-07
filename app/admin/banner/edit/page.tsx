"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"

export default function EditBanner(){

const router = useRouter()

const [banners,setBanners] = useState<any[]>([])
const [confirm,setConfirm] = useState({
show:false,
banner:null as any
})

useEffect(()=>{

fetch("/api/banners")
.then(res=>res.json())
.then(data=>setBanners(data))

},[])

/* DELETE */

const deleteBanner = async(id:string)=>{

await fetch(`/api/banners/${id}`,{method:"DELETE"})

setBanners(prev=>prev.filter(b=>b._id!==id))

setConfirm({show:false,banner:null})

}

return(

<main className="container">

<h1>Edit Banners</h1>

<div className="grid">

{banners.map((b:any)=>(

<div key={b._id} className="card">

<img src={b.image}/>

<h3>{b.title}</h3>

<p>{b.link}</p>

<div className="actions">

<button
onClick={()=>router.push(`/admin/banner/edit/${b._id}`)}
>
Edit
</button>

<button
className="delete"
onClick={()=>setConfirm({show:true,banner:b})}
>
Delete
</button>

</div>

</div>

))}

</div>

{/* CONFIRM */}

{confirm.show && (

<div className="overlay">

<div className="popup">

<p>
Delete banner "{confirm.banner?.title}" ?
</p>

<div className="buttons">

<button
onClick={()=>setConfirm({show:false,banner:null})}
>
No
</button>

<button
className="delete"
onClick={()=>deleteBanner(confirm.banner._id)}
>
Yes
</button>

</div>

</div>

</div>

)}

<style jsx>{`

.container{
max-width:900px;
margin:auto;
padding:40px 20px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
gap:20px;
}

.card{
background:white;
border:1px solid #eee;
padding:16px;
border-radius:10px;
}

.card img{
width:100%;
height:150px;
object-fit:cover;
border-radius:6px;
}

.actions{
display:flex;
gap:10px;
margin-top:10px;
}

.delete{
background:red;
color:white;
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
padding:20px;
border-radius:8px;
}

.buttons{
display:flex;
gap:10px;
margin-top:10px;
}

`}</style>

</main>

)

}