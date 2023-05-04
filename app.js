const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookies_parser = require('cookie-parser');
const bodyParser = require('body-parser');
const gitrouter = require('./routes/GitUserRoutes');
const User = require('./models/User');
env.config({ path: "config.env" });
require("./db/Connection");
app.use(cookies_parser())
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', gitrouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
