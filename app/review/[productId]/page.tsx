"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ReviewRedirect(){

const { productId } = useParams();

useEffect(()=>{

if(productId){

localStorage.setItem("reviewProduct", productId as string);

window.location.href="/review";

}

},[productId]);

return(
<p className="p-10 text-center">
Opening review page...
</p>
);

}