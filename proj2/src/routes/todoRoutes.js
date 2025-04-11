import express from 'express'
import db from '../db.js'

const router = express.Router()

// get todos for authenticated user
router.get('/', (req, res) => {
    const gettodo = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = gettodo.all(req.userId)
    res.json(todos)
})

// create new todo
router.post('/', (req, res) => {
    const { task } = req.body
    const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
    const result = insertTodo.run(req.userId, task)
    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

// update todo (to be implemented)
router.put('/:id', (req, res) => {
    const {completed} = req.body
    const { id} = req.params
    const {page} = req.query
    
    const updattodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`)

    updattodo.run(completed,id)

    res.json({message: "completed"})
})

// delete todo (to be implemented)
router.delete('/:id', (req, res) => {
    const {id} = req.params//params as it is dynamic
    const userId = req.userId
    const deletetodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)

    deletetodo.run(id,userId)
    res.send({message:"todo deleted"})

})

export default router
