"use client";

import { useEffect,useState } from "react";

export default function Analytics(){

const [orders,setOrders] = useState([]);

useEffect(() => {

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  fetchOrders();

}, []);

const totalRevenue = orders.reduce(
(sum,o)=>sum+o.total,
0
);

return(

<main className="max-w-5xl mx-auto p-10">

<h1 className="text-2xl font-bold mb-6">
Store Analytics
</h1>

<p>Total Orders: {orders.length}</p>

<p>Total Revenue: ₹{totalRevenue}</p>

</main>

);

}