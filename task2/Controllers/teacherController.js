const Teacher = require("../Models/teacher");
const customError = require("../Utils/error");

exports.getAll = (req, res, next) => {
  Teacher.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getById = (req, res, next) => {
  Teacher.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) throw customError("Teacher not found", 404);
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.add = (req, res, next) => {
  const { fullname, password, email } = req.body;
  const image = req.file.path;
  const teacher = new Teacher({
    fullname,
    password,
    email,
    image,
  });

  teacher
    .save()
    .then(() => {
      res.status(201).json({ message: "added" });
    })
    .catch((error) => next(error));
};

exports.update = (req, res, next) => {
  const { fullname, password, email } = req.body;
  Teacher.findOne({ _id: req.userId })
    .then((data) => {
      if (!data) throw customError("Teacher not found", 404);

      data.fullname = fullname;
      data.email = email;
      data.password = password;
      data.save();

      res.status(200).json({ message: "updated" });
    })
    .catch((error) => next(error));
};

exports.updateImage = (req, res, next) => {
  const image = req.file.path;
  Teacher.findOneAndUpdate({ _id: req.userId }, { image })
    .then((data) => {
      if (!data) throw customError("Teacher not found", 404);
      res.status(200).json({ message: "updated" });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  Teacher.findOneAndDelete({ _id: req.body.id })
    .then((data) => {
      if (!data) throw customError("Teacher not found", 404);
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => next(error));
};
