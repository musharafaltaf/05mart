// "use client"

// export default function HomeSectionsNav({
// index,
// setIndex
// }:{
// index:number
// setIndex:(i:number)=>void
// }){

// const tabs = [
// "Products",
// "Combo Deals",
// "Flash Sale🔥"
// ]

// return(

// <div className="wrapper" id="homeSectionsNav">

// <div className="tabs">

// {/* SLIDER BACKGROUND */}

// <div
// className="indicator"
// style={{
// transform:`translateX(${index * 100}%)`
// }}
// />

// {tabs.map((label,i)=>{

// const active = index===i

// return(

// <button
// key={i}
// disabled={active}
// onClick={()=>setIndex(i)}
// className={active ? "active" : ""}
// >

// {label}

// </button>

// )

// })}

// </div>

// <style jsx>{`
// /* WRAPPER (glass + depth) */

// .wrapper{
// position:sticky;
// top:60px;
// z-index:1000;

// background:rgba(255, 255, 255, 0.75);
// backdrop-filter:blur(18px);

// padding:4px 10px;

// /* soft bottom separation */
// border-bottom:1px solid rgba(0,0,0,0.04);

// /* subtle elevation */
// box-shadow:
// 0 4px 20px rgba(0,0,0,0.04);
// }

// /* TELEGRAM PILL */

// .tabs{
// position:relative;
// display:flex;

// background:#dbdbdb;
// border-radius:999px;
// padding:4px;
// height:40px;

// /* inner softness */
// box-shadow:
// inset 0 1px 2px rgba(0,0,0,0.05),
// 0 1px 2px rgba(0,0,0,0.03);
// }

// /* BUTTON */

// button{
// flex:1;
// border:none;
// background:transparent;

// display:flex;
// align-items:center;
// justify-content:center;

// font-size:14px;
// font-weight:500;

// color:#666;

// border-radius:999px;
// cursor:pointer;

// z-index:2;

// transition:
// color .2s ease,
// transform .15s ease;
// }

// /* ACTIVE TEXT */

// button.active{
// color:white;
// }

// /* INDICATOR (main highlight) */

// .indicator{
// position:absolute;
// top:4px;
// bottom:4px;
// left:4px;

// width:33.33%;

// background:black;
// border-radius:999px;

// /* Telegram-like soft glow */
// box-shadow:
// 0 2px 6px rgba(0,0,0,0.15),
// 0 1px 2px rgba(0,0,0,0.1);

// transition:
// transform .35s cubic-bezier(.4,.8,.2,1);

// z-index:1;
// }

// /* TAP FEEDBACK */

// button:active{
// transform:scale(.96);
// }
// `}</style>

// </div>

// )

// }



"use client"

export default function HomeSectionsNav({
index,
setIndex
}:{
index:number
setIndex:(i:number)=>void
}){

const tabs = [
"Products",
"Combo Deals💥",
"Flash Sale🔥"
]

return(

<div className="wrapper">

<div className="nav">

{/* INDICATOR */}
<div
className="indicator"
style={{
transform:`translateX(${index * 100}%)`
}}
/>

{tabs.map((label,i)=>{

const active = index===i

return(

<button
key={i}
onClick={()=>setIndex(i)}
className={active ? "active" : ""}
>

<span>{label}</span>

</button>

)

})}

</div>

<style jsx>{`

/* WRAPPER */

.wrapper{
position:fixed;
top:60px; /* match your navbar height */
left:0;
right:0;
z-index:1000;

background:rgba(255,255,255,0.9);
backdrop-filter:blur(18px);

padding:8px 14px;

border-bottom:1px solid rgba(0,0,0,0.04);
}

/* NAV CONTAINER */

.nav{
position:relative;

display:flex;
align-items:center;

width:100%;

background:#f3f4f6;

border-radius:999px;

padding:4px;
}

/* BUTTON */

button{
flex:1;

border:none;
background:transparent;

display:flex;
align-items:center;
justify-content:center;

padding:6px 4px;

font-size:13px;
font-weight:500;

color:#666;

cursor:pointer;

z-index:2;

transition:.2s;
}

/* TEXT */

button span{
white-space:nowrap;
line-height:1;
}

/* ACTIVE */

button.active{
color:white;
font-weight:600;
}

/* INDICATOR */

.indicator{
position:absolute;

top:4px;
bottom:4px;
left:4px;

width:calc((100% - 8px)/3); /* 🔥 exact match like bottom nav */

background:linear-gradient(135deg,#ff7a00,#ffb300,#ff7a00);


border-radius:999px;

box-shadow:
0 2px 6px rgba(0,0,0,0.08);

transition:
transform .35s cubic-bezier(.4,.8,.2,1);

z-index:1;
}

/* TAP */

button:active{
transform:scale(.96);
}

`}</style>

</div>

)

}