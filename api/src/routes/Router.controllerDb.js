const axios = require("axios");
const { Videogame, Genre } = require("../db.js");

const createGenresDB = async (arrGenres) => {
  arrGenres.forEach((genre) => {
    Genre.findOrCreate({
      where: { name: genre },
    });
  });
};

const getGenresDB = async () => {
  let allGenres = await Genre.findAll();
  return allGenres
    .map((e) => e.name)
    .toString()
    .trim()
    .split(",");
};

const searchGameDB = async (id, name) => {
  if (id) {
    let game = await Videogame.findAll({
      where: { id: id },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return game[0];
  } else {
    return await Videogame.findAll({
      where: { name: name },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  }
};

module.exports = {
  createGenresDB,
  getGenresDB,
  searchGameDB,
};
