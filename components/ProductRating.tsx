"use client";

import { useEffect, useState } from "react";

export default function ProductRating({ productId }: { productId: string }) {

  const [rating, setRating] = useState(0);

  useEffect(() => {

    const fetchRating = async () => {

      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();

      if (data.avgRating) {
        setRating(Math.round(data.avgRating));
      }

    };

    fetchRating();

  }, [productId]);

  return (

    <div className="text-yellow-500 text-sm">

      {"⭐".repeat(rating)}
      {"☆".repeat(5 - rating)}

    </div>

  );

}