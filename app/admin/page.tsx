"use client";

import { useState } from "react";

export default function AdminPage() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      image,
    };

    console.log("New Product:", newProduct);

    alert("Product added (check console)");

    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <main className="min-h-screen p-12 bg-white text-black">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Product
        </button>

      </form>

    </main>
  );
}