// "use client";

// import { useEffect,useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function AdminPage(){

// const router = useRouter();

// const [authorized,setAuthorized] = useState(false);
// const [products,setProducts] = useState<any[]>([]);
// const [orders,setOrders] = useState<any[]>([]);
// const [loading,setLoading] = useState(true);

// useEffect(()=>{

// const user = JSON.parse(localStorage.getItem("user") || "null");

// if(!user || user.role !== "admin"){
// router.push("/");
// return;
// }

// setAuthorized(true);

// loadProducts();
// loadOrders();

// },[]);

// const loadProducts = async()=>{

// const res = await fetch("/api/products");
// const data = await res.json();

// setProducts(Array.isArray(data)?data:[]);

// };

// const loadOrders = async()=>{

// const res = await fetch("/api/orders?role=admin");
// const data = await res.json();

// setOrders(Array.isArray(data)?data:[]);

// setLoading(false);

// };

// if(!authorized){
// return <p className="p-10 text-center">Checking access...</p>
// }

// /* DASHBOARD STATS */

// const totalOrders = orders.length;
// const totalProducts = products.length;
// const revenue = orders.reduce((a:any,b:any)=>a + (b.total || 0),0);

// return(

// <main className="max-w-7xl mx-auto px-4 py-10">

// <h1 className="text-2xl font-bold mb-6">
// Admin Dashboard
// </h1>

// {/* STATS */}

// <div className="grid md:grid-cols-4 gap-4 mb-8">

// <div className="bg-blue-500 text-white p-5 rounded">
// <p className="text-sm">Orders</p>
// <p className="text-2xl font-bold">{totalOrders}</p>
// </div>

// <div className="bg-green-500 text-white p-5 rounded">
// <p className="text-sm">Products</p>
// <p className="text-2xl font-bold">{totalProducts}</p>
// </div>

// <div className="bg-purple-500 text-white p-5 rounded">
// <p className="text-sm">Revenue</p>
// <p className="text-2xl font-bold">₹{revenue}</p>
// </div>

// <div className="bg-orange-500 text-white p-5 rounded">
// <p className="text-sm">Customers</p>
// <p className="text-2xl font-bold">{orders.length}</p>
// </div>

// </div>

// {/* PANELS */}

// <div className="grid md:grid-cols-3 gap-6 mb-10">

// {/* RECENT ORDERS */}

// <div className="border rounded p-4">

// <h2 className="font-semibold mb-3">
// Recent Orders
// </h2>

// {orders.slice(0,5).map((o:any)=>(
// <p key={o._id} className="text-sm border-b py-1">
// {o.customer?.name} — ₹{o.total}
// </p>
// ))}

// <Link href="/admin/orders" className="text-blue-600 text-sm mt-2 inline-block">
// View all orders
// </Link>

// </div>

// {/* LOW STOCK */}

// <div className="border rounded p-4">

// <h2 className="font-semibold mb-3">
// Low Stock
// </h2>

// {products.filter((p:any)=>p.stock < 5).slice(0,5).map((p:any)=>(
// <p key={p._id} className="text-sm border-b py-1">
// {p.name} — Stock {p.stock}
// </p>
// ))}

// </div>

// {/* RETURNS */}

// <div className="border rounded p-4">

// <h2 className="font-semibold mb-3">
// Return Requests
// </h2>

// {orders
// .filter((o:any)=>o.returnRequest?.requested)
// .slice(0,5)
// .map((o:any)=>(
// <p key={o._id} className="text-sm border-b py-1">
// {o.customer?.name} — Return Requested
// </p>
// ))}

// <Link href="/admin/returns" className="text-blue-600 text-sm mt-2 inline-block">
// Manage Returns
// </Link>

// </div>

// </div>

// {/* QUICK LINKS */}

// <div className="grid md:grid-cols-3 gap-4">

// <Link href="/admin/products/add" className="border p-4 rounded hover:bg-gray-50">
// Add Product
// </Link>

// <Link href="/admin/products" className="border p-4 rounded hover:bg-gray-50">
// Edit Products
// </Link>

// <Link href="/admin/banner" className="border p-4 rounded hover:bg-gray-50">
// Manage Banners
// </Link>

// <Link href="/admin/categories" className="border p-4 rounded hover:bg-gray-50">
// Manage Categories
// </Link>

// <Link href="/admin/exchanges" className="border p-4 rounded hover:bg-gray-50">
// Exchange Requests
// </Link>

// </div>

// </main>

// )

// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ToastType = "success" | "error" | "info";

