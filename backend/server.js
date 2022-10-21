const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./routes/user.route");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Connect with DB
var mongoDB = "mongodb://127.0.0.1/GoMobitUser";
mongoose.connect(mongoDB, (err) => {
  if (err) throw err;
  console.log("Database Connected");
});

//Routes

app.use("/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("running"));
