// const { FlyCar } = require("./task1/flyCar");

// // Task 1
// const flyingCar = new FlyCar("BMW", 2022);
// flyingCar.carData();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const teacherRoute = require("./task2/Routes/teacherRoute");
const childRoute = require("./task2/Routes/childRoute");
const classRoute = require("./task2/Routes/classRoute");
const loginRoute = require("./task2/Routes/loginRoute");

const port = 8080 || process.env.PORT;

// database connection and server listening
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Database contected");
    app.listen(port, () => {
      console.log("Server is listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// routes
app.use(loginRoute);
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

// not found mw
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// error mw
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.toString() });
});
