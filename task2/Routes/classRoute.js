const express = require("express");
const classRoute = express.Router();

let classes = [{ id: 1, name: "1-a" }];

classRoute
  .route("/class")
  .get((req, res) => {
    res.status(200).json({ data: classes });
  })
  .post((req, res) => {
    classes.push(req.body);
    res.status(201).json({ message: "added" });
  })
  .put((req, res) => {
    const { id, name } = req.body;
    const index = classes.findIndex((item) => item.id === +id);
    if (index != -1) {
        classes[index] = { id, name };
    }
    res.status(200).json({ message: "updated" });
  })
  .delete((req, res) => {
    const { id } = req.body;
    classes = classes.filter((item) => item.id !== +id);
    res.status(200).json({ message: "deleted" });
  });

module.exports = classRoute;
