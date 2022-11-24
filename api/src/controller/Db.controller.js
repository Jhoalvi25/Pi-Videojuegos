const { Videogame, Genre } = require("../db");

/**************Obtener información de la base de datos*************/

const getDbInfo = async () => {
  try {
    return (
      await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      })
    ).map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        image: elem.image,
        description: elem.description,
        released: elem.released,
        rating: elem.rating,
        platforms: elem.platforms,
        createdInDb: elem.createdInDb,
        genres: elem.genres?.map((elem) => elem.name),
      };
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getDbInfo };
