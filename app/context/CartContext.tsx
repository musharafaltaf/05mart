"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {

const [cart,setCart] = useState<any[]>([]);

/* LOAD CART */

useEffect(()=>{

const stored = localStorage.getItem("cart");

if(stored){
setCart(JSON.parse(stored));
}

},[]);

/* SAVE CART */

useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart));
},[cart]);

const addToCart = (product:any)=>{

setCart(prev=>{

const exists = prev.find(i=>i._id === product._id && i.size === product.size);

if(exists){

return prev.map(i =>
i._id === product._id && i.size === product.size
? {...i, quantity: i.quantity + 1}
: i
);

}

return [...prev,{...product,quantity:1}];

});

};

const removeFromCart = (id:string)=>{

setCart(prev=>prev.filter(i=>i._id !== id));

};

const increaseQty = (id:string)=>{

setCart(prev =>
prev.map(i =>
i._id === id
? {...i,quantity:i.quantity+1}
: i
)
);

};

const decreaseQty = (id:string)=>{

setCart(prev =>
prev.map(i =>
i._id === id && i.quantity > 1
? {...i,quantity:i.quantity-1}
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