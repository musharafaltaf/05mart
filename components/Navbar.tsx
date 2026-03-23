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


// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";
// import SearchBar from "@/components/SearchBar";

// export default function Navbar() {

// const [menuOpen,setMenuOpen] = useState(false);
// const [user,setUser] = useState<any>(null);

// const menuRef = useRef<any>(null); // NEW

// const { cart } = useCart();
// const { wishlist } = useWishlist();

// const cartCount = cart?.length || 0;
// const wishlistCount = wishlist?.length || 0;

// useEffect(()=>{

// const storedUser = localStorage.getItem("user");

// if(storedUser){
// setUser(JSON.parse(storedUser));
// }

// },[]);

// /* CLOSE MENU WHEN CLICKING OUTSIDE */

// useEffect(()=>{

// const handleClick = (e:any)=>{

// if(menuRef.current && !menuRef.current.contains(e.target)){
// setMenuOpen(false);
// }

// };

// document.addEventListener("mousedown",handleClick);

// return ()=>document.removeEventListener("mousedown",handleClick);

// },[]);

// const logout = ()=>{

// localStorage.removeItem("user");
// localStorage.removeItem("token");
// location.reload();

// };

// return (

// <header className="border-b bg-white sticky top-0 z-50">

// <div className="max-w-7xl mx-auto px-4">

// <div className="flex items-center justify-between h-16 gap-4">

// <Link href="/" className="text-2xl font-extrabold tracking-wide">
// 05Mart
// </Link>

// <div className="hidden md:flex flex-1 mx-6">
// <SearchBar />
// </div>

// <div className="flex items-center gap-4">

// <Link href="/wishlist" className="relative text-xl">

// ❤️

// {wishlistCount>0 && (
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {wishlistCount}
// </span>
// )}

// </Link>

// <Link href="/cart" className="relative text-xl">

// 🛒

// {cartCount>0 && (
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
// {cartCount}
// </span>
// )}

// </Link>

// {user?.role==="admin" && (

// <div className="hidden md:flex gap-4 text-sm">

// <Link href="/admin">
// Admin
// </Link>

// <Link href="/admin/orders">
// Orders
// </Link>

// </div>

// )}

// {user ? (

// <Link href="/profile" className="text-xl">
// 👤
// </Link>

// ) : (

// <Link href="/login" className="text-sm font-medium">
// Login
// </Link>

// )}

// <button
// onClick={()=>setMenuOpen(!menuOpen)}
// className="md:hidden text-2xl"
// >
// ☰
// </button>

// </div>

// </div>

// <div className="md:hidden py-3">
// <SearchBar />
// </div>

// {/* ATTACH REF HERE */}

// {menuOpen && (

// <div ref={menuRef} className="md:hidden border-t py-4 space-y-4 flex flex-col">

// <Link href="/" onClick={()=>setMenuOpen(false)}>
// Home
// </Link>

// <Link href="/cart" onClick={()=>setMenuOpen(false)}>
// Cart
// </Link>

// <Link href="/wishlist" onClick={()=>setMenuOpen(false)}>
// Wishlist
// </Link>

// {user?.role==="admin" && (

// <>
// <Link href="/admin" onClick={()=>setMenuOpen(false)}>
// Admin
// </Link>

// <Link
// href="/admin/orders"
// className="border p-4 rounded hover:shadow text-center block"
// >
// Orders
// </Link>
// </>

// )}

// {user ? (

// <>
// <Link href="/profile" onClick={()=>setMenuOpen(false)}>
// Profile
// </Link>

// <button
// onClick={logout}
// className="text-red-500 text-left"
// >
// Logout
// </button>
// </>

// ) : (

// <Link href="/login" onClick={()=>setMenuOpen(false)}>
// Login
// </Link>

// )}

// </div>

// )}

// </div>

// </header>

// );

// }



"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import SearchBar from "@/components/SearchBar";

