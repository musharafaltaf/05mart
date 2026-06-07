"use client";

import FeaturedProducts from "@/components/FeaturedProducts"
import HomeSectionsNav from "@/components/HomeSectionsNav"

export default function ProductsPage(){

return(

<main>

<HomeSectionsNav index={0} setIndex={function (i: number): void {
            throw new Error("Function not implemented.")
        } }/>

<div style={{padding:"20px"}}>

<FeaturedProducts/>

</div>

</main>

)

}