const express = require("express");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});

  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const value = await getAsync("added_todos");
  const nextValue = value ? Number(value) + 1 : 1;
  const todoCount = await setAsync("added_todos", nextValue);

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = req.todo.id;
  const updateText = req.body.text;
  const updateDone = req.body.done;

  const updateTodo = await Todo.findByIdAndUpdate(
    todo,
    { text: updateText, done: updateDone },
    {
      new: true,
    }
  );
  res.send(updateTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