export default function Navbar(){

const [pageLoading,setPageLoading] = useState(false);
const [menuOpen,setMenuOpen] = useState(false);

const pathname = usePathname();
const router = useRouter();

/* STATES */
const [showProfile,setShowProfile] = useState(false);
const [showNotif,setShowNotif] = useState(false);
const [notifCount,setNotifCount] = useState(0);
const [user,setUser] = useState<any>(null);

/* CONTEXT */
const { cart } = useCart();
const { wishlist } = useWishlist();

const cartCount = cart?.length || 0;
const wishlistCount = wishlist?.length || 0;

/* refs */
const profileRef = useRef<any>(null);
const notifRef = useRef<any>(null);

/* 🔥 AUTO USER REFRESH */
useEffect(()=>{

const loadUser = ()=>{
const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);
};

loadUser();

/* 🔥 LISTEN */
window.addEventListener("userChanged", loadUser);

return ()=>window.removeEventListener("userChanged", loadUser);

},[]);

/* ADMIN */
const isAdmin = (user?.role || "").toLowerCase() === "admin";

/* 🔥 NOTIFICATIONS (AUTO REFRESH WITH USER CHANGE) */
useEffect(()=>{

const load = async()=>{

try{
const u = JSON.parse(localStorage.getItem("user") || "null");

if(!u?._id){
setNotifCount(0);
return;
}

const res = await fetch(`/api/notifications?userId=${u._id}`,{
cache:"no-store"
});

const data = await res.json();

if(Array.isArray(data)){
const unread = data
.filter((n:any)=>n.userId===u._id)
.filter((n:any)=>!n.read).length;

setNotifCount(unread);
}else{
setNotifCount(0);
}

}catch{
setNotifCount(0);
}

};

load();

const interval = setInterval(load,5000);

/* 🔥 ALSO REFRESH ON LOGIN/LOGOUT */
window.addEventListener("userChanged", load);

return ()=>{
clearInterval(interval);
window.removeEventListener("userChanged", load);
};

},[]);

/* DROPDOWN FIX */
useEffect(()=>{
const handle = (e:any)=>{
if(profileRef.current?.contains(e.target)) return;
if(notifRef.current?.contains(e.target)) return;
setShowProfile(false);
setShowNotif(false);
};
document.addEventListener("mousedown", handle);
return ()=>document.removeEventListener("mousedown", handle);
},[]);

/* NAV ITEM */
const NavItem = ({href,icon,label}:any)=>{
const active = pathname === href;

return(
<div
onClick={()=>{
setPageLoading(true);
setTimeout(()=>router.push(href),300);
setTimeout(()=>setPageLoading(false),1200);
}}
className="flex flex-col items-center flex-1 cursor-pointer"
>
<div className={`transition-all duration-300 flex items-center justify-center rounded-full
${active
? "w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white -mt-6 scale-110 shadow-xl"
: "w-11 h-11 bg-gray-200"
}`}>
{icon}
</div>

{active && <span className="text-xs mt-1">{label}</span>}
</div>
);
};

