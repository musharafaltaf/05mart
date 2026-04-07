"use client";

import { useEffect,useState,useRef } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductPage(){

const router = useRouter();
const params = useParams();
const id = params?.id as string;

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [product,setProduct] = useState<any>(null);
const [reviews,setReviews] = useState<any[]>([]);

const [selectedImage,setSelectedImage] = useState("");
const [selectedSize,setSelectedSize] = useState("");

const [showSizeChart,setShowSizeChart] = useState(false);

const [loading,setLoading] = useState(true);
const [zoom,setZoom] = useState(false);

const [cartState,setCartState] = useState<"idle"|"loading"|"added">("idle");
const [wishlistState,setWishlistState] = useState<"idle"|"added">("idle");
const [buyLoading,setBuyLoading] = useState(false);

const [imageViewer,setImageViewer] = useState(false);
const [viewerIndex,setViewerIndex] = useState(0);

const [reviewViewer,setReviewViewer] = useState(false);
const [reviewImages,setReviewImages] = useState<string[]>([]);
const [reviewIndex,setReviewIndex] = useState(0);

const [thumbsSwiper,setThumbsSwiper] = useState<any>(null);

const [sizeError,setSizeError] = useState("");

/* sticky bar */

const [showSticky,setShowSticky] = useState(false);
const actionRef = useRef<HTMLDivElement>(null);

/* LOAD PRODUCT */

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

setProduct(data);
setSelectedImage(data?.image || "");

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

const res = await fetch(`/api/reviews?productId=${id}&t=${Date.now()}`);
if(!res.ok) return;

const data = await res.json();
setReviews(data);

}catch(err){
console.log(err);
}

};

if(id) loadReviews();

},[id]);

/* sticky scroll logic */

useEffect(()=>{

const onScroll=()=>{

if(!actionRef.current) return;

const rect = actionRef.current.getBoundingClientRect();

setShowSticky(rect.top < -200);

};

window.addEventListener("scroll",onScroll);

return ()=>window.removeEventListener("scroll",onScroll);

},[]);

if(loading){
return <p className="p-10 text-center">Loading product...</p>
}

if(!product){
return <p className="p-10 text-center">Product not found</p>
}

/* SIZE LOGIC */

/* FIX SIZE ARRAY */

const sizes = product.sizes
? (Array.isArray(product.sizes)
    ? product.sizes
    : product.sizes.split(","))
      .map((s:string)=>s.trim())
      .filter((s:string)=>{
        return product.sizeStock?.[s] === undefined || product.sizeStock?.[s] > 0;
      })
: ["S","M","L","XL"];
/* IMAGES */

const images = Array.from(
  new Set([
    product?.image,
    ...(Array.isArray(product?.images) ? product.images : [])
  ].filter(Boolean))
);
/* DISCOUNT */

const discount =
product.mrp
? Math.round(((product.mrp-product.price)/product.mrp)*100)
:0;

/* RATING */

const rating =
reviews.length
? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length).toFixed(1)
:null;

/* RATING BREAKDOWN */

const averageRating =
reviews.length
? (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1)
:0;

const ratingBreakdown=[5,4,3,2,1].map(star=>{

const count=reviews.filter(r=>r.rating===star).length;

return{
star,
count,
percent:reviews.length
? (count/reviews.length)*100
:0
};

});

/* STOCK */

