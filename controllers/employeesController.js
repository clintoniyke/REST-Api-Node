const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "employee not found" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "firstname and lastname are required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const employees = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employees) {
    return res
      .status(204)
      .json({ message: `No employee matches ${req.body.id}.` });
  }
  if (req.body?.firstname) employees.firstname = req.body.firstname;
  if (req.body?.lastname) employees.lastname = req.body.lastname;
  const result = await employees.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const employees = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employees) {
    return res
      .status(204)
      .json({ message: `No employee matches ${req.body.id}.` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const employees = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employees) {
    return res
      .status(204)
      .json({ message: `No employee matches ${req.params.id}.` });
  }
  res.json(employees);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
