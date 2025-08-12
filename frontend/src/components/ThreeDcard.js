import React from "react"
import "./Footer.css"
import Toottip from "./Toottip";
function ThreeD() {
 return(
    <div>
<div class="parent">
  <div class="carD">
    <div class="content-box">
      <span class="card-title">Email Scheduler</span>
      <p class="card-content">
        Schedule your Email then Leave it on Us  . 
      </p>
      <span class="see-more"> <Toottip></Toottip>  </span>
    </div>
    <div class="date-box">
      <span class="month">JUNE</span>
      <span class="date">02</span>
    </div>
  </div>
</div>

    </div>
 )
};

export default ThreeD;