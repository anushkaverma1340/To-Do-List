const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemsSchema);

module.exports = Item;
