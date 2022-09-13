const { body, check, validationResult } = require("express-validator");

// chains
const objectId = (id) =>
  check(id).isMongoId().withMessage("id must be mongo id");

const numircId = (id) => check(id).isNumeric().withMessage("id must be number");

const fullName = body("fullname")
  .isAlpha("en-US", { ignore: " " })
  .withMessage("full name must be characters only")
  .isLength({ min: 3 })
  .withMessage("full name min length is 3");

const password = body("password")
  .isStrongPassword()
  .withMessage(
    "password must contain 1 capital letter, 1 small letter, 1 number, 1 symbol and its min length is 8"
  );

const email = body("email")
  .isEmail()
  .withMessage("email must be in correct email format");

const image = body("image")
  .optional()
  .isURL()
  .withMessage("image must be a url string");

const age = body("age").isNumeric().withMessage("age must be numirc value");

const level = body("level")
  .isAlphanumeric()
  .withMessage("level must be characters and numbers only")
  .isIn(["PreKG", "KG1", "KG2"])
  .withMessage("levels allowed: PreKG, KG1, KG2");

const address = [
  body("address.city")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("city must be characters only"),
  body("address.street")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("street must be characters and numbers only"),
  body("address.building")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("building must be characters and numbers only"),
];

const className = body("name")
  .isAlphanumeric("en-US", { ignore: " " })
  .withMessage("class name must be characters and numbers only");

const children = body("children")
  .isArray()
  .withMessage("children must be an array");

// rules
exports.results = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    const message = results.errors.reduce(
      (current, error) => current + " " + error.msg,
      ""
    );
    const error = new Error(message);
    error.status = 422;
    next(error);
  }
  next();
};

exports.objectId = objectId;
exports.numircId = numircId;

exports.addTeacher = [fullName, email, password, image];
exports.updatTeacher = [objectId("id"), fullName, email, password, image];

exports.addChild = [fullName, age, level, address];
exports.updateChild = [numircId("id"), fullName, age, level, address];

exports.addClass = [className, objectId("supervisor"), children];
exports.updateClass = [
  numircId("id"),
  className,
  objectId("supervisor"),
  children,
];
