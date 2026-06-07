"use client"

import SearchBar from "@/components/SearchBar"

export default function SearchPage(){

return(

<main className="searchPage">

<SearchBar/>

<style jsx>{`

.searchPage{
height:100vh;
padding:10px;
max-width:700px;
margin:auto;
}

`}</style>

</main>

)

}