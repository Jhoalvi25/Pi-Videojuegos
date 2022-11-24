const { getApiGames } = require("./Api.controller");
const { getDbInfo } = require("./Db.controller");

/*************Obtener todos los Videojuegos************/

const getAllGames = async () => {
  const apiInfo = await getApiGames();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = { getAllGames };
