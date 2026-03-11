import ProductCard from "./ProductCard";

export default function ProductRow({title,products}:any){

return(

<section className="px-10 py-10">

<h2 className="text-2xl font-semibold mb-6">
{title}
</h2>

<div className="flex gap-6 overflow-x-auto">

{products.map((product:any)=>(
<div key={product.id} className="min-w-[240px]">
<ProductCard product={product}/>
</div>
))}

</div>

</section>

)

}