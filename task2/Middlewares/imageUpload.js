const customError = require("../Utils/error");
const multer = require("multer");

module.exports = multer({
  dest: "images/",
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      callback(null, true);
    } else {
      callback(customError("file extension not allowed", 415));
    }
  },
});
