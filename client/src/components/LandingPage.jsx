import React from "react";
import { Link } from "react-router-dom";
import style from "../style/LandingPage.module.css";
import videoBg from "../img/Backgrounds/intro landing.mp4";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <video src={videoBg} autoPlay loop muted />
      <div className={style.welcome}>
        <h1>Bienvenido a mi Aplicación de Videojuegos</h1>

        <Link to="/home">
          <button>Iniciar</button>
        </Link>
      </div>
    </div>
  );
}
