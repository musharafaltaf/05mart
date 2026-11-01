"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  const notifyWhatsApp = () => {
    const phone = "917006134273";

    const message = `
🔔 NEW PAYMENT SUBMITTED
Rewind Supply

Order ID: ${orderId || "Not available"}

A customer has submitted UPI payment details.

Please check the Admin Panel for:
• Customer details
• UTR number
• Payment screenshot
• Order amount

Status: Pending Verification

Please verify the actual bank transaction before approving.
`;

    const whatsappLink =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f5f7f8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">

        <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto text-4xl">
          ⏳
        </div>

        <h1 className="text-2xl font-bold mt-6">
          Payment Under Verification
        </h1>

        <p className="text-gray-500 mt-3">
          Your payment details have been submitted successfully.
          Our team will verify your transaction.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
          <p className="font-semibold text-yellow-800">
            Status: Pending Verification
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Your order will be confirmed after payment verification.
          </p>
        </div>

        {orderId && (
          <p className="text-sm text-gray-500 mt-5 break-all">
            Order ID: {orderId}
          </p>
        )}

        {/* WHATSAPP NOTIFICATION */}
        <button
          onClick={notifyWhatsApp}
          className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          🟢 Notify Admin on WhatsApp
        </button>

        <button
          onClick={() => router.push("/orders")}
          className="w-full mt-3 bg-[#b9e3f5] py-3 rounded-xl font-semibold"
        >
          View My Orders
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-3 border py-3 rounded-xl"
        >
          Continue Shopping
        </button>

      </div>
    </main>
  );
}

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <PaymentPendingContent />
    </Suspense>
  );
}