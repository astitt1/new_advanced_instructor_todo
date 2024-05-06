const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        // required: true,
        type: String
    },
    completed: {
        // required: true,
        type: String
    },
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo