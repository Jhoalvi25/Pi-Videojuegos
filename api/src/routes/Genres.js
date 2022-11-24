const { Router } = require("express");
const { getGenres } = require("./Router.controller");

const router = Router();

/*******************GET /genres**********************/

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getGenres());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
