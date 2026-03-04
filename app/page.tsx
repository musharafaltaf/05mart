"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "../data/products";

export default function Home() {

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [loading,setLoading] = useState(true);

  const categories = ["All","T-Shirts","Shirts","Hoodies","Jeans","Jackets"];

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
    },800);

    return ()=>clearTimeout(timer);
  },[]);

  const filteredProducts = products.filter((product)=>{

    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;

  });

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      {/* HERO */}

      <section className="text-center py-16 px-6 bg-white">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          05Mart Clothing
        </h1>

        <p className="text-gray-500 mb-6">
          Premium streetwear for everyday style
        </p>

        {/* SEARCH */}

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search clothing..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border px-5 py-3 w-full max-w-md rounded-lg"
          />
        </div>

      </section>


      {/* CATEGORY BUTTONS */}

      <section className="py-10">

        <div className="flex justify-center gap-4 flex-wrap">

          {categories.map((cat)=>(
            <button
              key={cat}
              onClick={()=>setCategory(cat)}
              className={`px-6 py-2 border rounded-full transition
              ${category===cat ? "bg-black text-white":"bg-white"}`}
            >
              {cat}
            </button>
          ))}

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="px-6 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {loading ? (

            Array.from({length:8}).map((_,i)=>(
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
              >

                <div className="w-full h-52 bg-gray-200 rounded-lg mb-3"></div>

                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

                <div className="h-4 bg-gray-200 rounded w-1/4"></div>

              </div>
            ))

          ) : (

            filteredProducts.map((product)=>(
              <Link key={product.id} href={`/product/${product.id}`}>

                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition">

                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-lg mb-3"
                  />

                  <h3 className="text-sm font-medium">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ₹{product.price}
                  </p>

                </div>

              </Link>
            ))

          )}

        </div>

      </section>

    </main>
  );
}