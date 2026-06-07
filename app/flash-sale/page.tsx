"use client";

import FlashSale from "@/components/FlashSale"
import HomeSectionsNav from "@/components/HomeSectionsNav"

export default function FlashSalePage(){

return(

<main>

<HomeSectionsNav index={0} setIndex={function (i: number): void {
            throw new Error("Function not implemented.")
        } }/>

<div style={{padding:"20px"}}>

<FlashSale/>

</div>

</main>

)

}