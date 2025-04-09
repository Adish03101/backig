// express is a web framework
// staring a server

const express = require('express');// 'requires' a package for te server
const app = express();// defining our backedn application
const PORT = 8008;//subderectory of the device which is accessing(ip add of the device)

console.log(`extra line`);
app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));// backend is an hardware which runs a software which connects to internet which listens to the incomming queryS