return(
<>

{/* LOADER */}
{pageLoading && (
<div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
<div className="flex flex-col items-center">
<img src="/logo.png" className="w-16 h-16 mb-4 animate-bounce"/>
<p className="text-sm text-gray-500">Loading...</p>
</div>
</div>
)}

{/* DESKTOP */}
<header className="hidden md:block sticky top-0 z-50 bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

<Link href="/" className="flex gap-2 items-center">
<img src="/logo.png" className="w-12 h-12"/>
<span className="font-bold text-xl">05Mart</span>
</Link>

<div className="flex-1">
<SearchBar />
</div>

<div className="flex items-center gap-6 text-xl">

<Link href="/wishlist" className="relative">
❤️
{wishlistCount>0 && <span className="badge">{wishlistCount}</span>}
</Link>

<Link href="/cart" className="relative">
🛒
{cartCount>0 && <span className="badge">{cartCount}</span>}
</Link>

<div ref={notifRef} className="relative">
<button onClick={()=>setShowNotif(!showNotif)}>🔔</button>

{notifCount>0 && <span className="badge">{notifCount}</span>}

{showNotif && (
<div className="dropdown">
<p>Notifications</p>
<Link href="/notifications">View all</Link>
</div>
)}

</div>

<div ref={profileRef} className="relative">
<button onClick={()=>setShowProfile(!showProfile)}>
{user?.name?.charAt(0)||"U"}
</button>

{showProfile && (
<div className="dropdown">

{user ? (
<>
<Link href="/profile">Profile</Link>
<Link href="/orders">Orders</Link>

{isAdmin && (
<>
<Link href="/admin">Admin Panel</Link>
<Link href="/admin/orders">Manage Orders</Link>
</>
)}

</>
):(
<>
<Link href="/login">Login</Link>
<Link href="/register">Register</Link>
</>
)}

</div>
)}

</div>

</div>
</div>
</header>

{/* MOBILE */}
<header className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">

<div className="flex items-center gap-3">
<button onClick={()=>setMenuOpen(true)} className="text-2xl">☰</button>

<Link href="/" className="flex items-center gap-2">
<img src="/logo.png" className="w-8 h-8 rounded-full"/>
<span className="font-bold text-lg tracking-wide">05Mart</span>
</Link>
</div>

<div className="flex items-center gap-4 text-xl">

<Link href="/wishlist" className="relative">
❤️
{wishlistCount>0 && <span className="badge">{wishlistCount}</span>}
</Link>

<Link href="/cart" className="relative">
🛒
{cartCount>0 && <span className="badge">{cartCount}</span>}
</Link>

</div>

</header>

{/* MOBILE SEARCH */}
<div className="md:hidden py-3">
<SearchBar />
</div>

{/* SIDE MENU */}
{menuOpen && (
<>
<div className="fixed inset-0 bg-black/40 z-[9998]" onClick={()=>setMenuOpen(false)}></div>

<div className="fixed top-0 left-0 h-full w-72 bg-white z-[9999] shadow-xl p-5 flex flex-col gap-4 animate-slideIn">

<div className="font-semibold border-b pb-3">
{user?.name || "Guest"}
</div>

<div onClick={()=>{router.push("/");setMenuOpen(false)}} className="menuItem">🏠 Home</div>

{user && <>
<div onClick={()=>{router.push("/orders");setMenuOpen(false)}} className="menuItem">📦 Orders</div>
<div onClick={()=>{router.push("/wishlist");setMenuOpen(false)}} className="menuItem">❤️ Wishlist</div>
</>}

{isAdmin && <>
<div onClick={()=>{router.push("/admin");setMenuOpen(false)}} className="menuItem">🛠 Dashboard</div>
<div onClick={()=>{router.push("/admin/orders");setMenuOpen(false)}} className="menuItem">📦 Manage Orders</div>
</>}

{!user ? (
<>
<div onClick={()=>{router.push("/login");setMenuOpen(false)}} className="menuItem">Login</div>
<div onClick={()=>{router.push("/register");setMenuOpen(false)}} className="menuItem">Register</div>
</>
):(
<div onClick={()=>{
localStorage.clear();

/* 🔥 INSTANT UPDATE */
window.dispatchEvent(new Event("userChanged"));

router.push("/");
}} className="menuItem text-red-500">
Logout
</div>
)}

</div>
</>
)}

{/* BOTTOM NAV */}
<div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex z-50">
<NavItem href="/" icon="🏠" label="Home"/>
<NavItem href={isAdmin ? "/admin/orders" : "/orders"} icon="📦" label="Orders"/>
<NavItem href="/wishlist" icon="❤️" label="Wishlist"/>
<NavItem href="/notifications" icon="🔔" label="Alerts"/>
<NavItem href="/profile" icon="👤" label="Profile"/>
</div>

<style jsx>{`
.badge{
position:absolute;
top:-6px;
right:-6px;
background:red;
color:white;
font-size:10px;
padding:2px 6px;
border-radius:50%;
}

.dropdown{
position:absolute;
right:0;
top:35px;
background:white;
padding:10px;
border-radius:10px;
box-shadow:0 10px 25px rgba(0,0,0,0.1);
display:flex;
flex-direction:column;
gap:6px;
}

.menuItem{
padding:10px;
border-radius:8px;
cursor:pointer;
}
.menuItem:hover{
background:#f3f4f6;
}

@keyframes slideIn{
from{transform:translateX(-100%)}
to{transform:translateX(0)}
}
.animate-slideIn{
animation:slideIn 0.3s ease;
}
`}</style>

</>
);
}






// "use client";

// import Link from "next/link";
// import { useEffect, useState, useRef } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import { useCart } from "@/app/context/CartContext";
// import { useWishlist } from "@/app/context/WishlistContext";
// import SearchBar from "@/components/SearchBar";

// export default function Navbar(){

// const pathname = usePathname();
// const router = useRouter();

