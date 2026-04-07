"use client";

export default function PopupModal({title,message,onClose}:any){

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

<div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">

<h2 className="text-xl font-bold mb-2">{title}</h2>

<p className="text-gray-600 text-sm">{message}</p>

<button
onClick={onClose}
className="mt-4 bg-black text-white px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

);

}