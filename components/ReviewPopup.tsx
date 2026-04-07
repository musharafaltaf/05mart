"use client";

import { useEffect, useState } from "react";
import { TEST_MODE } from "@/app/lib/testMode";

export default function ReviewPopup() {
  const [order, setOrder] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;

        const user = JSON.parse(userData);

        const res = await fetch(`/api/orders?userId=${user._id}`);
        if (!res.ok) return;

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        /* TEST MODE */
        if (TEST_MODE) {
          const testOrder = data[0];
          if (!testOrder) return;

          setOrder(testOrder);

          setTimeout(() => {
            setShow(true);
            setTimeout(() => setAnimate(true), 50);
          }, 2000);

          return;
        }

        /* NORMAL MODE */

        const delivered = data.find((o: any) => {
          if (o.status !== "delivered") return false;

          const closed = localStorage.getItem(`reviewClosed_${o._id}`);
          return !closed;
        });

        if (delivered) {
          setOrder(delivered);

          setTimeout(() => {
            setShow(true);
            setTimeout(() => setAnimate(true), 50);
          }, 1200);
        }
      } catch (err) {
        console.log("Review popup error:", err);
      }
    };

    load();
  }, []);

  const closePopup = () => {
    if (order) {
      localStorage.setItem(`reviewClosed_${order._id}`, "true");
    }

    setAnimate(false);

    setTimeout(() => {
      setShow(false);
    }, 250);
  };

  if (!show || !order) return null;

  const item = order.items?.[0];
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const openReview = () => {
    const item = order.items?.[0];

    if (!item?._id) return;

    localStorage.setItem("reviewProduct", item._id);
    localStorage.setItem(`reviewClosed_${order._id}`, "true");

    window.location.href = "/review";
  };
  return (
    <div
      onClick={closePopup}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 9999,
        opacity: animate ? 1 : 0,
        transition: "opacity .25s ease",
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          openReview();
        }}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "360px",
          padding: "22px",
          borderRadius: "18px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
          transform: animate ? "scale(1)" : "scale(.92)",
          transition: "all .25s ease",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            closePopup();
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "none",
            background: "#f3f4f6",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <img
          src={item?.image}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            borderRadius: "12px",
            margin: "auto",
            boxShadow: "0 10px 25px rgba(0,0,0,.15)",
          }}
        />

        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginTop: "12px",
          }}
        >
          Hi {user?.name || "there"} 👋
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            marginTop: "4px",
          }}
        >
          Your order has been delivered successfully.
        </p>

        <p
          style={{
            fontWeight: 600,
            fontSize: "15px",
            marginTop: "10px",
          }}
        >
          {item?.name}
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          Size {item?.size} • ₹{item?.price}
        </p>

        <div
          style={{
            margin: "14px 0",
            fontSize: "22px",
            color: "#fbbf24",
            letterSpacing: "4px",
          }}
        >
          ★★★★★
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#4b5563",
            lineHeight: "1.4",
          }}
        >
          We'd love to hear your thoughts. Tap here to drop a quick review and
          help other shoppers make better choices.
        </p>

        <div
          style={{
            marginTop: "14px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Drop a Review ⭐
        </div>
      </div>
    </div>
  );
}