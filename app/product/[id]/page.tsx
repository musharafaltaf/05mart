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

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductPage(){

const params = useParams();
const id = params.id;

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [product,setProduct] = useState<any>(null);
const [selectedImage,setSelectedImage] = useState("");
const [selectedSize,setSelectedSize] = useState("");

const [reviews,setReviews] = useState<any[]>([]);

useEffect(()=>{

const loadProduct = async()=>{

try{

const res = await fetch(`/api/products/${id}`);

if(!res.ok) return;

const data = await res.json();

setProduct(data);

setSelectedImage(data.image);

}catch(err){
console.log(err);
}

};

loadProduct();

},[id]);

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

loadReviews();

},[id]);

/* recently viewed */

useEffect(()=>{

if(!product) return;

let viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

viewed = viewed.filter((p:any)=>p._id !== product._id);

viewed.unshift(product);

viewed = viewed.slice(0,8);

localStorage.setItem("recentlyViewed", JSON.stringify(viewed));

},[product]);

if(!product) return <p className="p-10">Loading...</p>;

const images = product.images?.length ? product.images : [product.image];

return(

<main className="max-w-7xl mx-auto px-4 py-10">

<div className="grid md:grid-cols-2 gap-8">

{/* IMAGE GALLERY */}

<div className="grid grid-cols-[70px_1fr] md:grid-cols-[100px_1fr] gap-4">

<div className="flex flex-col gap-3">

{images.map((img:any)=>(
<img
key={img}
src={img}
onClick={()=>setSelectedImage(img)}
className="w-14 h-14 md:w-20 md:h-20 object-cover border cursor-pointer"
/>
))}

</div>

<img
src={selectedImage}
className="w-full rounded"
/>

</div>

{/* PRODUCT INFO */}

<div>

<h1 className="text-2xl font-semibold">
{product.name}
</h1>

<p className="text-xl mt-2">
₹{product.price}
</p>

<p className="text-gray-500 mt-3">
{product.description}
</p>

{/* SIZE SELECT */}

{product.sizes?.length > 0 && (

<div className="mt-6">

<p className="font-medium mb-2">
Select Size
</p>

<div className="flex gap-2">

{product.sizes.map((size:any)=>(
<button
key={size}
onClick={()=>setSelectedSize(size)}
className={`border px-3 py-1 rounded ${
selectedSize===size ? "bg-black text-white":""
}`}
>
{size}
</button>
))}

</div>

</div>

)}

{/* BUTTONS */}

<div className="flex gap-4 mt-6">

<button
onClick={()=>addToCart({...product,size:selectedSize})}
className="bg-black text-white px-6 py-2 rounded"
>
Add to Cart
</button>

<button
onClick={()=>addToWishlist(product)}
className="border px-6 py-2 rounded"
>
Wishlist
</button>

</div>

</div>

</div>

{/* REVIEWS */}

<div className="mt-12">

<h2 className="text-xl font-semibold mb-4">
Customer Reviews
</h2>

{reviews.length===0 && (
<p>No reviews yet</p>
)}

{reviews.map((r:any)=>(
<div key={r._id} className="border p-4 mb-4 rounded">

<p className="text-yellow-500">
{"★".repeat(r.rating)}
</p>

<p className="text-gray-600 text-sm mt-1">
{r.comment}
</p>

</div>
))}

</div>

</main>

)

}