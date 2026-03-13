export default function Categories(){

const categories = [
{ name:"T-Shirts", image:"/cat/tshirt.jpg" },
{ name:"Shirts", image:"/cat/shirt.jpg" },
{ name:"Hoodies", image:"/cat/hoodie.jpg" },
{ name:"Jackets", image:"/cat/jacket.jpg" }
]

return(

<section className="max-w-7xl mx-auto px-4 py-10">

<h2 className="text-2xl font-bold mb-6">
Shop by Category
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{categories.map((cat)=>(
<div
key={cat.name}
className="group cursor-pointer"
>

<div className="overflow-hidden rounded-xl">

<img
src={cat.image}
className="w-full h-40 md:h-56 object-cover group-hover:scale-110 transition"
/>

</div>

<p className="mt-3 text-center font-medium">
{cat.name}
</p>

</div>
))}

</div>

</section>

)

}