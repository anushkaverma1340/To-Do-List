//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

let items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "Welcome to To Do List app" });
const item2 = new Item({ name: "Click '+' to add items" });
const item3 = new Item({ name: "<-Click to remove items" });

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  Item.find({},function(err,foundItems){
    if(foundItems.length===0){
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listName: "Today",
        toDoItems: foundItems
      });
    }
  });
});

app.get("/:listName", function(req, res) {
  let listName = _.capitalize(req.params.listName);
  res.render("list", {
    listName: listName,
    toDoItems: items
  })
});

app.post("/", function(req, res) {
  const newItem = new Item({name:req.body.newItem});
  newItem.save();
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  Item.findByIdAndRemove(req.body.checkbox, function(err,foundItem){
    if(err){console.log(err);}
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
