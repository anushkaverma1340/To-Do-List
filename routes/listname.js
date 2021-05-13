const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/:listName", function(req, res) {
  let listName = _.capitalize(req.params.listName);
  res.render("list", {
    listName: listName,
    toDoItems: items
  })
});

module.exports = router;
