// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";

// export default function Navbar(){

// const [menuOpen,setMenuOpen] = useState(false);

// const { cart } = useCart();
// const { wishlist } = useWishlist();

// const cartCount = cart?.length || 0;
// const wishlistCount = wishlist?.length || 0;

// return(

// <header className="border-b bg-white sticky top-0 z-50">

// <div className="max-w-7xl mx-auto px-4">

// <div className="flex items-center justify-between h-16">

// {/* LOGO */}

// <Link href="/" className="text-xl font-bold">
// 05Mart
// </Link>

// {/* SEARCH */}

// <div className="hidden md:flex flex-1 mx-6">

// <input
// type="text"
// placeholder="Search products..."
// className="w-full border rounded-lg px-4 py-2"
// />

// </div>

// {/* ICONS */}

// <div className="flex items-center gap-4">

// <Link href="/wishlist" className="relative">

// <span className="text-xl">❤️</span>

// {wishlistCount > 0 && (
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {wishlistCount}
// </span>
// )}

// </Link>

// <Link href="/cart" id="cart-icon" className="relative">

// <span className="text-xl">🛒</span>

// {cartCount > 0 && (
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {cartCount}
// </span>
// )}

// </Link>

// <Link href="/orders">
// Orders
// </Link>

// {/* MOBILE MENU BUTTON */}

// <button
// onClick={()=>setMenuOpen(!menuOpen)}
// className="md:hidden text-2xl"
// >
// ☰
// </button>

// </div>

// </div>

// {/* MOBILE MENU */}

// {menuOpen && (

// <div className="md:hidden border-t py-4 space-y-3">

// <Link href="/" onClick={()=>setMenuOpen(false)}>
// Home
// </Link>

// <Link href="/cart" onClick={()=>setMenuOpen(false)}>
// Cart
// </Link>

// <Link href="/wishlist" onClick={()=>setMenuOpen(false)}>
// Wishlist
// </Link>

// <Link href="/orders" onClick={()=>setMenuOpen(false)}>
// Orders
// </Link>

// <Link href="/admin" onClick={()=>setMenuOpen(false)}>
// Admin
// </Link>

// <Link href="/login" onClick={()=>setMenuOpen(false)}>
// Login
// </Link>

// </div>

// )}

// </div>

// </header>

// )

// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Navbar(){

const router = useRouter();

const [menuOpen,setMenuOpen] = useState(false);
const [user,setUser] = useState<any>(null);

const { cart } = useCart();
const { wishlist } = useWishlist();

const cartCount = cart?.length || 0;
const wishlistCount = wishlist?.length || 0;

useEffect(()=>{

const storedUser = localStorage.getItem("user");

if(storedUser){
setUser(JSON.parse(storedUser));
}

},[]);

const logout = ()=>{
localStorage.removeItem("user");
localStorage.removeItem("token");
router.push("/");
};

return(

<header className="border-b bg-white sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4">

<div className="flex items-center justify-between h-16">

{/* LOGO */}

<Link
href="/"
className="text-2xl font-extrabold tracking-wide text-black"
>
05<span className="text-gray-700">Mart</span>
</Link>


{/* SEARCH DESKTOP */}

<div className="hidden md:flex flex-1 mx-6">

<input
type="text"
placeholder="Search products..."
className="w-full border rounded-lg px-4 py-2"
/>

</div>


{/* RIGHT SIDE */}

<div className="flex items-center gap-4">

{/* WISHLIST */}

<Link href="/wishlist" className="relative">

<span className="text-xl">❤️</span>

{wishlistCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{wishlistCount}
</span>
)}

</Link>


{/* CART */}

<Link href="/cart" className="relative">

<span className="text-xl">🛒</span>

{cartCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{cartCount}
</span>
)}

</Link>


{/* PROFILE ICON */}

{user ? (

<Link href="/profile">
<span className="text-xl">👤</span>
</Link>

) : (

<Link href="/login">
<span className="text-xl">👤</span>
</Link>

)}


{/* MOBILE MENU BUTTON */}

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="md:hidden text-2xl"
>
☰
</button>

</div>

{user?.role === "admin" && (
  <Link
    href="/admin"
    className="bg-black text-white px-3 py-1 rounded text-sm"
  >
    Admin
  </Link>
)}

</div>


{/* MOBILE MENU */}

{menuOpen && (

<div className="md:hidden border-t py-4 flex flex-col gap-4">

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

{user ? (

<>
<Link href="/profile" onClick={()=>setMenuOpen(false)}>
My Profile
</Link>

<button
onClick={logout}
className="text-red-500 text-left"
>
Logout
</button>
</>

) : (

<>
<Link href="/login" onClick={()=>setMenuOpen(false)}>
Login
</Link>

<Link href="/register" onClick={()=>setMenuOpen(false)}>
Register
</Link>
</>

)}

</div>

)}

</div>

</header>

);

}