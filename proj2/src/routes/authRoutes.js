import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
  const { username, password } = req.body
  const haspass = bcrypt.hashSync(password, 8)
  console.log(haspass)

  try {
    const insert_user = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
    const result = insert_user.run(username, haspass)

    const def_todo = 'Hello first todo'
    const insert_todo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    insert_todo.run(result.lastInsertRowid, def_todo)

    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

   res.json({ token })
  } catch (err) {
    console.log(err.message)
    return res.sendStatus(503)
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  try {
    const get_user = db.prepare(`SELECT * FROM users WHERE username = ?`)
    const user = get_user.get(username)
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    const password_is_valid = bcrypt.compareSync(password, user.password)
    if (!password_is_valid) {
      return res.status(401).send({ message: 'Invalid Password' })
      
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.send({
      message: 'Login successful',
      user: { id: user.id, username: user.username },
      token
    })
  } catch (err) {
    console.log(err.message)
    return res.sendStatus(503)
  }
})

export default router
