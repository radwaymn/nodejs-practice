const customError = require("../Utils/error");

module.exports = (req, res, next) => {
  if (req.role === "admin") next();
  else next(customError("Unauthorized", 401));
};