// /* ========================= */
// /* STATES */
// /* ========================= */

// // const [showSearch,setShowSearch] = useState(false);
// const [showProfile,setShowProfile] = useState(false);
// const [showNotif,setShowNotif] = useState(false);
// const [notifCount,setNotifCount] = useState(0);
// const [user,setUser] = useState<any>(null);

// /* CONTEXT */
// const { cart } = useCart();
// const { wishlist } = useWishlist();

// const cartCount = cart?.length || 0;
// const wishlistCount = wishlist?.length || 0;

// /* refs */
// const profileRef = useRef<any>(null);
// const notifRef = useRef<any>(null);
// const cartRef = useRef<any>(null);

// /* ========================= */
// /* USER */
// /* ========================= */

// useEffect(()=>{
// const u = JSON.parse(localStorage.getItem("user") || "null");
// setUser(u);
// },[]);

// /* ========================= */
// /* NOTIFICATIONS */
// /* ========================= */

// useEffect(()=>{

// const load = async()=>{

// const u = JSON.parse(localStorage.getItem("user") || "null");
// if(!u?._id) return;

// try{
// const res = await fetch(`/api/notifications?userId=${u._id}`);
// const data = await res.json();
// setNotifCount(Array.isArray(data)?data.filter((n:any)=>!n.read).length:0);
// }catch{
// setNotifCount(0);
// }

// };

// load();
// const interval = setInterval(load,5000);
// return ()=>clearInterval(interval);

// },[]);

// /* ========================= */
// /* CART FLY */
// /* ========================= */

// useEffect(()=>{

// const fly = (e:any)=>{

// const img = document.createElement("img");
// img.src = e.detail?.image || "/logo.png";

// img.style.position = "fixed";
// img.style.width = "40px";
// img.style.height = "40px";
// img.style.left = "50%";
// img.style.top = "60%";
// img.style.zIndex = "9999";
// img.style.transition = "all 0.8s ease";

// document.body.appendChild(img);

// const rect = cartRef.current?.getBoundingClientRect();

// if(rect){
// setTimeout(()=>{
// img.style.left = rect.left + "px";
// img.style.top = rect.top + "px";
// img.style.transform = "scale(0.2)";
// img.style.opacity = "0.5";
// },50);
// }

// setTimeout(()=>img.remove(),800);

// };

// window.addEventListener("addToCartAnimation",fly);
// return ()=>window.removeEventListener("addToCartAnimation",fly);

// },[]);

// /* ========================= */
// /* OUTSIDE CLICK */
// /* ========================= */

// useEffect(()=>{

// const handle = (e:any)=>{

// if(profileRef.current && !profileRef.current.contains(e.target)){
// setShowProfile(false);
// }

// if(notifRef.current && !notifRef.current.contains(e.target)){
// setShowNotif(false);
// }

// };

// document.addEventListener("mousedown",handle);
// return ()=>document.removeEventListener("mousedown",handle);

// },[]);

// /* ========================= */
// /* NAV ITEM */
// /* ========================= */

// const NavItem = ({href,icon,label}:any)=>{

// const active = pathname === href;

// return(
// <div
// onClick={()=>router.push(href)}
// className="flex flex-col items-center flex-1 cursor-pointer"
// >

// <div className={`transition-all duration-300 flex items-center justify-center rounded-full
// ${active
// ? "w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white -mt-6 scale-110 shadow-xl"
// : "w-11 h-11 bg-gray-200"
// }`}
// >
// {icon}
// </div>

// {active && <span className="text-xs mt-1">{label}</span>}

// </div>
// );
// };

// /* ========================= */
// /* UI */
// /* ========================= */

// return(
// <>

// {/* ========================= */}
// {/* DESKTOP NAVBAR */}
// {/* ========================= */}

// <header className="hidden md:block sticky top-0 z-50 bg-white border-b shadow-sm">

// <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

// <Link href="/" className="flex gap-2 items-center">
// <img src="/logo.png" className="w-12 h-12"/>
// <span className="font-bold text-xl">05Mart</span>
// </Link>

// <div className="flex-1">
// <SearchBar />
// </div>

// <div className="flex items-center gap-6 text-xl">

// <Link href="/wishlist" className="relative">
// ❤️
// {wishlistCount>0 && <span className="badge">{wishlistCount}</span>}
// </Link>

