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
"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function ProductPage(){

const params = useParams();
const id = params?.id as string;

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [product,setProduct] = useState<any>(null);
const [related,setRelated] = useState<any[]>([]);
const [reviews,setReviews] = useState<any[]>([]);

const [selectedImage,setSelectedImage] = useState("");
const [selectedSize,setSelectedSize] = useState("");

const [showSizePopup,setShowSizePopup] = useState(false);
const [showSizeChart,setShowSizeChart] = useState(false);

const [pendingAction,setPendingAction] = useState<"cart" | "buy" | null>(null);

const [loading,setLoading] = useState(true);

useEffect(()=>{

if(!id) return;

const loadProduct = async()=>{

try{

const res = await fetch(`/api/products/${id}`,{
cache:"no-store"
});

if(!res.ok){
setLoading(false);
return;
}

const data = await res.json();

setProduct(data);
setSelectedImage(data.image);

/* RELATED PRODUCTS */

const res2 = await fetch(`/api/products`);
const all = await res2.json();

const rel = all.filter((p:any)=>
p.category === data.category && p._id !== data._id
);

setRelated(rel.slice(0,4));

}catch(err){
console.log(err);
}

setLoading(false);

};

loadProduct();

},[id]);

/* LOAD REVIEWS */

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

/* IMAGES */

const images = product.images?.length
? [product.image,...product.images]
: [product.image];

/* DISCOUNT */

const discount =
product.mrp
? Math.round(((product.mrp - product.price) / product.mrp) * 100)
: 0;

/* RATING */

const rating =
reviews.length
? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length).toFixed(1)
: null;

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<div className="grid md:grid-cols-2 gap-10">

{/* IMAGE GALLERY */}

<div>

<img
src={selectedImage}
className="w-full rounded-lg mb-4"
/>

<div className="flex gap-3">

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

{/* PRODUCT INFO */}

<div>

<h1 className="text-2xl font-semibold">
{product.name}
</h1>

{/* BRAND */}

{product.brand && (

<p className="text-gray-600 mt-2">
Brand: <span className="font-semibold">{product.brand}</span>
</p>

)}

{/* RATING */}

{rating && (
<p className="text-yellow-500 mt-2">
⭐ {rating} ({reviews.length} reviews)
</p>
)}

{/* PRICE */}

<div className="mt-4 flex items-center gap-3">

<p className="text-3xl font-bold">
₹{product.price}
</p>

{product.mrp && (
<>
<p className="text-gray-400 line-through text-lg">
₹{product.mrp}
</p>
<p className="text-green-600 font-semibold">
{discount}% OFF
</p>
</>
)}

</div>

{/* STOCK */}

<p className="text-sm mt-2 text-green-600">
{product.stock > 0 ? "In Stock" : "Out of Stock"}
</p>

{/* SIZE SELECTOR */}

{product.sizes?.length > 0 && (

<div className="mt-6">

<p className="font-medium mb-2">
Select Size
</p>

<div className="flex gap-2 flex-wrap">

{product.sizes.map((size:any)=>(
<button
key={size}
onClick={()=>setSelectedSize(size)}
className={`border px-4 py-1 rounded ${
selectedSize===size
? "bg-black text-white"
: "hover:bg-gray-100"
}`}
>
{size}
</button>
))}

</div>

{/* SELECTED SIZE */}

{selectedSize && (

<p className="text-sm text-gray-600 mt-2">
Selected Size: <b>{selectedSize}</b>
</p>

)}

<button
onClick={()=>setShowSizeChart(true)}
className="text-blue-600 mt-3 underline text-sm"
>
View Size Chart
</button>

</div>

)}

<p className="text-gray-500 mt-6">
{product.description}
</p>

{/* BUTTONS */}

<div className="flex gap-4 mt-6">

<button
onClick={()=>{

if(product.sizes?.length && !selectedSize){
setPendingAction("cart");
setShowSizePopup(true);
return;
}

addToCart({
...product,
size:selectedSize,
quantity:1
});

}}
className="bg-black text-white px-6 py-2 rounded"
>
Add to Cart
</button>

<button
onClick={()=>{

if(product.sizes?.length && !selectedSize){
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
className="border px-6 py-2 rounded"
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

{/* REVIEWS */}

<div className="mt-14">

<h2 className="text-xl font-semibold mb-6">
Customer Reviews
</h2>

{reviews.length === 0 && (
<p>No reviews yet</p>
)}

<div className="space-y-4">

{reviews.map((r:any)=>(
<div key={r._id} className="border p-4 rounded">

<p className="text-yellow-500">
{"★".repeat(r.rating)}
</p>

<p className="text-gray-600 text-sm mt-2">
{r.comment}
</p>

</div>
))}

</div>

</div>

{/* RELATED PRODUCTS */}

{related.length > 0 && (

<div className="mt-16">

<h2 className="text-xl font-semibold mb-6">
Related Products
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{related.map((p:any)=>(
<ProductCard key={p._id} product={p}/>
))}

</div>

</div>

)}

{/* SIZE POPUP */}

{showSizePopup && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg w-[320px]">

<h3 className="font-semibold mb-4">
Select Size
</h3>

<div className="flex gap-2 mb-4">

{product.sizes?.map((size:any)=>(
<button
key={size}
onClick={()=>{

setSelectedSize(size);
setShowSizePopup(false);

if(pendingAction==="buy"){

localStorage.setItem("buyNow",JSON.stringify({
...product,
size:size,
quantity:1
}));

window.location.href="/checkout/address";

}

if(pendingAction==="cart"){

addToCart({
...product,
size:size,
quantity:1
});

}

setPendingAction(null);

}}
className="border px-4 py-1 rounded hover:bg-black hover:text-white"
>
{size}
</button>
))}

</div>

<button
onClick={()=>setShowSizePopup(false)}
className="border px-4 py-2 rounded w-full"
>
Cancel
</button>

</div>

</div>

)}

{/* SIZE CHART */}

{showSizeChart && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg w-[350px]">

<h3 className="font-semibold mb-4">
Size Chart
</h3>

<table className="w-full text-sm border">

<thead>
<tr className="border-b">
<th className="p-2">Size</th>
<th className="p-2">Chest</th>
<th className="p-2">Length</th>
</tr>
</thead>

<tbody>

<tr className="border-b">
<td className="p-2">S</td>
<td className="p-2">38"</td>
<td className="p-2">26"</td>
</tr>

<tr className="border-b">
<td className="p-2">M</td>
<td className="p-2">40"</td>
<td className="p-2">27"</td>
</tr>

<tr className="border-b">
<td className="p-2">L</td>
<td className="p-2">42"</td>
<td className="p-2">28"</td>
</tr>

<tr>
<td className="p-2">XL</td>
<td className="p-2">44"</td>
<td className="p-2">29"</td>
</tr>

</tbody>

</table>

<button
onClick={()=>setShowSizeChart(false)}
className="border px-4 py-2 rounded w-full mt-4"
>
Close
</button>

</div>

</div>

)}

</main>

);

}