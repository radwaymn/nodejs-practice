const jwt = require("jsonwebtoken");
const customError = require("../Utils/error");

module.exports = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    next(customError("Unauthorized", 401));
  }
};
