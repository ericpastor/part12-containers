const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis");
const configs = require("../util/config");

const redis = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const todoCount = await getAsync("added_todos");
  res.send({
    added_todos: Number(todoCount),
  });
});

module.exports = router;
