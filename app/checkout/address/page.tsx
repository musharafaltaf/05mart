"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function AddressPage(){

const router = useRouter();
const autoRef = useRef<any>(null);

/* ================= USER ================= */

const [user,setUser] = useState<any>(null);

/* ================= STATE ================= */

const [addresses,setAddresses] = useState<any[]>([]);
const [selectedId,setSelectedId] = useState<string | null>(null);

const [showForm,setShowForm] = useState(false);
const [loading,setLoading] = useState(false);

const [errorMsg,setErrorMsg] = useState("");
const [showError,setShowError] = useState(false);
const [cityOptions,setCityOptions] = useState<string[]>([]);
const [pincodeError,setPincodeError] = useState("");
const [pageLoading,setPageLoading] = useState(true);
const [continueLoading,setContinueLoading] = useState(false);

const [startY,setStartY] = useState(0);
const [currentY,setCurrentY] = useState(0);
const [dragging,setDragging] = useState(false);
const [velocity,setVelocity] = useState(0);
const [lastMoveTime,setLastMoveTime] = useState(0);

/* SWIPE */
const [swipedId,setSwipedId] = useState<string | null>(null);


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
tag:"Home"
});

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

setPageLoading(true);

try{

const res = await fetch("/api/address",{
headers:{ userid:userId }
});

const data = await res.json();

setAddresses(data);

const def = data.find((a:any)=>a.isDefault);
if(def) setSelectedId(def._id);

}catch(err){
console.log(err);
}

setPageLoading(false);
};

const handleTouchStart = (e:any)=>{
const y = e.touches[0].clientY;

setStartY(y);
setCurrentY(0);
setDragging(true);
setLastMoveTime(Date.now());
};

const handleTouchMove = (e:any)=>{
if(!dragging) return;

const y = e.touches[0].clientY;
const diff = y - startY;

const now = Date.now();
const timeDiff = now - lastMoveTime;

if(diff > 0){

// velocity px/ms
const v = diff / (timeDiff || 1);

setVelocity(v);
setCurrentY(diff);
setLastMoveTime(now);
}
};

const handleTouchEnd = ()=>{

setDragging(false);

// 🔥 CLOSE CONDITIONS
if(currentY > 120 || velocity > 1){

// 📳 HAPTIC
if(navigator.vibrate){
navigator.vibrate(10);
}

setShowForm(false);

}else{
// SNAP BACK
setCurrentY(0);
}
};

/* ================= VALIDATION ================= */

const validateName = (v:string)=>/^[A-Za-z ]{3,50}$/.test(v);
const validatePhone = (v:string)=>/^[6-9]\d{9}$/.test(v);
const validatePincode = (v:string)=>/^\d{6}$/.test(v);

/* ================= PINCODE ================= */

const fetchPincode = async(pin:string)=>{

if(pin.length < 6){
setPincodeError("");
return;
}

if(!validatePincode(pin)){
setPincodeError("Enter valid 6-digit pincode");
return;
}

try{

const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
const data = await res.json();

if(data[0].Status !== "Success"){

setPincodeError("Invalid Pincode");

setForm((prev:any)=>({
...prev,
city:"",
state:""
}));

setCityOptions([]);
return;
}

const offices = data[0].PostOffice;

const cities = offices.map((o:any)=>o.Name);

setCityOptions(cities);

setForm((prev:any)=>({
...prev,
city: offices[0].Name,
state: offices[0].State
}));

setPincodeError("");

}catch(err){
setPincodeError("Network error, try again");
}
};
/* ================= GPS ================= */

const getLocation = ()=>{
navigator.geolocation.getCurrentPosition(async(pos)=>{

const { latitude, longitude } = pos.coords;

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
);

const data = await res.json();

setForm((prev:any)=>({
...prev,
city: data.address.city || data.address.town,
state: data.address.state,
area: data.address.suburb || ""
}));

});
};

/* ================= GOOGLE ================= */

const onPlaceChanged = ()=>{
const place = autoRef.current.getPlace();

const comp = place.address_components;

const get = (type:string)=>
comp?.find((c:any)=>c.types.includes(type))?.long_name;

setForm((prev:any)=>({
...prev,
house: place.name || "",
city: get("locality"),
state: get("administrative_area_level_1"),
pincode: get("postal_code"),
}));
};

/* ================= DELETE ================= */

const deleteAddress = async(id:string)=>{
await fetch(`/api/address/${id}`,{method:"DELETE"});
loadAddresses(user._id);
};

/* ================= SAVE ================= */

