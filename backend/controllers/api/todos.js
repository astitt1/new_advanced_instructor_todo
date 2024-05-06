// /api/todo

const Todo = require('../../models/todo')



// jsonTodos
// jsonTodo

//ommitting the functionality for the json todo
async function indexComplete(req, res, next) {
    try {
        const todos = await Todo.find({completed: true})
        res.json(todos)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

async function indexNotComplete(req, res, next) {
    try {
        const todos = await Todo.find({completed: false})
        res.json(todos)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

//CREATE
async function create(req, res, next){
    try {
        
        const todo = await Todo.create(req.body)
        console.log(req.body)
        res.json(todo)
        //omitting res.locals
    } catch (error) {
        //changed the error message to server error
        res.status(500).json({msg: error.message})
    }
}
//READ

async function show(req, res, next) {
    try {
        const todo = await Todo.findById(req.params.id)
        res.json(todo)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
//UPDATE
async function update(req, res, next) {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}) //last param give back the updated to-do
        res.json(todo)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
//DELETE

async function destroy(req, res, next) {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id) 
        res.json({deletedTodo: todo})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show, 
    update, 
    destroy,
    // jsonTodos, 
    // jsonTodo
}
