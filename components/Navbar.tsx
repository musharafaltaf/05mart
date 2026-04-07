"use client"

import { useState,useEffect } from "react"
import { useRouter,usePathname } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { useWishlist } from "@/app/context/WishlistContext"
import SearchBar from "./SearchBar"

import {
Menu,
Heart,
ShoppingCart,
Home,
User,
Bell,
Package,
RotateCcw,
RefreshCcw,
LayoutDashboard,
ImagePlus,
Tag
} from "lucide-react"

export default function Layout({children}:{children:React.ReactNode}){

const router = useRouter()
const pathname = usePathname()

const [menuOpen,setMenuOpen] = useState(false)
const [user,setUser] = useState<any>(null)

const { cart } = useCart()
const { wishlist } = useWishlist()

const cartCount = cart?.length || 0
const wishlistCount = wishlist?.length || 0

const [alertCount,setAlertCount] = useState(0)
const [profileImage,setProfileImage] = useState<string | null>(null)
const [viewImage,setViewImage] = useState(false)

const [touchStart,setTouchStart] = useState(0)
const [touchEnd,setTouchEnd] = useState(0)
const [mounted,setMounted] = useState(false)
const [openProducts,setOpenProducts] = useState(false)
const [openBanners,setOpenBanners] = useState(false)
const [openCategories,setOpenCategories] = useState(false)
const [openSection,setOpenSection] = useState<string | null>(null)

useEffect(()=>{

const loadData = ()=>{

const userData = localStorage.getItem("user")

if(!userData){
setUser(null)
setProfileImage(null)
return
}

const u = JSON.parse(userData)

setUser(u)

if(u && u._id){

const img = localStorage.getItem(`profileImage_${u._id}`)

if(img){
setProfileImage(img)
}else{
setProfileImage(null)
}

}

}

loadData()

window.addEventListener("profileUpdated",loadData)

return ()=>{
window.removeEventListener("profileUpdated",loadData)
}

},[])

useEffect(()=>{

const loadAlerts = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user") || "null");

if(!user?._id){
setAlertCount(0);
return;
}

const res = await fetch(`/api/notifications?userId=${user._id}`);

if(!res.ok) return;

const data = await res.json();

const unread = data.filter((n:any)=>!n.read).length;

setAlertCount(unread);

}catch(err){
console.log("ALERT ERROR",err);
}

}

/* first load */
loadAlerts();

/* refresh every 5 seconds */
const interval = setInterval(loadAlerts,5000);

/* refresh when tab focused */
window.addEventListener("focus",loadAlerts);

/* STEP 4 — listen for manual updates */
window.addEventListener("notificationUpdated",loadAlerts);

return ()=>{
clearInterval(interval);
window.removeEventListener("focus",loadAlerts);
window.removeEventListener("notificationUpdated",loadAlerts);
}

},[]);
/* LIMIT BADGE */

const limitBadge=(num:number)=>{
if(num>9) return "10+"
return num
}

useEffect(()=>{
setMounted(true)
},[])


/* SIDEBAR SCROLL LOCK */

useEffect(()=>{
if(menuOpen){
document.body.style.overflow="hidden"
}else{
document.body.style.overflow="auto"
}
},[menuOpen])

/* AUTO CLOSE ON ROUTE CHANGE */

useEffect(()=>{
setMenuOpen(false)
},[pathname])

/* CLICK RIPPLE EFFECT */

const ripple=(e:any)=>{

const button=e.currentTarget
const circle=document.createElement("span")

const diameter=Math.max(button.clientWidth,button.clientHeight)
const radius=diameter/2

circle.style.width=circle.style.height=`${diameter}px`
circle.style.left=`${e.clientX-button.offsetLeft-radius}px`
circle.style.top=`${e.clientY-button.offsetTop-radius}px`
circle.classList.add("ripple")

const rippleEl=button.getElementsByClassName("ripple")[0]

if(rippleEl){
rippleEl.remove()
}

button.appendChild(circle)

}
/* PROFILE UPLOAD */

