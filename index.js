const dotenv = require('dotenv')
dotenv.config()
require('./model/config')
const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routes/commonRoutes')
const port = process.env.PORT
const app = express();
app.use(express.json());
app.use(bodyParser.json());



app.use('/', router)

app.listen(port, function (req, res) {
  console.log(`Server is running on port no : ${port}`);
});
