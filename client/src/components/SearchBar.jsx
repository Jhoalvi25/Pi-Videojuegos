import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions/index";
import { Link } from "react-router-dom";
import style from "../style/SearchBar.module.css";

export default function SearchBar({ paginated }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  /*Input de busqueda*/

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  /*Boton*/

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name)) && paginated(1);
    setName("");
  }

  return (
    <div className={style.container}>
      <h1>Videojuegos</h1>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Buscar
        </button>
      </div>
      <div className={style.link}>
        <Link to="/videogame">
          <button>Crear Videojuego</button>
        </Link>
      </div>
    </div>
  );
}
