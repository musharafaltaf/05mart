"use client";

import { useEffect, useState } from "react";

export default function ProductReviews({ productId }: any) {

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {

    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();

    setReviews(data);

  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const submitReview = async () => {

    await fetch("/api/reviews", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        productId,
        rating,
        comment
      })

    });

    setComment("");
    fetchReviews();

  };

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const stars = Math.round(average);

  return (

    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-4">
        Reviews
      </h2>

      {/* Average Rating */}

      <div className="flex items-center gap-2 mb-6">

        <div className="text-yellow-500 text-xl">
          {"⭐".repeat(stars)}
        </div>

        <span>
          ({reviews.length} reviews)
        </span>

      </div>


      {/* Review List */}

      {reviews.map((r, i) => (

        <div key={i} className="border-b py-3">

          <div className="text-yellow-500">
            {"⭐".repeat(r.rating)}
          </div>

          <p className="text-gray-700">
            {r.comment}
          </p>

        </div>

      ))}


      {/* Add Review */}

      <div className="mt-6">

        <h3 className="font-semibold mb-2">
          Write a Review
        </h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2"
        >

          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>

        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full mt-2"
        />

        <button
          onClick={submitReview}
          className="bg-black text-white px-4 py-2 mt-2 rounded"
        >
          Submit Review
        </button>

      </div>

    </div>

  );

}