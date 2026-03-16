"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {

const [cart,setCart] = useState<any[]>([]);

/* LOAD CART */

useEffect(()=>{

const stored = localStorage.getItem("cart");

if(stored){

const parsed = JSON.parse(stored);

/* FIX OLD CART STRUCTURE */

const fixed = parsed.map((i:any)=>({
...i,
qty: i.qty ?? i.quantity ?? 1
}));

setCart(fixed);

}

},[]);

/* SAVE CART */

useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart));
},[cart]);

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