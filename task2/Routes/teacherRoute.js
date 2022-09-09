const express = require("express");
const teacherRoute = express.Router();

let teachers = [{ id: 1, name: "ali" }];

teacherRoute
  .route("/teacher")
  .get((req, res) => {
    res.status(200).json({ data: teachers });
  })
  .post((req, res) => {
    console.log(req.body);
    console.log(teachers);
    teachers.push(req.body);
    res.status(201).json({ message: "added" });
  })
  .put((req, res) => {
    const { id, name } = req.body;
    const index = teachers.findIndex((item) => item.id === +id);
    if (index != -1) {
      teachers[index] = { id, name };
    }
    res.status(200).json({ message: "updated" });
  })
  .delete((req, res) => {
    const { id } = req.body;
    teachers = teachers.filter((item) => item.id !== +id);
    res.status(200).json({ message: "delelted" });
  });

module.exports = teacherRoute;
