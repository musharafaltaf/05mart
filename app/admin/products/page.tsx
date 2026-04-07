"use client"

import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"

export default function ProductsPage(){

const router = useRouter()

const [products,setProducts] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const [confirm,setConfirm] = useState({
show:false,
product:null as any
})

/* LOAD PRODUCTS */

useEffect(()=>{

fetch("/api/products")
.then(res=>res.json())
.then(data=>{
setProducts(Array.isArray(data)?data:[])
setLoading(false)
})

},[])

/* DELETE PRODUCT */

const deleteProduct = async(id:string)=>{

await fetch(`/api/products/${id}`,{
method:"DELETE"
})

setProducts(prev=>prev.filter(p=>p._id!==id))

setConfirm({show:false,product:null})

}

/* UI */

return(

<main className="container">

<h1 className="title">
Products
</h1>

{loading && <p>Loading products...</p>}

<div className="grid">

{products.map((p:any)=>(

<div key={p._id} className="card">

{/* IMAGE */}

<img
src={p.image}
className="mainImage"
/>

{/* INFO */}

<div className="info">

<h3>{p.name}</h3>

<p className="price">
₹{p.price}
<span className="mrp">
₹{p.mrp}
</span>
</p>

<p className="category">
{p.category}
</p>

<p className="stock">
Stock: {p.stock}
</p>

</div>

{/* GALLERY */}

<div className="gallery">

{p.images?.map((img:any,i:number)=>(
img && (
<img key={i} src={img}/>
)
))}

</div>

{/* ACTIONS */}

<div className="actions">

<button
className="edit"
onClick={()=>router.push(`/admin/products/edit/${p._id}`)}
>
Edit
</button>

<button
className="delete"
onClick={()=>setConfirm({show:true,product:p})}
>
Delete
</button>

</div>

</div>

))}

</div>

{/* DELETE CONFIRM MODAL */}

{confirm.show && (

<div className="overlay">

<div className="modal">

<h3>Delete Product</h3>

<p>
Would you like to delete
<b> {confirm.product?.name}</b> ?
</p>

<div className="buttons">

<button
className="no"
onClick={()=>setConfirm({show:false,product:null})}
>
No
</button>

<button
className="yes"
onClick={()=>deleteProduct(confirm.product._id)}
>
Yes
</button>

</div>

</div>

</div>

)}

<style jsx>{`

.container{
max-width:1100px;
margin:auto;
padding:40px 20px;
}

.title{
font-size:28px;
margin-bottom:30px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
gap:20px;
}

.card{
background:white;
border:1px solid #eee;
border-radius:12px;
padding:16px;
box-shadow:0 4px 20px rgba(0,0,0,0.05);
display:flex;
flex-direction:column;
gap:10px;
}

.mainImage{
width:100%;
height:200px;
object-fit:cover;
border-radius:8px;
}

.info h3{
font-size:16px;
}

.price{
font-weight:600;
}

.mrp{
text-decoration:line-through;
color:#888;
margin-left:6px;
font-size:14px;
}

.category{
font-size:13px;
color:#777;
}

.stock{
font-size:13px;
}

.gallery{
display:flex;
gap:6px;
overflow:auto;
}

.gallery img{
width:50px;
height:50px;
object-fit:cover;
border-radius:4px;
}

.actions{
display:flex;
gap:10px;
margin-top:10px;
}

.edit{
flex:1;
background:#2563eb;
color:white;
padding:8px;
border-radius:6px;
cursor:pointer;
}

.delete{
flex:1;
background:#ef4444;
color:white;
padding:8px;
border-radius:6px;
cursor:pointer;
}

/* MODAL */

.overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.4);
display:flex;
align-items:center;
justify-content:center;
}

.modal{
background:white;
padding:30px;
border-radius:10px;
text-align:center;
width:300px;
}

.buttons{
display:flex;
gap:10px;
margin-top:20px;
}

.no{
flex:1;
background:#eee;
padding:8px;
border-radius:6px;
}

.yes{
flex:1;
background:#ef4444;
color:white;
padding:8px;
border-radius:6px;
}

`}</style>

</main>

)

}