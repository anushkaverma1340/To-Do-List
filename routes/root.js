const express = require("express");
const router = express.Router();

const Item = require("../models/item.model");

const item1 = new Item({ name: "Welcome to To Do List app" });
const item2 = new Item({ name: "Click '+' to add items" });
const item3 = new Item({ name: "<-Click to remove items" });
const defaultItems = [item1, item2, item3];


router.get("/", function(req, res) {
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
})

router.post("/", function(req, res) {
  const newItem = new Item({name:req.body.newItem});
  newItem.save();
  res.redirect("/");
});

module.exports = router;
