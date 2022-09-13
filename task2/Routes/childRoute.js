const express = require("express");
const childRoute = express.Router();
const validation = require("../Middlewares/validationMW");
const childController = require("../Controllers/childController");

childRoute
  .route("/child")
  .get(childController.getAll)
  .post(validation.addChild, validation.results, childController.add)
  .put(validation.updateChild, validation.results, childController.update)
  .delete(
    validation.numircId("id"),
    validation.results,
    childController.delete
  );

childRoute
  .route("/child/:id")
  .get(validation.numircId("id"), validation.results, childController.getById);

module.exports = childRoute;
