"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage(){

const router = useRouter();

const [authorized,setAuthorized] = useState(false);
const [products,setProducts] = useState<any[]>([]);
const [orders,setOrders] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user") || "null");

if(!user || user.role !== "admin"){
router.push("/");
return;
}

setAuthorized(true);

loadProducts();
loadOrders();

},[]);

const loadProducts = async()=>{

const res = await fetch("/api/products");
const data = await res.json();

setProducts(Array.isArray(data)?data:[]);

};

const loadOrders = async()=>{

const res = await fetch("/api/orders?role=admin");
const data = await res.json();

setOrders(Array.isArray(data)?data:[]);

setLoading(false);

};

if(!authorized){
return <p className="p-10 text-center">Checking access...</p>
}

/* DASHBOARD STATS */

const totalOrders = orders.length;
const totalProducts = products.length;
const revenue = orders.reduce((a:any,b:any)=>a + (b.total || 0),0);

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">
Admin Dashboard
</h1>

{/* STATS */}

<div className="grid md:grid-cols-4 gap-4 mb-8">

<div className="bg-blue-500 text-white p-5 rounded">
<p className="text-sm">Orders</p>
<p className="text-2xl font-bold">{totalOrders}</p>
</div>

<div className="bg-green-500 text-white p-5 rounded">
<p className="text-sm">Products</p>
<p className="text-2xl font-bold">{totalProducts}</p>
</div>

<div className="bg-purple-500 text-white p-5 rounded">
<p className="text-sm">Revenue</p>
<p className="text-2xl font-bold">₹{revenue}</p>
</div>

<div className="bg-orange-500 text-white p-5 rounded">
<p className="text-sm">Customers</p>
<p className="text-2xl font-bold">{orders.length}</p>
</div>

</div>

{/* PANELS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

{/* RECENT ORDERS */}

<div className="border rounded p-4">

<h2 className="font-semibold mb-3">
Recent Orders
</h2>

{orders.slice(0,5).map((o:any)=>(
<p key={o._id} className="text-sm border-b py-1">
{o.customer?.name} — ₹{o.total}
</p>
))}

<Link href="/admin/orders" className="text-blue-600 text-sm mt-2 inline-block">
View all orders
</Link>

</div>

{/* LOW STOCK */}

<div className="border rounded p-4">

<h2 className="font-semibold mb-3">
Low Stock
</h2>

{products.filter((p:any)=>p.stock < 5).slice(0,5).map((p:any)=>(
<p key={p._id} className="text-sm border-b py-1">
{p.name} — Stock {p.stock}
</p>
))}

</div>

{/* RETURNS */}

<div className="border rounded p-4">

<h2 className="font-semibold mb-3">
Return Requests
</h2>

{orders
.filter((o:any)=>o.returnRequest?.requested)
.slice(0,5)
.map((o:any)=>(
<p key={o._id} className="text-sm border-b py-1">
{o.customer?.name} — Return Requested
</p>
))}

<Link href="/admin/returns" className="text-blue-600 text-sm mt-2 inline-block">
Manage Returns
</Link>

</div>

</div>

{/* QUICK LINKS */}

<div className="grid md:grid-cols-3 gap-4">

<Link href="/admin/products/add" className="border p-4 rounded hover:bg-gray-50">
Add Product
</Link>

<Link href="/admin/products" className="border p-4 rounded hover:bg-gray-50">
Edit Products
</Link>

<Link href="/admin/banner" className="border p-4 rounded hover:bg-gray-50">
Manage Banners
</Link>

<Link href="/admin/categories" className="border p-4 rounded hover:bg-gray-50">
Manage Categories
</Link>

<Link href="/admin/exchanges" className="border p-4 rounded hover:bg-gray-50">
Exchange Requests
</Link>

</div>

</main>

)

}