const isOutOfStock = product.stock <= 0;
return(

<main className="max-w-7xl mx-auto px-4 py-10">

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

{/* IMAGE SECTION */}

<div className="animate-fade">

<div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100">

<img
src={selectedImage || "/placeholder.png"}
loading="lazy"
onMouseEnter={()=>setZoom(true)}
onMouseLeave={()=>setZoom(false)}
onClick={()=>setImageViewer(true)}
className={`w-full h-full object-cover transition-all duration-500 cursor-zoom-in ${
zoom ? "scale-110":"scale-100"
}`}
/>

</div>

<div className="grid grid-cols-5 gap-3 mt-4">

{images.map((img:any,i:number)=>(
<img
key={i}
loading="lazy"
src={img}
onClick={()=>{
setSelectedImage(img);
setViewerIndex(i);
}}
className={`aspect-square object-cover rounded-lg cursor-pointer hover:scale-110 transition ${
selectedImage===img ? "ring-2 ring-black":""
}`}
/>
))}

</div>

</div>

{/* PRODUCT INFO */}

<div className="animate-slide">

<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
{product.name}
</h1>

{rating &&(
<p className="text-yellow-500 mt-2">
⭐ {rating} ({reviews.length} reviews)
</p>
)}

<div className="flex items-center gap-3 mt-4">

<p className="text-2xl md:text-3xl font-bold">
₹{product.price}
</p>

{product.mrp &&(
<>
<p className="text-gray-400 line-through">
₹{product.mrp}
</p>

<p className="text-green-600 font-semibold">
{discount}% OFF
</p>
</>
)}

</div>

<p className={`mt-2 text-sm ${
isOutOfStock ? "text-red-500":"text-green-600"
}`}>
{isOutOfStock ? "Out of Stock":"In Stock"}
</p>

{/* SIZE */}

<div className="mt-6">

<p className="font-medium mb-2">Select Size</p>

<div className="flex gap-2 flex-wrap">

{sizes.map((size:any)=>(
<button
key={size}
onClick={()=>setSelectedSize(size)}
className={`border px-4 py-1 rounded transition hover:bg-black hover:text-white ${
selectedSize===size ? "bg-black text-white":""
}`}
>
{size}
</button>
))}

</div>

<button
onClick={()=>setShowSizeChart(true)}
className="text-blue-600 mt-2 underline text-sm hover:opacity-70"
>
View Size Chart
</button>

{sizeError &&(
<p className="text-red-500 text-sm mt-1">
{sizeError}
</p>
)}

</div>

<p className="text-gray-500 mt-6">
{product.description}
</p>

{/* ACTION BUTTONS */}

<div ref={actionRef} className="flex gap-4 mt-6 flex-wrap">

<button
disabled={isOutOfStock}
onClick={()=>{

if(sizes.length && !selectedSize){
setSizeError("Please select size");
return;
}

if(cartState==="added"){
router.push("/cart");
return;
}

setCartState("loading");

setTimeout(()=>{
addToCart({...product,size:selectedSize,quantity:1});
setCartState("added");
},400);

}}
className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition shadow-md"
>

{cartState==="idle" && "Add to Cart"}
{cartState==="loading" && "Adding..."}
{cartState==="added" && "View Cart"}

</button>

<button
disabled={isOutOfStock}
onClick={()=>{

if(sizes.length && !selectedSize){
setSizeError("Please select size");
return;
}

setBuyLoading(true);

setTimeout(()=>{

localStorage.setItem("buyNow",JSON.stringify({
...product,
size:selectedSize,
quantity:1
}));

window.location.href="/checkout/address";

},500);

}}
className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition shadow-sm"
>

{buyLoading ? "Processing..." : "Buy Now"}

</button>

<button
onClick={()=>{

if(wishlistState==="added"){
router.push("/wishlist");
return;
}

addToWishlist(product);
setWishlistState("added");

}}
className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
>

{wishlistState==="added" ? "❤ View Wishlist":"❤ Wishlist"}

</button>

</div>

</div>

</div>

{/* REVIEWS */}

{/* ================= CUSTOMER REVIEWS ================= */}

<section className="mt-16 space-y-8">

<h2 className="text-2xl font-semibold">
Customer Reviews
</h2>

{/* SUMMARY */}

<div className="flex gap-10 flex-wrap">

<div>

<p className="text-4xl font-bold">
{averageRating} ⭐
</p>

<p className="text-gray-500">
{reviews.length} reviews
</p>

</div>

{/* BREAKDOWN */}

<div className="space-y-2">

{ratingBreakdown.map(r=>(
<div key={r.star} className="flex items-center gap-3">

<span>{r.star}★</span>

<div className="w-40 h-2 bg-gray-200 rounded overflow-hidden">

<div
style={{width:`${r.percent}%`}}
className="h-full bg-yellow-400 transition-all duration-700"
/>

</div>

<span className="text-sm text-gray-600">
{r.count}
</span>

</div>
))}

</div>

</div>

{/* NO REVIEWS */}

{reviews.length===0 &&(
<p className="text-gray-500">
No reviews yet
</p>
)}

{/* REVIEW CARDS */}

<div className="space-y-6">

{reviews.map((r:any)=>(
<div
key={r._id}
className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
>

{/* HEADER */}

<div className="flex justify-between">

<div>

<p className="font-semibold">
{r.userName}
</p>

<span className="text-xs text-green-600">
✔ Verified Purchase
</span>

</div>

<div className="text-yellow-500">
{"★".repeat(r.rating)}
{"☆".repeat(5-r.rating)}
</div>

</div>

{/* COMMENT */}

<p className="mt-3 text-gray-700">
{r.comment}
</p>

{/* CUSTOMER IMAGES */}

{r.images?.length>0 &&(

<div className="flex gap-3 mt-3 flex-wrap">

{r.images.map((img:string,i:number)=>(
<img
key={i}
src={img}
loading="lazy"
onClick={()=>{
setReviewImages(r.images);
setReviewIndex(i);
setReviewViewer(true);
}}
className="w-24 h-24 md:w-20 md:h-20 object-cover rounded cursor-pointer hover:scale-110 transition"
/>
))}

</div>

)}

{/* DATE */}

<p className="text-xs text-gray-400 mt-3">
{new Date(r.createdAt).toDateString()}
</p>

<button className="text-sm text-gray-600 mt-2 hover:underline">
👍 Helpful
</button>

</div>
))}

</div>

</section>



{/* ================= REVIEW IMAGE VIEWER ================= */}

{reviewViewer && (

<div
className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center"
onClick={()=>setReviewViewer(false)}
>

{/* CLOSE BUTTON */}

<button
onClick={()=>setReviewViewer(false)}
className="absolute top-6 right-6 text-white text-4xl hover:scale-110 transition z-[100000]"
>
❌
</button>

<div
className="w-full max-w-5xl px-6"
onClick={(e)=>e.stopPropagation()}
>

{/* MAIN SLIDER */}

<Swiper
modules={[Navigation, Thumbs]}
navigation
thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
className="mb-4"
initialSlide={reviewIndex}
>

{reviewImages.map((img,i)=>(
<SwiperSlide key={i}>

<img
src={img}
className="w-full max-h-[70vh] object-contain rounded-lg"
/>

</SwiperSlide>
))}

</Swiper>

{/* THUMBNAILS */}

<Swiper
modules={[Thumbs]}
onSwiper={setThumbsSwiper}
slidesPerView={5}
spaceBetween={10}
watchSlidesProgress
>

{reviewImages.map((img,i)=>(
<SwiperSlide key={i}>

<img
src={img}
className="h-20 w-full object-cover rounded cursor-pointer border hover:border-white"
/>

</SwiperSlide>
))}

</Swiper>

</div>

</div>

)}




{/* STICKY BUY BAR */}

{showSticky &&(

<div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50 animate-slideUp">

<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

<p className="font-bold text-lg">
₹{product.price}
</p>

<div className="flex gap-2">

<button
className="bg-black text-white px-4 py-2 rounded-lg"
onClick={()=>addToCart({...product,size:selectedSize,quantity:1})}
>
Add to Cart
</button>

<button
className="border px-4 py-2 rounded-lg"
onClick={()=>window.location.href="/checkout/address"}
>
Buy Now
</button>

</div>

</div>

</div>

)}


{/* SIZE CHART MODAL */}

{showSizeChart && (

<div
className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center"
onClick={()=>setShowSizeChart(false)}
>

<div
className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl"
onClick={(e)=>e.stopPropagation()}
>

<div className="flex justify-between items-center mb-4">

<h2 className="text-lg font-semibold">
Size Chart
</h2>

<button
onClick={()=>setShowSizeChart(false)}
className="text-xl hover:scale-110"
>
✕
</button>

</div>

<table className="w-full text-sm border">

<thead className="bg-gray-100">

<tr>
<th className="p-2 border">Size</th>
<th className="p-2 border">Chest</th>
<th className="p-2 border">Length</th>
</tr>

</thead>

<tbody>

<tr>
<td className="border p-2 text-center">S</td>
<td className="border p-2 text-center">36</td>
<td className="border p-2 text-center">26</td>
</tr>

<tr>
<td className="border p-2 text-center">M</td>
<td className="border p-2 text-center">38</td>
<td className="border p-2 text-center">27</td>
</tr>

<tr>
<td className="border p-2 text-center">L</td>
<td className="border p-2 text-center">40</td>
<td className="border p-2 text-center">28</td>
</tr>

<tr>
<td className="border p-2 text-center">XL</td>
<td className="border p-2 text-center">42</td>
<td className="border p-2 text-center">29</td>
</tr>
</tbody>
</table>

</div>

</div>

)}

</main>




)
}