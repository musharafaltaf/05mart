"use client";

import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage(){

const { wishlist } = useWishlist();

return(

<main className="max-w-6xl mx-auto px-6 py-16">

<h1 className="text-3xl font-semibold mb-10">
Your Wishlist
</h1>

{wishlist.length === 0 && (

<p className="text-gray-500">
No products saved yet
</p>

)}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{wishlist.map((product:any)=>(
<ProductCard key={product.id} product={product}/>
))}

</div>

</main>

)

}