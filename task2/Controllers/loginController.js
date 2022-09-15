const Teacher = require("../Models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../Utils/error");

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  Teacher.findOne({ email })
    .then((data) => {
      if (!data) throw customError("Invalid credentials", 401);

      bcrypt.compare(password, data.password).then((result) => {
        if (!result) throw customError("Invalid credentials", 401);
      });

      const token = jwt.sign(
        {
          id: data._id,
          role: data.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.status(200).json({ message: "Login success", token });
    })
    .catch((error) => next(error));
};
