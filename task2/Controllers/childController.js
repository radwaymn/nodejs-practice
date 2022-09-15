const Child = require("../Models/child");
const customError = require("../Utils/error");

exports.getAll = (req, res, next) => {
  Child.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getById = (req, res, next) => {
  Child.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) throw customError("Child not found", 404);
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.add = async (req, res, next) => {
  const { fullname, age, level, address } = req.body;
  const { city, street, building } = address;
  const image = req.file.path;

  const _id = await Child.find()
    .select("_id")
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => data[0]._id + 1);

  const child = new Child({
    _id,
    fullname,
    age,
    level,
    image,
    address: {
      city,
      street,
      building,
    },
  });

  child
    .save()
    .then(() => {
      res.status(201).json({ message: "added" });
    })
    .catch((error) => next(error));
};

exports.update = (req, res, next) => {
  const { id, fullname, age, level, address } = req.body;
  const { city, street, building } = address;
  Child.findOneAndUpdate(
    { _id: id },
    {
      fullname,
      age,
      level,
      address: {
        city,
        street,
        building,
      },
    }
  )
    .then((data) => {
      if (!data) throw customError("Child not found", 404);
      res.status(200).json({ message: "updated" });
    })
    .catch((error) => next(error));
};

exports.updateImage = (req, res, next) => {
  const image = req.file.path;
  Child.findOneAndUpdate({ _id: req.body.id }, { image })
    .then((data) => {
      if (!data) throw customError("Child not found", 404);
      res.status(200).json({ message: "updated" });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  Child.findOneAndDelete({ _id: req.body.id })
    .then((data) => {
      if (!data) throw customError("Child not found", 404);
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => next(error));
};
