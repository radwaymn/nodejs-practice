const Class = require("../Models/class");
const customError = require("../Utils/error");

exports.getAll = (req, res, next) => {
  Class.find()
    .populate({ path: "supervisor", select: "fullname image" })
    .populate({ path: "children", select: "fullname" })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getById = (req, res, next) => {
  Class.findOne({ _id: req.params.id })
    .populate({ path: "supervisor", select: "fullname image" })
    .populate({ path: "children", select: "fullname" })
    .then((data) => {
      if (!data) throw customError("Class not found", 404);
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.add = async (req, res, next) => {
  const { name, supervisor, children } = req.body;

  const _id = await Class.find()
    .select("_id")
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => data[0]._id + 1);

  const classObj = new Class({
    _id,
    name,
    supervisor,
    children,
  });

  classObj
    .save()
    .then(() => {
      res.status(201).json({ message: "added" });
    })
    .catch((error) => next(error));
};

exports.update = (req, res, next) => {
  const { id, name, supervisor, children } = req.body;
  Class.findOneAndUpdate(
    { _id: id },
    {
      name,
      supervisor,
      children,
    }
  )
    .then((data) => {
      if (!data) throw customError("Class not found", 404);
      res.status(200).json({ message: "updated" });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  Class.findOneAndDelete({ _id: req.body.id })
    .then((data) => {
      if (!data) throw customError("Class not found", 404);
      res.status(200).json({ message: "deleted" });
    })
    .catch((error) => next(error));
};

exports.getChildren = (req, res, next) => {
  Class.findOne({ _id: req.params.id })
    .select("children")
    .populate({ path: "children", select: "fullname" })
    .then((data) => {
      if (!data) throw customError("Class not found", 404);
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getSupervisor = (req, res, next) => {
  Class.findOne({ _id: req.params.id })
    .select("supervisor")
    .populate({ path: "supervisor", select: "fullname image" })
    .then((data) => {
      if (!data) throw customError("Class not found", 404);
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
