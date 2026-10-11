const express = require("express");
const app = express();
const PORT = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json());

let todos = ["Learn Node.js", "Master Express"];

app.get("/api/todos", function(req, res) {
    res.json(todos);
});

app.post("/api/todos", function(req, res) {
    const newTodo = req.body.task;
    if(newTodo) {
        todos.push(newTodo);
        res.json({success: true, todos: todos});
    } else {
        res.status(400).json({error: "Task cannot be empty"});
    }
});

app.listen(PORT, function() {
    console.log(`Server is running live at http://localhost:${PORT}`);
});