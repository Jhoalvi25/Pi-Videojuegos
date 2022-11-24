import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  orderAlphabetically,
  FilterByRating,
  filterByGenre,
  getGenres,
  filterCreated,
} from "../redux/actions/index";
import { Link } from "react-router-dom";
import gameOver from "../img/game over.png";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import Footer from "./Footer";
import videoBg from "../img/Backgrounds/Airship.mp4";
import style from "../style/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const videogames = useSelector((state) => state.allVideogames);
  const allGenres = useSelector((state) => state.genres);
  console.log(allGenres);
  console.log(allVideogames);
  console.log(videogames);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  /*Volver a cargar los juegos*/

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  /* Evento para Ordenar alfabeticamente*/

  function handleOrderAlphabetically(e) {
    e.preventDefault();
    dispatch(orderAlphabetically(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  /* Evento para Ordenar por rating*/

  function handleFilterByRating(e) {
    e.preventDefault();
    dispatch(FilterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  /*Evento para filtrar por genero*/

  function handleFilterByGenres(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    console.log(e.target.value);
    setCurrentPage(1);
    setOrder("");
  }

  /*Evento para filtrar por creado o existente*/

  function handleFilterCreatedOrExisting(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  /*Local*/

  const [currentPage, setCurrentPage] = useState(1); /*Pagina donde inicia*/
  const [videogamesPerPage] = useState(15); /*Videojuegos por pagina*/

  /*Orden*/

  const [order, setOrder] = useState("");

  // Para que un componente funcional tenga estado propio podemos hacer uso del hook
  // useState.
  // UseState permite trabajar con estados locales

  /*Paginado*/

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.container}>
      <video
        src={videoBg}
        autoplay="true"
        muted="true"
        loop="true"
      ></video>

      <SearchBar paginated={paginated}></SearchBar>
      <div>
        <div className={style.containerFilter}>
          <label>Ordenar alfabeticamente:</label>
          <select onChange={(e) => handleOrderAlphabetically(e)}>
            <option value="asc">Ascendente(Aa-Zz)</option>
            <option value="desc">Descendente(Zz-Aa)</option>
          </select>
          <label>Ordenar por raiting:</label>
          <select onChange={(e) => handleFilterByRating(e)}>
            <option value="high">Menor a mayor</option>
            <option value="low">Mayor a menor</option>
          </select>

          <label>Filtrar por genero:</label>
          <select onChange={(e) => handleFilterByGenres(e)}>
            <option value="all">Todos</option>
            {allGenres &&
              allGenres.map((elem, index) => (
                <option key={index} value={elem}>
                  {elem}
                </option>
              ))}
          </select>

          <label>Filtrar por videojuegos existentes o agregados:</label>
          <select onChange={(e) => handleFilterCreatedOrExisting(e)}>
            <option value="All">Todos</option>
            <option value="created">Agregados</option>
            <option value="api">Existentes</option>
          </select>
        </div>

        <div className={style.landing}>
          <Link to={"/"}>
            <button>
              <span>Volver a la Landing</span>
            </button>
          </Link>
        </div>

        <div className={style.reload}>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Recargar videojuegos
          </button>
        </div>

        <div>
          <Paginated
            className={style.page}
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>

        {videogames.length > 0 ? (
          <div>
            {currentVideogames.length ? (
              currentVideogames?.map((elem) => {
                return (
                  <Fragment>
                    <Link to={"/home/" + elem.id}>
                      <Card
                        image={elem.image}
                        name={elem.name}
                        genres={elem.genres}
                        key={elem.id}
                      ></Card>
                    </Link>
                  </Fragment>
                );
              })
            ) : (
              <div>
                <img src={gameOver} alt="Sin Resultado" width={"450px"}></img>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
