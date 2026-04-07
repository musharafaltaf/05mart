"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCategory(){

const router = useRouter();
const params = useParams();
const id = params.id;

const [category,setCategory] = useState<any>(null);
const [loading,setLoading] = useState(true);

/* LOAD CATEGORY */

useEffect(()=>{

if(!id) return;

const loadCategory = async()=>{

try{

const res = await fetch("/api/categories");
const data = await res.json();

/* find category */

const found = data.find((c:any)=>c._id === id);

if(found){
setCategory(found);
}

}catch(err){
console.log(err);
}

setLoading(false);

};

loadCategory();

},[id]);

/* IMAGE UPLOAD */

const uploadImage = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:formData});
const data = await res.json();

setCategory({...category,image:data.url});

};

/* UPDATE CATEGORY */

const updateCategory = async()=>{

await fetch("/api/categories",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(category)

});

alert("Category updated");

router.push("/admin/categories/edit");

};

/* DELETE CATEGORY */

const deleteCategory = async()=>{

if(!confirm("Delete this category?")) return;

await fetch(`/api/categories?id=${id}`,{
method:"DELETE"
});

alert("Category deleted");

router.push("/admin/categories/edit");

};

/* UI */

if(loading){
return <p style={{padding:40}}>Loading category...</p>;
}

if(!category){
return <p style={{padding:40}}>Category not found</p>;
}

return(

<main className="container">

<h1>Edit Category</h1>

<label className="upload">

{category.image ? (
<img src={category.image}/>
):(
<p>Upload Image</p>
)}

<input
type="file"
hidden
onChange={(e)=>uploadImage(e.target.files?.[0])}
/>

</label>

<input
value={category.name || ""}
placeholder="Category name"
onChange={(e)=>setCategory({...category,name:e.target.value})}
/>

<div className="buttons">

<button onClick={updateCategory}>
Update
</button>

<button className="delete" onClick={deleteCategory}>
Delete
</button>

</div>

<style jsx>{`

.container{
max-width:700px;
margin:auto;
padding:40px 20px;
}

.upload{
border:2px dashed #ddd;
height:200px;
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
border:1px solid #ddd;
margin-bottom:20px;
border-radius:6px;
}

.buttons{
display:flex;
gap:10px;
}

button{
background:black;
color:white;
padding:12px 18px;
border-radius:6px;
}

.delete{
background:red;
}

`}</style>

</main>

);

}