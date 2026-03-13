"use client";

export default function QuickView({product,onClose}:any){

if(!product) return null;

return(

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">

<button
onClick={onClose}
className="absolute top-3 right-3 text-xl"
>
✕
</button>

<div className="grid md:grid-cols-2 gap-6">

<img
src={product.image}
className="w-full h-64 object-cover rounded"
/>

<div>

<h2 className="text-xl font-semibold">
{product.name}
</h2>

<p className="text-lg mt-2">
₹{product.price}
</p>

<p className="text-gray-500 mt-3 text-sm">
{product.description}
</p>

<button className="mt-4 bg-black text-white px-6 py-2 rounded">
Add to Cart
</button>

</div>

</div>

</div>

</div>

)

}