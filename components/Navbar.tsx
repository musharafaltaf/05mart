"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Navbar(){

const [menuOpen,setMenuOpen] = useState(false);

const { cart } = useCart();
const { wishlist } = useWishlist();

const cartCount = cart?.length || 0;
const wishlistCount = wishlist?.length || 0;

return(

<header className="border-b bg-white sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4">

<div className="flex items-center justify-between h-16">

{/* LOGO */}

<Link href="/" className="text-xl font-bold">
05Mart
</Link>

{/* SEARCH */}

<div className="hidden md:flex flex-1 mx-6">

<input
type="text"
placeholder="Search products..."
className="w-full border rounded-lg px-4 py-2"
/>

</div>

{/* ICONS */}

<div className="flex items-center gap-4">

<Link href="/wishlist" className="relative">

<span className="text-xl">❤️</span>

{wishlistCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{wishlistCount}
</span>
)}

</Link>

<Link href="/cart" id="cart-icon" className="relative">

<span className="text-xl">🛒</span>

{cartCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{cartCount}
</span>
)}

</Link>

<Link href="/orders">
Orders
</Link>

{/* MOBILE MENU BUTTON */}

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="md:hidden text-2xl"
>
☰
</button>

</div>

</div>

{/* MOBILE MENU */}

{menuOpen && (

<div className="md:hidden border-t py-4 space-y-3">

<Link href="/" onClick={()=>setMenuOpen(false)}>
Home
</Link>

<Link href="/cart" onClick={()=>setMenuOpen(false)}>
Cart
</Link>

<Link href="/wishlist" onClick={()=>setMenuOpen(false)}>
Wishlist
</Link>

<Link href="/orders" onClick={()=>setMenuOpen(false)}>
Orders
</Link>

<Link href="/admin" onClick={()=>setMenuOpen(false)}>
Admin
</Link>

<Link href="/login" onClick={()=>setMenuOpen(false)}>
Login
</Link>

</div>

)}

</div>

</header>

)

}