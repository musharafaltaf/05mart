"use client";

export default function CheckoutSteps({ step }: { step: number }) {

const steps = [
{ id: 1, label: "Address" },
{ id: 2, label: "Order Summary" },
{ id: 3, label: "Payment" }
];

return (

<div className="flex items-center justify-center mb-8">

{steps.map((s, index) => {

const active = step === s.id;
const completed = step > s.id;

return (

<div key={s.id} className="flex items-center">

{/* Circle */}

<div
className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 text-sm md:text-base font-medium
${active ? "border-blue-600 text-blue-600 bg-white"
: completed ? "border-blue-600 bg-blue-600 text-white"
: "border-gray-300 text-gray-400"}
`}
>
{s.id}
</div>

{/* Label */}

<span
className={`ml-2 text-sm md:text-base ${
active ? "text-blue-600 font-semibold" : "text-gray-400"
}`}
>
{s.label}
</span>

{/* Line */}

{index < steps.length - 1 && (
<div
className={`mx-4 w-10 md:w-20 h-[2px] ${
completed ? "bg-blue-600" : "bg-gray-300"
}`}
></div>
)}

</div>

);

})}

</div>

);

}