// const { FlyCar } = require("./task1/flyCar");

// // Task 1
// const flyingCar = new FlyCar("BMW", 2022);
// flyingCar.carData();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors"); 
const bodyParser = require("body-parser")
const teacherRoute = require("./task2/Routes/teacherRoute");
const childRoute = require("./task2/Routes/childRoute");
const classRoute = require("./task2/Routes/classRoute");
const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((error, req, res) => {
  res.status(500).json({ message: "Error" }, error);
});
