const express = require("express");
const childRoute = express.Router();

let children = [{ id: 1, name: "omar" }];

childRoute
  .route("/child")
  .get((req, res) => {
    res.status(200).json({ data: children });
  })
  .post((req, res) => {
    children.push(req.body);
    res.status(201).json({ message: "added" });;
  })
  .put((req, res) => {
    const { id, name } = req.body;
    const index = children.findIndex((item) => item.id === +id);
    if (index != -1) {
        children[index] = { id, name };
    }
    res.status(200).json({ message: "updated" });
  })
  .delete((req, res) => {
    const { id } = req.body;
    children = children.filter((item) => item.id !== +id);
    res.status(200).json({ message: "deleted" });
  });

module.exports = childRoute;
