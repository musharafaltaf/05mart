"use client";

import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ComboPage(){

const params = useParams();
const router = useRouter();
const id = params?.id as string;

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [combo,setCombo] = useState<any>(null);
const [sizes,setSizes] = useState<any>({});
const [loading,setLoading] = useState(true);

/* NEW STATES */
const [processing,setProcessing] = useState(false);
const [popup,setPopup] = useState<string | null>(null);

/* LOAD COMBO */

useEffect(()=>{

const load = async()=>{

try{

const res = await fetch(`/api/combos/${id}`);

if(!res.ok){
setLoading(false);
return;
}

const data = await res.json();
setCombo(data);

}catch(err){
console.log(err);
}

setLoading(false);

};

if(id) load();

},[id]);

/* SELECT SIZE */

const selectSize = (productId:string,size:string)=>{
setSizes({...sizes,[productId]:size});
};

/* VALIDATION */

const validateSizes = ()=>{
for(const p of combo.products){
if(!sizes[p._id]){
setPopup(`Please select size for ${p.name}`);
return false;
}
}
return true;
};

/* ADD TO CART */

const addComboToCart = ()=>{

if(!combo) return;

if(!validateSizes()) return;

setProcessing(true);

setTimeout(()=>{

addToCart({
type:"combo",
comboId:combo._id,
name:combo.name,
price:combo.comboPrice,
items:combo.products.map((p:any)=>({
productId:p._id,
name:p.name,
image:p.image,
size:sizes[p._id],
price:p.price,
quantity:1
}))
});

setPopup("Combo added to cart 🛒");
setProcessing(false);

},700);

};

/* BUY NOW */

const buyNow = ()=>{

if(!combo) return;

if(!validateSizes()) return;

setProcessing(true);

setTimeout(()=>{

localStorage.setItem("buyNow",JSON.stringify({
type:"combo",
comboId:combo._id,
price:combo.comboPrice,
items:combo.products.map((p:any)=>({
productId:p._id,
name:p.name,
image:p.image,
size:sizes[p._id],
price:p.price,
quantity:1
}))
}));

router.push("/checkout/address");

},700);

};

/* ================= SKELETON ================= */

if(loading){
return(
<main className="max-w-4xl mx-auto p-6 animate-pulse">

<div className="h-6 bg-gray-200 w-1/2 mb-6 rounded"></div>

{[...Array(3)].map((_,i)=>(
<div key={i} className="flex gap-4 mb-4">
<div className="w-24 h-24 bg-gray-200 rounded"></div>
<div className="flex-1 space-y-2">
<div className="h-4 bg-gray-200 w-3/4 rounded"></div>
<div className="h-4 bg-gray-200 w-1/3 rounded"></div>
<div className="h-8 bg-gray-200 w-1/2 rounded"></div>
</div>
</div>
))}

</main>
);
}

if(!combo){
return <p className="p-10 text-center">Combo not found</p>
}

return(

<main className="container">

<h1 className="title">
{combo.name}
</h1>

<p className="text-sm text-gray-400 mb-4">
✨ Premium combo deal • Limited time offer
</p>

{/* PRODUCTS */}

<div className="products">

{combo.products.map((p:any)=>(

<div key={p._id} className="productCard">

<img src={p.image} className="image"/>

<div className="info">

<h3>{p.name}</h3>

<p className="price">₹{p.price}</p>

<p className="text-xs text-gray-400 mb-1">
Select size for best fit
</p>

<div className="sizes">

{p.sizes?.map((size:any)=>(

<button
key={size}
onClick={()=>selectSize(p._id,size)}
className={sizes[p._id]===size ? "active" : ""}
>

{size}

</button>

))}

</div>

</div>

</div>

))}

</div>

{/* PRICE */}

<div className="priceBox">

<p className="comboPrice">₹{combo.comboPrice}</p>

<p className="original">₹{combo.originalPrice}</p>

<p className="save">
Save ₹{combo.originalPrice - combo.comboPrice}
</p>

</div>

{/* ACTIONS */}

<div className="actions">

<button onClick={addComboToCart} className="cartBtn">

{processing ? (
<>
<div className="loader"></div> Adding...
</>
) : "Add Combo to Cart"}

</button>

<button onClick={buyNow} className="buyBtn">

{processing ? (
<>
<div className="loader"></div> Processing...
</>
) : "Buy Now"}

</button>

<button onClick={()=>addToWishlist(combo)} className="wishBtn">
❤ Wishlist
</button>

</div>

{/* POPUP */}

{popup && (
<div className="popup" onClick={()=>setPopup(null)}>
<div className="popupBox">
<p>{popup}</p>
<button onClick={()=>setPopup(null)}>OK</button>
</div>
</div>
)}

<style jsx>{`

.container{
max-width:900px;
margin:auto;
padding:30px 16px;
}

.title{
font-size:26px;
font-weight:700;
margin-bottom:10px;
}

.products{
display:flex;
flex-direction:column;
gap:18px;
}

.productCard{
display:flex;
gap:14px;
border:1px solid #eee;
padding:14px;
border-radius:12px;
background:white;
transition:.2s;
}

.productCard:hover{
transform:translateY(-2px);
box-shadow:0 8px 20px rgba(0,0,0,.05);
}

.image{
width:100px;
height:100px;
object-fit:cover;
border-radius:10px;
}

.info{
flex:1;
}

.price{
font-weight:600;
margin:6px 0;
}

.sizes{
display:flex;
gap:8px;
flex-wrap:wrap;
}

.sizes button{
border:1px solid #ddd;
padding:6px 12px;
border-radius:6px;
cursor:pointer;
background:white;
transition:.2s;
}

.sizes button.active{
background:black;
color:white;
transform:scale(1.05);
}

.priceBox{
margin-top:24px;
display:flex;
align-items:center;
gap:14px;
}

.comboPrice{
font-size:24px;
font-weight:700;
}

.original{
text-decoration:line-through;
color:#888;
}

.save{
color:#16a34a;
font-weight:600;
}

.actions{
margin-top:20px;
display:flex;
gap:12px;
flex-wrap:wrap;
}

.cartBtn{
background:black;
color:white;
padding:12px 20px;
border-radius:10px;
cursor:pointer;
display:flex;
align-items:center;
gap:6px;
}

.buyBtn{
background:linear-gradient(to right,orange,gold);
color:white;
padding:12px 20px;
border-radius:10px;
cursor:pointer;
display:flex;
align-items:center;
gap:6px;
}

.wishBtn{
border:1px solid #ddd;
padding:12px 20px;
border-radius:10px;
cursor:pointer;
}

/* LOADER */

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

/* POPUP */

.popup{
position:fixed;
inset:0;
background:rgba(0,0,0,.4);
display:flex;
align-items:center;
justify-content:center;
z-index:999;
}

.popupBox{
background:white;
padding:20px;
border-radius:12px;
text-align:center;
animation:fade .2s ease;
}

.popupBox button{
margin-top:10px;
background:black;
color:white;
padding:8px 16px;
border-radius:8px;
}

@keyframes fade{
from{opacity:0; transform:scale(.9);}
to{opacity:1; transform:scale(1);}
}

`}</style>

</main>

);

}