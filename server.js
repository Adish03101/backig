// express is a web framework
// staring a server

const express = require('express')// 'requires' a package for te server
const app = express()// defining our backedn application
const PORT = 8008//subderectory of the device which is accessing(ip add of the device)

let data = ["Black"]

//Middleware: configuration between incomming req and interpretting it
app.use(express.json())//telling server to expect a json data


//when we got the the url, it sends a request for stuff
//now, we need stuff to interpret the request
//ENDPTS: HTTP VERBS(method) AND Routes(Paths)
// Routes: url/...; ...->Routes known as endpoints

//adding routes
    //getting info
    // '/' is the route
    //the method infroma the nature of request and the route
    //is a further subdirectory(basically we direct the requrest to the body of code ot respond 
    // appropriately , and these location or routes are called endpts)
app.get('/', (req,res) => {
    //endpt 1 -/
    //the above req is the req from site and 
    // res is the response given
    console.log("first endpt",req.method)

    //NOW, writing an html to display
    res.send(`
        <body
        style = "background:blue;
        color: red;">
        <a href="/dashboard">Dashboard</a>
        <p>${JSON.stringify(data)}</p>
        </body>
    `)
    //res can only work once per call


    //response code, determination of request
    //this means any reponse between 2-300 is good
    
    // this shows error after the above code
    // res.sendStatus(200)
    // like error 404
    //201 creates something
})

app.get('/dashboard',(req,res) => {
    console.log("dashboard get")
    res.send(`
        <body
        style = "background:blue;
        color: red;">
        <a href="/">home</a>
        </body>
    `)
})

//for better structuring

//WEBSITE ENDPT
    //for sending back html


//API ENDPT

app.get('/api/data',(req,res) => {
    console.log("For data")
    res.send(data)//got to define data as well
})


//ADDING DATA BY USER

app.post('/api/data',(req,res) => {
    //req.body is the data associated to the request
    //creating a user
    //the user clicks the sign up button after entereing their stuff
    //and the browser is wired up to send out a netwrok rq to the server to 
    //handle the action
    const newEntry = req.body
    console.log(newEntry)
    //just doing this, gives use undefined in the log
    data.push(newEntry.name)//pushing the new user to the data initially defined
    res.sendStatus(201)//if we dont do this, then server will not know we have added something
})

app.delete('/api/data',(req,res) => {
    data.pop()
    console.log("deleted stuff")
    res.sendStatus(203)//aise hi
})

// the line below is imp as we have to initialize app first, so always do this first
app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))// backend is an hardware which runs a software which connects to internet which listens to the incomming queryS
// the adress of this server connect to the network is https://localhost:8008
//every url is mapped to an IP equivalent


//all the above stuff comes under CRUD applicatoin
    //CRUD - create, read, update, delete
        //create-post, read-put, delete-delete