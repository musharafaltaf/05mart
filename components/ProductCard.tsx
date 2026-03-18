// "use client";

// import Link from "next/link";
// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";

// export default function ProductCard({ product }: any) {

// const { addToCart } = useCart();
// const { addToWishlist } = useWishlist();

// /* DISCOUNT */

// const discount =
// product.mrp
// ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
// : 0;

// return(

// <div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden">

// {/* IMAGE */}

// <Link href={`/product/${product._id}`}>

// <img
// src={product.image}
// className="w-full h-48 md:h-60 object-cover cursor-pointer"
// />

// </Link>

// <div className="p-3">

// {/* NAME */}

// <Link href={`/product/${product._id}`}>

// <h3 className="text-sm md:text-base font-medium hover:underline cursor-pointer">
// {product.name}
// </h3>

// </Link>

// {/* PRICE */}

// <div className="flex items-center gap-2 mt-1">

// <p className="font-semibold text-lg">
// ₹{product.price}
// </p>

// {product.mrp && (

// <p className="text-gray-400 line-through text-sm">
// ₹{product.mrp}
// </p>

// )}

// {discount > 0 && (

// <p className="text-green-600 text-sm font-medium">
// {discount}% OFF
// </p>

// )}

// </div>

// {/* SIZES */}

// {product.sizes && product.sizes.length > 0 && (

// <p className="text-xs text-gray-500 mt-1">
// Sizes: {product.sizes.join(" • ")}
// </p>

// )}

// {/* BUTTONS */}

// <div className="flex gap-2 mt-3">

// <button
// onClick={()=>addToCart({...product,quantity:1})}
// className="flex-1 bg-black text-white py-2 rounded-lg text-sm md:text-base hover:bg-gray-800"
// >
// Add to Cart
// </button>

// <button
// onClick={()=>addToWishlist(product)}
// className="px-3 border rounded-lg hover:bg-gray-100"
// >
// ❤
// </button>

// </div>

// </div>

// </div>

// );

// }




"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductCard({ product }: any) {

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

/* DISCOUNT */

const discount =
product?.mrp
? Math.round(((product.mrp - product.price) / product.mrp) * 100)
: 0;

return(

<div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden">

{/* ✅ IMAGE FIXED */}

<Link href={`/product/${product?._id}`}>

<div className="w-full aspect-square overflow-hidden bg-gray-100">

<img
src={product?.image || "/placeholder.png"}
className="w-full h-full object-cover cursor-pointer"
/>

</div>

</Link>

<div className="p-3">

{/* NAME */}

<Link href={`/product/${product?._id}`}>

<h3 className="text-sm md:text-base font-medium hover:underline cursor-pointer">
{product?.name}
</h3>

</Link>

{/* PRICE */}

<div className="flex items-center gap-2 mt-1">

<p className="font-semibold text-lg">
₹{product?.price}
</p>

{product?.mrp && (

<p className="text-gray-400 line-through text-sm">
₹{product.mrp}
</p>

)}

{discount > 0 && (

<p className="text-green-600 text-sm font-medium">
{discount}% OFF
</p>

)}

</div>

{/* SIZES */}

{product?.sizes?.length > 0 && (

<p className="text-xs text-gray-500 mt-1">
Sizes: {product.sizes.join(" • ")}
</p>

)}

{/* BUTTONS */}

<div className="flex gap-2 mt-3">

<button
onClick={()=>addToCart({...product,quantity:1})}
className="flex-1 bg-black text-white py-2 rounded-lg text-sm md:text-base hover:bg-gray-800"
>
Add to Cart
</button>

<button
onClick={()=>addToWishlist(product)}
className="px-3 border rounded-lg hover:bg-gray-100"
>
❤
</button>

</div>

</div>

</div>

);

}