const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  FullName: {
    type: String,
    required: true,
    min: 5,
  },
  Gender: {
    type: String,
    required: true,
    min: 4,
  },
  Address: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  ContactNumber: {
    type: String,
    required: true,
    max: 10,
  },
  Email: {
    type: String,
    required: true,
    max: 8,
  },
  Password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
