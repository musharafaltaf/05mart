"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { useWishlist } from "../app/context/WishlistContext";

export default function ProductCard({ product }: any) {

const { addToCart } = useCart();
const { wishlist = [], addToWishlist } = useWishlist() || {};

if (!product || !product.id) return null;

const liked = wishlist.some((item:any)=>item?.id===product.id);

return(

<div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden relative">

{/* BADGE */}

{product.badge && (
<div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded">
{product.badge}
</div>
)}

{/* WISHLIST */}

<button
onClick={()=>addToWishlist(product)}
className="absolute top-3 right-3 text-xl"
>
{liked ? "❤️" : "🤍"}
</button>

<Link href={`/product/${product.id}`}>

<img
  src={product.image || "https://via.placeholder.com/300"}
  alt={product.name}
  className="w-full h-60 object-cover rounded"
/>

</Link>

<div className="p-4">

<p className="text-yellow-500 text-sm mb-1">
⭐⭐⭐⭐☆
</p>

<h3 className="font-medium mb-1">
{product.name}
</h3>

<div className="flex gap-2 items-center mb-3">

<p className="font-semibold">
₹{product.price}
</p>

{product.oldPrice && (
<p className="text-gray-400 line-through text-sm">
₹{product.oldPrice}
</p>
)}

</div>

<button
onClick={()=>addToCart(product)}
className="w-full bg-black text-white py-2 rounded-lg"
>
Add to Cart
</button>

</div>

</div>

)

}