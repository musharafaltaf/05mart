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

const [form,setForm] = useState({
name:"",
mrp:"",
price:"",
image:"",
images:"",
description:"",
category:"",
stock:"",
sizes:"",
featured:false,
flashSale:false,
flashPrice:""
});

useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user") || "{}");

if(user?.role !== "admin"){
router.push("/");
return;
}

setAuthorized(true);

loadProducts();

},[]);

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");

if(!res.ok){
console.log("API error");
return;
}

const data = await res.json();
setProducts(data);

}catch(err){
console.log(err);
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

const uploadImage = async(file:any)=>{

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{
method:"POST",
body:formData
});

const data = await res.json();

setForm(prev => ({
...prev,
image:data.url
}));

};

const addProduct = async()=>{

const body = {

name:form.name,
mrp:Number(form.mrp),
price:Number(form.price),
image:form.image,

images: form.images
? form.images.split(",").map((i:any)=>i.trim())
: [],

description:form.description,
category:form.category,

stock:Number(form.stock),

sizes: form.sizes
? form.sizes.split(",").map((s:any)=>s.trim())
: [],

featured:form.featured,
flashSale:form.flashSale,

flashPrice: form.flashPrice
? Number(form.flashPrice)
: 0

};

await fetch("/api/products",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(body)
});

setForm({
name:"",
mrp:"",
price:"",
image:"",
images:"",
description:"",
category:"",
stock:"",
sizes:"",
featured:false,
flashSale:false,
flashPrice:""
});

loadProducts();

};

const deleteProduct = async(id:string)=>{

await fetch(`/api/products/${id}`,{
method:"DELETE"
});

loadProducts();

};

if(!authorized){
return <p className="p-10 text-center">Checking access...</p>
}

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-3xl font-bold mb-6">
Admin Dashboard
</h1>

{/* ADMIN NAVIGATION */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

<button
onClick={()=>router.push("/admin/banner")}
className="border p-4 rounded hover:shadow"
>
Hero Banner
</button>

<button
onClick={()=>router.push("/admin/categories")}
className="border p-4 rounded hover:shadow"
>
Categories
</button>

<button
onClick={()=>router.push("/admin")}
className="border p-4 rounded hover:shadow"
>
Products
</button>

<Link
href="/admin/orders"
className="border p-4 rounded hover:shadow text-center flex items-center justify-center"
>
Orders
</Link>

</div>

<p className="text-gray-500 mb-10">
Manage your store products
</p>

{/* ADD PRODUCT */}

<div className="border p-6 rounded mb-10">

<h2 className="font-semibold mb-4">
Add Product
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
name="name"
placeholder="Product Name"
className="border p-2 rounded"
value={form.name}
onChange={handleChange}
/>

<input
name="mrp"
placeholder="MRP (Original Price)"
className="border p-2 rounded"
value={form.mrp}
onChange={handleChange}
/>

<input
name="price"
placeholder="Selling Price"
className="border p-2 rounded"
value={form.price}
onChange={handleChange}
/>

<input
type="file"
className="border p-2 rounded"
onChange={(e:any)=>{
const file = e.target.files?.[0];
if(file){
uploadImage(file);
}
}}
/>

<input
type="file"
multiple
onChange={async(e:any)=>{

const files = e.target.files;

let urls:string[] = [];

for(let file of files){

const formData = new FormData();
formData.append("file",file);

const res = await fetch("/api/upload",{method:"POST",body:formData});
const data = await res.json();

urls.push(data.url);

}

setForm(prev=>({
...prev,
images: urls.join(",")
}));

}}
/>

<input
name="category"
placeholder="Category"
className="border p-2 rounded"
value={form.category}
onChange={handleChange}
/>

<input
name="stock"
placeholder="Stock"
className="border p-2 rounded"
value={form.stock}
onChange={handleChange}
/>

<input
name="sizes"
placeholder="Sizes (S,M,L,XL)"
className="border p-2 rounded"
value={form.sizes}
onChange={handleChange}
/>

<input
name="flashPrice"
placeholder="Flash Price"
className="border p-2 rounded"
value={form.flashPrice}
onChange={handleChange}
/>

<input
name="description"
placeholder="Description"
className="border p-2 rounded md:col-span-2"
value={form.description}
onChange={handleChange}
/>

</div>

{/* TOGGLES */}

<div className="flex gap-6 mt-4">

<label className="flex items-center gap-2">

<input
type="checkbox"
name="featured"
checked={form.featured}
onChange={handleChange}
/>

Featured Product

</label>

<label className="flex items-center gap-2">

<input
type="checkbox"
name="flashSale"
checked={form.flashSale}
onChange={handleChange}
/>

Flash Sale

</label>

</div>

<button
onClick={addProduct}
className="mt-6 bg-black text-white px-6 py-2 rounded"
>
Add Product
</button>


</div>

{/* PRODUCT LIST */}

<h2 className="text-xl font-semibold mb-4">
Products
</h2>

{loading && <p>Loading...</p>}

<div className="space-y-4">

{products.map((p:any)=>(

<div
key={p._id}
className="flex items-center gap-6 border p-4 rounded"
>

<img
src={p.image}
className="w-16 h-16 object-cover rounded"
/>

<div className="flex-1">

<p className="font-semibold">
{p.name}
</p>

<p className="text-sm text-gray-500">
₹{p.price}
<span className="line-through ml-2 text-gray-400">
₹{p.mrp}
</span>
</p>

<div className="text-xs text-gray-400 mt-1">

{p.featured && "⭐ Featured "}
{p.flashSale && "⚡ Flash Sale"}

</div>

</div>

<button
onClick={()=>deleteProduct(p._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

))}

</div>

</main>

);

}