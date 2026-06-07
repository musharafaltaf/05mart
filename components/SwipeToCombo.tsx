"use client"

export default function SwipeToCombo({onClick}:any){

return(

<div className="swipeCard" onClick={onClick}>

<div className="text">
<h3>Explore Combo Deals</h3>
<p>Save more with bundled products</p>
</div>

<div className="arrow">
→
</div>

<style jsx>{`

.swipeCard{
display:flex;
justify-content:space-between;
align-items:center;
background:#f3f3f3;
border-radius:18px;
padding:18px;
margin:20px;
cursor:pointer;
transition:.3s;
}

.swipeCard:hover{
transform:translateX(5px);
}

.text h3{
font-size:16px;
font-weight:700;
}

.text p{
font-size:13px;
color:#666;
}

.arrow{
font-size:22px;
font-weight:bold;
}

`}</style>

</div>

)

}