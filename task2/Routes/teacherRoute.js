const express = require("express");
const teacherRoute = express.Router();
const teacherController = require("../Controllers/teacherController");
const validation = require("../Middlewares/validationMW");

teacherRoute
  .route("/teacher")
  .get(teacherController.getAll)
  .post(validation.addTeacher, validation.results, teacherController.add)
  .put(validation.updatTeacher, validation.results, teacherController.update)
  .delete(validation.objectId("id"), validation.results, teacherController.delete);

teacherRoute
  .route("/teacher/:id")
  .get(validation.objectId("id"), validation.results, teacherController.getById);

module.exports = teacherRoute;
