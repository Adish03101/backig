// for database 
//{} for destructuring the data
import { DatabaseSync } from 'node:sqlite'
// for memory inside
const db = new DatabaseSync(':memory:')

//for seting up, we need excecute sql statement from string

db.exec(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

db.exec(`
    CREATE TABLE todos(
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)

export default db