// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminPage(){

// const router = useRouter();

// const [authorized,setAuthorized] = useState(false);
// const [products,setProducts] = useState<any[]>([]);
// const [loading,setLoading] = useState(true);

// const [form,setForm] = useState({
// name:"",
// price:"",
// image:"",
// images:"",
// description:"",
// category:"",
// stock:"",
// sizes:"",
// featured:false,
// flashSale:false,
// flashPrice:""
// });

// useEffect(()=>{

// /* ADMIN PROTECTION */

// const user = JSON.parse(localStorage.getItem("user") || "{}");

// if(user?.role !== "admin"){
// router.push("/");
// }else{
// setAuthorized(true);
// }

// /* LOAD PRODUCTS */

// loadProducts();

// },[]);

// const loadProducts = async()=>{

// try{

// const res = await fetch("/api/products");

// if(!res.ok){
// console.log("API error");
// return;
// }

// const data = await res.json();

// setProducts(data);

// }catch(err){
// console.log(err);
// }

// setLoading(false);

// };

// const handleChange = (e:any)=>{

// const {name,value,type,checked} = e.target;

// setForm({
// ...form,
// [name]: type==="checkbox" ? checked : value
// });

// };

// const addProduct = async()=>{

// const body = {

// name:form.name,
// price:Number(form.price),
// image:form.image,

// images: form.images
// ? form.images.split(",").map((i:any)=>i.trim())
// : [],

// description:form.description,
// category:form.category,

// stock:Number(form.stock),

// sizes: form.sizes
// ? form.sizes.split(",").map((s:any)=>s.trim())
// : [],

// featured:form.featured,
// flashSale:form.flashSale,

// flashPrice: form.flashPrice
// ? Number(form.flashPrice)
// : 0

// };

// await fetch("/api/products",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify(body)
// });

// setForm({
// name:"",
// price:"",
// image:"",
// images:"",
// description:"",
// category:"",
// stock:"",
// sizes:"",
// featured:false,
// flashSale:false,
// flashPrice:""
// });

// loadProducts();

// };

// const deleteProduct = async(id:string)=>{

// await fetch(`/api/products/${id}`,{
// method:"DELETE"
// });

// loadProducts();

// };

// if(!authorized){
// return <p className="p-10 text-center">Checking access...</p>
// }

// return(

// <main className="max-w-7xl mx-auto px-4 py-10">

// <h1 className="text-3xl font-bold mb-6">
// Admin Dashboard
// </h1>

// <p className="text-gray-500 mb-10">
// Manage your store products
// </p>

// {/* ADD PRODUCT */}

// <div className="border p-6 rounded mb-10">

// <h2 className="font-semibold mb-4">
// Add Product
// </h2>

// <div className="grid md:grid-cols-2 gap-4">

// <input
// name="name"
// placeholder="Product Name"
// className="border p-2 rounded"
// value={form.name}
// onChange={handleChange}
// />

// <input
// name="price"
// placeholder="Price"
// className="border p-2 rounded"
// value={form.price}
// onChange={handleChange}
// />

// <input
// name="image"
// placeholder="Main Image URL"
// className="border p-2 rounded"
// value={form.image}
// onChange={handleChange}
// />

// <input
// name="images"
// placeholder="Gallery images (comma separated)"
// className="border p-2 rounded"
// value={form.images}
// onChange={handleChange}
// />

// <input
// name="category"
// placeholder="Category"
// className="border p-2 rounded"
// value={form.category}
// onChange={handleChange}
// />

// <input
// name="stock"
// placeholder="Stock"
// className="border p-2 rounded"
// value={form.stock}
// onChange={handleChange}
// />

// <input
// name="sizes"
// placeholder="Sizes (S,M,L,XL)"
// className="border p-2 rounded"
// value={form.sizes}
// onChange={handleChange}
// />

// <input
// name="flashPrice"
// placeholder="Flash Price"
// className="border p-2 rounded"
// value={form.flashPrice}
// onChange={handleChange}
// />

// <input
// name="description"
// placeholder="Description"
// className="border p-2 rounded md:col-span-2"
// value={form.description}
// onChange={handleChange}
// />

// </div>

// {/* TOGGLES */}

// <div className="flex gap-6 mt-4">

// <label className="flex items-center gap-2">

// <input
// type="checkbox"
// name="featured"
// checked={form.featured}
// onChange={handleChange}
// />

// Featured Product

// </label>

// <label className="flex items-center gap-2">

