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


// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";

// export default function Navbar() {

// const [query,setQuery] = useState("");
// const [results,setResults] = useState<any[]>([]);
// const [menuOpen,setMenuOpen] = useState(false);
// const [searchOpen,setSearchOpen] = useState(false);
// const [user,setUser] = useState<any>(null);

// const { cart } = useCart();
// const { wishlist } = useWishlist();

// const cartCount = cart?.length || 0;
// const wishlistCount = wishlist?.length || 0;

// /* LOAD USER */

// useEffect(()=>{
// const storedUser = localStorage.getItem("user");
// if(storedUser){
// setUser(JSON.parse(storedUser));
// }
// },[]);

// /* SEARCH API */

// useEffect(()=>{

// if(query.length < 2){
// setResults([]);
// return;
// }

// const loadResults = async()=>{

// const res = await fetch(`/api/search?q=${query}`);
// const data = await res.json();

// setResults(data);

// };

// loadResults();

// },[query]);

// /* LOGOUT */

// const logout = ()=>{
// localStorage.removeItem("user");
// localStorage.removeItem("token");
// location.reload();
// };

// return(

// <header className="border-b bg-white sticky top-0 z-50">

// <div className="max-w-7xl mx-auto px-4">

// {/* NAVBAR */}

// <div className="flex items-center justify-between h-16">

// {/* LOGO */}

// <Link href="/" className="text-xl font-bold">
// 05Mart
// </Link>

// {/* DESKTOP SEARCH */}

// <div className="relative hidden md:block w-96">

// <input
// type="text"
// placeholder="Search products..."
// value={query}
// onChange={(e)=>setQuery(e.target.value)}
// className="w-full border rounded-lg px-4 py-2"
// />

// {results.length > 0 && (

// <div className="absolute bg-white border w-full mt-2 rounded shadow-lg z-50">

// {results.map((p:any)=>(

// <Link
// key={p._id}
// href={`/product/${p._id}`}
// onClick={()=>setResults([])}
// className="flex items-center gap-3 p-3 hover:bg-gray-100"
// >

// <img
// src={p.image}
// className="w-10 h-10 object-cover rounded"
// />

// <div>

// <p className="text-sm font-medium">
// {p.name}
// </p>

// <p className="text-xs text-gray-500">
// ₹{p.price}
// </p>

// </div>

// </Link>

// ))}

// </div>

// )}

// </div>

// {/* ICONS */}

// <div className="flex items-center gap-4">

// {/* MOBILE SEARCH BUTTON */}

// <button
// onClick={()=>setSearchOpen(true)}
// className="text-xl md:hidden"
// >
// 🔍
// </button>

// {/* WISHLIST */}

// <Link href="/wishlist" className="relative">
// ❤️
// {wishlistCount>0 &&(
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {wishlistCount}
// </span>
// )}
// </Link>

// {/* CART */}

// <Link href="/cart" className="relative">
// 🛒
// {cartCount>0 &&(
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {cartCount}
// </span>
// )}
// </Link>

// {/* PROFILE */}

// {user ? (

// <Link href="/profile">
// 👤
// </Link>

// ) : (

// <Link href="/login">
// Login
// </Link>

// )}

// {/* MOBILE MENU */}

// <button
// onClick={()=>setMenuOpen(!menuOpen)}
// className="md:hidden text-2xl"
// >
// ☰
// </button>

// </div>

// </div>

// {/* MOBILE SEARCH */}

// {searchOpen && (

// <div className="flex items-center gap-3 py-3 md:hidden">

// <button
// onClick={()=>setSearchOpen(false)}
// className="text-lg"
// >
// ←
// </button>

// <input
// autoFocus
// type="text"
// value={query}
// onChange={(e)=>setQuery(e.target.value)}
// placeholder="Search products..."
// className="flex-1 border rounded-lg px-4 py-2"
// />

// </div>

// )}

// {/* MOBILE SEARCH RESULTS */}

// {searchOpen && results.length>0 && (

// <div className="md:hidden border-t">

// {results.map((p:any)=>(

