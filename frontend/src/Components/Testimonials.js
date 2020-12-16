import React from "react";
import img1 from "../pics/testimonials/Textbox.png";
import img2 from "../pics/home/Logo.png";

export default function Testimonials() {
  return (
    <div>
      <div>
        <h1>Testimonials</h1>
        <div>
          <img src={img1} />
          <img src={img2} />
          <p></p>
          <span></span>
        </div>
        <div>
          <img src={img1} />
          <img src={img2} />
          <p></p>
          <span></span>
        </div>
        <div>
          <img src={img1} />
          <img src={img2} />
          <p></p>
          <span></span>
        </div>
      </div>
    </div>
  );
}