// <input
// type="checkbox"
// name="flashSale"
// checked={form.flashSale}
// onChange={handleChange}
// />

// Flash Sale

// </label>

// </div>

// <button
// onClick={addProduct}
// className="mt-6 bg-black text-white px-6 py-2 rounded"
// >
// Add Product
// </button>

// </div>

// {/* PRODUCT LIST */}

// <h2 className="text-xl font-semibold mb-4">
// Products
// </h2>

// {loading && <p>Loading...</p>}

// <div className="space-y-4">

// {products.map((p:any)=>(

// <div
// key={p._id}
// className="flex items-center gap-6 border p-4 rounded"
// >

// <img
// src={p.image}
// className="w-16 h-16 object-cover rounded"
// />

// <div className="flex-1">

// <p className="font-semibold">
// {p.name}
// </p>

// <p className="text-sm text-gray-500">
// ₹{p.price}
// </p>

// <div className="text-xs text-gray-400 mt-1">

// {p.featured && "⭐ Featured "}
// {p.flashSale && "⚡ Flash Sale"}

// </div>

// </div>

// <button
// onClick={()=>deleteProduct(p._id)}
// className="bg-red-500 text-white px-3 py-1 rounded"
// >
// Delete
// </button>

// </div>

// ))}

// </div>

// </main>

// );

// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {

const router = useRouter();

const [authorized,setAuthorized] = useState(false);
const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const [editingId,setEditingId] = useState<string | null>(null);

const [form,setForm] = useState({
name:"",
mrp:"",
price:"",
image:"",
images:[] as string[],
description:"",
category:"",
stock:"",
sizes:"",
sizeStock:"",
featured:false,
flashSale:false,
flashPrice:""
});

/* 🔒 ADMIN CHECK */
useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user") || "null");

if(!user || user.role !== "admin"){
router.push("/");
return;
}

setAuthorized(true);
loadProducts();

},[]);

/* LOAD PRODUCTS */
const loadProducts = async()=>{

try{
setLoading(true);

const res = await fetch("/api/products");
const data = await res.json();

setProducts(Array.isArray(data)?data:[]);

}catch(err){
console.log(err);
setProducts([]);
}

setLoading(false);

};

const handleChange = (e:any)=>{
const {name,value,type,checked} = e.target;

setForm({
...form,
[name]: type==="checkbox" ? checked : value
});
};

/* IMAGE UPLOAD */
const uploadImage = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{ method:"POST", body:formData });
const data = await res.json();

setForm(prev=>({...prev,image:data.url}));

};

/* EXTRA IMAGES */
const uploadSingleExtra = async(file:any,index:number)=>{

if(!file) return;

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{ method:"POST", body:formData });
const data = await res.json();

setForm(prev=>{
const updated = [...prev.images];
updated[index] = data.url;
return {...prev,images:updated};
});

};

/* EDIT */
const editProduct = (p:any)=>{

setForm({
name:p.name || "",
mrp:p.mrp || "",
price:p.price || "",
image:p.image || "",
images:p.images || [],
description:p.description || "",
category:p.category || "",
stock:p.stock || "",
sizes:(p.sizes || []).join(","),
sizeStock: p.sizeStock
? Object.entries(p.sizeStock).map(([k,v])=>`${k}:${v}`).join(",")
: "",
featured:p.featured || false,
flashSale:p.flashSale || false,
flashPrice:p.flashPrice || ""
});

setEditingId(p._id);

};

/* ADD / UPDATE */
const addProduct = async()=>{

try{

if(!form.name || !form.price){
alert("Name and Price required");
return;
}

if(!form.image){
alert("Upload image");
return;
}

let sizeStockObj:any = {};

if(form.sizeStock){
form.sizeStock.split(",").forEach((item:any)=>{
const [size,qty] = item.split(":");
if(size && qty){
sizeStockObj[size.trim()] = Number(qty);
}
});
}

const sizes = Object.keys(sizeStockObj);
const totalStock = Object.values(sizeStockObj).reduce((a:any,b:any)=>a+b,0);

const body = {
...form,
category: form.category.toLowerCase(),
mrp:Number(form.mrp) || 0,
price:Number(form.price),
sizes: sizes.length ? sizes : (
form.sizes
? form.sizes.split(",").map((s:any)=>s.trim())
: ["S","M","L","XL"]
),
sizeStock: sizeStockObj,
stock: sizes.length ? totalStock : Number(form.stock) || 0
};

const url = editingId ? `/api/products/${editingId}` : `/api/products`;
const method = editingId ? "PUT" : "POST";

const res = await fetch(url,{
method,
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(body)
});

if(!res.ok){
alert("Failed");
return;
}

setEditingId(null);

setForm({
name:"",
mrp:"",
price:"",
image:"",
images:[],
description:"",
category:"",
stock:"",
sizes:"",
sizeStock:"",
featured:false,
flashSale:false,
flashPrice:""
});

loadProducts();

alert(editingId ? "Updated" : "Added");

}catch(err){
console.log(err);
alert("Error");
}

};

