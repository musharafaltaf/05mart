"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {

const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

const [form,setForm] = useState({
name:"",
price:"",
image:"",
images:"",
description:"",
category:"",
stock:"",
sizes:""
});

useEffect(()=>{
loadProducts();
},[]);

const loadProducts = async () => {

try {

const res = await fetch("/api/products");

if (!res.ok) {
console.log("API error");
return;
}

const data = await res.json();

setProducts(data);

} catch (err) {

console.log("Fetch error:", err);

}

setLoading(false);

};

const handleChange = (e:any)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const addProduct = async()=>{

const body = {
...form,
price:Number(form.price),
stock:Number(form.stock),
sizes: form.sizes.split(",").map(s=>s.trim()),
images: form.images.split(",").map(i=>i.trim())
};

await fetch("/api/products",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(body)
});

setForm({
name:"",
price:"",
image:"",
images:"",
description:"",
category:"",
stock:"",
sizes:""
});

loadProducts();

};

const deleteProduct = async(id:string)=>{

await fetch(`/api/products/${id}`,{
method:"DELETE"
});

loadProducts();

};

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Admin Panel
</h1>

{/* ADD PRODUCT */}

<div className="border p-6 rounded mb-10">

<h2 className="font-semibold mb-4">
Add Product
</h2>

<div className="grid md:grid-cols-2 gap-4">

<input
name="name"
placeholder="Name"
className="border p-2 rounded"
value={form.name}
onChange={handleChange}
/>

<input
name="price"
placeholder="Price"
className="border p-2 rounded"
value={form.price}
onChange={handleChange}
/>

<input
name="image"
placeholder="Main Image URL"
className="border p-2 rounded"
value={form.image}
onChange={handleChange}
/>

<input
name="images"
placeholder="Gallery images (comma separated)"
className="border p-2 rounded"
value={form.images}
onChange={handleChange}
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
name="description"
placeholder="Description"
className="border p-2 rounded md:col-span-2"
value={form.description}
onChange={handleChange}
/>

</div>

<button
onClick={addProduct}
className="mt-4 bg-black text-white px-6 py-2 rounded"
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

<div key={p._id} className="flex items-center gap-6 border p-4 rounded">

<img
src={p.image}
className="w-16 h-16 object-cover rounded"
/>

<div className="flex-1">

<p className="font-semibold">{p.name}</p>
<p className="text-sm text-gray-500">₹{p.price}</p>

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