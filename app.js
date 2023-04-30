const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conn=require('./db/Connection')
const git = require('./controllers/Git.js');
const User = require('./models/User');
const gitrouter=require('./routes/GitUserRoutes')
console.log(User);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user',gitrouter)
console.log("server listening")
app.listen(3000);
