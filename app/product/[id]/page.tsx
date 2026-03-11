"use client";
import RelatedProducts from "../../../components/RelatedProducts";
import ReviewSection from "../../../components/ReviewSection";
import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "../../../data/products";
import { useCart } from "../../context/CartContext";

export default function ProductPage(){

const params = useParams();
const { addToCart } = useCart();

const product = products.find(
(p)=>p.id === Number(params.id)
);

const [selectedImage,setSelectedImage] = useState(
product?.images?.[0]
);

const [size,setSize] = useState("");

if(!product){
return <p className="p-10">Product not found</p>
}

return(

<main className="max-w-6xl mx-auto px-6 py-16">

<div className="grid md:grid-cols-2 gap-12">

{/* IMAGE GALLERY */}

<div>

<img
src={selectedImage}
className="w-full h-[450px] object-cover rounded-xl mb-4"
/>

<div className="flex gap-3">

{product.images.map((img)=>(
<img
key={img}
src={img}
onClick={()=>setSelectedImage(img)}
className={`w-20 h-20 object-cover rounded cursor-pointer border ${
selectedImage===img ? "border-black" : ""
}`}
/>
))}

</div>

</div>

{/* PRODUCT INFO */}

<div>

<h1 className="text-3xl font-semibold mb-2">
{product.name}
</h1>

<p className="text-yellow-500 mb-3">
⭐⭐⭐⭐☆
</p>

<p className="text-2xl font-medium mb-6">
₹{product.price}
</p>

<p className="font-medium mb-3">
Select Size
</p>

<div className="flex gap-3 mb-6">

{product.sizes.map((s)=>(
<button
key={s}
onClick={()=>setSize(s)}
className={`border px-4 py-2 rounded ${
size===s ? "bg-black text-white" : ""
}`}
>
{s}
</button>
))}

</div>

<button
onClick={()=>{

if(!size){
alert("Please select size");
return;
}

addToCart({...product,size});

}}
className="bg-black text-white px-6 py-3 rounded-lg"
>

Add to Cart

</button>

</div>

</div>

<ReviewSection />
<RelatedProducts
category={product.category}
currentId={product.id}
/>

</main>

)

}