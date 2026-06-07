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




// "use client";

// import Link from "next/link";
// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";

// export default function ProductCard({ product }: any) {

// const { addToCart } = useCart();
// const { addToWishlist } = useWishlist();

// /* DISCOUNT */

// const discount =
// product?.mrp
// ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
// : 0;

// return(

// <div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden">

// {/* ✅ IMAGE FIXED */}

// <Link href={`/product/${product?._id}`}>

// <div className="w-full aspect-square overflow-hidden bg-gray-100">

// <img
// src={product?.image || "/placeholder.png"}
// className="w-full h-full object-cover cursor-pointer"
// />

// </div>

// </Link>

// <div className="p-3">

// {/* NAME */}

// <Link href={`/product/${product?._id}`}>

// <h3 className="text-sm md:text-base font-medium hover:underline cursor-pointer">
// {product?.name}
// </h3>

// </Link>

// {/* PRICE */}

// <div className="flex items-center gap-2 mt-1">

// <p className="font-semibold text-lg">
// ₹{product?.price}
// </p>

// {product?.mrp && (

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

// {product?.sizes?.length > 0 && (

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

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  /* DISCOUNT */
  const discount = product?.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const stock = product?.stock ?? 1;

  return (
    <div className="group bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* IMAGE */}
      <Link href={`/product/${product?._id}`}>
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">

          <img
            src={product?.image || "/placeholder.png"}
            alt={product?.name}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          />

          {/* NEW Badge */}
          {product?.isNew && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              NEW
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
              {discount}% OFF
            </div>
          )}

          {/* Out of Stock Overlay */}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick View Button */}
{stock !== 0 && (
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
    <Link href={`/product/${product?._id}`}>
      <button
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-gray-100"
      >
        Quick View
      </button>
    </Link>
  </div>
)}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-3">
        
        {/* PRODUCT NAME */}
        <Link href={`/product/${product?._id}`}>
          <h3 className="text-sm md:text-base font-medium line-clamp-2 hover:underline cursor-pointer min-h-[40px]">
            {product?.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <p className="font-bold text-lg text-black">
            ₹{product?.price}
          </p>

          {product?.mrp && (
            <p className="text-gray-400 line-through text-xs">
              ₹{product?.mrp}
            </p>
          )}

          
        </div>

        {/* SIZES */}
        {product?.sizes?.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Sizes: {product.sizes.join(" • ")}
          </p>
        )}

        {/* Free Delivery Badge */}
<div className="mt-2">
  <span className="inline-flex items-center bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
    🚚 Free Delivery
  </span>
</div>

        {/* ADD TO CART */}
        <div className="mt-3">
          <button
            disabled={stock === 0}
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className={`w-full py-2 rounded-lg font-medium transition-all duration-200 ${
              stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 active:scale-95"
            }`}
          >
            {stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}