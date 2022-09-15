const express = require("express");
const teacherRoute = express.Router();
const teacherController = require("../Controllers/teacherController");
const validation = require("../Middlewares/validationMW");
const upload = require("../Middlewares/imageUpload");
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/adminAuth");

teacherRoute
  .route("/teacher")
  .get(auth, isAdmin, teacherController.getAll)
  .post(
    upload.single("image"),
    validation.addTeacher,
    validation.results,
    teacherController.add
  )
  .put(
    auth,
    validation.updateTeacher,
    validation.results,
    teacherController.update
  )
  .delete(
    auth,
    isAdmin,
    validation.objectId("id"),
    validation.results,
    teacherController.delete
  );

teacherRoute
  .route("/teacher/:id")
  .get(
    auth,
    isAdmin,
    validation.objectId("id"),
    validation.results,
    teacherController.getById
  );

teacherRoute
  .route("/teacherImage")
  .put(
    auth,
    upload.single("image"),
    validation.objectId("id"),
    validation.results,
    teacherController.updateImage
  );

module.exports = teacherRoute;
