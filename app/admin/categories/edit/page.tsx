"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"

export default function EditCategories(){

const router = useRouter()

const [categories,setCategories] = useState<any[]>([])

const [confirm,setConfirm] = useState({
show:false,
category:null as any
})

useEffect(()=>{

fetch("/api/categories")
.then(res=>res.json())
.then(data=>setCategories(data))

},[])

/* DELETE CATEGORY */

const deleteCategory = async(id:string)=>{

await fetch(`/api/categories/${id}`,{
method:"DELETE"
})

setCategories(prev=>prev.filter(c=>c._id!==id))

setConfirm({show:false,category:null})

}

return(

<main className="container">

<h1>Edit Categories</h1>

<div className="grid">

{categories.map((c:any)=>(

<div key={c._id} className="card">

<img src={c.image}/>

<h3>{c.name}</h3>

<div className="actions">

<button
onClick={()=>router.push(`/admin/categories/edit/${c._id}`)}
>
Edit
</button>

<button
className="delete"
onClick={()=>setConfirm({show:true,category:c})}
>
Delete
</button>

</div>

</div>

))}

</div>

{/* DELETE CONFIRM */}

{confirm.show && (

<div className="overlay">

<div className="popup">

<p>
Delete category "{confirm.category?.name}" ?
</p>

<div className="buttons">

<button
onClick={()=>setConfirm({show:false,category:null})}
>
No
</button>

<button
className="delete"
onClick={()=>deleteCategory(confirm.category._id)}
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
grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
gap:20px;
}

.card{
background:white;
border:1px solid #eee;
padding:16px;
border-radius:10px;
text-align:center;
}

.card img{
width:100%;
height:140px;
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