const uploadProfile=(e:any)=>{

const file = e.target.files[0]

if(!file || !user?._id) return

const reader = new FileReader()

reader.onload=(ev:any)=>{

const img = ev.target.result

setProfileImage(img)

localStorage.setItem(`profileImage_${user._id}`,img)

window.dispatchEvent(new Event("profileUpdated"))

}

reader.readAsDataURL(file)

}

const go=(url:string)=>{
router.push(url)
setMenuOpen(false)
}

/* DROPDOWN TOGGLE */

const toggleSection=(name:string)=>{

if(openSection===name){
setOpenSection(null)
}else{
setOpenSection(name)
}

}

const logout=()=>{
setProfileImage(null)
setUser(null)

localStorage.removeItem("user")

window.dispatchEvent(new Event("userChanged"))

router.push("/")
}

/* SWIPE GESTURE */

const handleTouchStart = (e:any)=>{
setTouchStart(e.targetTouches[0].clientX)
}

const handleTouchMove = (e:any)=>{
setTouchEnd(e.targetTouches[0].clientX)
}

const handleTouchEnd = ()=>{

/* swipe left → open menu */

if(touchStart - touchEnd > 80){
setMenuOpen(true)
}

/* swipe right → close menu */

if(touchEnd - touchStart > 80){
setMenuOpen(false)
}

}

const NavItem=({icon,label,url}:any)=>{

const active = pathname===url

return(

<div
className={`navItem ${active?"active":""}`}
onClick={()=>go(url)}
>

{icon}

<span>{label}</span>

</div>

)

}