/* DELETE */
const deleteProduct = async(id:string)=>{
await fetch(`/api/products/${id}`,{ method:"DELETE" });
loadProducts();
};

/* AUTH */
if(!authorized){
return <p className="p-10 text-center">Checking access...</p>
}

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

{/* NAV */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

<button onClick={()=>router.push("/admin/banner")} className="border p-4 rounded">Hero Banner</button>
<button onClick={()=>router.push("/admin/categories")} className="border p-4 rounded">Categories</button>
<button onClick={()=>router.push("/admin")} className="border p-4 rounded">Products</button>
<Link href="/admin/orders" className="border p-4 rounded text-center">Orders</Link>

</div>

<p className="text-gray-500 mb-10">Manage your store products</p>

{/* FORM */}
<div className="border p-6 rounded mb-10">

<h2 className="font-semibold mb-4">
{editingId ? "Edit Product" : "Add Product"}
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input name="name" placeholder="Product Name" className="border p-2 rounded" value={form.name} onChange={handleChange}/>
<input name="mrp" placeholder="MRP" className="border p-2 rounded" value={form.mrp} onChange={handleChange}/>
<input name="price" placeholder="Price" className="border p-2 rounded" value={form.price} onChange={handleChange}/>

<input type="file" onChange={(e:any)=>uploadImage(e.target.files?.[0])} className="border p-2 rounded"/>

<input type="file" onChange={(e:any)=>uploadSingleExtra(e.target.files?.[0],0)} className="border p-2 rounded"/>
<input type="file" onChange={(e:any)=>uploadSingleExtra(e.target.files?.[0],1)} className="border p-2 rounded"/>
<input type="file" onChange={(e:any)=>uploadSingleExtra(e.target.files?.[0],2)} className="border p-2 rounded"/>
<input type="file" onChange={(e:any)=>uploadSingleExtra(e.target.files?.[0],3)} className="border p-2 rounded"/>

<div className="flex gap-2 flex-wrap">
{form.images.map((img:any)=> img && <img key={img} src={img} className="w-14 h-14 rounded"/>)}
</div>

<input name="category" placeholder="Category" className="border p-2 rounded" value={form.category} onChange={handleChange}/>
<input name="stock" placeholder="Stock" className="border p-2 rounded" value={form.stock} onChange={handleChange}/>
<input name="sizes" placeholder="Sizes" className="border p-2 rounded" value={form.sizes} onChange={handleChange}/>
<input name="sizeStock" placeholder="Size Stock" className="border p-2 rounded" value={form.sizeStock} onChange={handleChange}/>

<input name="flashPrice" placeholder="Flash Price" className="border p-2 rounded" value={form.flashPrice} onChange={handleChange}/>
<input name="description" placeholder="Description" className="border p-2 rounded md:col-span-2" value={form.description} onChange={handleChange}/>

</div>

<div className="flex gap-6 mt-4">

<label><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}/> Featured</label>
<label><input type="checkbox" name="flashSale" checked={form.flashSale} onChange={handleChange}/> Flash Sale</label>

</div>

<button onClick={addProduct} className="mt-6 bg-black text-white px-6 py-2 rounded">
{editingId ? "Update" : "Add"}
</button>

</div>

{/* PRODUCTS */}
<h2 className="text-xl font-semibold mb-4">Products</h2>

{loading && <p>Loading...</p>}

<div className="space-y-4">

{products.map((p:any)=>(

<div key={p._id} className="flex items-center gap-6 border p-4 rounded">

<img src={p.image} className="w-16 h-16 rounded"/>

<div className="flex-1">
<p className="font-semibold">{p.name}</p>
<p className="text-sm">₹{p.price} <span className="line-through text-gray-400">₹{p.mrp}</span></p>
<p className="text-xs">Stock: {p.stock}</p>
</div>

<button onClick={()=>editProduct(p)} className="border px-3 py-1 rounded">Edit</button>
<button onClick={()=>deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>

</div>

))}

</div>

</main>
);
}