// <Link
// key={p._id}
// href={`/product/${p._id}`}
// onClick={()=>setSearchOpen(false)}
// className="flex items-center gap-3 p-3 border-b"
// >

// <img
// src={p.image}
// className="w-10 h-10 object-cover"
// />

// <div>

// <p className="text-sm font-medium">
// {p.name}
// </p>

// <p className="text-xs text-gray-500">
// ₹{p.price}
// </p>

// </div>

// </Link>

// ))}

// </div>

// )}

// {/* MOBILE MENU */}

// {menuOpen && (

// <div className="md:hidden border-t py-4 space-y-4 flex flex-col">

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

// {user ? (

// <>
// <Link href="/profile" onClick={()=>setMenuOpen(false)}>
// Profile
// </Link>
// {user?.role === "admin" && (

// <Link href="/admin" className="font-medium">
// Admin
// </Link>

// )}

// <button
// onClick={logout}
// className="text-red-500 text-left"
// >
// Logout
// </button>
// </>

// ):(

// <>
// <Link href="/login" onClick={()=>setMenuOpen(false)}>
// Login
// </Link>

// <Link href="/register" onClick={()=>setMenuOpen(false)}>
// Register
// </Link>
// </>

// )}

// </div>

// )}

// </div>

// </header>

// );

// }


"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {

const [menuOpen,setMenuOpen] = useState(false);
const [user,setUser] = useState<any>(null);

const menuRef = useRef<any>(null); // NEW

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

/* CLOSE MENU WHEN CLICKING OUTSIDE */

useEffect(()=>{

const handleClick = (e:any)=>{

if(menuRef.current && !menuRef.current.contains(e.target)){
setMenuOpen(false);
}

};

document.addEventListener("mousedown",handleClick);

return ()=>document.removeEventListener("mousedown",handleClick);

},[]);

const logout = ()=>{

localStorage.removeItem("user");
localStorage.removeItem("token");
location.reload();

};

return (

<header className="border-b bg-white sticky top-0 z-50">

<div className="max-w-7xl mx-auto px-4">

<div className="flex items-center justify-between h-16 gap-4">

<Link href="/" className="text-2xl font-extrabold tracking-wide">
05Mart
</Link>

<div className="hidden md:flex flex-1 mx-6">
<SearchBar />
</div>

<div className="flex items-center gap-4">

<Link href="/wishlist" className="relative text-xl">

❤️

{wishlistCount>0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{wishlistCount}
</span>
)}

</Link>

<Link href="/cart" className="relative text-xl">

🛒

{cartCount>0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
{cartCount}
</span>
)}

</Link>

{user?.role==="admin" && (

<div className="hidden md:flex gap-4 text-sm">

<Link href="/admin">
Admin
</Link>

<Link href="/admin/orders">
Orders
</Link>

</div>

)}

{user ? (

<Link href="/profile" className="text-xl">
👤
</Link>

) : (

<Link href="/login" className="text-sm font-medium">
Login
</Link>

)}

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="md:hidden text-2xl"
>
☰
</button>

</div>

</div>

<div className="md:hidden py-3">
<SearchBar />
</div>

{/* ATTACH REF HERE */}

{menuOpen && (

<div ref={menuRef} className="md:hidden border-t py-4 space-y-4 flex flex-col">

<Link href="/" onClick={()=>setMenuOpen(false)}>
Home
</Link>

<Link href="/cart" onClick={()=>setMenuOpen(false)}>
Cart
</Link>

<Link href="/wishlist" onClick={()=>setMenuOpen(false)}>
Wishlist
</Link>

{user?.role==="admin" && (

<>
<Link href="/admin" onClick={()=>setMenuOpen(false)}>
Admin
</Link>

<Link
href="/admin/orders"
className="border p-4 rounded hover:shadow text-center block"
>
Orders
</Link>
</>

)}

{user ? (

<>
<Link href="/profile" onClick={()=>setMenuOpen(false)}>
Profile
</Link>

<button
onClick={logout}
className="text-red-500 text-left"
>
Logout
</button>
</>

) : (

<Link href="/login" onClick={()=>setMenuOpen(false)}>
Login
</Link>

)}

</div>

)}

</div>

</header>

);

}