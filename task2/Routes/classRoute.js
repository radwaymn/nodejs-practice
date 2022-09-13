const express = require("express");
const classRoute = express.Router();
const classController = require("../Controllers/classController");
const validator = require("../Middlewares/validationMW");

classRoute
  .route("/class")
  .get(classController.getAll)
  .post(validator.addClass, validator.results, classController.add)
  .put(validator.updateClass, validator.results, classController.update)
  .delete(validator.numircId("id"), validator.results, classController.delete);

classRoute
  .route("/class/:id")
  .get(validator.numircId("id"), validator.results, classController.getById);

classRoute
  .route("/classChildren/:id")
  .get(
    validator.numircId("id"),
    validator.results,
    classController.getChildren
  );

classRoute
  .route("/classTeacher/:id")
  .get(
    validator.numircId("id"),
    validator.results,
    classController.getSupervisor
  );

module.exports = classRoute;
