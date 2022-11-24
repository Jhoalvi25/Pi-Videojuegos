const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiGames = async () => {
  //obtiene los primeros 100 juegos
  try {
    const firstApiPage = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    const secondApiPage = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
    );

    const thirdApiPage = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    );

    const fourthApiPage = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
    );

    const fifthApiPage = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    );

    await Promise.all([
      firstApiPage,
      secondApiPage,
      thirdApiPage,
      fourthApiPage,
      fifthApiPage,
    ]).then((values) => {
      apiInfo = values[0].data.results
        .concat(values[1].data.results)
        .concat(values[2].data.results)
        .concat(values[3].data.results)
        .concat(values[4].data.results);
    });

    const apiGames = await apiInfo.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        description: elem.description_raw,
        released: elem.released,
        image: elem.background_image,
        rating: elem.rating,
        platforms: elem.platforms.map((p) => p.platform.name),
        genres: elem.genres.map((g) => g.name),
      };
    });
    return apiGames;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getApiGames };
