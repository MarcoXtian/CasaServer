const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  Productname: {
    type: String,
    required: true,
    min: 5,
  },
  Image: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
