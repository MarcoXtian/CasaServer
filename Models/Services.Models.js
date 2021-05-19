const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  Servicename: {
    type: String,
    required: true,
    min: 5,
  },
  Image: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