export default function AdminPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  // CUSTOM NOTIFICATION
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  // CUSTOM CONFIRMATION MODAL
  const [confirmModal, setConfirmModal] = useState<{
    orderId: string;
    action: "approve" | "reject";
  } | null>(null);

  // REJECTION REASON
  const [rejectionReason, setRejectionReason] = useState("");

  // SHOW CUSTOM TOAST
  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user || user.role !== "admin") {
        router.push("/");
        return;
      }

      setAuthorized(true);
      loadProducts();
      loadOrders();
    } catch {
      router.push("/");
    }
  }, [router]);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders?role=admin");
      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // OPEN PAYMENT ACTION MODAL
  const openPaymentModal = (
    orderId: string,
    action: "approve" | "reject"
  ) => {
    setRejectionReason("");
    setConfirmModal({ orderId, action });
  };

  // PROCESS PAYMENT
  const handlePaymentAction = async () => {
    if (!confirmModal) return;

    const { orderId, action } = confirmModal;

    if (action === "reject" && !rejectionReason.trim()) {
      showToast("Please enter a rejection reason.", "error");
      return;
    }

    try {
      setProcessingOrderId(orderId);
      setConfirmModal(null);

      const res = await fetch("/api/admin/payment-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          orderId,
          action,
          reason: rejectionReason.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment verification failed");
      }

      showToast(
        data.message ||
          (action === "approve"
            ? "Payment approved successfully!"
            : "Payment rejected successfully!"),
        "success"
      );

      await loadOrders();
    } catch (error: any) {
      showToast(
        error.message || "Something went wrong.",
        "error"
      );
    } finally {
      setProcessingOrderId(null);
      setRejectionReason("");
    }
  };

  if (!authorized) {
    return (
      <p className="p-10 text-center">
        Checking access...
      </p>
    );
  }

  // DASHBOARD STATS
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const revenue = orders.reduce(
    (a: number, b: any) => a + (b.total || 0),
    0
  );

  // PENDING PAYMENTS
  const pendingPayments = orders.filter(
    (o: any) =>
      o.paymentStatus === "verification_pending" ||
      (
        o.status === "pending_verification" &&
        (!o.paymentStatus || o.paymentStatus === "pending")
      )
  );

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-blue-500 text-white p-5 rounded-xl">
            <p className="text-sm">Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-xl">
            <p className="text-sm">Products</p>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>

          <div className="bg-purple-500 text-white p-5 rounded-xl">
            <p className="text-sm">Revenue</p>
            <p className="text-2xl font-bold">₹{revenue}</p>
          </div>

          <div className="bg-orange-500 text-white p-5 rounded-xl">
            <p className="text-sm">Customers</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>

        </div>

        {/* PAYMENT VERIFICATION */}
        <section className="mb-10">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h2 className="text-xl font-bold">
                Payment Verification
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Review customer UPI and QR payments.
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              {pendingPayments.length} Pending
            </span>

          </div>

          {pendingPayments.length === 0 ? (

            <div className="border rounded-xl p-8 text-center text-gray-500">
              No pending payment verifications.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {pendingPayments.map((order: any) => (

                <div
                  key={order._id}
                  className="border rounded-xl p-5 bg-white shadow-sm"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="font-bold">
                      Order #{order._id.slice(-8)}
                    </h3>

                    <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      Pending Verification
                    </span>

                  </div>

                  <div className="space-y-2 text-sm">

                    <p>
                      <strong>Customer:</strong>{" "}
                      {order.customer?.name || "N/A"}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {order.customer?.phone || "N/A"}
                    </p>

                    <p>
                      <strong>Amount:</strong>{" "}
                      ₹{order.total ?? "N/A"}
                    </p>

                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {order.paymentMethod?.toUpperCase() || "N/A"}
                    </p>

                    <p>
                      <strong>UPI App:</strong>{" "}
                      {order.upiApp || "QR Payment"}
                    </p>

                    <p className="break-all">
                      <strong>UTR:</strong>{" "}
                      {order.upiTransactionId || "Not available"}
                    </p>

                    <p>
                      <strong>Submitted:</strong>{" "}
                      {order.paymentSubmittedAt
                        ? new Date(order.paymentSubmittedAt).toLocaleString()
                        : "Not available"}
                    </p>

                  </div>

                  {/* PAYMENT SCREENSHOT */}
                  <div className="mt-5">

                    <h4 className="font-semibold text-sm mb-2">
                      Payment Screenshot
                    </h4>

                    {order.paymentScreenshot ? (

                      <a
                        href={order.paymentScreenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >

                        <img
                          src={order.paymentScreenshot}
                          alt="Customer payment screenshot"
                          className="w-full max-h-64 object-contain border rounded-lg bg-gray-50"
                        />

                        <span className="text-blue-600 text-sm mt-2 inline-block">
                          View Full Screenshot ↗
                        </span>

                      </a>

                    ) : (

                      <p className="text-red-500 text-sm">
                        Screenshot not uploaded.
                      </p>

                    )}

                  </div>

                  {/* PAYMENT ACTIONS */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <button
                      onClick={() =>
                        openPaymentModal(order._id, "approve")
                      }
                      disabled={processingOrderId === order._id}
                      className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {processingOrderId === order._id
                        ? "Processing..."
                        : "Approve"}
                    </button>

                    <button
                      onClick={() =>
                        openPaymentModal(order._id, "reject")
                      }
                      disabled={processingOrderId === order._id}
                      className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {processingOrderId === order._id
                        ? "Processing..."
                        : "Reject"}
                    </button>

                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Verify the actual bank transaction before approving.
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* EXISTING PANELS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* RECENT ORDERS */}
          <div className="border rounded-xl p-4">

            <h2 className="font-semibold mb-3">
              Recent Orders
            </h2>

            {orders.slice(0, 5).map((o: any) => (

              <p key={o._id} className="text-sm border-b py-1">
                {o.customer?.name} — ₹{o.total}
              </p>

            ))}

            <Link
              href="/admin/orders"
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              View all orders
            </Link>

          </div>

          {/* LOW STOCK */}
          <div className="border rounded-xl p-4">

            <h2 className="font-semibold mb-3">
              Low Stock
            </h2>

            {products
              .filter((p: any) => p.stock < 5)
              .slice(0, 5)
              .map((p: any) => (

                <p key={p._id} className="text-sm border-b py-1">
                  {p.name} — Stock {p.stock}
                </p>

              ))}

          </div>

          {/* RETURNS */}
          <div className="border rounded-xl p-4">

            <h2 className="font-semibold mb-3">
              Return Requests
            </h2>

            {orders
              .filter((o: any) => o.returnRequest?.requested)
              .slice(0, 5)
              .map((o: any) => (

                <p key={o._id} className="text-sm border-b py-1">
                  {o.customer?.name} — Return Requested
                </p>

              ))}

            <Link
              href="/admin/returns"
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              Manage Returns
            </Link>

          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="grid md:grid-cols-3 gap-4">

          <Link
            href="/admin/products/add"
            className="border p-4 rounded-xl hover:bg-gray-50"
          >
            Add Product
          </Link>

          <Link
            href="/admin/products"
            className="border p-4 rounded-xl hover:bg-gray-50"
          >
            Edit Products
          </Link>

          <Link
            href="/admin/banner"
            className="border p-4 rounded-xl hover:bg-gray-50"
          >
            Manage Banners
          </Link>

          <Link
            href="/admin/categories"
            className="border p-4 rounded-xl hover:bg-gray-50"
          >
            Manage Categories
          </Link>

          <Link
            href="/admin/exchanges"
            className="border p-4 rounded-xl hover:bg-gray-50"
          >
            Exchange Requests
          </Link>

        </div>

      </main>

      {/* ================================= */}
      {/* CUSTOM TOAST NOTIFICATION */}
      {/* ================================= */}

      {toast && (

        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right duration-300">

          <div
            className={`flex items-center gap-3 min-w-[280px] max-w-sm p-4 rounded-2xl shadow-2xl border bg-white ${
              toast.type === "success"
                ? "border-green-200"
                : toast.type === "error"
                ? "border-red-200"
                : "border-blue-200"
            }`}
          >

            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {toast.type === "success"
                ? "✓"
                : toast.type === "error"
                ? "✕"
                : "i"}
            </div>

            <div className="flex-1">

              <p className="font-bold text-gray-900 text-sm">
                {toast.type === "success"
                  ? "Rewind Supply"
                  : toast.type === "error"
                  ? "Something went wrong"
                  : "Notice"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {toast.message}
              </p>

            </div>

            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-black text-xl"
              aria-label="Close notification"
            >
              ×
            </button>

          </div>

        </div>

      )}

      {/* ================================= */}
      {/* CUSTOM CONFIRMATION MODAL */}
      {/* ================================= */}

      {confirmModal && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 animate-in zoom-in-95 duration-200">

            <div className="text-center">

              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                  confirmModal.action === "approve"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {confirmModal.action === "approve" ? "✓" : "!"}
              </div>

              <h2 className="text-xl font-bold mt-4 text-gray-900">

                {confirmModal.action === "approve"
                  ? "Approve Payment?"
                  : "Reject Payment?"}

              </h2>

              <p className="text-sm text-gray-500 mt-2">

                {confirmModal.action === "approve"
                  ? "Have you verified the actual UPI transaction in your bank account?"
                  : "Please provide a reason for rejecting this payment."}

              </p>

            </div>

            {/* REJECTION REASON */}
            {confirmModal.action === "reject" && (

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows={4}
                className="w-full mt-5 border border-gray-300 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-300 resize-none"
              />

            )}

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button
                onClick={() => {
                  setConfirmModal(null);
                  setRejectionReason("");
                }}
                className="border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handlePaymentAction}
                disabled={
                  confirmModal.action === "reject" &&
                  !rejectionReason.trim()
                }
                className={`py-3 rounded-xl text-white font-semibold disabled:opacity-50 ${
                  confirmModal.action === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {confirmModal.action === "approve"
                  ? "Yes, Approve"
                  : "Yes, Reject"}
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}
