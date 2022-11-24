import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail } from "../redux/actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import style from "../style/Detail.module.css";
import Footer from "./Footer";
import videoBg from "../img/Backgrounds/Underwater Background  (Super Mario 3D World) Super Mario Maker 2 @Rafa Nintendo.mp4";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, props.match.params.id]);

  const detail = useSelector((state) => state.detail);
  let myVideogame = [];
  myVideogame.push(detail);
  console.log(myVideogame);

  return (
    <div className={style.container}>
      <video src={videoBg} autoplay="true" muted="true" loop="true"></video>
      {myVideogame.length > 0 ? (
        <div className={style.detail}>
          <div className={style.title}>
            {" "}
            <h1>{myVideogame[0].name}</h1>
            <img
              src={myVideogame[0].image}
              alt="img"
              width="200px"
              height="250px"
            />
          </div>
          <div className={style.atributes}>
            <h4 className="title">
              <span>Generos: </span>
              {myVideogame[0].genres?.map((e, i) => {
                return <p key={i}>{e.name}</p>;
              })}
            </h4>
            <h4 className="title">
              <span>Descripción:</span>
              <p> {myVideogame[0].description}</p>
            </h4>
            <h4 className="title">
              <span>Fecha de lanzamiento:</span>
              {myVideogame[0].released}
            </h4>
            <h4 className="title">
              <span>Raiting:</span>
              {myVideogame[0].rating}
            </h4>
            <h2 className="title">
              <span>Plataformas: </span>
              {Array.isArray(myVideogame[0].platforms) ? (
                myVideogame[0].platforms.map((platform, index) => {
                  return <p key={index}>{platform}</p>;
                })
              ) : (
                <p>{myVideogame.platform}</p>
              )}
            </h2>
          </div>
          <div className={style.link}>
            <Link to="/home">
              <button>Back to home</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}
