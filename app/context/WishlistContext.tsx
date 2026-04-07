"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext<any>(null);

export function WishlistProvider({ children }: any) {

const [wishlist,setWishlist] = useState<any[]>([]);
const [user,setUser] = useState<any>(null);

/* LOAD USER + WISHLIST */

useEffect(()=>{

const loadWishlist = ()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);

if(!u?._id){
setWishlist([]);
return;
}

const stored = localStorage.getItem(`wishlist_${u._id}`);

if(stored){
setWishlist(JSON.parse(stored));
}else{
setWishlist([]);
}

};

loadWishlist();

window.addEventListener("userChanged",loadWishlist);

return ()=>{
window.removeEventListener("userChanged",loadWishlist);
};

},[]);

/* SAVE WISHLIST */

useEffect(()=>{

if(user?._id){
localStorage.setItem(`wishlist_${user._id}`,JSON.stringify(wishlist));
}

},[wishlist,user]);

/* ADD PRODUCT */

const addToWishlist = (product:any)=>{

setWishlist(prev=>{

const exists = prev.find((p:any)=>p._id===product._id);

if(exists) return prev;

return [...prev,product];

});

};

/* REMOVE PRODUCT */

const removeFromWishlist = (id:string)=>{

setWishlist(prev=>prev.filter(p=>p._id!==id));

};

return(

<WishlistContext.Provider
value={{
wishlist,
addToWishlist,
removeFromWishlist
}}
>

{children}

</WishlistContext.Provider>

);

}

export const useWishlist = ()=>{
return useContext(WishlistContext);
};