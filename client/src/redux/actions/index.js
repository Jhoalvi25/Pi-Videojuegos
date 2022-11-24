import axios from "axios";

/************ Obtener todos los videojuegos ***************/

export function getVideogames() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogames", {});
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/************ Buscar videojuego por nombre ***************/

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_VIDEOGAMES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/************ Obtener todos los generos ***************/

export function getGenres() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/genres");

      return dispatch({
        type: "GET_GENRES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/************ Obtener detalle ***************/

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames/" + id);

    try {
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/************ Postear videojuego ***************/

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const recipe = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );

      return dispatch({
        type: "POST_VIDEOGAME",
        payload: recipe,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/************ Ordenar Alfabeticamente ***************/

export function orderAlphabetically(payload) {
  return {
    type: "ORDER_ALPHABETICALLY",
    payload,
  };
}

/************ Filtrar por genero ***************/

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

/************ Ordenar por rating ***************/

export function FilterByRating(payload) {
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
}

/************ Filtrar por videojuego existente o creado en la base de datos ***************/

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

/************ Limpiar estado de detalles ***************/

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  };
}

/************ Limpiar videojuegos ***************/

export function cleanVideogames() {
  return {
    type: "CLEAN_VIDEOGAMES",
  };
}
