"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetails() {

  const params = useParams();

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {

    const loadOrder = async () => {

      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();

      setOrder(data);

    };

    if (params?.id) loadOrder();

  }, [params]);

  if (!order) return <p className="p-10">Loading order...</p>;

  return (

    <main className="max-w-6xl mx-auto p-10 grid md:grid-cols-3 gap-10">

      {/* LEFT SIDE */}

      <div className="md:col-span-2">

        <h1 className="text-2xl font-semibold mb-6">
          Order Details
        </h1>

        {order.items?.map((item: any) => (

          <div
            key={item.productId}
            className="border rounded-lg p-6 mb-6"
          >

            <div className="flex gap-6">

              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded"
              />

              <div>

                <h2 className="font-medium text-lg">
                  {item.name}
                </h2>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

                <p className="font-semibold mt-2">
                  ₹{item.price}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* RIGHT SIDE */}

      <div className="space-y-6">

        <div className="border rounded-lg p-6">

          <h2 className="font-semibold mb-3">
            Delivery Details
          </h2>

          <p>{order.customer?.name}</p>

          <p className="text-gray-500 text-sm">
            {order.customer?.address}
          </p>

          <p className="text-sm mt-1">
            Phone: {order.customer?.phone}
          </p>

        </div>

        <div className="border rounded-lg p-6">

          <h2 className="font-semibold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between">

            <p>Total</p>

            <p className="font-semibold">
              ₹{order.total}
            </p>

          </div>

        </div>

      </div>

    </main>

  );

}