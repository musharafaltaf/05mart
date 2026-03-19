"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage(){

const [data,setData] = useState<any[]>([]);
const [user,setUser] = useState<any>(null);

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);

if(!u?._id) return;

const load = async()=>{

const res = await fetch(`/api/notifications?userId=${u._id}`);
const result = await res.json();

setData(result);

};

load();

/* auto refresh */
const interval = setInterval(load,5000);
return ()=>clearInterval(interval);

},[]);

/* MARK READ */
const markRead = async(id:string)=>{
await fetch("/api/notifications",{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ id })
});
};

/* DELETE */
const remove = async(id:string)=>{
await fetch("/api/notifications",{
method:"DELETE",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ id })
});
setData(data.filter(n=>n._id !== id));
};

return(

<main className="max-w-4xl mx-auto px-4 py-10">

<h1 className="text-2xl font-bold mb-6">Notifications</h1>

<div className="space-y-4">

{data.map((n:any)=>(

<div
key={n._id}
className={`p-4 rounded-lg border ${n.read ? "bg-gray-100":"bg-white"}`}
>

<p className="font-medium">{n.message}</p>

<p className="text-xs text-gray-500 mb-2">
{new Date(n.createdAt).toLocaleString()}
</p>

<div className="flex gap-3">

<button
onClick={()=>markRead(n._id)}
className="text-blue-600 text-sm"
>
Mark as read
</button>

<button
onClick={()=>remove(n._id)}
className="text-red-600 text-sm"
>
Delete
</button>

</div>

</div>

))}

</div>

</main>

);
}