const express = require("express");
const router = express.Router();

router.get("/demo/demo", (req,res) => {
  console.log("Yeah! Demo Successful!");
  res.end();
});

module.exports = router;
