// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function ProductPage() {

//   const { id } = useParams();

//   const [product, setProduct] = useState<any>(null);

//   useEffect(() => {

//     const fetchProduct = async () => {

//       const res = await fetch(`/api/products/${id}`);

//       const data = await res.json();

//       setProduct(data);

//     };

//     fetchProduct();

//   }, [id]);

//   if (!product) return <p className="p-10">Loading...</p>;

//   const finalPrice =
//     product.price - (product.price * product.discount) / 100;

//   return (

//     <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10">

//       <img
//         src={product.image || "https://via.placeholder.com/500"}
//         alt={product.name}
//         className="w-full rounded"
//       />

//       <div>

//         <h1 className="text-3xl font-bold mb-4">
//           {product.name}
//         </h1>

//         <p className="text-gray-600 mb-4">
//           {product.description}
//         </p>

//         <div className="flex items-center gap-3 mb-6">

//           <span className="text-2xl font-bold text-green-600">
//             ₹{Math.round(finalPrice)}
//           </span>

//           {product.discount > 0 && (
//             <>
//               <span className="line-through text-gray-400">
//                 ₹{product.price}
//               </span>

//               <span className="text-red-500">
//                 {product.discount}% OFF
//               </span>
//             </>
//           )}

//         </div>

//         <button className="bg-black text-white px-6 py-3 rounded">
//           Add to Cart
//         </button>

//       </div>

//     </div>

//   );
// }
// 
"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductPage(){

const params = useParams();
const id = params?.id as string;

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [product,setProduct] = useState<any>(null);
const [reviews,setReviews] = useState<any[]>([]);

const [selectedImage,setSelectedImage] = useState("");
const [selectedSize,setSelectedSize] = useState("");

const [showSizePopup,setShowSizePopup] = useState(false);
const [showSizeChart,setShowSizeChart] = useState(false);
const [pendingAction,setPendingAction] = useState<"cart" | "buy" | null>(null);

const [loading,setLoading] = useState(true);
const [zoom,setZoom] = useState(false);
const [cartAnim,setCartAnim] = useState(false);
const [sizeError,setSizeError] = useState("");

/* ========================= */
/* LOAD PRODUCT */
/* ========================= */

useEffect(()=>{

if(!id) return;

const loadProduct = async()=>{

try{

const res = await fetch(`/api/products/${id}`);
if(!res.ok){
setLoading(false);
return;
}

const data = await res.json();

if(!data || !data._id){
setLoading(false);
return;
}

setProduct(data);
setSelectedImage(data.image || "");

}catch(err){
console.log(err);
}

setLoading(false);

};

loadProduct();

},[id]);

/* ========================= */
/* REVIEWS */
/* ========================= */

useEffect(()=>{

const loadReviews = async()=>{

try{
const res = await fetch(`/api/reviews?productId=${id}`);
if(!res.ok) return;

const data = await res.json();
setReviews(data);

}catch(err){
console.log(err);
}

};

if(id) loadReviews();

},[id]);

if(loading){
return <p className="p-10 text-center">Loading product...</p>
}

if(!product){
return <p className="p-10 text-center">Product not found</p>
}

/* ========================= */
/* SIZE */
/* ========================= */

const sizes =
product.sizes?.length > 0
? product.sizes.filter((s:any)=>{
return product.sizeStock?.[s] === undefined || product.sizeStock?.[s] > 0;
})
: ["S","M","L","XL"];

/* ========================= */

const images = [
product?.image,
...(Array.isArray(product?.images) ? product.images : [])
].filter((img:any)=>img);

const discount =
product.mrp
? Math.round(((product.mrp - product.price) / product.mrp) * 100)
: 0;

const rating =
reviews.length
? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length).toFixed(1)
: null;

/* ========================= */
/* STOCK LOGIC */
/* ========================= */

const isOutOfStock = product.stock <= 0;
const lowStock = product.stock > 0 && product.stock <= 3;

/* ========================= */
/* UI */
/* ========================= */

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

{/* IMAGE */}

<div>

<div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">

<img
src={selectedImage || "/placeholder.png"}
onMouseEnter={()=>setZoom(true)}
onMouseLeave={()=>setZoom(false)}
className={`w-full h-full object-cover transition-transform duration-300 
${zoom ? "scale-110" : "scale-100"}`}
/>

</div>

<div className="flex gap-3 mt-4 flex-wrap">

{images.map((img:any)=>(
<img
key={img}
src={img}
onClick={()=>setSelectedImage(img)}
className={`w-16 h-16 object-cover border rounded cursor-pointer 
${selectedImage===img ? "border-black" : ""}`}
/>
))}

</div>

