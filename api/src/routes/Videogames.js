const { Router } = require("express");
const { getAllGames } = require("../controller/Concat.controller");
const { Videogame, Genre } = require("../db");
const { getDetaills } = require("./Router.controller");

const router = Router();

/*******************GET /videogames**********************/

router.get("", async (req, res) => {
  const name = req.query.name;

  try {
    let listGames = await getAllGames();

    if (name) {
      let gameName = await listGames.filter((elem) =>
        elem.name.toLowerCase().includes(name.toLowerCase())
      );

      if (gameName.length) {
        res.status(200).send(gameName);
      } else {
        res.status(404).send("Game not found");
      }
    } else {
      res.status(200).send(listGames);
    }
  } catch (error) {
    console.log(error);
  }
});

/******************GET /videogames/{id}*******************/

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  if (id) {
    try {
      res.status(200).send(await getDetaills(id));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
});

/********************POST /videogames***********************/

router.post("", async (req, res) => {
  const {
    id,
    image,
    name,
    genres,
    description,
    released,
    rating,
    platforms,
    createdInDb,
  } = req.body;

  try {
    const gameCreated = await Videogame.create({
      id,
      name,
      image,
      description,
      released,
      rating,
      platforms,
      createdInDb,
    });

    const genreDb = await Genre.findAll({
      where: { name: genres },
    });

    gameCreated.addGenre(genreDb);
    res.send("Game created successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
