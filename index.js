// Todo App - Frontend
// TODO App Api - Backend
/**
 * /todos - GET
 * /todo - POST
 * /todo/id - DELETE
 */

const express = require("express");
const app = express();

// middleware
app.use(express.json());


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,DELETE");
    res.header("Access-Control-Allow-Headers","Origin, Content-Type, Accept");
    next();
});

let todos = [];

app.get("/",function(req,res){
    res.send("Server is OK");
})

app.get("/api/todos",function(req,res){
    res.json(todos);
});

// Post - id,title,status -> todos.push
// 1.asama -> request icerisinde body gelmesi

app.post("/api/todo",function(req,res){
    const todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    res.json({todoId: todo.id});
    //res.send("Todo eklendi.");
});


app.delete("/api/todo/:id",function(req,res){
    const todoId = req.params;
    const todoIndex = todos.findIndex(
        (todo) => todo.id === parseInt(todoId.id));
    if(todoIndex === -1){
        res.status(404).json({ error: "Todo not found."});
        return;
    }
    todos.splice(todoIndex,1);
    res.json({message: "Todo deleted"});
});


const port = 8080;

app.listen(port,function(){
    console.log(`API listening on http://localhost:${port}`);
});

