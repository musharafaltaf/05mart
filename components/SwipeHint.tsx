"use client"

export default function SwipeHint(){

return(

<div className="hint">

<span>← Swipe →</span>

<style jsx>{`

.hint{

position:fixed;

bottom:80px;
left:50%;

transform:translateX(-50%);

background:black;
color:white;

font-size:12px;

padding:6px 12px;

border-radius:20px;

opacity:.6;

animation:fade 3s infinite;

}

@keyframes fade{

0%{opacity:.1}
50%{opacity:.6}
100%{opacity:.1}

}

`}</style>

</div>

)

}