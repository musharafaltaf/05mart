"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your cart is empty
      </div>
    );
  }

  return (
    <main className="min-h-screen p-12 bg-white text-black">
      <h1 className="text-4xl font-semibold mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-6 rounded-xl"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg"
              />

              <div>
                <h2 className="text-lg font-medium">
                  {item.name}
                </h2>

                <p className="text-gray-500">
                  Price: ${item.price}
                </p>

                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                </div>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-2xl font-semibold">
        Total: ${total}
      </div>
    </main>
  );
}