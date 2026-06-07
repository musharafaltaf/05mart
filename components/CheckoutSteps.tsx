"use client";

import { useRouter } from "next/navigation";

export default function CheckoutSteps({ step, loading }: { step: number; loading?: boolean }) {

const router = useRouter();

const steps = [
{ id: 1, label: "Address", path: "/checkout/address" },
{ id: 2, label: "Summary", path: "/checkout/summary" },
{ id: 3, label: "Payment", path: "/checkout/payment" }
];

const progressWidth =
step === 1 ? "0%" :
step === 2 ? "50%" :
"100%";

if (loading) {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="w-[90%] max-w-xl flex items-center justify-between">

        {[1,2,3].map(i => (
          <div key={i} className="flex flex-col items-center">

            {/* Circle */}
            <div className="w-7 h-7 rounded-full bg-gray-200 shimmer"></div>

            {/* Label */}
            <div className="h-2 w-10 mt-2 bg-gray-200 rounded shimmer"></div>

          </div>
        ))}

      </div>
    </div>
  );
}
return (

 <div className="w-full flex justify-center mb-0 "> 

{/* MAIN CONTAINER */}
<div className="w-[90%] max-w-xl bg-white/90 backdrop-blur-md border rounded-full px-4 py-1 shadow-sm">

<div className="relative flex items-center justify-between">

{/* BASE LINE (ONLY BETWEEN STEPS) */}
<div className="absolute left-6 right-6 top-1/3 -translate-y-1/2 h-[2px] bg-gray-200 rounded-full"></div>

{/* ACTIVE LINE */}
<div
className="absolute left-1 top-1/3 -translate-y-1/2 h-[2px] rounded-full
bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500
transition-all duration-500"
style={{ width: progressWidth }}
></div>

{/* STEPS */}
{steps.map((s) => {

const active = step === s.id;
const completed = step > s.id;
const clickable = s.id < step;

return (

<div key={s.id} className="relative flex flex-col items-center">

{/* CIRCLE */}
<div
onClick={()=>{
if(clickable){
router.push(s.path);
}
}}
className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all duration-300
${active
? "bg-white border-2 border-orange-500 text-orange-500 scale-110 shadow"
: completed
? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white"
: "bg-gray-200 text-gray-400"
}
${clickable ? "cursor-pointer hover:scale-110" : ""}
`}
>
{completed ? "✓" : s.id}
</div>

{/* LABEL */}
<span
className={`mt-1 text-[10px] transition-all
${active ? "text-orange-600 font-medium" : "text-gray-400"}
`}
>
{s.label}
</span>

</div>

);

})}

</div>

</div>

</div>

);
}