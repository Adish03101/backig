// express is a web framework
// staring a server

const express = require('express');// 'requires' a package for te server
const app = express();// defining our backedn application
const PORT = 8008;//subderectory of the device which is accessing(ip add of the device)

//when we got the the url, it sends a request for stuff
//now, we need stuff to interpret the request
//HTTP VERBS AND Routes(Paths)
// Routes: url/...; ...->Routes known as endpoints
app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));// backend is an hardware which runs a software which connects to internet which listens to the incomming queryS
// the adress of this server connect to the network is https://localhost:8008
//every url is mapped to an IP equivalent