// <Link ref={cartRef} href="/cart" className="relative">
// 🛒
// {cartCount>0 && <span className="badge">{cartCount}</span>}
// </Link>

// {/* 🔔 */}
// <div ref={notifRef} className="relative">
// <button onClick={()=>setShowNotif(!showNotif)}>🔔</button>

// {notifCount>0 && <span className="badge">{notifCount}</span>}

// {showNotif && (
// <div className="dropdown">
// <p>Notifications</p>
// <Link href="/notifications">View all</Link>
// </div>
// )}

// </div>

// {/* 👤 */}
// <div ref={profileRef} className="relative">
// <button onClick={()=>setShowProfile(!showProfile)}>
// {user?.name?.charAt(0)||"U"}
// </button>

// {showProfile && (
// <div className="dropdown">
// {user ? (
// <>
// <Link href="/profile">Profile</Link>
// <Link href="/orders">Orders</Link>
// </>
// ):(
// <>
// <Link href="/login">Login</Link>
// <Link href="/register">Register</Link>
// </>
// )}
// </div>
// )}

// </div>

// </div>

// </div>

// </header>

// {/* ========================= */}
// {/* MOBILE NAVBAR */}
// {/* ========================= */}

// <header className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm">

// <Link href="/" className="flex items-center gap-2">
// <img src="/logo.png" className="w-9 h-9"/>
// <span className="font-bold text-lg">05Mart</span>
// </Link>

// <div className="flex items-center gap-4 text-xl">



// <Link href="/wishlist" className="relative">
// ❤️
// {wishlistCount>0 && <span className="badge">{wishlistCount}</span>}
// </Link>

// <Link ref={cartRef} href="/cart" className="relative">
// 🛒
// {cartCount>0 && <span className="badge">{cartCount}</span>}
// </Link>

// {/* 🔔 */}
// <div ref={notifRef} className="relative">
// <button onClick={()=>setShowNotif(!showNotif)}>🔔</button>

// {notifCount>0 && <span className="badge">{notifCount}</span>}

// {showNotif && (
// <div className="dropdown">
// <p>Notifications</p>
// <Link href="/notifications">View all</Link>
// </div>
// )}

// </div>

// {/* 👤 */}
// <div ref={profileRef} className="relative">
// <button onClick={()=>setShowProfile(!showProfile)}>
// {user?.name?.charAt(0)||"U"}
// </button>

// {showProfile && (
// <div className="dropdown">
// {user ? (
// <>
// <Link href="/profile">Profile</Link>
// <Link href="/orders">Orders</Link>
// </>
// ):(
// <>
// <Link href="/login">Login</Link>
// <Link href="/register">Register</Link>
// </>
// )}
// </div>
// )}

// </div>

// </div>

// </header>

// {/* ========================= */}
// {/* MOBILE SEARCH (FIXED) */}
// {/* ========================= */}

// <div className="md:hidden py-3">
// <SearchBar />
// </div>
// {/* ========================= */}
// {/* BOTTOM NAVBAR */}
// {/* ========================= */}

// <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex z-50 animate-slideUp">

// <NavItem href="/" icon="🏠" label="Home"/>
// <NavItem href="/orders" icon="📦" label="Orders"/>
// <NavItem href="/wishlist" icon="❤️" label="Wishlist"/>
// <NavItem href="/notifications" icon="🔔" label="Alerts"/>
// <NavItem href="/profile" icon="👤" label="Profile"/>

// </div>

// <style jsx>{`

// .badge{
// position:absolute;
// top:-6px;
// right:-6px;
// background:red;
// color:white;
// font-size:10px;
// padding:2px 6px;
// border-radius:50%;
// }

// .dropdown{
// position:absolute;
// right:0;
// top:35px;
// background:white;
// padding:10px;
// border-radius:10px;
// box-shadow:0 10px 25px rgba(0,0,0,0.1);
// display:flex;
// flex-direction:column;
// gap:6px;
// z-index:9999;
// }

// .animate-slideUp{
// animation: slideUp 0.3s ease;
// }

// @keyframes slideUp{
// 0%{transform:translateY(100%)}
// 100%{transform:translateY(0)}
// }

// `}</style>

// </>
// );
// }