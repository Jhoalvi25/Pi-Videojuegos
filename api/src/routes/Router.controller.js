const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const {
  createGenresDB,
  getGenresDB,
  searchGameDB,
} = require("./Router.controllerDb");

/*******************Obtener Generos**********************/

const getGenres = async () => {
  // carga los generos en la DB
  let response = await axios.get(
    `https://api.rawg.io/api/genres?&key=${API_KEY}`
  );
  let generos = response.data.results.map((genre) => {
    return genre.name;
  });
  await createGenresDB(generos);
  const allGenres = await getGenresDB();
  return allGenres;
};

/*******************Obtener Detalles**********************/

const getDetaills = async (id) => {
  //busca detalle por id
  if (Number(id)) {
    let response = await axios.get(
      `https://api.rawg.io/api/games/${id}?&key=${API_KEY}`
    );
    let gamefilter = {
      name: response.data.name,
      image: response.data.background_image,
      description: response.data.description.replace(/(<([^>]+)>)/gi, ""),
      released: response.data.released,
      rating: response.data.rating,
      platforms: response.data.platforms.map((p) => p.platform.name),
      genres: response.data.genres.map((g) => {
        return {
          name: g.name,
        };
      }),
    };
    return gamefilter;
  } else {
    return await searchGameDB(id, null);
  }
};

module.exports = {
  getGenres,
  getDetaills,
};
