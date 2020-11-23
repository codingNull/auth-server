const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./router.js");

const app = express();

//DB connect
const uri =
  "mongodb+srv://yunlongau:Lyl127503@cluster0.1xddm.mongodb.net/auth?retryWrites=true&w=majority";
mongoose.connect(uri);

//app setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on:", port);
