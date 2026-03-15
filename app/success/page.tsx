// "use client";

// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import jsPDF from "jspdf";

// export default function SuccessPage(){

// const searchParams = useSearchParams();
// const orderId = searchParams.get("orderId");

// /* DELIVERY DATE */

// const deliveryDate = ()=>{
// const date = new Date();
// date.setDate(date.getDate()+4);
// return date.toDateString();
// };

// /* DOWNLOAD INVOICE */

// const downloadInvoice = ()=>{

// const doc = new jsPDF();

// doc.setFontSize(22);
// doc.text("05Mart Invoice", 70, 20);

// doc.setFontSize(12);

// doc.text(`Order ID: ${orderId}`,20,50);
// doc.text(`Delivery Date: ${deliveryDate()}`,20,60);
// doc.text("Thank you for shopping with 05Mart!",20,90);

// doc.save(`invoice_${orderId}.pdf`);

// };

// return(

// <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

// <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

// {/* SUCCESS ICON */}

// <div className="flex justify-center mb-6">

// <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl animate-pulse">

// ✔

// </div>

// </div>

// {/* TITLE */}

// <h1 className="text-3xl font-bold text-green-600 mb-2">
// Order Placed Successfully
// </h1>

// <p className="text-gray-500 mb-8">
// Your order has been confirmed and will be shipped soon.
// </p>

// {/* ORDER DETAILS CARD */}

// <div className="border rounded-lg p-6 mb-8 bg-gray-50">

// <p className="text-sm text-gray-500 mb-1">
// Order ID
// </p>

// <p className="font-semibold break-all">
// {orderId}
// </p>

// <div className="mt-4 text-sm text-gray-600">

// <p>
// Estimated Delivery
// </p>

// <p className="font-semibold text-green-600">
// {deliveryDate()}
// </p>

// </div>

// </div>

// {/* ACTION BUTTONS */}

// <div className="grid gap-4">

// <Link
// href={`/orders/${orderId}`}
// className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
// >
// View Order
// </Link>

// <Link
// href="/"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Continue Shopping
// </Link>

// <button
// onClick={downloadInvoice}
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Download Invoice
// </button>

// <a
// href="tel:+916005955305"
// className="border py-3 rounded-lg hover:bg-gray-100 transition"
// >
// Contact Support
// </a>

// </div>

// </div>

// </main>

// );

// }





"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";

function SuccessContent(){

const searchParams = useSearchParams();
const orderId = searchParams.get("orderId");

/* DELIVERY DATE */

const deliveryDate = ()=>{
const date = new Date();
date.setDate(date.getDate()+4);
return date.toDateString();
};

/* DOWNLOAD INVOICE */

const downloadInvoice = ()=>{

const doc = new jsPDF();

doc.setFontSize(22);
doc.text("05Mart Invoice", 70, 20);

doc.setFontSize(12);

doc.text(`Order ID: ${orderId}`,20,50);
doc.text(`Delivery Date: ${deliveryDate()}`,20,60);
doc.text("Thank you for shopping with 05Mart!",20,90);

doc.save(`invoice_${orderId}.pdf`);

};

return(

<main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

<div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">

{/* SUCCESS ICON */}

<div className="flex justify-center mb-6">

<div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center text-5xl animate-pulse">

✔

</div>

</div>

{/* TITLE */}

<h1 className="text-3xl font-bold text-green-600 mb-2">
Order Placed Successfully
</h1>

<p className="text-gray-500 mb-8">
Your order has been confirmed and will be shipped soon.
</p>

{/* ORDER DETAILS CARD */}

<div className="border rounded-lg p-6 mb-8 bg-gray-50">

<p className="text-sm text-gray-500 mb-1">
Order ID
</p>

<p className="font-semibold break-all">
{orderId}
</p>

<div className="mt-4 text-sm text-gray-600">

<p>
Estimated Delivery
</p>

<p className="font-semibold text-green-600">
{deliveryDate()}
</p>

</div>

</div>

{/* ACTION BUTTONS */}

<div className="grid gap-4">

<Link
href={`/orders/${orderId}`}
className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
>
View Order
</Link>

<Link
href="/"
className="border py-3 rounded-lg hover:bg-gray-100 transition"
>
Continue Shopping
</Link>

<button
onClick={downloadInvoice}
className="border py-3 rounded-lg hover:bg-gray-100 transition"
>
Download Invoice
</button>

<a
href="tel:+916005955305"
className="border py-3 rounded-lg hover:bg-gray-100 transition"
>
Contact Support
</a>

</div>

</div>

</main>

);
}

export default function SuccessPage(){
return(
<Suspense fallback={<div className="text-center p-10">Loading...</div>}>
<SuccessContent/>
</Suspense>
);
}