"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ComboAdminPage(){

const router = useRouter();

const [products,setProducts] = useState<any[]>([]);
const [selected,setSelected] = useState<any[]>([]);
const [comboName,setComboName] = useState("");
const [comboPrice,setComboPrice] = useState("");
const [loading,setLoading] = useState(false);

const [popup,setPopup] = useState({
show:false,
message:""
});

/* LOAD PRODUCTS */

useEffect(()=>{

const loadProducts = async()=>{

try{

const res = await fetch("/api/products");
const data = await res.json();

setProducts(data);

}catch(err){
console.log(err);
}

};

loadProducts();

},[]);


/* SELECT PRODUCT */

const toggleProduct = (product:any)=>{

const exists = selected.find((p)=>p._id===product._id);

if(exists){

setSelected(selected.filter((p)=>p._id!==product._id));

}else{

setSelected([...selected,product]);

}

};


/* SAVE COMBO */

const saveCombo = async()=>{

if(!comboName){
return setPopup({show:true,message:"Enter combo name"});
}

if(selected.length < 2){
return setPopup({show:true,message:"Select at least 2 products"});
}

if(!comboPrice){
return setPopup({show:true,message:"Enter combo price"});
}

setLoading(true);

const originalPrice = selected.reduce(
(sum,p)=>sum + (p.price || 0),0
);

const payload = {
name:comboName,
comboPrice:Number(comboPrice),
originalPrice,
products:selected.map((p)=>({
_id:p._id,
name:p.name,
image:p.image,
price:p.price,
sizes:p.sizes
}))
};

const res = await fetch(`/api/combos?t=${Date.now()}`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
});

const result = await res.json();

console.log("COMBO SAVE RESULT:", result);

setLoading(false);

setPopup({
show:true,
message:"Combo created successfully"
});

setTimeout(()=>{
router.refresh();
},800);

};


/* DELETE COMBO */

const deleteCombo = async(id:string)=>{

await fetch(`/api/combos/${id}`,{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({id})
});

router.refresh();

};

return(

<main className="container">

<h1 className="title">
Combo Builder
</h1>

{/* INPUT SECTION */}

<div className="card">

<input
placeholder="Combo Name"
value={comboName}
onChange={(e)=>setComboName(e.target.value)}
/>

<input
placeholder="Combo Price"
value={comboPrice}
onChange={(e)=>setComboPrice(e.target.value)}
/>
<p className="previewPrice">
Original Price: ₹{selected.reduce((sum,p)=>sum+(p.price||0),0)}
</p>

<button
onClick={saveCombo}
className="saveBtn"
disabled={loading}
>

{loading ? "Saving..." : "Create Combo"}

</button>

</div>


{/* SELECT PRODUCTS */}

<h2 className="subtitle">
Select Products
</h2>

<div className="grid">

{products.map((p:any)=>{

const active = selected.find((s)=>s._id===p._id);

return(

<div
key={p._id}
className={`productCard ${active?"active":""}`}
onClick={()=>toggleProduct(p)}
>

<img src={p.image} />

<p>{p.name}</p>

<span>₹{p.price}</span>

</div>

);

})}

</div>


{/* SELECTED PRODUCTS */}

{selected.length>0 &&(

<div className="selectedBox">

<h3>Selected Products</h3>

<div className="selectedGrid">

{selected.map((p:any)=>(

<div key={p._id} className="selectedItem">

<img src={p.image} />

<p>{p.name}</p>

</div>

))}

</div>

</div>

)}


{/* POPUP */}

{popup.show &&(

<div className="popupOverlay">

<div className="popup">

<p>{popup.message}</p>

<button
onClick={()=>setPopup({show:false,message:""})}
>
OK
</button>

</div>

</div>

)}


<style jsx>{`

.container{
max-width:1000px;
margin:auto;
padding:40px 20px;
}

.title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.subtitle{
margin:20px 0;
font-size:18px;
}

.card{
background:white;
border:1px solid #eee;
border-radius:12px;
padding:20px;
display:flex;
gap:10px;
flex-wrap:wrap;
box-shadow:0 6px 20px rgba(0,0,0,0.05);
}

input{
border:1px solid #ddd;
padding:10px;
border-radius:6px;
flex:1;
}

.saveBtn{
background:black;
color:white;
padding:10px 20px;
border-radius:8px;
cursor:pointer;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
gap:15px;
}

.productCard{
border:1px solid #eee;
border-radius:10px;
padding:10px;
cursor:pointer;
transition:0.2s;
background:white;
}

.productCard:hover{
transform:scale(1.03);
box-shadow:0 8px 20px rgba(0,0,0,0.1);
}

.productCard img{
width:100%;
height:120px;
object-fit:cover;
border-radius:6px;
}

.productCard p{
font-size:14px;
margin-top:6px;
}

.productCard span{
font-size:13px;
color:#555;
}

.productCard.active{
border:2px solid black;
}

.selectedBox{
margin-top:30px;
padding:20px;
border-radius:10px;
background:#fafafa;
}

.selectedGrid{
display:flex;
gap:10px;
flex-wrap:wrap;
}

.selectedItem{
width:100px;
text-align:center;
}

.selectedItem img{
width:100%;
height:70px;
object-fit:cover;
border-radius:6px;
}

.popupOverlay{
position:fixed;
inset:0;
background:rgba(0,0,0,0.4);
display:flex;
align-items:center;
justify-content:center;
}

.popup{
background:white;
padding:25px;
border-radius:10px;
text-align:center;
}

.popup button{
margin-top:10px;
background:black;
color:white;
padding:8px 16px;
border-radius:6px;
}

`}</style>

</main>

);

}