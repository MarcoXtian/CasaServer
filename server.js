const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const UserRoute = require("./Routes/User.Routes");
const ServiceRoute = require("./Routes/Services.Routes");

const app = express();
const dbURI = process.env.dbURI;
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Middlewares
app.use("/api", UserRoute);
app.use("/api", ServiceRoute);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(dbURI, options).then((res) => {
  console.log("Connected to", res.connections[0].name);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
