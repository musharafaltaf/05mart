"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductCard({ product }: any) {

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const handleAddToCart = () => {

addToCart({
...product,
quantity: 1
});

};

const handleWishlist = () => {
addToWishlist(product);
};

return(

<div className="bg-white rounded-xl border hover:shadow-lg transition overflow-hidden">

{/* IMAGE */}

<Link href={`/product/${product._id}`}>

<img
src={product.image}
className="w-full h-48 md:h-60 object-cover cursor-pointer"
/>

</Link>

<div className="p-3">

{/* NAME */}

<Link href={`/product/${product._id}`}>

<h3 className="text-sm md:text-base font-medium hover:underline cursor-pointer">
{product.name}
</h3>

</Link>

<p className="text-gray-600 text-sm">
₹{product.price}
</p>

{/* BUTTONS */}

<div className="flex gap-2 mt-3">

<button
onClick={handleAddToCart}
className="flex-1 bg-black text-white py-2 rounded-lg text-sm md:text-base hover:bg-gray-800"
>
Add to Cart
</button>

<button
onClick={handleWishlist}
className="px-3 border rounded-lg hover:bg-gray-100"
>
❤
</button>

</div>

</div>

</div>

);

}