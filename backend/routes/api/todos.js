const express = require('express')
const router = express.Router()
const todoController = require('../../controllers/api/todos')

// Index - not complete /api/todo
router.get('/', todoController.indexNotComplete)
// Index - complete /api/todos/completed
router.get('/completed', todoController.indexComplete)

// Delete/api/todos/:id
router.delete('/:id', todoController.destroy)

// Update /api/todos/id
router.put('/:id', todoController.update)

// create /api/todos
router.post('/', todoController.create)

// Show /api/todos/:id
router.get('/:id', todoController.show)

module.exports = router
