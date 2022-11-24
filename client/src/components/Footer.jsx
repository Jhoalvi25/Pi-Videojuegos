import React from "react";
import linkedin from "../img/contact/linkendin.png";
import github from "../img/contact/github.png";
import gmail from "../img/contact/gmail v2.png";
import style from "../style/Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={style.section} id={style.contacts}>
        <h3>
          <span>Contacto</span>
        </h3>
        <div>
          <a
            href="https://www.linkedin.com/in/jhoalvi-pereira-477468242/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img alt="linkedin" src={linkedin} />
          </a>
          <a
            href="https://github.com/Jhoalvi25"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img alt="github" src={github} />
          </a>
          <a
            href="mailto:jhoalvipereira@gmail.com?Subject=Buenas,%20te%20contacto%20por%20el%20proyecto%20de%20videojuegos"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img alt="gmail" src={gmail} />
          </a>
        </div>
        <div className={style.copyright}>
          Copyright &copy; 2022; Individual Project - Jhoalvi Pereira.
        </div>
      </div>
    </footer>
  );
}
