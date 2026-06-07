"use client";

export default function SkeletonLayout(){

return(

<div className="skeletonContainer">

{/* GRID */}
{Array.from({length:6}).map((_,i)=>(
<div className="card" key={i}>

  {/* IMAGE */}
  <div className="img shimmer"/>

  {/* TITLE */}
  <div className="line shimmer"/>
  <div className="line small shimmer"/>

  {/* PRICE */}
  <div className="price shimmer"/>

  {/* BUTTON */}
  <div className="btn shimmer"/>

</div>
))}

<style jsx>{`

.skeletonContainer{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:14px;
padding:10px;
}

/* CARD */

.card{
background:white;
border-radius:12px;
padding:10px;

box-shadow:
0 2px 8px rgba(0,0,0,0.04);
}

/* IMAGE */

.img{
width:100%;
height:140px;
border-radius:10px;
margin-bottom:10px;
}

/* TEXT */

.line{
height:10px;
border-radius:6px;
margin-bottom:6px;
}

.small{
width:70%;
}

/* PRICE */

.price{
height:12px;
width:50%;
border-radius:6px;
margin:8px 0;
}

/* BUTTON */

.btn{
height:32px;
border-radius:8px;
}

/* 🔥 SHIMMER EFFECT */

.shimmer{
position:relative;
overflow:hidden;
background:#f1f1f1;
}

.shimmer::after{
content:"";
position:absolute;
top:0;
left:-150%;

width:150%;
height:100%;

background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.6),
transparent
);

animation:shimmer 1.2s infinite;
}

@keyframes shimmer{
100%{
left:150%;
}
}

`}</style>

</div>

)

}