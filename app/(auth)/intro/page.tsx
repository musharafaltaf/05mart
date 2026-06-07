"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Discover Products",
    desc: "Find your favorite products that you need to buy daily.",
    img: "/intro1.png",
  },
  {
    title: "Easy & Safe Payment",
    desc: "Pay for the products you buy safely & easily.",
    img: "/intro2.png",
  },
  {
    title: "Doorstep Delivery",
    desc: "Your products are delivered home safely & securely.",
    img: "/intro3.png",
  },
];

export default function IntroPage() {

  const [index, setIndex] = useState(0);
  const router = useRouter();

  const next = () => {
    if (index === slides.length - 1) {
      router.push("/register");
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div className="wrapper">

      
      
      {/* IMAGE HALF SCREEN */}
      <div className="imageWrap">
        <img src={slides[index].img} className="image" />
      </div>

      {/* CONTENT */}
      <div className="content">

        <h2>{slides[index].title}</h2>
        <p>{slides[index].desc}</p>

        {/* DOTS */}
        <div className="dots">
          {slides.map((_, i) => (
            <span key={i} className={i === index ? "active" : ""} />
          ))}
        </div>

        {/* BUTTON */}
        <button onClick={next}>
          {index === 2 ? "Start Shopping" : "Next"}
        </button>

      </div>

      <style jsx>{`

        .wrapper{
          height:100vh;
          display:flex;
          flex-direction:column;
          background:white;
        }

       

        /* IMAGE HALF SCREEN */
        .imageWrap{
          height:55vh;
          width:100%;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .image{
          width:100%;
          height:100%;
          object-fit:contain;
          animation:fade .4s ease;
        }

        /* CONTENT */
        .content{
          flex:1;
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          padding:20px;
        }

        h2{
          font-size:24px;
          font-weight:700;
          margin-top:10px;
          color:black;
        }

        p{
          font-size:14px;
          color:#6b7280;
          margin-top:6px;
          max-width:260px;
        }

        /* DOTS */
        .dots{
          display:flex;
          gap:6px;
          margin:20px 0;
        }

        .dots span{
          width:7px;
          height:7px;
          background:#d1d5db;
          border-radius:50%;
          transition:.3s;
        }

        .dots .active{
          width:18px;
          border-radius:10px;
          background:black;
        }

        /* BUTTON */
        button{
          width:90%;
          max-width:320px;
          padding:14px;
          border-radius:30px;
          background:black;
          color:white;
          font-size:14px;
          font-weight:500;
          margin-top:auto;
          margin-bottom:30px;
          transition:.25s;
        }

        button:active{
          transform:scale(.96);
        }

        /* ANIMATION */
        @keyframes fade{
          from{opacity:0; transform:translateY(20px)}
          to{opacity:1;}
        }

      `}</style>

    </div>
  );
}