return(

<>




<header className="topNav">

{/* LEFT SIDE */}

<div className="leftNav">

<div className="brand" onClick={()=>go("/")}>

<div className="logoCircle">
<img src="/logo.png"/>
</div>

<span className="logoText">05Mart</span>

</div>

</div>

{/* RIGHT SIDE */}

<div className="rightNav">

<div className="iconBox" onClick={()=>go("/wishlist")}>

<Heart size={24}/>

{mounted && wishlistCount>0 && (
<span className="badge">{limitBadge(wishlistCount)}</span>
)}

</div>

<div className="iconBox" onClick={()=>go("/notifications")}>

<Bell size={24}/>

{mounted && alertCount>0 && (
<span className="badge">{limitBadge(alertCount)}</span>
)}

</div>

<div className="iconBox" onClick={()=>go("/cart")}>

<ShoppingCart size={24}/>

{mounted && cartCount>0 && (
<span className="badge">{limitBadge(cartCount)}</span>
)}

</div>

<button
className="menuBtn"
onClick={()=>setMenuOpen(true)}
>
<Menu size={30}/>
</button>

</div>

</header>

{/* MOBILE SEARCH BAR */}

<div className="mobileSearch">
<SearchBar/>
</div>

{/* SIDEBAR */}

{menuOpen &&(

<>

<div
className="overlay"
onClick={()=>setMenuOpen(false)}
/>

<div className="sidebar">

<button
className="closeBtn"
onClick={()=>setMenuOpen(false)}
>
✕
</button>

{/* PROFILE SECTION */}

<div className="profileSection">

<div
className="avatar"
onClick={(e)=>{
e.stopPropagation()
setViewImage(true)
}}
>

{profileImage ? (
<img src={profileImage}/>
):(
<User size={26}/>
)}

</div>

<div className="profileInfo">

<p>{user?.name || "Guest"}</p>

<label className="uploadBtn">

Upload Photo

<input
type="file"
hidden
onChange={uploadProfile}
/>

</label>

</div>

</div>

<div className="menu">

<p className="menuTitle">User</p>

<div className="menuItem" onClick={(e)=>{ripple(e);go("/")}}>
<Home size={18}/> Home
</div>

<div className="menuItem" onClick={(e)=>{ripple(e);go("/wishlist")}}>
<Heart size={18}/> Wishlist
</div>

<div className="menuItem" onClick={(e)=>{ripple(e);go("/cart")}}>
<ShoppingCart size={18}/> Cart
</div>

<div className="menuItem" onClick={(e)=>{ripple(e);go("/orders")}}>
<RotateCcw size={18}/> Returns
</div>

<div className="menuItem" onClick={(e)=>{ripple(e);go("/orders")}}>
<RefreshCcw size={18}/> Exchange
</div>


{/* LOGIN / REGISTER */}

{!user &&(

<>

<div className="menuItem" onClick={()=>go("/login")}>
Login
</div>

<div className="menuItem" onClick={()=>go("/register")}>
Register
</div>

</>

)}

{user &&(

<div className="menuItem logout" onClick={logout}>
Logout
</div>

)}


{/* ADMIN PANEL */}

{user?.role==="admin" &&(

<>

<p className="menuTitle">Admin Panel</p>

<div
className={`menuItem ${pathname==="/admin"?"activeMenu":""}`}
onClick={(e)=>{ripple(e);go("/admin")}}
>
<LayoutDashboard size={18}/> Dashboard
</div>

<div
className={`menuItem ${pathname==="/admin/orders"?"activeMenu":""}`}
onClick={(e)=>{ripple(e);go("/admin/orders")}}
>
<Package size={18}/> Orders
</div>

<div
className={`menuItem ${pathname==="/admin/returns"?"activeMenu":""}`}
onClick={(e)=>{ripple(e);go("/admin/returns")}}
>
<RotateCcw size={18}/> Returns
</div>

<div
className={`menuItem ${pathname==="/admin/exchange"?"activeMenu":""}`}
onClick={(e)=>{ripple(e);go("/admin/exchanges")}}
>
<RefreshCcw size={18}/> Exchange
</div>

{/* PRODUCTS */}

<div
className="menuItem dropdown"
onClick={()=>toggleSection("products")}
>
<ImagePlus size={18}/> Products
<span className={`arrow ${openSection==="products"?"rotate":""}`}>›</span>
</div>

{openSection==="products" &&(

<div className="subMenu">

<div className="subItem" onClick={()=>go("/admin/products/add")}>
Add Product
</div>

<div className="subItem" onClick={()=>go("/admin/products")}>
Edit Products
</div>

</div>

)}

{/* BANNERS */}

<div
className="menuItem dropdown"
onClick={()=>toggleSection("banners")}
>
<ImagePlus size={18}/> Banners
<span className={`arrow ${openSection==="banners"?"rotate":""}`}>›</span>
</div>

{openSection==="banners" &&(

<div className="subMenu">

<div className="subItem" onClick={()=>go("/admin/banner")}>
Add Banner
</div>

<div className="subItem" onClick={()=>go("/admin/banner/edit")}>
Edit Banner
</div>

</div>

)}

{/* CATEGORIES */}

<div
className="menuItem dropdown"
onClick={()=>toggleSection("categories")}
>
<Tag size={18}/> Categories
<span className={`arrow ${openSection==="categories"?"rotate":""}`}>›</span>
</div>

{openSection==="categories" &&(

<div className="subMenu">

<div className="subItem" onClick={()=>go("/admin/categories")}>
Add Category
</div>

<div className="subItem" onClick={()=>go("/admin/categories/edit")}>
Edit Category
</div>

</div>

)}

<div className="menuSpacer"></div>

</>

)}

</div>

</div>

</>

)}


{viewImage && profileImage && (

<div
className="imageViewer"
onClick={()=>setViewImage(false)}
>

<div
className="viewerBox"
onClick={(e)=>e.stopPropagation()}
>

<img src={profileImage} className="viewerImage"/>



<button
className="closeViewer"
onClick={()=>setViewImage(false)}
>
✕
</button>

</div>

</div>

)}

{/* PAGE CONTENT */}

<main
className="content"
onTouchStart={handleTouchStart}
onTouchMove={handleTouchMove}
onTouchEnd={handleTouchEnd}
>
{children}
</main>

{/* BOTTOM NAV */}

<footer className="bottomNav">

<NavItem icon={<Home size={22}/>} label="Home" url="/"/>

<NavItem icon={<Package size={22}/>} label="Orders" url="/orders"/>

<NavItem icon={<Heart size={22}/>} label="Wishlist" url="/wishlist"/>

<NavItem icon={<Bell size={22}/>} label="Alerts" url="/notifications"/>

<NavItem icon={<User size={22}/>} label="Profile" url="/profile"/>

</footer>

<style jsx>{`

body{
margin:0;
font-family:system-ui;
}

/* TOP NAVBAR */

.topNav{
position:fixed;
top:0;
left:0;
right:0;
height:70px;

display:flex;
justify-content:space-between;
align-items:center;

padding:0 3px;

background:white;
border-bottom:1px solid #eee;
z-index:1000;
}

/* LEFT SIDE */

.leftNav{
display:flex;
align-items:center;
gap:0px;
}

/* MENU BUTTON */

.menuBtn{
display:flex;
align-items:center;
justify-content:center;

width:35px;
height:35px;

border-radius:10px;
cursor:pointer;

transition:.2s;
}

.menuBtn:hover{
background:#f3f4f6;
}

/* BRAND */

.brand{
display:flex;
align-items:center;
gap:7px;
cursor:pointer;
}

/* LOGO */

.logoCircle{
width:50px;
height:50px;

border-radius:50%;
background:#f3f4f6;

display:flex;
align-items:center;
justify-content:center;

overflow:hidden;
}

.logoCircle img{
width:55px;
}

/* TEXT */

.logoText{
font-size:25px;
font-weight:700;
letter-spacing:.3px;
}

/* RIGHT SIDE */

.rightNav{
display:flex;
align-items:center;
gap:2px;
}

/* ICONS */

.iconBox{
position:relative;

display:flex;
align-items:center;
justify-content:center;

width:40px;
height:40px;

border-radius:10px;
cursor:pointer;

transition:.2s;
}

.iconBox:hover{
background:#f3f4f6;
}


/* BADGE */

.badge{
position:absolute;
top:-5px;
right:-5px;
background:#ef4444;
color:white;
font-size:9px;
font-weight:600;
padding:2px 5px;
border-radius:20px;
}

/* SIDEBAR */

.overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,.3);
z-index:999;
}

.sidebar{
position:fixed;
top:0;
right:0;
width:240px;

/* leave space for bottom navbar */
height:calc(100vh - 65px);

background:white;
padding:18px;

z-index:1000;

overflow-y:auto;

transform:translateX(0);
animation:slideInRight .25s ease;

/* space at bottom */
padding-bottom:80px;
}

.profileSection{
display:flex;
align-items:center;
gap:12px;
margin-bottom:20px;
cursor:pointer;
}

.avatar{
width:44px;
height:44px;
border-radius:50%;
background:#eee;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
}

.avatar img{
width:100%;
}

.profileInfo p{
font-weight:600;
margin:0;
}

.uploadBtn{
font-size:12px;
color:#0070f3;
cursor:pointer;
}

.menu{
display:flex;
flex-direction:column;
gap:5px;
}

.menuItem{
display:flex;
align-items:center;
gap:10px;
padding:10px;
border-radius:8px;
cursor:pointer;
transition:.2s;
}

.menuItem:hover{
background:#f3f3f3;
transform:translateX(4px);
}

.logout{
color:red;
}

/* PAGE */

.content{
padding-top:40px;
padding-bottom:70px;
padding-left:16px;
padding-right:16px;
}

/* BOTTOM NAV */

.bottomNav{
position:fixed;
bottom:0;
left:0;
right:0;
height:60px;
background:white;
border-top:1px solid #eee;
display:flex;
justify-content:space-around;
align-items:center;
z-index:1000;
}

.closeBtn{
position:absolute;
top:15px;
right:15px;
width:32px;
height:32px;

border:none;
background:#f3f4f6;
border-radius:8px;

font-size:18px;
cursor:pointer;

display:flex;
align-items:center;
justify-content:center;

transition:.2s;
}

.closeBtn:hover{
background:#e5e7eb;
transform:scale(1.05);
}

.navItem{
display:flex;
flex-direction:column;
align-items:center;
font-size:12px;
opacity:.6;
cursor:pointer;
transition:.2s;
}

.navItem:hover{
opacity:1;
transform:translateY(-2px);
}

.navItem.active{
opacity:1;
font-weight:bold;
}

/* PROFILE IMAGE VIEWER */

.imageViewer{
position:fixed;
inset:0;
background:rgba(0,0,0,.45);
display:flex;
align-items:center;
justify-content:center;
z-index:2000;
}

.viewerBox{
position:relative;
}

.viewerImage{
width:200px;
height:200px;
border-radius:50%;
object-fit:cover;
border:4px solid white;
box-shadow:0 10px 40px rgba(0,0,0,.3);
}

.closeViewer{
position:absolute;
top:-10px;
right:-10px;
width:30px;
height:30px;
border-radius:50%;
border:none;
background:white;
cursor:pointer;
font-size:16px;
}

.editPhoto{
position:absolute;
bottom:-12px;
left:50%;
transform:translateX(-50%);
background:#2563eb;
color:white;
font-size:12px;
padding:5px 10px;
border-radius:20px;
cursor:pointer;
}
@keyframes slideInRight{
from{
transform:translateX(100%);
}
to{
transform:translateX(0);
}
}

/* MENU TITLE */

.menuTitle{
font-size:12px;
font-weight:600;
color:#9ca3af;
margin-top:12px;
margin-bottom:4px;
padding-left:6px;
}

/* SCROLLABLE SIDEBAR */

.sidebar{
position:fixed;
top:0;
right:0;
width:240px;
height:100vh;
background:white;
padding:18px;
z-index:1000;

overflow-y:auto;

transform:translateX(0);
animation:slideInRight .25s ease;
}

/* HIDE SCROLLBAR */

.sidebar::-webkit-scrollbar{
display:none;
}

/* MENU ITEM */

.menuItem{
display:flex;
align-items:center;
gap:10px;
padding:10px;
border-radius:8px;
cursor:pointer;
transition:.2s;
position:relative;
overflow:hidden;
}

/* DROPDOWN STYLE */

.dropdown{
font-weight:500;
}

/* RIPPLE EFFECT */

.ripple{
position:absolute;
border-radius:50%;
transform:scale(0);
animation:rippleAnim .6s linear;
background:rgba(0,0,0,.2);
}

@keyframes rippleAnim{
to{
transform:scale(4);
opacity:0;
}
}
.mobileSearch{
position:fixed;
top:70px;
left:0;
right:0;

background:white;
padding:10px 14px;

border-bottom:1px solid #eee;

z-index:999;
}

/* SUBMENU */

.subMenu{
display:flex;
flex-direction:column;
margin-left:28px;
gap:6px;
animation:fadeDown .25s ease;
}

/* SUB ITEMS */

.subItem{
padding:8px 10px;
font-size:14px;
border-radius:6px;
cursor:pointer;
color:#444;
transition:.2s;
}

.subItem:hover{
background:#f3f3f3;
transform:translateX(3px);
}

/* ACTIVE MENU */

.activeMenu{
background:#f1f5f9;
font-weight:600;
}

/* DROPDOWN ARROW */

.arrow{
margin-left:auto;
transition:.25s;
font-size:18px;
}

.rotate{
transform:rotate(90deg);
}

.menuSpacer{
height:50px;
}

`}</style>

</>

)

}