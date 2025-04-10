// const express = require('express'), old syntax

import express from 'express'
//look for the files and send them as response
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'


const app = express()
const PORT = process.env.PORT || 5000

//getting the file path from the url of the current module
  //url doesnt always mean for browser stuff, the paths of files are in url format
  // so converting it to path 
  // the import statement gives current module url
  const __filename = fileURLToPath(import.meta.url)
  //getting dir name
  const __dirname = dirname(__filename)

    //for when client sends info, is the part of middle ware
    app.use(express.json())

  //serves the html file from the /public dir, tells express to serve all files from the public
  // folder  static assete/ file. Any requests for the css files wil lbe resolved to the public dir

   app.use(express.static(path.join(__dirname,"../public")))

//Serving html file from the public dir
app.get('/',(req,res) => {
    //i am sending file already made so for that using path
    //path has to be imported
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Routes
app.use('/auth', authRoutes)
app.use('/todos',authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
