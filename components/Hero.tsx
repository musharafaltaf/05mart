"use client";

import { useEffect,useState } from "react";

export default function Hero(){

const [banner,setBanner] = useState<any>(null);

useEffect(()=>{

const loadBanner = async()=>{

try{

const res = await fetch("/api/banners");

if(!res.ok){
console.log("Banner API error");
return;
}

const text = await res.text();

if(!text){
console.log("No banner found");
return;
}

const data = JSON.parse(text);

if(data && data.length){
setBanner(data[0]);
}

}catch(err){
console.log("Banner error:",err);
}

};

loadBanner();

},[]);

if(!banner) return null;

return(

<section className="relative w-full h-[350px] md:h-[500px]">

<img
src={banner.image}
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">

<h1 className="text-3xl md:text-5xl font-bold">
{banner.title}
</h1>

<p className="mt-2">
{banner.subtitle}
</p>

</div>

</section>

);

}