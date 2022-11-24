import React from "react";
import style from "../style/Loadin.module.css"

export default function Loading() {
  return (
    <div>
      <div className={style.spinner}>
        <span>C</span>
        <span>A</span>
        <span>R</span>
        <span>G</span>
        <span>A</span>
        <span>N</span>
        <span>D</span>
        <span>0</span>
      </div>
      <div className="videojuegos"></div>
    </div>
  );
}
