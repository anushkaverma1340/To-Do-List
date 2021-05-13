//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

let items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true, useUnifiedTopology: true });

const demo = require("./routes/demo.js");
app.use(demo);

const root = require("./routes/root.js");
app.use(root);

const del = require("./routes/delete.js");
app.use(del);

const listname = require("./routes/listname.js");
app.use(listname);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
