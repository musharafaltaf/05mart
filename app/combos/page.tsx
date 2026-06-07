"use client";

import ComboSection from "@/components/ComboSection"
import HomeSectionsNav from "@/components/HomeSectionsNav"

export default function CombosPage(){

return(

<main>

<HomeSectionsNav index={0} setIndex={function (i: number): void {
            throw new Error("Function not implemented.")
        } }/>

<div style={{padding:"20px"}}>

<ComboSection/>

</div>

</main>

)

}