</div>

{/* INFO */}

<div>

<h1 className="text-2xl font-semibold">{product.name}</h1>

{rating && (
<p className="text-yellow-500 mt-2">
⭐ {rating} ({reviews.length} reviews)
</p>
)}

<div className="mt-4 flex items-center gap-3">

<p className="text-3xl font-bold">₹{product.price}</p>

{product.mrp && (
<>
<p className="text-gray-400 line-through text-lg">₹{product.mrp}</p>
<p className="text-green-600 font-semibold">{discount}% OFF</p>
</>
)}

</div>

{/* STOCK */}

<p className={`text-sm mt-2 ${
isOutOfStock ? "text-red-500" : "text-green-600"
}`}>
{isOutOfStock ? "Out of Stock" : "In Stock"}
</p>

{lowStock && (
<p className="text-orange-500 text-sm">
Only {product.stock} left 🔥
</p>
)}

{/* SIZE */}

<div className="mt-6">

<p className="font-medium mb-2">Select Size</p>

<div className="flex gap-2 flex-wrap">

{sizes.map((size:any)=>(

<button
key={size}
onClick={()=>setSelectedSize(size)}
className={`border px-4 py-1 rounded ${
selectedSize===size ? "bg-black text-white" : ""
}`}
>
{size}
</button>

))}

</div>

<button
onClick={()=>setShowSizeChart(true)}
className="text-blue-600 mt-2 underline text-sm"
>
View Size Chart
</button>

</div>

<p className="text-gray-500 mt-6">{product.description}</p>

{/* BUTTONS */}

<div className="flex gap-4 mt-6">

<button
disabled={isOutOfStock}
onClick={()=>{

if(sizes.length && !selectedSize){
setSizeError("Please select size");
setPendingAction("cart");
setShowSizePopup(true);
return;
}

addToCart({...product,size:selectedSize,quantity:1});

setCartAnim(true);
setTimeout(()=>setCartAnim(false),800);

}}
className={`px-6 py-2 rounded relative overflow-hidden ${
isOutOfStock
? "bg-gray-400 text-white cursor-not-allowed"
: "bg-black text-white"
}`}
>
Add to Cart

{cartAnim && (
<span className="absolute inset-0 bg-green-500 animate-ping opacity-40"></span>
)}

</button>

<button
disabled={isOutOfStock}
onClick={()=>{

if(sizes.length && !selectedSize){
setSizeError("Please select size");
setPendingAction("buy");
setShowSizePopup(true);
return;
}

localStorage.setItem("buyNow",JSON.stringify({
...product,
size:selectedSize,
quantity:1
}));

window.location.href="/checkout/address";

}}
className={`px-6 py-2 rounded ${
isOutOfStock
? "border bg-gray-200 cursor-not-allowed"
: "border"
}`}
>
Buy Now
</button>

<button
onClick={()=>addToWishlist(product)}
className="border px-6 py-2 rounded"
>
❤ Wishlist
</button>

</div>

</div>

</div>

{/* SIZE POPUP */}

{showSizePopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

<h3 className="text-lg font-semibold text-center mb-3">
Select Size
</h3>

{sizeError && (
<p className="text-red-500 text-center mb-3">{sizeError}</p>
)}

<div className="flex gap-2 flex-wrap justify-center mb-4">

{sizes.map((size:any)=>(

<button
key={size}
onClick={()=>{
setSelectedSize(size);
setShowSizePopup(false);
setSizeError("");

if(pendingAction==="buy"){
localStorage.setItem("buyNow",JSON.stringify({
...product,
size:size,
quantity:1
}));
window.location.href="/checkout/address";
}

if(pendingAction==="cart"){
addToCart({...product,size:size,quantity:1});
}
}}
className="border px-4 py-2 rounded hover:bg-black hover:text-white"
>
{size}
</button>

))}

</div>

<button
onClick={()=>setShowSizePopup(false)}
className="w-full border py-2 rounded"
>
Cancel
</button>

</div>

</div>

)}

{/* SIZE CHART */}

{showSizeChart && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl w-[95%] max-w-lg">

<h3 className="text-lg font-semibold text-center mb-4">
Size Chart
</h3>

<p className="font-medium mb-2">T-Shirts</p>
<p className="text-sm mb-4">S: 38" | M: 40" | L: 42" | XL: 44"</p>

<p className="font-medium mb-2">Trousers</p>
<p className="text-sm">S: 30 | M: 32 | L: 34 | XL: 36</p>

<button
onClick={()=>setShowSizeChart(false)}
className="w-full border py-2 rounded mt-4"
>
Close
</button>

</div>

</div>

)}

</main>

);
}