const saveAddress = async () => {

  if(pincodeError){
    setErrorMsg("Fix pincode before saving");
    setShowError(true);
    return;
  }

  if(!validateName(form.name)){
    setErrorMsg("Enter valid name");
    setShowError(true);
    return;
  }

  if(!validatePhone(form.phone)){
    setErrorMsg("Invalid phone");
    setShowError(true);
    return;
  }

  try{

    setLoading(true);

    console.log("Saving address...", form);

    let res;

    if(form._id){

      res = await fetch(`/api/address/${form._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(form)
      });

    }else{

      res = await fetch("/api/address",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ...form,
          userId:user._id
        })
      });

    }

    const data = await res.json();

    console.log("SAVE RESPONSE:", data);

    if(!res.ok){
      throw new Error(data.error || "Failed");
    }

    await loadAddresses(user._id);

    setShowForm(false);

  }catch(err:any){

    console.log("SAVE ERROR:", err);

    setErrorMsg(err.message || "Failed to save address");
    setShowError(true);

  }finally{

    setLoading(false);

  }
};
/* ================= CONTINUE ================= */

const handleContinue = ()=>{

const selected = addresses.find(a=>a._id === selectedId);

if(!selected){
setErrorMsg("Please select address");
setShowError(true);
return;
}

setContinueLoading(true);

setTimeout(()=>{

localStorage.setItem("selectedAddress", JSON.stringify(selected));

router.push("/checkout/summary");

},800); // smooth delay for animation
};


if(pageLoading){
return(
<main className="max-w-3xl mx-auto p-4 animate-pulse">

{/* TITLE */}
<div className="h-6 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-6 shimmer"></div>

{/* ADDRESS CARDS */}
{[1,2,3].map(i=>(
<div key={i} className="border p-4 rounded-2xl mb-4 shadow-sm bg-white">

<div className="flex items-center gap-3">

{/* RADIO */}
<div className="w-5 h-5 rounded-full bg-gray-300 shimmer"></div>

<div className="flex-1">

<div className="h-4 w-32 bg-gray-200 rounded mb-2 shimmer"></div>
<div className="h-3 w-24 bg-gray-200 rounded mb-2 shimmer"></div>
<div className="h-3 w-48 bg-gray-200 rounded shimmer"></div>

</div>

</div>

{/* BUTTON */}
<div className="mt-3 h-8 w-20 bg-gray-200 rounded shimmer"></div>

</div>
))}

{/* BUTTON */}
<div className="fixed bottom-[70px] left-0 right-0 px-4">
<div className="h-12 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer"></div>
</div>

</main>
);
}
/* ================= UI ================= */

return(

<main className="max-w-3xl mx-auto p-4 pb-32">

<div className="fixed top-20 left-0 w-full z-[999] bg-white/90 backdrop-blur-md border-b shadow-sm">
  <CheckoutSteps step={1} />
</div>

<div className="h-[80px]" /> {/* spacing */}

<h1 className="text-xl font-bold mb-6">Select Address</h1>

{/* ADDRESS LIST */}

{addresses.map(addr=>{

const selected = selectedId === addr._id;

return(

<div
key={addr._id}
onClick={()=>setSelectedId(addr._id)}
onTouchStart={()=>setSwipedId(addr._id)}
className={`relative border p-4 rounded-xl mb-4 transition
${selected ? "border-black bg-gray-50" : ""}
`}
>

{/* DELETE BUTTON */}
{swipedId===addr._id && (
<button
onClick={(e)=>{
e.stopPropagation();
deleteAddress(addr._id);
}}
className="absolute right-2 top-2 text-red-500"
>
Delete
</button>
)}

{/* RADIO */}
<div className="flex gap-3">

<div className={`w-5 h-5 border rounded-full mt-1
${selected ? "bg-black" : ""}`}/>

<div>

<div className="flex gap-2 items-center">
<p className="font-semibold">{addr.name}</p>
<span className="text-xs bg-gray-200 px-2 rounded">
{addr.tag || "Home"}
</span>
</div>

<p className="text-sm">{addr.phone}</p>
<p className="text-sm">{addr.house}, {addr.area}, {addr.city}</p>

<button
onClick={(e)=>{
e.stopPropagation();
setForm(addr);
setShowForm(true);
}}
className="text-sm mt-2 border px-3 py-1 rounded"
>
Edit
</button>

</div>

</div>

</div>

);

})}

{/* ADD NEW */}

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
tag:"Home"
});
setShowForm(true);
}}
className="text-blue-600"
>
+ Add New Address
</button>

{/* CONTINUE */}

<div className="fixed bottom-[70px] left-0 right-0 px-4">

<button
onClick={handleContinue}
disabled={continueLoading}
className={`w-full py-3 rounded-xl text-white flex items-center justify-center gap-2
transition-all duration-300
${continueLoading 
  ? "bg-gray-400 cursor-not-allowed" 
  : "bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 hover:scale-[1.02] active:scale-95 shadow-lg"
}
`}
>

{continueLoading ? (
<>
{/* SPINNER */}
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

<span>Processing...</span>
</>
) : (
"Continue"
)}

</button>

</div>

{/* ================= BOTTOM SHEET ================= */}

{showForm && (

<div
className="fixed inset-0 z-[9999] transition-all duration-200"
style={{
background: `rgba(0,0,0,${0.5 - currentY / 600})`
}}
onClick={()=>setShowForm(false)}
>

<div
className="absolute bottom-0 w-full bg-white rounded-t-3xl 
max-h-[85vh] flex flex-col transition-transform duration-300"
style={{
transform: `translateY(${currentY}px)`
}}
onTouchStart={handleTouchStart}
onTouchMove={handleTouchMove}
onTouchEnd={handleTouchEnd}
onClick={(e)=>e.stopPropagation()}
>

{/* 🔥 DRAG HANDLE */}
<div className="flex justify-center pt-3 pb-2">
<div className="w-10 h-1.5 bg-gray-300 rounded-full"/>
</div>

{/* 🔥 SCROLL CONTENT */}
<div className="overflow-y-auto px-6 pb-32">

<h2 className="mb-4 font-semibold">
{form._id ? "Edit Address" : "Add Address"}
</h2>

{/* GOOGLE */}
<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
<Autocomplete onLoad={ref=>autoRef.current = ref} onPlaceChanged={onPlaceChanged}>
<input placeholder="Search address..." className="input-premium mb-2"/>
</Autocomplete>
</LoadScript>

<input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input-premium"/>

<input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="input-premium"/>

{/* PINCODE */}
<input
placeholder="Pincode"
value={form.pincode}
onChange={e=>{
setForm({...form,pincode:e.target.value});
fetchPincode(e.target.value);
}}
className="input-premium"
/>

{/* CITY */}
<div className="relative">
<input
value={form.city}
onChange={e=>setForm({...form,city:e.target.value})}
className="input-premium"
placeholder="City"
/>

{cityOptions.length > 0 && (
<div className="absolute w-full border rounded mt-1 bg-white shadow z-50 max-h-40 overflow-auto">
{cityOptions.map((c,i)=>(
<div
key={i}
onClick={()=>{
setForm({...form,city:c});
setCityOptions([]);
}}
className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
>
{c}
</div>
))}
</div>
)}
</div>

<input value={form.state} className="input-premium" placeholder="State"/>

<input placeholder="House" value={form.house} onChange={e=>setForm({...form,house:e.target.value})} className="input-premium"/>

<input placeholder="Area" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} className="input-premium"/>

{/* TAG */}
<div className="flex gap-2 mt-2">
{["Home","Work"].map(t=>(
<button
key={t}
onClick={()=>setForm({...form,tag:t})}
className={`px-3 py-1 rounded border ${form.tag===t ? "bg-black text-white":""}`}
>
{t}
</button>
))}
</div>

{/* LOCATION */}
<button onClick={getLocation} className="mt-3 w-full border py-2 rounded">
📍 Use Current Location
</button>

{/* SAVE */}
<button
type="button"
disabled={loading}
onClick={saveAddress}
className="bg-orange-500 text-white py-3 w-full mt-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
>
{loading ? (
<>
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
<span>Saving...</span>
</>
) : "Save Address"}
</button>

</div>

</div>

</div>

)}

{/* ERROR */}

{showError && (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
<div className="bg-white p-6 rounded-xl">
<p>{errorMsg}</p>
<button onClick={()=>setShowError(false)} className="mt-3 bg-black text-white px-4 py-2 rounded">
OK
</button>
</div>
</div>
)}

<style jsx>{`

.input-premium{
width:95%;
padding:4px;
border:1px solid #ddd;
border-radius:10px;
margin-bottom:8px;
}

.loader{
width:16px;
height:16px;
border:2px solid white;
border-top:2px solid transparent;
border-radius:50%;
animation:spin 1s linear infinite;
}

@keyframes spin{
to{transform:rotate(360deg);}
}

@keyframes slideUp{
from{transform:translateY(100%)}
to{transform:translateY(0)}
}

.animate-slideUp{
animation:slideUp 0.3s ease;
}

`}</style>

</main>

);

}

