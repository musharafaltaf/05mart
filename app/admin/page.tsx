"use client";

import { useState } from "react";

export default function AdminPage() {

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState("");
  const [discount, setDiscount] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [stock,setStock] = useState("");

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    const res = await fetch("/api/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        price,
        image,
        discount,
        description,
        category,
        stock
      })
    });

    const data = await res.json();

    if(data._id){
      alert("Product added successfully");
      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setCategory("");
      setStock("");
    }else{
      alert("Failed to add product");
    }
  }

  return(

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 w-full"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 w-full"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border p-3 w-full"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 w-full"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
placeholder="Discount %"
value={discount}
onChange={(e) => setDiscount(e.target.value)}
className="border p-2"
/>

        <textarea
          placeholder="Description"
          className="border p-3 w-full"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-3 w-full"
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3"
        >
          Add Product
        </button>

      </form>

    </div>

  )
}