"use client";

export default function CheckoutSteps({ step }: { step: number }) {

const steps = [
{ id: 1, label: "Address" },
{ id: 2, label: "Order Summary" },
{ id: 3, label: "Payment" }
];

return (

<div className="w-full mb-10">

{/* Progress bar background */}

<div className="relative flex items-center justify-between">

{/* Animated Progress Line */}

<div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200"></div>

<div
className="absolute top-4 left-0 h-[2px] bg-blue-600 transition-all duration-500"
style={{
width:
step === 1
? "0%"
: step === 2
? "50%"
: "100%"
}}
></div>

{/* Steps */}

{steps.map((s) => {

const active = step === s.id;
const completed = step > s.id;

return (

<div
key={s.id}
className="relative flex flex-col items-center text-center flex-1"
>

{/* Circle */}

<div
className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 text-sm md:text-base font-medium transition-all duration-300
${active
? "border-blue-600 text-blue-600 bg-white"
: completed
? "border-blue-600 bg-blue-600 text-white"
: "border-gray-300 text-gray-400 bg-white"
}`}
>

{completed ? "✓" : s.id}

</div>

{/* Label */}

<span
className={`mt-2 text-xs sm:text-sm md:text-base transition-colors
${active ? "text-blue-600 font-semibold" : "text-gray-400"}
`}
>
{s.label}
</span>

</div>

);

})}

</div>

</div>

);

}