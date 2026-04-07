"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {

const [cart,setCart] = useState<any[]>([]);
const [user,setUser] = useState<any>(null);

/* LOAD USER + CART */

useEffect(()=>{

const loadUserCart = ()=>{

const u = JSON.parse(localStorage.getItem("user") || "null");
setUser(u);

if(!u?._id){
setCart([]);
return;
}

const stored = localStorage.getItem(`cart_${u._id}`);

if(stored){

const parsed = JSON.parse(stored);

/* FIX OLD CART STRUCTURE */

const fixed = parsed.map((i:any)=>({
...i,
qty: i.qty ?? i.quantity ?? 1
}));

setCart(fixed);

}else{
setCart([]);
}

};

loadUserCart();

window.addEventListener("userChanged",loadUserCart);

return ()=>{
window.removeEventListener("userChanged",loadUserCart);
};

},[]);

/* SAVE CART */

useEffect(()=>{

if(user?._id){
localStorage.setItem(`cart_${user._id}`,JSON.stringify(cart));
}

},[cart,user]);

/* ADD TO CART */

const addToCart = (product:any)=>{

setCart(prev=>{

const exists = prev.find(i=>i._id === product._id && i.size === product.size);

if(exists){

return prev.map(i =>
i._id === product._id && i.size === product.size
? {...i, qty: Number(i.qty) + 1}
: i
);

}

return [...prev,{...product, qty:1}];

});

};

/* REMOVE */

const removeFromCart = (id:string)=>{

setCart(prev=>prev.filter(i=>i._id !== id));

};

/* INCREASE */

const increaseQty = (id:string)=>{

setCart(prev =>
prev.map(i =>
i._id === id
? {...i, qty: Number(i.qty) + 1}
: i
)
);

};

/* DECREASE */

const decreaseQty = (id:string)=>{

setCart(prev =>
prev.map(i =>
i._id === id && Number(i.qty) > 1
? {...i, qty: Number(i.qty) - 1}
: i
)
);

};

return(

<CartContext.Provider
value={{cart,addToCart,removeFromCart,increaseQty,decreaseQty}}
>

{children}

</CartContext.Provider>

);

}

export const useCart = ()=>useContext(CartContext);