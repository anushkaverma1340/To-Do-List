const express = require("express");
const router = express.Router();

const Item = require("../models/item.model");

router.post("/delete", (req, res) => {
  Item.findByIdAndRemove(req.body.checkbox, function(err,foundItem){
    if(err){console.log(err);}
  });
  res.redirect("/");
});

module.exports = router;
