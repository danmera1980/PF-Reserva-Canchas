import React from "react";
import "./Slider.scss";
import leftArrow from "./icons/back-removebg-preview.png";
import rightArrow from "./icons/next-removebg-preview.png";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img
        src={direction === "next" ? rightArrow : leftArrow}
        alt="arrow-images"
        className="bg-transparent"
      />
    </button>
  );
}
