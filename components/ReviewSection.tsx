"use client";

import { useEffect, useState } from "react";

export default function ReviewSection({ productId }: { productId: string }) {

  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {

    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setReviews(data);
    }

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
        name,
        rating,
        comment
      })
    });

    setName("");
    setComment("");

    fetchReviews();

  };

  return (

    <section className="mt-16">

      <h2 className="text-2xl font-semibold mb-6">
        Reviews
      </h2>

      {/* Add Review */}

      <div className="space-y-3 mb-10">

        <input
          placeholder="Your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={rating}
          onChange={(e)=>setRating(Number(e.target.value))}
          className="border p-2"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          placeholder="Write review"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={submitReview}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>

      </div>

      {/* Reviews List */}

      <div className="space-y-4">

        {reviews.map((review)=>(
          <div key={review._id} className="border p-4 rounded">

            <p className="font-semibold">
              {review.name}
            </p>

            <p>
              {"⭐".repeat(review.rating)}
            </p>

            <p className="text-gray-600">
              {review.comment}
            </p>

          </div>
        ))}

      </div>

    </section>

  );

}