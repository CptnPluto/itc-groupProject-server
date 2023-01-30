const express = require("express");
const {
  addScoreToDBModel,
  getAllScoresModel,
  getScoresById,
} = require("../db_models");
const { verifyToken } = require("../middlewares/users_middleware");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const response = await addScoreToDBModel(req.body);
    console.log(response);
    if (response?.error) throw response.error;
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const response = await getAllScoresModel();
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const response = await getScoresById(req.params.id);
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
