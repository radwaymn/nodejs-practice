const express = require("express");
const childRoute = express.Router();
const validation = require("../Middlewares/validationMW");
const childController = require("../Controllers/childController");
const upload = require("../Middlewares/imageUpload");
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/adminAuth");

childRoute.use(auth, isAdmin);

childRoute
  .route("/child")
  .get(childController.getAll)
  .post(
    upload.single("image"),
    validation.addChild,
    validation.results,
    childController.add
  )
  .put(validation.updateChild, validation.results, childController.update)
  .delete(
    validation.numircId("id"),
    validation.results,
    childController.delete
  );

childRoute
  .route("/child/:id")
  .get(validation.numircId("id"), validation.results, childController.getById);

childRoute
  .route("/childImage")
  .put(
    upload.single("image"),
    validation.numircId("id"),
    validation.results,
    childController.updateImage
  );

module.exports = childRoute;
