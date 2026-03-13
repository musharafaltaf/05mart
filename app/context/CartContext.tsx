"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {

const [cart,setCart] = useState<any[]>([]);

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

return [...prev,{...product, qty:1}]

})

};

const removeFromCart = (_id:string)=>{
setCart((prev)=>prev.filter((item)=>item._id !== _id))
}

const increaseQty = (_id:string)=>{
setCart((prev)=>
prev.map((item)=>
item._id === _id
? {...item, qty:item.qty+1}
: item
)
)
}

const decreaseQty = (_id:string)=>{
setCart((prev)=>
prev.map((item)=>
item._id === _id && item.qty>1
? {...item, qty:item.qty-1}
: item
)
)
}

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

export const useCart = ()=>useContext(CartContext);