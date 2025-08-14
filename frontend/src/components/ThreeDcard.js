import React from "react"
import "./Footer.css"
import Toottip from "./Toottip";

function ThreeD() {
  let now = new Date();
  let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let monthText = monthNames[now.getMonth()];
  let date = now.getDate();
  
  console.log(`Month: ${monthText}, Date: ${date}`);
 return(
    <div>
<div class="parent">
  <div class="carD">
    <div class="content-box">
      <span class="card-title">NOSTALGIA</span>
      <p class="card-content">
      Scheduling emails and writing diaries—quiet echoes of yesterday, gently shaping tomorrow.      </p>
      <span class="see-more"> <Toottip></Toottip>  </span>
    </div>
    <div class="date-box">
      <span class="month">{monthText}</span>
      <span class="date">{date}</span>
    </div>
  </div>
</div>

    </div>
 )
};

export default ThreeD;