import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame } from "../redux/actions/index";
import style from "../style/CreateVideogame.module.css";
import videoBg from "../img/Backgrounds/3D World Desert Background @Rafa Nintendo.mp4";

export default function CreateVideogame() {
  const dispatch = useDispatch();

  const allVideomages = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
  ];

  let date = new Date();
  let currentDate = date.toISOString().split("T")[0];

  const history = useHistory();
  const [errors, setErrors] = useState({ required: true });

  function Validations(input) {
    let errors = { required: false };
    let validateName = /^[a-zA-Z\s]+$/;
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

    if (!input.name.length) {
      errors.name = "El campo 'nombre' no puede estar vacio";
      errors.required = true;
    } else if (!validateName.test(input.name)) {
      errors.name =
        "Caracteres especiales y numeros, no pueden ser introducidos";
      errors.required = true;
    } else if (input.name.length >= 15) {
      errors.name = "El nombre introducido no puede exceder los 15 caracterees";
      errors.required = true;
    } else if (
      allVideomages.find(
        (e) => e.name.toLowerCase() === input.name.toLowerCase()
      )
    ) {
      alert(`El nombre ${input.name} ya existe, por favor coloca otro`);
      errors.required = true;
    } else if (input.image && !validateUrl.test(input.image)) {
      errors.image = "Este no es un URL valido";
      errors.required = true;
    } else if (!input.description.length) {
      errors.description = "La descripción no puede estar vacia";
      errors.required = true;
    } else if (input.description.length < 40) {
      errors.description = "La descipción debe tener almenos 40 caracteres";
      errors.required = true;
    } else if (input.rating < 1 || input.rating > 5) {
      errors.healthScore = "El raiting, debe ser un numero entre 1 y 5";
      errors.required = true;
    }

    return errors;
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: currentDate,
    rating: 0.0,
    image: "",
    genres: [],
    platforms: [],
  });

  /*Colocar Nombre, Descripcion, Fecha de lanzamiento, Imagen, Generos y Plataformas por input*/

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });

    setErrors(
      Validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  /*Seleccionar generos y plataformas*/

  function handleSelectGenre(e) {
    e.preventDefault();

    input.genres.includes(e.target.value)
      ? alert("El mismo genero no puede ser repetido")
      : setInput({
          ...input,
          genres: [...input.genres, e.target.value],
        });
    console.log(input);
  }

  function handleSelectPlatform(e) {
    e.preventDefault();

    input.platforms.includes(e.target.value)
      ? alert("La misma plataforma no puede ser repetida")
      : setInput({
          ...input,
          platforms: [...input.platforms, e.target.value],
        });
    console.log(input);
  }

  /*Eliminar generos y plataformas*/

  function handleDeleteGenre(options) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== options),
    });
  }

  function handleDeletePlatform(options) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== options),
    });
  }

  /*Submit*/

  function handleSubmit(e) {
    if (errors.required) {
      e.preventDefault();
      alert("Debe completar todos los campos requeridos");
    } else {
      e.preventDefault();
      console.log(input);
      dispatch(
        postVideogame({ ...input, name: input.name.toLocaleLowerCase() })
      );
      alert("Videojuego Creado!!!");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        image: "",
        genres: [],
        platforms: [],
      });

      history.push("/home");
    }
  }

  return (
    <div className={style.container}>
      <video src={videoBg} autoplay="true" muted="true" loop="true"></video>
      <h1>Creación de Videojuego</h1>

      <div className={style.link}>
        <Link to="/home">
          <button>Volver al home</button>
        </Link>
      </div>

      <div className={style.form}>
        <form className={style.items} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Escribe el nombre de tu videojuego."
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              type="text"
              value={input.description}
              placeholder="Escribe una descripción"
              name="description"
              maxLength="1000"
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.description && <p>{errors.description}</p>}
          </div>

          <div>
            <label>Fecha de lanzamiento:</label>
            <input
              type="date"
              id="start"
              name="released"
              value={input.released}
              min="1980-01-01"
              max="2030-12-31"
              onChange={(e) => handleChange(e)}
            />
            {<p>{input.healthScore}</p>}
          </div>

          <div>
            <label>Raiting:</label>
            <input
              type="range"
              min="0"
              max="5"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
            {<p>{input.rating}</p>}
          </div>

          <div>
            <label>Cargar imagen URL:</label>
            <input
              type="url"
              value={input.image}
              placeholder="introduce una URL"
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>

          <div className={style.type}>
            <label>Seleccionar generos:</label>
            <select onChange={(e) => handleSelectGenre(e)}>
              {allGenres &&
                allGenres.map((elem, index) => (
                  <option value={elem} key={index}>
                    {elem}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.delete}>
            {input.genres.map((options) => (
              <div>
                <p>{options}</p>

                <div className={style.equis}>
                  <button
                    className="buttonX"
                    onClick={() => handleDeleteGenre(options)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />

          <div className={style.type}>
            <label>Seleccionar plataformas:</label>
            <select onChange={(e) => handleSelectPlatform(e)}>
              {platforms &&
                platforms.map((elem, index) => (
                  <option value={elem} key={index}>
                    {elem}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.delete}>
            {input.platforms.map((options) => (
              <div>
                <p>{options}</p>

                <div className={style.equis}>
                  <button
                    className="buttonX"
                    onClick={() => handleDeletePlatform(options)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className={style.btn}>
            Crear videojuego
          </button>
        </form>
      </div>
    </div>
  );
}
