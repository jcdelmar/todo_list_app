import mysql from "mysql";
import cors from "cors";
import express from "express";

//CRUD Queries for todos table
import {
  getTodo,
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  updateIsDone,
  resetList,
} from "./queries.js";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_db",
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is listening...");
});

app.get("/todos/", (req, res) => {
  db.query(getAllTodos, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(getTodo, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.post("/todos/", (req, res) => {
  const values = [req.body.todo_title];
  db.query(addTodo, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

app.put("/todos/update/:id", (req, res) => {
  const values = [
    req.body.title,
    req.body.description,
    req.body.description,
    req.params.id,
  ];
  db.query(updateTodo, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

app.put("/todos/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query(deleteTodo, [id], (err, result) => {
    if (err) throw err;
    return res.status(200).send(result);
  });
});

app.put("/todos/handleDone", (req, res) => {
  const is_done = req.body.type == "done" ? 1 : 0;
  const id = req.body.todo_id;
  const values = [is_done, id];
  db.query(updateIsDone, values, (err, result) => {
    if (err) throw err;
    return res.status(200).send("To-Do updated successfully.");
  });
});

app.put("/todos/resetList", (req, res) => {
  db.query(resetList, [], (err, result) => {
    if (err) throw err;
    return res.status(200).send("List has been reset.");
  });
});