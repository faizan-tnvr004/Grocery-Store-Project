import React from "react";
import "./first_row.css"; // Import the CSS file

function FirstProd() {
  return <div className="first_product">
<img src = "kela.png"
alt = "kela"
className = "product-image"
/>
<p className="product-name"> Banana</p>

<p className="product-price"> $0.50</p>
  </div>;
}

export default FirstProd;
