import Link from "next/link";

export default function CategorySection(){

const categories = [
{ name:"T-Shirts", slug:"tshirt" },
{ name:"Shirts", slug:"shirt" },
{ name:"Hoodies", slug:"hoodie" },
{ name:"Jeans", slug:"jeans" },
{ name:"Jackets", slug:"jacket" }
];

return(

<section className="px-10 py-16">

<h2 className="text-3xl font-semibold text-center mb-12">
Shop by Category
</h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{categories.map((cat)=>(
<Link
key={cat.slug}
href={`/category/${cat.slug}`}
className="bg-white border rounded-xl p-10 text-center hover:shadow-lg transition"
>

<p className="font-medium text-lg">
{cat.name}
</p>

</Link>
))}

</div>

</section>

)

}