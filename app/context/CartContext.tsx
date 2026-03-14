"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {

const [cart, setCart] = useState<any[]>([]);


// LOAD CART FROM LOCAL STORAGE
useEffect(()=>{

const savedCart = localStorage.getItem("cart");

if(savedCart){
setCart(JSON.parse(savedCart));
}

},[]);


// SAVE CART TO LOCAL STORAGE
useEffect(()=>{

localStorage.setItem("cart", JSON.stringify(cart));

},[cart]);



const addToCart = (product:any)=>{

setCart((prev)=>{

const exists = prev.find((item)=>item._id === product._id);

if(exists){

return prev.map((item)=>
item._id === product._id
? {...item, qty: item.qty + 1}
: item
)

}

return [...prev, {...product, qty:1}]

})

};


const removeFromCart = (id:string)=>{

setCart((prev)=>prev.filter((item)=>item._id !== id))

};


const increaseQty = (id:string)=>{

setCart((prev)=>
prev.map((item)=>
item._id === id
? {...item, qty: item.qty + 1}
: item
)
)

};


const decreaseQty = (id:string)=>{

setCart((prev)=>
prev.map((item)=>
item._id === id && item.qty > 1
? {...item, qty: item.qty - 1}
: item
)
)

};


return(

<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart,
increaseQty,
decreaseQty
}}
>

{children}

</CartContext.Provider>

)

}

export const useCart = ()=> useContext(CartContext);