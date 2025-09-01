const express = require("express");
const app = express();

app.use(express.json());

const todos = [];
let idCounter = 0;

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  const todo = { id: idCounter++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: "To-Do task is not found" });

  todo.title = title !== undefined ? title : todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ error: "To-Do task is not found" });
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.json(todo);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
