"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage(){

const router = useRouter();

/* USER */
const [user,setUser] = useState<any>(null);

/* DATA */
const [addresses,setAddresses] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

/* UI */
const [showForm,setShowForm] = useState(false);
const [processing,setProcessing] = useState(false);
const [deleteId,setDeleteId] = useState<string | null>(null);

/* ERROR */
const [errorMsg,setErrorMsg] = useState("");
const [showError,setShowError] = useState(false);

/* FORM */
const [form,setForm] = useState<any>({
_id:null,
name:"",
phone:"",
pincode:"",
state:"",
city:"",
house:"",
area:"",
tag:"Home",
isDefault:false
});

/* PINCODE */
const [cityOptions,setCityOptions] = useState<string[]>([]);

/* ================= INIT ================= */

useEffect(()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");

if(!u){
router.push("/login");
return;
}

setUser(u);
loadAddresses(u._id);

},[]);

/* ================= LOAD ================= */

const loadAddresses = async(userId:string)=>{

setLoading(true);

const res = await fetch("/api/address",{
headers:{ userid:userId }
});

const data = await res.json();

setAddresses(data || []);
setLoading(false);

};

/* ================= VALIDATION ================= */

const validateName = (v:string)=>/^[A-Za-z ]{3,50}$/.test(v);
const validatePhone = (v:string)=>/^[6-9]\d{9}$/.test(v);
const validatePincode = (v:string)=>/^\d{6}$/.test(v);

/* ================= PINCODE ================= */

const fetchPincode = async(pin:string)=>{

if(!validatePincode(pin)){
setCityOptions([]);
return;
}

const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
const data = await res.json();

if(data[0].Status === "Success"){

const offices = data[0].PostOffice;

setCityOptions([...new Set(offices.map((p:any)=>p.District))]as any);

setForm((prev:any)=>({
...prev,
state: offices[0].State
}));

}else{
setErrorMsg("Invalid pincode");
setShowError(true);
}

};

/* ================= SAVE ================= */

const saveAddress = async()=>{

if(!validateName(form.name)){
setErrorMsg("Enter valid name"); setShowError(true); return;
}

if(!validatePhone(form.phone)){
setErrorMsg("Invalid phone"); setShowError(true); return;
}

if(!validatePincode(form.pincode)){
setErrorMsg("Invalid pincode"); setShowError(true); return;
}

if(!form.city){
setErrorMsg("Select city"); setShowError(true); return;
}

if(!form.house || !form.area){
setErrorMsg("Enter full address"); setShowError(true); return;
}

setProcessing(true);

if(form._id){

await fetch(`/api/address/${form._id}`,{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({...form,userId:user._id})
});

}else{

await fetch("/api/address",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({...form,userId:user._id})
});

}

setShowForm(false);
setProcessing(false);

loadAddresses(user._id);

};

/* ================= DELETE ================= */

const deleteAddress = async(id:string)=>{

await fetch(`/api/address/${id}`,{ method:"DELETE" });

setAddresses(prev=>prev.filter(a=>a._id !== id));

};

/* ================= UI ================= */

return(

<main className="max-w-3xl mx-auto p-4 pb-32">

<h1 className="text-xl font-bold mb-6">My Addresses</h1>

{/* LIST */}
{loading && <p>Loading...</p>}

{addresses.map(a=>(
<div key={a._id} className="border p-4 rounded-xl mb-3">

<p className="font-semibold">
{a.name} {a.isDefault && "⭐"}
</p>

<p className="text-sm">{a.phone}</p>

<p className="text-sm">
{a.house}, {a.area}, {a.city}
</p>

<span className="text-xs bg-gray-200 px-2 py-1 rounded">
{a.tag}
</span>

<div className="flex gap-2 mt-3">

<button
onClick={()=>{
setForm(a);
setShowForm(true);
}}
className="border px-3 py-1 rounded"
>
Edit
</button>

<button
onClick={()=>setDeleteId(a._id)}
className="border px-3 py-1 rounded text-red-500"
>
Delete
</button>

</div>

</div>
))}

<button
onClick={()=>{
setForm({
_id:null,
name:"",
phone:"",
pincode:"",
state:"",
city:"",
house:"",
area:"",
tag:"Home",
isDefault:false
});
setShowForm(true);
}}
className="text-blue-600"
>
+ Add New Address
</button>

{/* FORM */}
{showForm && (

<div className="modal" onClick={()=>setShowForm(false)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<h2>{form._id?"Edit":"Add"} Address</h2>

<input placeholder="Name" value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}/>

<input placeholder="Phone" value={form.phone}
onChange={e=>setForm({...form,phone:e.target.value})}/>

<input placeholder="Pincode" value={form.pincode}
onChange={e=>{
setForm({...form,pincode:e.target.value});
fetchPincode(e.target.value);
}}/>

{/* CITY OPTIONS */}
{cityOptions.length>0 && (
<div className="dropdown">
{cityOptions.map((c,i)=>(
<div key={i} onClick={()=>setForm({...form,city:c})}>
{c}
</div>
))}
</div>
)}

<input value={form.city} disabled/>
<input value={form.state} disabled/>

<input placeholder="House" value={form.house}
onChange={e=>setForm({...form,house:e.target.value})}/>

<input placeholder="Area" value={form.area}
onChange={e=>setForm({...form,area:e.target.value})}/>

<select value={form.tag}
onChange={e=>setForm({...form,tag:e.target.value})}
>
<option>Home</option>
<option>Work</option>
</select>

<button onClick={saveAddress} className="saveBtn">
{processing ? "Saving..." : "Save"}
</button>

</div>

</div>

)}

{/* DELETE CONFIRM */}
{deleteId && (

<div className="modal" onClick={()=>setDeleteId(null)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<p>Delete this address?</p>

<button
onClick={()=>{
deleteAddress(deleteId);
setDeleteId(null);
}}
className="btnDanger"
>
Delete
</button>

</div>

</div>

)}

{/* ERROR */}
{showError && (

<div className="modal" onClick={()=>setShowError(false)}>

<div className="modalBox" onClick={(e)=>e.stopPropagation()}>

<p>{errorMsg}</p>

<button onClick={()=>setShowError(false)}>OK</button>

</div>

</div>

)}

<style jsx>{`
.modal{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;}
.modalBox{background:white;padding:20px;border-radius:12px;width:90%;}
.dropdown{border:1px solid #ddd;margin-top:5px;}
.saveBtn{background:orange;color:white;padding:10px;width:100%;}
.btnDanger{background:red;color:white;padding:10px;width:100%;}
`}</style>

</main>

);
}