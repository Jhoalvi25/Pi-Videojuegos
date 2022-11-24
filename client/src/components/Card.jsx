import React from "react";
import style from "../style/Card.module.css";


export default function Card({ image, name, genres }) {
  return (
    <div className={style.card}>
      <div className={style.container}>
        <img src={image} alt="Img not found" width="180px" height="200px" />
        <div>
          <label>Nombre:</label>
          <h3>{name}</h3>
        </div>

        <div>
          <label>Generos:</label>
          {genres &&
            genres.map((genre, index) => {
              return <h5 key={index}>{genre}</h5>;
            })}
        </div>
      </div>
    </div>
  );
}
